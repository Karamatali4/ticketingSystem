import axios from "axios";
import { useEffect, useState } from "react";
import { catsApi, ticketApi, userApi } from "../helpers/Api";
import { Form, message } from "antd";
import { useAuth } from "../context/auth.context";


// fetching all users
export const fetAllUsers = (url) => {
  const [auth] = useAuth();
  const [users, setUsers] = useState([]);
  const authToken = auth && auth?.token;

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(`${userApi}${url}`);
        // console.log(data , "allusers");
        // message.success("allusers");
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (authToken) {
      fetchUsers();
    }
  }, [authToken]);

  return {
    fetchUsers,
    users,
  };
};



// categories creating
export const createCategory = () => {
  const [name, setName] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await axios.post(`${catsApi}/create`, { name });
      message.success(res.data.msg);
      console.log(res, "from cats");
      setName("");
    } catch (error) {
      console.error(error);
    }
  };
  return {
    name,
    setName,
    handleSubmit,
  };
};



// stats get data
export const getTicketsStats = () => {
  const [stats, setStats] = useState(null);
  const [auth] = useAuth();
  const authToken = auth && auth?.token;
  const ticketStats = async () => {
    try {
      const { data } = await axios.get(`${ticketApi}/ticket-stats`);
      setStats(data);
      // console.log(data, "ticket stats data");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (authToken) {
      ticketStats();
    }
  }, [authToken]);
  return {
    ticketStats,
    stats,
  };
};



export const useDeleteUser = (userId,email) => {

  const deleteUser = async (userId, email) => {
    if (confirm(`${email} Are You Sure Want to Delete This User`) == true) {
      try {
        const res = await axios.delete(`${userApi}/delete-user/${userId}`);
        message.success("User Was Deleted successfully");
      } catch (error) {
        console.log(error);
      }
    } else {
      message.warning("Delete Request Failed")
    }
     
  };
  return {
    deleteUser,
  };
}

export const useAssignTicket = () => {

  const [form] = Form.useForm();
  const [ticketId, setTicketId] = useState('');
  const [newAgentId, setNewAgentId] = useState('');
  const [reason, setReason] = useState('');

  const AssignTicket = async (values) => {
    try {
      const response = await axios.put(`${ticketApi}/assign-ticket`, values); 
      console.log(response.data);
      message.success("Ticket assigned successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to assign ticket.");
    }
  };
  return{
    AssignTicket,
    form,
    setTicketId,
    setNewAgentId,
    setReason
  }
}