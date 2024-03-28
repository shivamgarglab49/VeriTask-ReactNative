import { useEffect, useState, useCallback, useMemo } from "react";
import { UserLoginState, Users } from "./types";
import { StorageHelper } from "../utils/StorageHelper";

type UserState = {
  state: UserLoginState;
  user: Users | null;
};

export function useUserLogin() {
  const [currentUserState, setCurrentUserState] = useState<UserState>({
    state: UserLoginState.Checking,
    user: null,
  });

  const isChecking = useMemo(() => {
    return currentUserState.state === UserLoginState.Checking;
  }, [currentUserState]);

  const isLoggedIn = useMemo(() => {
    return (
      currentUserState.state === UserLoginState.AlreadyLoggedIn &&
      currentUserState.user != null
    );
  }, [currentUserState]);

  const isLoginRequired = useMemo(() => {
    return (
      currentUserState.state === UserLoginState.LoginRequired &&
      currentUserState.user == null
    );
  }, [currentUserState]);

  const onPostLogin = useCallback(async (user: Users) => {
    await StorageHelper.saveUser(user);
    setCurrentUserState({ state: UserLoginState.AlreadyLoggedIn, user });
  }, []);

  useEffect(() => {
    async function check() {
      const savedUser = await StorageHelper.getUser();
      setCurrentUserState({
        state: savedUser
          ? UserLoginState.AlreadyLoggedIn
          : UserLoginState.LoginRequired,
        user: savedUser,
      });
    }
    check();
  }, []);

  return {
    isChecking,
    isLoggedIn,
    isLoginRequired,
    currentUserState,
    onPostLogin,
  };
}
