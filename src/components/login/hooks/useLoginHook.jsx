import React, { useState } from "react";
import { loginAuth } from "../services/loginService";

const useLoginHook = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const getAuthentication = async (username = "", password = "") => {
    setIsLoading(true);
    setErrorMessage("");

    try {
        const response = await loginAuth(username, password);
        return response.data;
    } catch(error) {
        setErrorMessage(error?.response?.data?.message ?? error?.message ?? "An error occurred during login.");
        setIsLoading(false);
    }
  }

  return {
    getAuthentication,
    errorMessage,
    isLoading,
  }
};

export default useLoginHook;
