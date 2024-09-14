import React from 'react'
import { useGetList } from '../../../action/_common';
import { ticketApi } from '../../../helpers/Api';
import Heading from '../../component/common/Heading';
import { Input } from 'antd';
import TableSkeletion from '../../component/common/TableSkeletion';
import ClientTable from '../../component/panel/ClientTable';
import { BsFillArchiveFill } from 'react-icons/bs';
import { useOpenTicket } from '../../../action/client';

const EscalatedTickets = () => {
 const { data, isLoading } = useGetList(`${ticketApi}/all-escalated-tickets`);
 const { handleResolve } = useOpenTicket();
 

  return (
    <>
      <Heading
        decs={""}
        title={"Escalated Tickets"}
        icon={<BsFillArchiveFill />}
      />
      <div className="mb-2">
        <Input placeholder="Search Escalated Tickets" />
      </div>
      {isLoading ? <TableSkeletion /> : <ClientTable list={data?.tickets} />}
    </>
  );
}

export default EscalatedTickets;
