import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../context/auth.context";
import { ticketApi } from "../helpers/Api";
import { message } from "antd";

export const useTicketCreate = () => {
  const [loading, setLoading] = useState(false);

  const ticketCreation = async (values) => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${ticketApi}/create`, values);
      message.success("Ticket is created");
    } catch (error) {
      console.log(error);
      message.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    ticketCreation,
  };
};

export const useGetOpenTickets = () => {
  const [auth] = useAuth();
  const [openTickets, setOpenTickets] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOpenTickets = async () => {
    setLoading(true);
    try {
      // console.log("just entered into the fetch open ticket")
      const { data } = await axios.get(`${ticketApi}/my-opens`);
      // console.log("after fetching data", data)

      setOpenTickets(data.tickets);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      message.error(error);
    }
  };

  useEffect(() => {
    if (auth && auth?.token) fetchOpenTickets();
  }, [auth && auth?.token]);

  return {
    loading,
    openTickets,
  };
};
