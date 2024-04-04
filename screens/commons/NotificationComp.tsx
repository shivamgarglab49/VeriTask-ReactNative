import { Helper } from "../../utils/Helper";
import { Platform } from "react-native";
import { StorageHelper } from "../../utils/StorageHelper";
import React, { useEffect } from "react";
import { NATIVE_PUSH_ENABLED } from "../../utils/Constants";

import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function registerForPushNotificationsAsync(): Promise<string | null> {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  const { status: outerStatus } = await Notifications.getPermissionsAsync();
  if (outerStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      return null;
    }
  }
  const response = NATIVE_PUSH_ENABLED
    ? await Notifications.getDevicePushTokenAsync()
    : await Notifications.getExpoPushTokenAsync();
  return response.data;
}

export default function NotificationComp(): JSX.Element {
  useEffect(() => {
    const onNotificationReceived =
      Notifications.addNotificationReceivedListener((event) => {
        console.log(
          "addNotificationReceivedListener-->",
          JSON.stringify(event)
        );
      });

    const onNotificationTapped =
      Notifications.addNotificationResponseReceivedListener((event) => {
        console.log(
          "addNotificationResponseReceivedListener--->",
          JSON.stringify(event)
        );
      });

    async function registerForPushNotificationsAsyncInternally() {
      const token = await registerForPushNotificationsAsync();
      console.log("TOKEN_CALL_RESPONSE ==>  ", token);
      if (Helper.isNotEmpty(token)) {
        await StorageHelper.saveToken(token!!);
      }
    }

    registerForPushNotificationsAsyncInternally();
    return () => {
      Notifications.removeNotificationSubscription(onNotificationTapped);
      Notifications.removeNotificationSubscription(onNotificationReceived);
    };
  }, []);
  return <></>;
}
