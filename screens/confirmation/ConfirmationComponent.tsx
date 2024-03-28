import React, { useEffect } from "react";
import CustomButton from "../commons/CustomButton";

import { StyleSheet, Text, View } from "react-native";
import { ConfirmationScreenProps } from "../../hooks/types";
import { colors } from "../../utils/Constants";
import { Helper } from "../../utils/Helper";

export default function ConfirmationComponent({
  route,
  navigation,
}: ConfirmationScreenProps) {
  const deal = route.params.data;
  const isApproved = route.params.data.status === "Approved";

  const amount = Helper.formatAmount(deal.transactionValue);
  const dateInfo = Helper.formatDateAndTime(deal.updatedAt);

  const title = isApproved ? "Sale Approved" : "Sale Rejected";
  const subMessage = deal.creator.name + " will be notified.";

  let message = "";
  if (isApproved) {
    message = `You have approved the sale created by ${deal.creator.name} for ${deal.client.name} costing ${amount} at ${dateInfo.formattedTime} on ${dateInfo.formattedDate}.`;
  } else {
    message = `You have rejected the sale created by ${deal.creator.name} for ${deal.client.name} costing ${amount} at ${dateInfo.formattedTime} on ${dateInfo.formattedDate}`;
    if (deal.reason && deal.reason.length > 0) {
      message += ` because of “${deal.reason}”`;
    }
    message += ".";
  }

  useEffect(() => {
    navigation.setOptions({ title: title });
  }, [navigation, route]);

  return (
    <View style={styles.parentProps}>
      <Text style={styles.messageProps}>{message}</Text>
      <Text style={styles.subMessageProps}>{subMessage}</Text>
      <CustomButton
        text="View Other Tasks Pending Approval"
        rippleColor="#cccccc"
        buttonStyle={styles.buttonProps}
        onPress={() => {
          navigation.goBack();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  parentProps: {
    flex: 1,
    backgroundColor: colors.fcl_fill_container,
  },
  messageProps: {
    margin: 16,
    fontSize: 14,
    lineHeight: 20,
    color: colors.fcl_content,
  },
  subMessageProps: {
    marginHorizontal: 16,
    fontSize: 14,
    color: colors.fcl_content,
  },
  buttonProps: {
    margin: 16,
    paddingVertical: 12,
    backgroundColor: colors.fcl_fill_component,
  },
  buttonTextProps: {
    color: colors.fcl_content,
    fontSize: 16,
    textAlign: "center",
    fontWeight: "400",
  },
});
