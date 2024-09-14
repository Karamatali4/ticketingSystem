import React, { useEffect, useState } from "react";
import { useTheme } from "../../../context/theme.context";
import "../../../assets/layout.css";
import Heading from "../../component/common/Heading";
import { FaRegFolderOpen } from "react-icons/fa";
import { ticketApi } from "../../../helpers/Api";
import { useAuth } from "../../../context/auth.context";
import { useGetList } from "../../../action/_common";
import ClientTable from "../../component/panel/ClientTable";
import { Input } from "antd";
import TableSkeletion from "../../component/common/TableSkeletion";
import { useOpenTicket } from "../../../action/client";

const OpenTc = () => {
  const { theme } = useTheme();
  const [auth] = useAuth();
  const {data, isLoading, fetchList } = useGetList(`${ticketApi}/my-opens`);
 const { handleResolve } = useOpenTicket();


  return (
    <>
      <Heading decs={""} title={"Open Tickets"} icon={<FaRegFolderOpen />} />
      <div className="mb-2">
        <Input placeholder="Search Open Tickets" />
      </div>
      {isLoading ? (
        <TableSkeletion />
      ) : (
        <ClientTable list={data?.tickets} onResolve={handleResolve} />
      )}
    </>
  );
};

export default OpenTc;
