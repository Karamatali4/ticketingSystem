import { BiEnvelopeOpen } from "react-icons/bi";
import Heading from "../../component/common/Heading";
import axios from "axios";
import { ticketApi } from "../../../helpers/Api";
import { useEffect, useState } from "react";
import { Button, Card, Tag } from "antd";
import { priorityColor } from "../../../helpers/constants/Colors";
import { useAuth } from "../../../context/auth.context";
import ClientTable from "../../component/panel/ClientTable";
import { fetchHandOverToMe, usePicketOpenTicket } from "../../../action/agent";

const AgentHandover = () => { 
//  const [ auth ] = useAuth()
const { pickAnTicket, isLoading: pickLoading } = usePicketOpenTicket();

const { list , getHandOverTicketToMe } = fetchHandOverToMe();
  return (
    <>
      <Heading
        desc={""}
        title={"Handover Tickets"}
        icon={<BiEnvelopeOpen size={20} />}
        />
           
           <div className="table-responsive">
        <table className="table mt-3 agent-table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Category</th>
              <th scope="col">Assigned At</th>
              <th scope="col">Status</th>
            </tr>
          </thead>

          <tbody>
            {list?.map((x, index) => (
              <tr key={x._id}>
                <th>{++index}</th>
                <th>{x?.title}</th>
                <th className="text-bold text-dark">
                  {/* {auth.user.category.name} */}
                </th>
                <th>{x?.createdAt?.slice(0, 10)}</th>
                <th>{x?.status}</th>

                <th>
                  <Button
                    loading={pickLoading}
                    onClick={() => pickAnTicket(x._id)}
                    type="dashed">
                    Pick
                  </Button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AgentHandover;
