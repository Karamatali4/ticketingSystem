import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../context/auth.context";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { baseApi, ticketApi } from "../helpers/Api";
import { message } from "antd";
import { CgPathIntersect } from "react-icons/cg";
import { paths } from "../helpers/paths";

export const useBucket = () => {
  const [auth] = useAuth();
  const authToken = auth && auth?.token;

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOpenTickets = async () => {
    setLoading(true);
    try {
      const res = await axios.get(ticketApi);

      setList(res?.data.tickets);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authToken) {
      fetchOpenTickets();
    }
  }, [authToken]);

  // pick any tikcet
  const pickAnTicket = async (ticketId) => {
    setLoading(true);
    try {
      const res = await axios.put(`${ticketApi}/pick`, { ticketId });
      fetchOpenTickets();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    list,
    fetchOpenTickets,
    pickAnTicket,
  };
};

export const useTicketsForBucket = () => {
  const fetchData = async () => {
    const res = await axios.get(ticketApi);
    return res?.data.tickets;
  };

  // const {data, isLoading, onError, error, isSuccess } = useQuery("bucketTickets", fetchData)
  const { data, isLoading, error } = useQuery({
    queryKey: ["RandomTickets"],
    queryFn: fetchData,
  });

  if (error) {
    console.log(error);
  }

  return {
    data,
    isLoading,
  };
};

export const usePicketOpenTicket = () => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  // const update = async (ticketId) => {
  //   const { data } = await axios.put(`${ticketAPI}/pick`, { ticketId });
  //   return data;
  // };

  // const { mutate: pickAnTicket, isLoading } = useMutation(update, {
  //   onSuccess: (data) => {
  //     // queryClient.invalidateQueries("bucketTickets")
  //     toast.success("Picked")
  //   },
  //   onError: (error) => {
  //     console.log(error);

  //   },
  // })

  const pickAnTicket = async (ticketId) => {
    setIsLoading(true);
    try {
      const res = await axios.put(`${ticketApi}/pick`, { ticketId });
      queryClient.invalidateQueries("bucketTickets");
      message.success("Ticket Picked")
    } catch (error) {
      message.error(error?.response?.data?.message)
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    pickAnTicket,
    isLoading,
  };
};

export const usePickTickets = () => {
  // ticket/my-picks

  const [auth] = useAuth();
  const authToken = auth && auth?.token;

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMyPickTickets = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${ticketApi}/my-picks`);
      // console.log(res);
      setList(res?.data.tickets);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [authToken]);

  useEffect(() => {
    fetchMyPickTickets();
  }, [fetchMyPickTickets]);

  return {
    loading,
    list,
  };
};

export const useSingleTicket = (id) => {
  const [auth] = useAuth();
  const authToken = auth && auth?.token;

  const [ticket, setTicket] = useState({});
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");

  const router = useNavigate();

  useEffect(() => {
    const fetchingSingleTicket = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${ticketApi}/single/${id}`);
        setTicket(res.data.singleTicket);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (id && authToken) fetchingSingleTicket();
  }, [id, authToken]);

  const doComment = async () => {
    setLoading(true);
    try {
      const res = await axios.put(`${ticketApi}/add-comments`, {
        ticketId: id,
        content: comment,
      });
      if (res.status === 200) {
        // setSingleItem(res.data.singleTicket);
        message.success("Comment Added");
        setTicket((prev) => ({
          ...prev,
          comments: [...prev.comments, res.data.comments],
        }));
        setComment("");
        // fetchSingleTicket();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      setLoading(true);
      // const data = await axios.delete(`/delete/comment/${commentId}`);
      // if (data.ok) {
      message.success("deleted");
      setTicket((prev) => ({
        ...prev,
        comments: singleItem.comments.filter((x) => x._id !== commentId),
      }));
      // }
    } catch (error) {
      console.log(error);
      message.error("Failed, try again.");
    } finally {
      setLoading(false);
    }
  };

  const EscTicket = async (ticketId, why) => {
    if (!why) {
      return message.error("Please write something..");
    }
    setLoading(true);
    try {
      await axios.put(`${ticketApi}/escalate`, { ticketId, why });
      router("/agent/my-picks");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // doComment
  // deleteComent

  const closeTicket = async () => {
    try {
      setLoading(true);
      const res = await axios.put(`${ticketApi}/update-to-resolved/${id}`);
      if (res.status === 200) {
        message.success(res.data.msg);
        router("/agent/resolved-ticket"); // agent resolved
      }
    } catch (error) {
      console.log(error);
      message.error("Failed, try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    ticket,
    EscTicket,
    closeTicket,
    doComment,
    deleteComment,
    comment,
    setComment,
  };
};

export const useAvailableAgents = (isOpen) => {
  const router = useNavigate();
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${baseApi}/user/available-for-handover`);
      if (res.status === 200) {
        setList(res.data.users);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchUserData();
    }
  }, [isOpen]);

  let reason = "no reason at all.";

  const handoverTc = async (ticketId, newAgentId,newAgentName) => {
    setLoading(true);
    try {
      const res = await axios.put(`${ticketApi}/handover-ticket`, {
        ticketId,
        newAgentId,
        reason,
      });
      message.success(`Moved to ${newAgentName}`);
      router(paths.agentPickTickets);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    list,
    handoverTc,
  };
};

export const useSetOpenTicket = () => {
  const [auth] = useAuth()  
  const handleOpen = async (ticketId) => {
    try {
      await axios.put(
        `${ticketApi}/update-to-open/${ticketId}`,
        null,
        {
          headers: { Authorization: `Bearer ${auth?.token}` },
        }
      );
      message.success("Updated open ticket")
    } catch (error) {
      console.error("Error resolving ticket", error);
    }
  };
  return {
    handleOpen,
  };
}


export const fetchHandOverToMe = () => {
  const [ list,  setList ] = useState(null)
  const getHandOverTicketToMe = async () => {
    try {
      const { data } = await axios.get(`${ticketApi}/handover-to-me`)
      // console.log(data.tickets, "handover to me data")
      setList(data.tickets)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getHandOverTicketToMe()
  }, [])

  return{
    list,
    getHandOverTicketToMe,
    setList,
  }
}