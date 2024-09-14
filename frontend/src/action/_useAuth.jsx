import { useState } from "react";
import { message } from "antd";
import axios from "axios";
import { authApi } from "../helpers/Api";
import { useAuth } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import Cookie from "js-cookie";
import CryptoJs from "crypto-js";
import { paths } from "../helpers/paths";

export const _useAuth = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [auth , setAuth] = useAuth();
  const navigate = useNavigate();

 const [name, setName] = useState("");
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");

 const handleRegister = async (event) => {
   event.preventDefault();
   const userData = { name, email, password };
   try {
     const response = await axios.post(`${authApi}/signup`, userData, {
       headers: { "Content-Type": "application/json" },
     });
     const data = response.data;
     if (data.msg) {
       message.success(data.msg);
       navigate(paths.login);
     }
   } catch (error) {
     console.log("Error:", error);
     message.error(error?.response?.data?.message);
   }
 };






  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${authApi}/signin`, values);
      setAuth(data);
      const encryptedData = CryptoJs.AES.encrypt(
        JSON.stringify(data),
        import.meta.env.VITE_KEY
      ).toString();
      message.success(`Login successfull, ${data?.user?.email}`);
      
      if (values.remember) {
        Cookie.set("authTicket", encryptedData, { expires: 4 });
      } else {
        sessionStorage.setItem("authTicket", encryptedData);
      }

      navigate(paths.home);
    } catch (error) {
      setError(
        error?.response?.data?.message || "An error occurred during login"
      );
      message.error(
        error?.response?.data?.message || "An error occurred during login"
      );
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    Cookie.remove("authTicket");
    sessionStorage.removeItem("authTicket");
    setAuth({
      user: null,
      token: "",
    });
    message.info("User logged out!");
    navigate(paths.signup);
  };

  return {
    loading,
    auth,
    handleLogin,
    handleRegister,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    handleLogout,
    error,
  };
};
