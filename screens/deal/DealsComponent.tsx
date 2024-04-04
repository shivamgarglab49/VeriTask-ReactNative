import React, { useMemo, useState } from "react";

import Retry from "../commons/Retry";
import useDeals from "../../hooks/useDeals";
import DealItem from "./DealItem";
import ProgressBar from "../commons/ProgressBar";
import SegmentedControlTab from "react-native-segmented-control-tab";

import { colors } from "../../utils/Constants";
import { useUserLogin } from "../../hooks/useUserLogin";
import { useQueryClient } from "@tanstack/react-query";
import { DealsScreenProps, VeriTaskQueries } from "../../hooks/types";
import { View, FlatList, StyleSheet } from "react-native";

const TAB_ITEMS = ["Pending", "Approved", "Rejected"];

const DealsComponent = ({ navigation }: DealsScreenProps) => {
  const [selectedItem, setSelectedItem] = useState(0);
  const queryClient = useQueryClient();
  const { currentUserState } = useUserLogin();

  const dealsApi = useDeals();

  const filteredList = useMemo(() => {
    const currentSelectedTabText = TAB_ITEMS[selectedItem];
    const deals = (dealsApi.data ?? []).filter(
      (deal) =>
        deal.status.toLowerCase() === currentSelectedTabText.toLowerCase()
    );
    return deals.filter(
      (deal) =>
        currentUserState.user && deal.approverId === currentUserState.user.id
    );
  }, [dealsApi, selectedItem, currentUserState]);

  const retry = () => {
    queryClient.removeQueries({ queryKey: [VeriTaskQueries.Deals] });
    dealsApi.refetch();
  };

  return (
    <View style={styles.rootProps}>
      <SegmentedControlTab
        values={TAB_ITEMS}
        selectedIndex={selectedItem}
        borderRadius={4}
        tabsContainerStyle={styles.tabsContainerStyle}
        tabStyle={styles.tabStyle}
        tabTextStyle={styles.tabTextStyle}
        activeTabStyle={styles.activeTabStyle}
        onTabPress={(selectedIndex) => {
          setSelectedItem(selectedIndex);
        }}
      />
      {dealsApi.isLoading && <ProgressBar style={styles.progressProps} />}
      {dealsApi.isError && (
        <Retry
          message="Something went wrong, Please try again!"
          onRetry={retry}
        />
      )}
      {dealsApi.isSuccess && filteredList.length === 0 && (
        <Retry message="No deals found, Please try again!" onRetry={retry} />
      )}
      {dealsApi.isSuccess && filteredList.length > 0 && (
        <FlatList
          data={filteredList}
          onRefresh={retry}
          refreshing={dealsApi.isFetching}
          renderItem={(item) => {
            return (
              <DealItem
                item={item.item}
                onItemClick={(tappedItem) => {
                  navigation.navigate("DealsDetail", { dealId: tappedItem.id });
                }}
              />
            );
          }}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.flatListContentContainerStyle}
        />
      )}
    </View>
  );
};

export default DealsComponent;

const styles = StyleSheet.create({
  rootProps: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 16,
    backgroundColor: colors.fcl_fill_container,
  },
  progressProps: {
    flex: 1,
  },
  tabsContainerStyle: {
    marginTop: 12,
    marginBottom: 12,
    marginHorizontal: 36,
  },
  tabStyle: {
    borderColor: colors.fcl_neutral_700,
    borderWidth: 2,
    backgroundColor: colors.fcl_neutral_900,
  },
  activeTabStyle: {
    backgroundColor: colors.fcl_fill_component,
  },
  tabTextStyle: {
    color: colors.fcl_content,
    fontSize: 14,
    fontWeight: "500",
  },
  flatListContentContainerStyle: { paddingBottom: 12, gap: 12 },
});
