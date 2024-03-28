import React from "react";
import CustomButton from "./CustomButton";

import { View, Text, StyleSheet } from "react-native";
import { colors } from "../../utils/Constants";

type RetryProps = {
  message: string;
  onRetry: () => any;
};

const Retry: React.FC<RetryProps> = (props) => {
  return (
    <View style={styles.parentProps}>
      <Text style={styles.messageProps}>{props.message}</Text>
      <CustomButton
        text="Retry"
        onPress={props.onRetry}
        rippleColor="#cccccc"
        buttonStyle={styles.retryButtonProps}
        textStyle={styles.retryButtonTextProps}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  parentProps: { flex: 1, justifyContent: "center", alignItems: "center" },
  messageProps: { margin: 8, color: colors.fcl_content_subtle },
  retryButtonProps: {
    backgroundColor: colors.fcl_primary_100,
  },
  retryButtonTextProps: {
    color: colors.fcl_fill_container,
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
  },
});

export default Retry;
