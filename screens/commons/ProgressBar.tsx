import React from "react";
import {
  StyleSheet,
  StyleProp,
  ViewStyle,
  ActivityIndicator,
} from "react-native";

type ProgressBarProps = {
  style: StyleProp<ViewStyle> | undefined;
};

const ProgressBar = (props: ProgressBarProps) => {
  return (
    <ActivityIndicator
      style={[styles.progress, props.style]}
      size={"large"}
      color={"white"}
    />
  );
};

const styles = StyleSheet.create({
  progress: { flex: 1 },
});

export default ProgressBar;
