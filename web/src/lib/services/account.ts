import { apiUrl } from "../temps";
import Cookies from "js-cookie";

export type IAccountData = {
  mail: string;
  password: string;
};

export type ISignupAccountData = {
  firstName: string;
  lastName: string;
  mail: string;
  password: string;
  phoneNumber: string;
};

export const logAccount = async (accountData: IAccountData) => {
  const res = await fetch(`${apiUrl}/account/login`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Access-Control-Allow-Credentials": "true",
    },
    body: JSON.stringify(accountData),
  });

  if (!res.ok) {
    return { error: "Wrong mail or password" };
  }

  return await res.json();
};

export const signupAccount = async (accountData: ISignupAccountData) => {
  const res = await fetch(`${apiUrl}/account/signup`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Access-Control-Allow-Credentials": "true",
    },
    body: JSON.stringify(accountData),
  });

  if (!res.ok) {
    return { error: "Error can't signup your account" };
  }

  return await res.json();
};

export const getLoggedAccount = () => {
  return Cookies.get("account_id");
};
