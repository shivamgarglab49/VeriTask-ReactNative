import React from "react";

import { colors } from "../../utils/Constants";
import { StorageHelper } from "../../utils/StorageHelper";
import { useUserLogin } from "../../hooks/useUserLogin";
import {
  useNavigation,
  ParamListBase,
  NavigationProp,
} from "@react-navigation/native";
import { Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const OptionMenu = () => {
  const { currentUserState } = useUserLogin();
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const onLogout = async () => {
    await StorageHelper.saveUser(null);
    navigation.reset({
      index: 0,
      routes: [
        {
          name: "Users",
        },
      ],
    });
  };

  return (
    <TouchableOpacity onPress={onLogout} style={styles.parentProps}>
      <Text style={styles.textProps}>{currentUserState.user?.name}</Text>
      <Image
        style={styles.imageProps}
        source={require("../../assets/images/logout.png")}
      />
    </TouchableOpacity>
  );
};

export default OptionMenu;

const styles = StyleSheet.create({
  parentProps: { flexDirection: "row", alignItems: "center" },
  imageProps: {
    width: 16,
    height: 16,
  },
  textProps: {
    marginHorizontal: 8,
    fontSize: 14,
    color: colors.fcl_content,
  },
});
