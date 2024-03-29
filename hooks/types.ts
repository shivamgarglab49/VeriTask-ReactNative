import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export enum UserLoginState {
  Checking = "Checking",
  AlreadyLoggedIn = "AlreadyLoggedIn",
  LoginRequired = "LoginRequired",
}

export enum VeriTaskQueries {
  Deals = "deal-list",
  DealsDetails = "deal-data",
  Users = "user-list",
  Login = "login",
  StatusUpdate = "deal-status-update",
  RejectReasons = "reject-reasons",
}

export interface Users {
  id: string;
  name: string;
  email: string;
  role: string;
  manager: Manager | null;
}

interface Manager {
  id: string;
  name: string;
  email: string;
}

export interface LoginParams {
  os: string;
  token: string;
  userId: string | undefined;
  deviceId: string;
}

export interface Login {
  os: string;
  token: string;
  userId: string;
  deviceId: string;
}

export interface RejectReason {
  id: string;
  key: string;
  description: string;
}

export interface Deal {
  id: string;
  clientId: string;
  creatorId: string;
  approverId: string;
  createdAt: string;
  updatedAt: string;
  totalQuantity: number;
  transactionValue: string;
  status: string;
  reason: string | null;
  client: Entity;
  approver: Entity;
  creator: Entity;
  details: Detail[] | null;
}

export interface Detail {
  id: string;
  dealId: string;
  productId: string;
  productName: string;
  productQuantity: number;
  productUnitPrice: string;
  productTotalPrice: string;
}

export interface Entity {
  id: string;
  name: string;
  email: string;
}

export type RootStackParamList = {
  Users: undefined;
  Deals: undefined;
  DealsDetail: { dealId: string };
  Confirmation: { data: Deal };
};

export type DealUpdateRequestBody = {
  status: string;
  reason: string;
  approverId: string;
};

export type UsersScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Users"
>;

export type DealsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Deals"
>;

export type DealDetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "DealsDetail"
>;

export type ConfirmationScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Confirmation"
>;
