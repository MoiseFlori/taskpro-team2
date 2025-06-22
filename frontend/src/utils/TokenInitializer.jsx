// src/utils/TokenInitializer.jsx
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { setAuthToken } from "./axiosConfig";

const TokenInitializer = () => {
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    setAuthToken(token);
  }, [token]);

  return null; 
};

export default TokenInitializer;
