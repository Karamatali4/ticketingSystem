import { Outlet, useNavigate } from "react-router-dom";
import Layout from "../../component/panel/Layout";
import { useAuth } from "../../../context/auth.context";
import { useEffect } from "react";
import axios from "axios";
import { authApi } from "../../../helpers/Api";
import LayoutRes from "../../component/panel/Layout";

const AdminRouting = () => {
  const navigate = useNavigate();
  const [auth] = useAuth();

  // auth token &&
  const fetchingCurrentUser = async () => {
    try {
      await axios.get(`${authApi}/current-admin`);
    } catch (error) {
      console.log("Admin error",error);
      navigate("/");
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

export default AdminRouting;
