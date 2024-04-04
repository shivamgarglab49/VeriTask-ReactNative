import React from "react";

import { Users } from "../../hooks/types";
import { colors } from "../../utils/Constants";
import { Text, View, Pressable, StyleSheet } from "react-native";

type UserItemProps = {
  item: Users;
  onItemClick: (item: Users) => any;
};

const UsersItem: React.FC<UserItemProps> = (props) => {
  return (
    <View style={styles.parentProps}>
      <Pressable
        android_ripple={{ color: "#D3D3D3" }}
        style={styles.cardProps}
        onPress={props.onItemClick.bind(this, props.item)}
      >
        <View style={styles.userProps}>
          <Text style={styles.nameProps}>{props.item.name}</Text>
          <Text style={styles.emailProps}>{props.item.email}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default UsersItem;

const styles = StyleSheet.create({
  parentProps: {
    borderRadius: 4,
    overflow: "hidden",
  },
  cardProps: {
    backgroundColor: colors.fcl_fill_container,
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: "center",
  },
  nameProps: {
    fontSize: 14,
    lineHeight: 14,
    marginBottom: 8,
    color: colors.fcl_content,
  },
  emailProps: {
    fontSize: 12,
    lineHeight: 12,
    color: colors.fcl_content_subtle,
  },
  userProps: {
    flex: 1,
  },
});
