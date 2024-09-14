import { BiEnvelopeOpen } from "react-icons/bi";
import Heading from "../../component/common/Heading";
import { useGetList } from "../../../action/_common";
import { ticketApi } from "../../../helpers/Api";
import { Input, message } from "antd";
import TableSkeletion from "../../component/common/TableSkeletion";
import ClientTable from "../../component/panel/ClientTable";
import { useAuth } from "../../../context/auth.context";
import axios from "axios";
import { useSetOpenTicket } from "../../../action/agent";

const AgentReopenTickets = () => {
  const [auth] = useAuth()
  const {handleOpen} = useSetOpenTicket()

  const { data, isLoading, error } = useGetList(`${ticketApi}/all-reopens`);
  return (
    <>
      <Heading
        desc={""}
        title={"Reopens Tickets"}
        icon={<BiEnvelopeOpen size={20} />}/>    
        {/* {JSON.stringify(data)}         */}
            <div className="mb-2">
              <Input placeholder="Search ReOpen Tickets" />
            </div>
            {isLoading ? <TableSkeletion /> : <ClientTable list={data?.tickets} onOpenTicket={handleOpen} />}
    </>
  );
};

export default AgentReopenTickets;
