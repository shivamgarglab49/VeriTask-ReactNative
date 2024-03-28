import React from "react";

import { colors } from "../../utils/Constants";
import { Detail } from "../../hooks/types";
import { Helper } from "../../utils/Helper";
import { Text, View, StyleSheet } from "react-native";

type ProductItemProps = {
  item: Detail;
};

export default function ProductItem(props: ProductItemProps) {
  return (
    <View style={styles.productsHeaderParentProps}>
      <Text style={styles.productNameHeaderProps} numberOfLines={1}>
        {props.item.productName}
      </Text>
      <Text style={styles.productQtyHeaderProps} numberOfLines={1}>
        {props.item.productQuantity}
      </Text>
      <Text style={styles.productPriceHeaderProps} numberOfLines={1}>
        {Helper.formatAmount(props.item.productTotalPrice)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  productsHeaderParentProps: {
    width: "100%",
    flexDirection: "row",
  },
  productNameHeaderProps: {
    width: "40%",
    fontSize: 14,
    fontWeight: "400",
    color: colors.fcl_content,
  },
  productQtyHeaderProps: {
    width: "20%",
    fontSize: 14,
    textAlign: "right",
    fontWeight: "400",
    color: colors.fcl_content,
  },
  productPriceHeaderProps: {
    width: "40%",
    fontSize: 14,
    textAlign: "right",
    fontWeight: "400",
    color: colors.fcl_content,
  },
});
