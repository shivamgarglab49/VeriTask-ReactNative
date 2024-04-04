import React, { useCallback, useEffect } from "react";

import Retry from "../commons/Retry";
import ProgressBar from "../commons/ProgressBar";
import ProductItem from "./ProductItem";
import useDealDetail from "../../hooks/useDealDetail";
import ProgressDialog from "../commons/ProgressDialog";
import useStatusUpdate from "../../hooks/useStatusUpdate";
import useRejectReasons from "../../hooks/useRejectReasons";
import ButtonsComponent from "../commons/ButtonsComponent";

import { colors } from "../../utils/Constants";
import { Helper } from "../../utils/Helper";
import { useUserLogin } from "../../hooks/useUserLogin";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { DealDetailsScreenProps, RejectReason } from "../../hooks/types";
import { FlatList, StyleSheet, Text, View } from "react-native";

const DealDetailComponent = ({ navigation, route }: DealDetailsScreenProps) => {
  const { showActionSheetWithOptions: rejectActionSheet } = useActionSheet();
  const { showActionSheetWithOptions: approveActionSheet } = useActionSheet();

  const { currentUserState } = useUserLogin();

  const dealDetailQuery = useDealDetail(route.params.dealId);
  const rejectReasonsQuery = useRejectReasons();
  const dealStatusChangeQuery = useStatusUpdate(route.params.dealId);

  const onApprovedHandler = async () => {
    const options = ["Yes", "No"];
    const cancelButtonIndex = options.length - 1;

    approveActionSheet(
      {
        message: "Are you sure you want to approve this deal ?",
        options,
        cancelButtonIndex,
      },
      (selectedIndex?: number) => {
        switch (selectedIndex) {
          case cancelButtonIndex:
            break;

          default:
            dealStatusChangeQuery.mutate({
              reason: "",
              status: "Approved",
              approverId: currentUserState.user!.id,
            });
            break;
        }
      }
    );
  };

  const onRejectedHandler = async () => {
    let rejectReasonList: RejectReason[] = rejectReasonsQuery.data ?? [];

    if (!rejectReasonsQuery.isSuccess) {
      rejectReasonList = (await rejectReasonsQuery.refetch())?.data ?? [];
    }
    if (rejectReasonList.length === 0) {
      console.log("please try again");
      return;
    }
    const reasons = rejectReasonList.map((item) => item.description);
    const options = [...reasons, "Cancel"];
    const cancelButtonIndex = options.length - 1;

    rejectActionSheet(
      {
        title: "Select reason for rejection",
        options,
        cancelButtonIndex,
      },
      (selectedIndex?: number) => {
        switch (selectedIndex) {
          case cancelButtonIndex:
            break;

          default:
            dealStatusChangeQuery.mutate({
              reason: options[selectedIndex!],
              status: "Rejected",
              approverId: currentUserState.user!.id,
            });
            break;
        }
      }
    );
  };

  useEffect(() => {
    if (dealStatusChangeQuery.isSuccess) {
      navigation.replace("Confirmation", { data: dealStatusChangeQuery.data });
    } else if (dealStatusChangeQuery.isError) {
      dealStatusChangeQuery.reset();
    }
  }, [dealStatusChangeQuery]);

  useEffect(() => {
    dealDetailQuery.data &&
      dealDetailQuery.isSuccess &&
      navigation.setOptions({
        title: dealDetailQuery.data.client.name,
      });
  }, [dealDetailQuery, navigation]);

  return (
    <View style={styles.rootProps}>
      <ProgressDialog visible={dealStatusChangeQuery.isPending} />
      {dealDetailQuery.isLoading && (
        <ProgressBar style={styles.progressProps} />
      )}
      {dealDetailQuery.isError && (
        <Retry
          message="Something went wrong, Please try again!"
          onRetry={dealDetailQuery.refetch}
        />
      )}
      {dealDetailQuery.isSuccess && dealDetailQuery.data && (
        <View style={styles.dealDetailsProps}>
          <View style={styles.dealInfoProps}>
            <Text style={styles.titleProps}>Client</Text>
            <Text style={styles.valueProps}>
              {dealDetailQuery.data.client.name}
            </Text>
          </View>

          <View style={styles.dealInfoProps}>
            <Text style={styles.titleProps}>Sales Rep</Text>
            <Text style={styles.valueProps}>
              {dealDetailQuery.data.creator.name}
            </Text>
          </View>

          <View style={styles.dealInfoProps}>
            <Text style={styles.titleProps}>Transaction Price</Text>
            <Text style={styles.valueProps}>
              {Helper.formatAmount(dealDetailQuery.data.transactionValue)}
            </Text>
          </View>

          <View style={styles.dealInfoProps}>
            <Text style={styles.titleProps}>Products</Text>
            <Text style={styles.valueProps}>
              {dealDetailQuery.data.totalQuantity}
            </Text>
          </View>

          <View style={styles.dealInfoProps}>
            <Text style={styles.titleProps}>Status</Text>
            <View
              style={[
                styles.statusProps,
                {
                  backgroundColor: Helper.getStatusBGColorBasedOnStatusCode(
                    dealDetailQuery.data.status
                  ),
                },
              ]}
            >
              <Text style={styles.statusTextProps}>
                {Helper.getStatusTitleBasedOnStatusCode(
                  dealDetailQuery.data.status
                )}
              </Text>
            </View>
          </View>

          <View style={styles.dealInfoProps}>
            <Text style={styles.titleProps}>
              {Helper.getDateTitleBasedOnStatusCode(
                dealDetailQuery.data.status
              )}
            </Text>
            <Text style={styles.valueProps}>
              {
                Helper.formatDateAndTime(dealDetailQuery.data.updatedAt)
                  .formattedDate
              }
            </Text>
          </View>

          {dealDetailQuery.data.status === "Rejected" && (
            <View style={styles.dealInfoProps}>
              <Text style={styles.titleProps}>Rejected By</Text>
              <Text style={styles.valueProps}>
                {dealDetailQuery.data.approver.name}
              </Text>
            </View>
          )}

          {dealDetailQuery.data.status === "Rejected" &&
            dealDetailQuery.data.reason &&
            dealDetailQuery.data.reason.length > 0 && (
              <View style={styles.dealInfoProps}>
                <Text style={styles.titleProps}>Rejection Comment</Text>
                <Text style={styles.valueProps}>
                  "{dealDetailQuery.data.reason}"
                </Text>
              </View>
            )}

          <FlatList
            data={dealDetailQuery.data.details}
            renderItem={(item) => {
              return <ProductItem item={item.item} />;
            }}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.flatListContentContainerStyle}
            ListHeaderComponent={
              <View style={styles.productsHeaderParentProps}>
                <Text style={styles.productNameHeaderProps}>Products</Text>
                <Text style={styles.productQtyHeaderProps}>Quantity</Text>
                <Text style={styles.productPriceHeaderProps}>Total Prices</Text>
              </View>
            }
          />
          {currentUserState.user?.id === dealDetailQuery.data.approverId &&
            dealDetailQuery.data.status === "Pending" && (
              <ButtonsComponent
                okButtonText="Approve"
                cancelButtonText="Reject"
                onSelection={(isApproved: boolean) => {
                  if (isApproved) {
                    onApprovedHandler();
                  } else {
                    onRejectedHandler();
                  }
                }}
              />
            )}
          {currentUserState.user?.id !== dealDetailQuery.data.approverId &&
            dealDetailQuery.data.status === "Pending" && (
              <Text style={styles.footerTextProps}>
                You are not authorized user
              </Text>
            )}
        </View>
      )}
    </View>
  );
};

export default DealDetailComponent;

const styles = StyleSheet.create({
  rootProps: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.fcl_fill_container,
  },
  progressProps: { flex: 1 },
  dealDetailsProps: {
    flex: 1,
  },
  titleProps: {
    fontSize: 14,
    color: colors.fcl_content_subtle,
  },
  valueProps: {
    fontSize: 14,
    marginHorizontal: 8,
    color: colors.fcl_content,
  },
  statusProps: {
    paddingVertical: 1,
    marginHorizontal: 8,
    paddingHorizontal: 10,
    borderRadius: 6,
    color: colors.fcl_neutral_900,
  },
  statusTextProps: {
    fontSize: 14,
    color: colors.fcl_neutral_900,
  },
  dealInfoProps: {
    marginTop: 4,
    alignItems: "center",
    flexDirection: "row",
  },
  productsHeaderParentProps: {
    width: "100%",
    marginTop: 10,
    flexDirection: "row",
  },
  productNameHeaderProps: {
    width: "40%",
    fontSize: 14,
    fontWeight: "700",
    color: colors.fcl_content,
  },
  productQtyHeaderProps: {
    width: "20%",
    fontSize: 14,
    textAlign: "right",
    fontWeight: "700",
    color: colors.fcl_content,
  },
  productPriceHeaderProps: {
    width: "40%",
    fontSize: 14,
    textAlign: "right",
    fontWeight: "700",
    color: colors.fcl_content,
  },
  flatListContentContainerStyle: { paddingVertical: 8, gap: 8 },
  footerTextProps: {
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
    color: colors.fcl_content,
  },
});
