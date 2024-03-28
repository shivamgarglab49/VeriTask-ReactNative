import React from "react";

import { Users } from "../../hooks/types";
import { colors } from "../../utils/Constants";
import { Text, View, Image, Pressable, StyleSheet } from "react-native";

type UserItemProps = {
  item: Users;
  onItemClick: (item: Users) => any;
};

const UsersItem: React.FC<UserItemProps> = (props) => {
  return (
    <View style={styles.parentProps}>
      <Pressable
        android_ripple={{ color: "#343d40" }}
        style={styles.cardProps}
        onPress={props.onItemClick.bind(this, props.item)}
      >
        <Image
          style={styles.imageProps}
          source={require("../../assets/images/profile.png")}
        />
        <View style={styles.userProps}>
          <Text style={styles.nameProps}>{props.item.name}</Text>
          <Text style={styles.emailProps}>{props.item.email}</Text>
        </View>
        <Image
          style={styles.rightArrowProps}
          source={require("../../assets/images/right_arrow.png")}
        />
      </Pressable>
    </View>
  );
};

export default UsersItem;

const styles = StyleSheet.create({
  parentProps: {
    borderRadius: 8,
    overflow: "hidden",
    marginTop: 12,
  },
  cardProps: {
    backgroundColor: colors.fcl_fill_component,
    flexDirection: "row",
    height: 80,
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  imageProps: {
    width: 50,
    backgroundColor: "white",
    overflow: "hidden",
    borderRadius: 25,
    height: 50,
    borderColor: "black",
    borderWidth: 2,
    marginHorizontal: 12,
  },
  rightArrowProps: {
    width: 12,
    height: 12,
    marginHorizontal: 12,
  },
  nameProps: {
    fontSize: 20,
    color: colors.fcl_content,
  },
  emailProps: {
    fontSize: 16,
    color: colors.fcl_content_subtle,
  },
  userProps: {
    flex: 1,
  },
});
