import axios from "axios";
import { useAuth } from "../context/auth.context";
import { useQuery } from "@tanstack/react-query";

export const useGetList = (url) => { 
  const [auth] = useAuth();

  const fetchList = async () => {
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${auth?.token}`, 
      },
    });
    // console.log(data.tickets);
    return data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["bucketTickets", url],
    queryFn: fetchList,
    enabled: !!auth?.token, 
  });

  if (error) {
    console.error(error);
  }

  return {
    fetchList,
    data,
    isLoading,
    error,
  };
};
