import { Outlet, useNavigate } from "react-router-dom";
// import Layout from "../../component/panel/Layout";
import axios from "axios";
import { useEffect } from "react";
import { useAuth } from "../../../context/auth.context";
import { authApi } from "../../../helpers/Api";
import LayoutRes from "../../component/panel/Layout";

const ClientRouting = () => {
  const router = useNavigate();
  const [auth] = useAuth()

  // auth 
  const fetchingCurrentUser = async () => {
    try {
      await axios.get(`${authApi}/current-client`);
    } catch (error) {
      console.log(error);
      router("/");
    }
  };

  useEffect(() => {
    if (auth?.token) fetchingCurrentUser();
  }, [auth && auth?.token]);

  return (
    <LayoutRes>
      <Outlet />
    </LayoutRes>
  );
};

export default ClientRouting;
