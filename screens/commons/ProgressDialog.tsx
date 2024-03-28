import React from "react";
import { colors } from "../../utils/Constants";
import { View, Text, Modal, StyleSheet, ActivityIndicator } from "react-native";

type ProgressDialogProps = {
  visible: boolean;
  text?: string;
};
const ProgressDialog: React.FC<ProgressDialogProps> = (props) => {
  return (
    <Modal animationType="none" transparent={true} visible={props.visible}>
      <View style={styles.wrapper}>
        <View style={styles.content}>
          <ActivityIndicator size="large" color={colors.fcl_fill_container} />
          <Text style={[styles.label]}>{props.text ?? "Please wait...."}</Text>
        </View>
      </View>
    </Modal>
  );
};

export default ProgressDialog;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 4,
    width: "80%",
    padding: 16,
  },
  label: {
    color: colors.fcl_fill_container,
    fontSize: 18,
    opacity: 0.8,
    fontWeight: "600",
    textAlignVertical: "center",
    marginHorizontal: 15,
  },
});
