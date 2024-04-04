import { Helper } from "../utils/Helper";
import { StorageHelper } from "../utils/StorageHelper";
import {
  Deal,
  Login,
  Users,
  RejectReason,
  DealUpdateRequestBody,
} from "../hooks/types";

import axios, { AxiosRequestConfig } from "axios";
axios.defaults.baseURL = "https://veritask.vercel.app/api"; // base-url
axios.defaults.timeout = 20_000; // 10 sec

export const changeDealStatus = async (
  dealId: string,
  dataParams: DealUpdateRequestBody
) => {
  const config = {
    url: `/deals/${dealId}`,
    method: "patch",
    data: dataParams,
  };
  return await axiosWrapper<Deal>(config);
};

export const fetchDeals = async () => {
  const config = {
    url: `/deals`,
    method: "get",
  };
  return await axiosWrapper<Deal[]>(config);
};

export const fetchDealDetails = async (dealId: string) => {
  const config = {
    url: `/deals/${dealId}`,
    method: "get",
  };
  return await axiosWrapper<Deal>(config);
};

export const fetchUsers = async (role: string) => {
  const config = {
    url: "/users",
    method: "get",
  };
  return (await axiosWrapper<Users[]>(config)).filter(
    (item) =>
      role.toLowerCase() === "all".toLowerCase() ||
      role.toLowerCase() === item.role.toLowerCase()
  );
};

export const userLogin = async (userId: string) => {
  const data = {
    os: Helper.getOs(),
    userId: userId,
    token: await StorageHelper.getToken(),
    deviceId: await StorageHelper.getDeviceId(),
  };
  console.log("userLogin called with :->>>> ", data);
  const config = {
    url: "/login",
    data: data,
    method: "post",
  };
  return await axiosWrapper<Login>(config);
};

export const rejectReasons = async () => {
  const config = {
    url: "/reject-reasons",
    method: "get",
  };
  return await axiosWrapper<RejectReason[]>(config);
};

const axiosWrapper = async <T>(config: AxiosRequestConfig): Promise<T> => {
  try {
    const response = await axios(config);
    if (response.data.status === "SUCCESS") {
      return response.data.data as T;
    }
    throw new Error(`Something went wrong, please try again: ${config.url}`);
  } catch (error: any) {
    console.log(error);
    throw new Error(
      error.message ?? `Something went wrong, please try again: ${config.url}`
    );
  }
};
