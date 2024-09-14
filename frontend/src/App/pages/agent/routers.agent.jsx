import { useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../context/auth.context";
import { Outlet, useNavigate } from "react-router-dom";
import { authApi } from "../../../helpers/Api";
import LayoutRes from "../../component/panel/Layout";

const AgentRouting = () => {
  const navigate = useNavigate();
  const [auth] = useAuth();

  const fetchCurrentUser = async () => {
    try {
      await axios.get(`${authApi}/current-agent`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
    } catch (error) {
      console.error("Error fetching current agent:", error);
      navigate("/");
    }
  };

  useEffect(() => {
    if (auth?.token) {
      fetchCurrentUser();
    }
  }, [auth?.token]);

  return (
    <LayoutRes>
      <Outlet />
    </LayoutRes>
  );
};

export default AgentRouting;
