import React from 'react'
import { useGetList } from '../../../action/_common';
import { ticketApi } from '../../../helpers/Api';
import Heading from '../../component/common/Heading';
import { useTheme } from '../../../context/theme.context';
import { Input } from 'antd';
import TableSkeletion from '../../component/common/TableSkeletion';
import ClientTable from '../../component/panel/ClientTable';
import { MdAllInbox } from 'react-icons/md';

const AgentAssignedTickets = () => {
 
 const {theme} = useTheme()
  const { data,  isLoading } = useGetList(
    `${ticketApi}/assign-to-me`
  );


  return (
    <>
      <Heading decs={""} title={"Assign To Me Tickets"} icon={<MdAllInbox />} />
      <div className="mb-2">
        <Input placeholder="Search All Tickets" />
      </div>
      {isLoading ? (
        <TableSkeletion />
      ) : (
        <ClientTable list={data?.tickets} />
      )}
    </>
  )
}


export default AgentAssignedTickets;
