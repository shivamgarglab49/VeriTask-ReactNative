import React from "react";

import { Deal } from "../../hooks/types";
import { colors } from "../../utils/Constants";
import { Helper } from "../../utils/Helper";
import { Text, View, Pressable, StyleSheet } from "react-native";

type DealItemProps = {
  item: Deal;
  onItemClick: (item: Deal) => any;
};

const DealItem: React.FC<DealItemProps> = (props) => {
  return (
    <View style={styles.parentProps}>
      <Pressable
        android_ripple={{ color: "#343d40" }}
        style={styles.cardProps}
        onPress={props.onItemClick.bind(this, props.item)}
      >
        <Text style={styles.clientNameProps}>{props.item.client.name}</Text>
        <View style={styles.userProps}>
          <Text style={styles.titleProps}>Sales Rep</Text>
          <Text style={styles.valueProps}>{props.item.creator.name}</Text>
        </View>
        <View style={styles.userProps}>
          <Text style={styles.titleProps}>Total</Text>
          <Text style={styles.valueProps}>
            {Helper.formatAmount(props.item.transactionValue)}
          </Text>
        </View>
        <View style={styles.userProps}>
          <Text style={styles.titleProps}># of Products</Text>
          <Text style={styles.valueProps}>{props.item.totalQuantity}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default DealItem;

const styles = StyleSheet.create({
  parentProps: {},
  cardProps: {
    backgroundColor: colors.fcl_fill_component,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  clientNameProps: {
    fontSize: 16,
    color: colors.fcl_content,
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
  userProps: {
    flex: 1,
    alignItems: "center",
    marginTop: 4,
    flexDirection: "row",
  },
});
