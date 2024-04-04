import AsyncStorage from "@react-native-async-storage/async-storage";

import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

import { Helper } from "./Helper";
import { Users } from "../hooks/types";

export const KEY = {
  token: "token",
  user: "user",
  deviceId: "deviceId",
  dealStatusBody: "dealStatusBody",
};

export class StorageHelper {
  static saveToken = async (token: string) => {
    await AsyncStorage.setItem(KEY.token, token);
  };

  static getToken = async () => {
    try {
      const token = await AsyncStorage.getItem(KEY.token);
      if (Helper.isNotEmpty(token)) {
        return token!!;
      }
    } catch (error) {
      console.log("Failed to parse token");
    }
    return "";
  };

  static saveUser = async (user: Users | null) => {
    await AsyncStorage.setItem(KEY.user, JSON.stringify(user));
  };

  static getUser = async (): Promise<Users | null> => {
    try {
      const userString = await AsyncStorage.getItem(KEY.user);
      const user = JSON.parse(userString ?? "") as Users;
      if (user && user.id) {
        return user;
      }
    } catch (error) {
      console.log("Failed to parse info");
    }
    return null;
  };

  static getDeviceId = async (): Promise<string> => {
    try {
      let deviceId = await AsyncStorage.getItem(KEY.deviceId);
      if (Helper.isEmpty(deviceId)) {
        deviceId = uuidv4();
      }
      if (Helper.isEmpty(deviceId)) {
        throw Error("Device id generation dev issue");
      }
      await AsyncStorage.setItem(KEY.deviceId, deviceId!!);
      return deviceId!!;
    } catch (error: any) {
      throw Error("Device id generation dev issue");
    }
  };
}
