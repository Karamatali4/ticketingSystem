import { useAuth } from '../../../context/auth.context';
import { useGetList } from '../../../action/_common';
import { ticketApi } from '../../../helpers/Api';
import TableSkeletion from '../../component/common/TableSkeletion';
import ClientTable from '../../component/panel/ClientTable';
import { MdAllInbox } from 'react-icons/md';
import Heading from '../../component/common/Heading';
import { Input } from 'antd';
import axios from 'axios';

const AllTickets = () => {
    const [ auth ] = useAuth();
    const { data,  isLoading } = useGetList(
      `${ticketApi}/all-tickets`
    );


  return (
    <>
      <Heading decs={""} title={"All Tickets"} icon={<MdAllInbox />} />
      <div className="mb-2">
        <Input placeholder="Search All Tickets" />
      </div>
      {isLoading ? (
        <TableSkeletion />
      ) : (
        <ClientTable list={data?.tickets} />
      )}
    </>
  );
}

export default AllTickets
