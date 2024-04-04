import React from "react";
import CustomButton from "./CustomButton";

import { colors } from "../../utils/Constants";
import { View, StyleSheet } from "react-native";

type ButtonsComponentProps = {
  okButtonText: string;
  cancelButtonText: string;
  onSelection: (isOkButtonPressed: boolean) => any;
};

const ButtonsComponent: React.FC<ButtonsComponentProps> = ({
  onSelection,
  okButtonText,
  cancelButtonText,
}) => {
  return (
    <View style={styles.approveOrRejectParentProps}>
      <View style={styles.approveOrRejectSubParentProps}>
        <CustomButton
          onPress={() => {
            onSelection(false);
          }}
          text={cancelButtonText}
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
          text={okButtonText}
          rippleColor="#cccccc"
          buttonStyle={styles.approveButtonProps}
          textStyle={styles.approveTextProps}
        />
      </View>
    </View>
  );
};

export default React.memo(ButtonsComponent);

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
