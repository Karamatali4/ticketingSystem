import axios from "axios";
import { ticketApi } from "../helpers/Api";
import { useAuth } from "../context/auth.context";
import { useState } from "react";


export const useOpenTicket = () => {
  const [refresh, setRefresh] = useState(false); 
    const [auth] = useAuth();

  const handleResolve = async (ticketId) => {
    try {
      await axios.put(
        `${ticketApi}/update-to-resolved/${ticketId}`,
        null,
        {
          headers: { Authorization: `Bearer ${auth?.token}` },
        }
      );
      setRefresh(!refresh);
    } catch (error) {
      console.error("Error resolving ticket", error);
    }
  };

  return{
    handleResolve,
  }
}


