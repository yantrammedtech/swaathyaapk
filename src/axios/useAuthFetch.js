// import React from "react";
import axios from "axios";
import { BASE_URL } from '@env';

export async function authFetch(url, token) {
  const authPost = axios.create({
    baseURL: BASE_URL,
    method: "get",
    headers: {
      Accept: "application/json",
      Authorization: token,
    },
  });
  try {
    const response = await authPost(url);
    const data = response.data;
    // if(response.data.status === 'error') 
  
    if (String(response.status).startsWith("2")) return data;
  } catch (err) {
    if (err?.response?.data?.error) {
      return { message: err?.response?.data?.error, status: "error" };
    }
    return { message: "something went wrong", status: "error" };
  }
}
