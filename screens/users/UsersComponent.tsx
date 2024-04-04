import React, { useEffect } from "react";
import UsersItem from "./UsersItem";

import Retry from "../commons/Retry";
import useUsers from "../../hooks/useUsers";
import ProgressDialog from "../commons/ProgressDialog";
import useLoginQuery from "../../hooks/useLoginQuery";

import { colors } from "../../utils/Constants";
import { useUserLogin } from "../../hooks/useUserLogin";
import { UserLoginState, UsersScreenProps } from "../../hooks/types";
import { View, FlatList, StyleSheet } from "react-native";

const UsersComponent = ({ navigation }: UsersScreenProps) => {
  const { currentUserState, onPostLogin } = useUserLogin();
  const usersQuery = useUsers(
    "manager",
    currentUserState.state === UserLoginState.LoginRequired
  );
  const userLoginQuery = useLoginQuery();

  const retry = () => {
    usersQuery.refetch();
  };

  useEffect(() => {
    if (userLoginQuery.isSuccess) {
      onPostLogin(userLoginQuery.variables);
    } else if (userLoginQuery.isError) {
      userLoginQuery.reset();
    }
  }, [userLoginQuery]);

  useEffect(() => {
    currentUserState.state === UserLoginState.AlreadyLoggedIn &&
      navigation.replace("Deals");
  }, [currentUserState]);

  return (
    <View style={styles.parentProps}>
      {usersQuery.isError && (
        <Retry
          message="Something went wrong, Please try again!"
          onRetry={retry}
        />
      )}
      {usersQuery.isSuccess && usersQuery.data.length === 0 && (
        <Retry message="No users found, Please try again!" onRetry={retry} />
      )}
      {usersQuery.isSuccess && usersQuery.data.length > 0 && (
        <FlatList
          data={usersQuery.data}
          onRefresh={retry}
          refreshing={usersQuery.isLoading}
          renderItem={(item) => {
            return (
              <UsersItem
                item={item.item}
                onItemClick={(tappedUser) => {
                  userLoginQuery.mutate(tappedUser);
                }}
              />
            );
          }}
          keyExtractor={(item) => item.id}
        />
      )}
      <ProgressDialog visible={userLoginQuery.isPending} />
    </View>
  );
};

const styles = StyleSheet.create({
  parentProps: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
    backgroundColor: colors.fcl_fill_container,
  },
  progressProps: {
    flex: 1,
  },
});

export default UsersComponent;
