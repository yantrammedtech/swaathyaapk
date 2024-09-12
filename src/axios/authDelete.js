// import React from "react";
import axios from "axios";
import { BASE_URL } from '@env';

export async function authDelete(url, token) {
  const authPost = axios.create({
    baseURL: BASE_URL,
    method: "delete",
    headers: {
      Accept: "application/json",
      Authorization: token,
    },
  });
  try {
    const response = await authPost.delete(url);
    const data = response.data;
    return data;
  } catch (err) {
    if (err?.response?.data?.error) {
      return { message: err?.response?.data?.error, status: "error" };
    }
    return { message: "something went wrong", status: "error" };
  }
}
