import React from "react";
import CustomButton from "../commons/CustomButton";

import { colors } from "../../utils/Constants";
import { View, StyleSheet } from "react-native";

type DealStatusChangeComponentProps = {
  onSelection: (isApproved: boolean) => any;
};

const DealStatusChangeComponent: React.FC<DealStatusChangeComponentProps> = ({
  onSelection,
}) => {
  return (
    <View style={styles.approveOrRejectParentProps}>
      <View style={styles.approveOrRejectSubParentProps}>
        <CustomButton
          onPress={() => {
            onSelection(false);
          }}
          text="Reject"
          rippleColor="#cccccc"
          buttonStyle={styles.rejectButtonProps}
          textStyle={styles.rejectTextProps}
        />
      </View>
      <View style={styles.approveOrRejectSubParentProps}>
        <CustomButton
          onPress={() => {
            onSelection(true);
          }}
          text="Approve"
          rippleColor="#cccccc"
          buttonStyle={styles.approveButtonProps}
          textStyle={styles.approveTextProps}
        />
      </View>
    </View>
  );
};

export default React.memo(DealStatusChangeComponent);

const styles = StyleSheet.create({
  approveOrRejectParentProps: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  approveOrRejectSubParentProps: {
    marginHorizontal: 8,
  },
  approveButtonProps: {
    backgroundColor: colors.fcl_primary_100,
  },
  rejectButtonProps: {
    backgroundColor: colors.fcl_fill_component,
  },
  approveTextProps: {
    color: colors.fcl_fill_container,
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
  },
  rejectTextProps: {
    color: colors.fcl_content,
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
  },
});
