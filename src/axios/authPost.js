// import React from "react";
import axios from "axios";
import { BASE_URL } from '@env';

export async function authPost(url, body, token) {
  console.log(BASE_URL,"BASE_URL===")
  const authPost = axios.create({
    baseURL: BASE_URL,
    method: "post",
    headers: {
      Authorization: token,
      'Content-Type': 'multipart/form-data'
    },
  });
  try {
    const response = await authPost.post(url, body);
    const data = response.data;
    return data;
  } catch (err) {
    if (err?.response?.data?.error) {
      return { message: err?.response?.data?.error, status: "error" };
    }
    return { message: "something went wrong", status: "error" };
  }
}
