// import React from "react";
import axios from "axios";
// import { globalErrorHandler } from "../utility/globalErrorhandler";
import { BASE_URL } from '@env';

export async function postAxios(url, body) {
  console.log("fetchdata",BASE_URL)

  const authPost = axios.create({
    baseURL: BASE_URL,
    method: "post",
  });
  try {
    const response = await authPost.post(url, body);
  console.log("dataresponse",response)

    const data = response.data;
    return data;
  } catch (err) {
    // const errorMessage = globalErrorHandler(err);
    if (err?.response?.data?.error) {
      return { message: err?.response?.data?.error, status: "error" };
    }
    return { message: "something went wrong", status: "error" };
  }
}
