// import React from "react";
import axios from "axios";
import { BASE_URL } from '@env';

export async function authPatch(url, body, token) {
  console.log("fetchdata",BASE_URL)

  const authPatch = axios.create({
    baseURL: BASE_URL,
    method: "patch",
    headers: {
      Accept: "application/json",
      Authorization: token,
    },
  });
  try {
    const response = await authPatch.patch(url, body);
    const data = response.data;
    return data;
  } catch (err) {
    if (err?.response?.data?.error) {
      return { message: err?.response?.data?.error, status: "error" };
    }
    return { message: "something went wrong", status: "error" };
  }
}
