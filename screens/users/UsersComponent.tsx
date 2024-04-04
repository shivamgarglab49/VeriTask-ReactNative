import React, { useEffect, useState } from "react";
import UsersItem from "./UsersItem";

import Retry from "../commons/Retry";
import useUsers from "../../hooks/useUsers";
import ProgressDialog from "../commons/ProgressDialog";
import useLoginQuery from "../../hooks/useLoginQuery";
import ButtonsComponent from "../commons/ButtonsComponent";

import { PASSWORD, colors } from "../../utils/Constants";
import { useUserLogin } from "../../hooks/useUserLogin";
import { UserLoginState, Users, UsersScreenProps } from "../../hooks/types";
import { View, Text, TextInput, FlatList, StyleSheet } from "react-native";

const UsersComponent = ({ navigation }: UsersScreenProps) => {
  const [showError, setShowError] = useState<boolean>(false);
  const [enteredPassword, setEnteredPassword] = useState<string>(PASSWORD);
  const [selectedUser, setSelectedUser] = useState<Users | null>(null);

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
      {selectedUser == null &&
        usersQuery.isSuccess &&
        usersQuery.data.length > 0 && (
          <View style={styles.userListContainerProps}>
            <Text style={styles.userListContainerTitleProps}>
              Pick an Account
            </Text>
            <FlatList
              data={usersQuery.data}
              onRefresh={retry}
              refreshing={usersQuery.isLoading}
              renderItem={(item) => {
                return (
                  <UsersItem
                    item={item.item}
                    onItemClick={(tappedUser) => {
                      setSelectedUser(tappedUser);
                    }}
                  />
                );
              }}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.flatListContentContainerProps}
            />
          </View>
        )}
      {selectedUser != null && (
        <View style={styles.enterPasswordContainerProps}>
          <Text style={styles.enterPasswordContainerTitleProps}>
            Enter Password
          </Text>
          <Text style={styles.userNameAndEmailProps}>
            {`${selectedUser.name} | ${selectedUser.email}`}
          </Text>
          <View style={styles.enterPasswordContainerPasswordParentProps}>
            <Text style={styles.enterPasswordContainerPasswordLabelProps}>
              Password
            </Text>
            <View style={styles.enterPasswordContainerPasswordInputParentProps}>
              <TextInput
                style={styles.enterPasswordContainerPasswordInputProps}
                value={enteredPassword}
                onChange={(e) => {
                  setEnteredPassword(e.nativeEvent.text);
                  setShowError(false);
                }}
                maxLength={20}
                multiline={false}
                cursorColor={colors.fcl_content}
                secureTextEntry={true}
              />
              {showError && (
                <Text
                  style={styles.enterPasswordContainerPasswordErrorTextProps}
                >
                  *Invalid password
                </Text>
              )}
            </View>
          </View>
          <View style={styles.buttonContainerProps}>
            <ButtonsComponent
              okButtonText="Login"
              cancelButtonText="Back"
              onSelection={(isOkButtonPressed) => {
                if (isOkButtonPressed) {
                  if (enteredPassword === PASSWORD) {
                    setShowError(false);
                    userLoginQuery.mutate(selectedUser);
                  } else {
                    setShowError(true);
                  }
                } else {
                  setShowError(false);
                  setSelectedUser(null);
                }
              }}
            />
          </View>
        </View>
      )}

      <ProgressDialog visible={userLoginQuery.isPending} />
    </View>
  );
};

const styles = StyleSheet.create({
  parentProps: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: colors.fcl_fill_container,
  },
  userListContainerProps: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: colors.fcl_neutral_700,
  },
  userListContainerTitleProps: {
    fontSize: 32,
    color: colors.fcl_content_plus,
  },
  flatListContentContainerProps: { gap: 8, paddingTop: 16 },
  enterPasswordContainerProps: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: colors.fcl_neutral_700,
  },
  enterPasswordContainerTitleProps: {
    fontSize: 32,
    color: colors.fcl_content_plus,
  },
  userNameAndEmailProps: {
    color: colors.fcl_content,
    paddingVertical: 12,
    fontSize: 14,
  },
  enterPasswordContainerPasswordParentProps: {
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  enterPasswordContainerPasswordLabelProps: {
    fontSize: 14,
    marginRight: 32,
    lineHeight: 14,
    color: colors.fcl_content_subtle,
  },
  enterPasswordContainerPasswordInputParentProps: {
    flex: 1,
  },
  enterPasswordContainerPasswordInputProps: {
    fontSize: 32,
    borderRadius: 5,
    padding: 8,
    backgroundColor: "#3f454b",
    color: colors.fcl_content,
  },
  enterPasswordContainerPasswordErrorTextProps: {
    fontSize: 14,
    color: "red",
  },
  buttonContainerProps: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingVertical: 12,
  },
});

export default UsersComponent;
