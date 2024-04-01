import { colors } from "./Constants";
import { v4 as uuidv4 } from "uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";

export class Helper {
  static async delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  static formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  static formatAmount = (amount: string) => {
    let formattedAmount = amount;
    try {
      formattedAmount = Helper.formatter.format(+amount);
    } catch (error) {}
    return formattedAmount;
  };

  static formatDateAndTime = (dateString: string) => {
    const dateObj = new Date(dateString);
    const formattedDate = `${String(dateObj.getMonth() + 1).padStart(
      2,
      "0"
    )}/${String(dateObj.getDate()).padStart(2, "0")}/${dateObj.getFullYear()}`;

    let hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const seconds = dateObj.getSeconds();
    const ampm = hours >= 12 ? "PM" : "AM";

    hours %= 12;
    hours = hours || 12;

    const formattedTime = `${String(hours).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")}:${String(seconds).padStart(2, "0")} ${ampm}`;
    return { formattedDate, formattedTime };
  };

  static getDateTitleBasedOnStatusCode = (status: string) => {
    if (status.toLowerCase() === "pending") {
      return "Date Requested";
    }
    if (status.toLowerCase() === "approved") {
      return "Date Approved";
    }
    return "Date Rejected";
  };

  static getStatusTitleBasedOnStatusCode = (status: string) => {
    if (status.toLowerCase() === "pending") {
      return "Pending Approval";
    }
    if (status.toLowerCase() === "approved") {
      return "Approved Sale";
    }
    return "Rejected Sale";
  };

  static getStatusBGColorBasedOnStatusCode = (status: string) => {
    if (status.toLowerCase() === "pending") {
      return colors.fcl_primary_300;
    }
    if (status.toLowerCase() === "approved") {
      return colors.fcl_status_success_300;
    }
    return colors.fcl_secondary_500;
  };

  static getUniqueId = async () => {
    let deviceId: string | null = null;
    try {
      deviceId = await AsyncStorage.getItem("deviceId");
      if (Helper.isEmpty(deviceId)) {
        deviceId = uuidv4();
      }
      if (Helper.isEmpty(deviceId)) {
        throw Error("Device id generation dev issue");
      }
      await AsyncStorage.setItem("deviceId", deviceId!!);
      return deviceId;
    } catch (error: any) {
      console.log("Device id generation issue:- ", error);
    }
    throw Error("Device id generation dev issue");
  };

  static isNotEmpty(value: string | null | undefined): boolean {
    return value !== null && value !== undefined && value.trim() !== "";
  }

  static isEmpty(value: string | null | undefined): boolean {
    return value === null || value === undefined || value.trim() === "";
  }
}
