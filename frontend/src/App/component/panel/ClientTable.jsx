import { useTheme } from "../../../context/theme.context";
import { Tag } from "antd";
import { priorityColor } from "../../../helpers/constants/Colors";
import { useLocation, useNavigate } from "react-router-dom";

const ClientTable = ({ list, onResolve , onOpenTicket}) => {
  const { theme } = useTheme();
  const router = useNavigate()
  const pathName = useLocation().pathname

  return (
    <div className="w-100 container-fluid mt-3 text-center table-responsive-xl table-responsive-xxl table-responsive-md">
      <table className="table border rounded">
        <thead className="rounded">
          <tr className="text-white">
            <th style={{ backgroundColor: theme.primary, color: "white" }}>
              #
            </th>
            <th style={{ backgroundColor: theme.primary, color: "white" }}>
              Title
            </th>
            <th style={{ backgroundColor: theme.primary, color: "white" }}>
              Category
            </th>
            <th style={{ backgroundColor: theme.primary, color: "white" }}>
              Priority
            </th>
            <th style={{ backgroundColor: theme.primary, color: "white" }}>
              Comments
            </th>
            <th style={{ backgroundColor: theme.primary, color: "white" }}>
              Status
            </th>
            <th style={{ backgroundColor: theme.primary, color: "white" }}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {list?.map((ticket, index) => (
            <tr key={ticket?._id}>
              <td>{index + 1}</td>
              <td>{ticket?.title}</td>
              <td>{ticket?.category?.name}</td>
              <td>
                <Tag color={priorityColor[ticket.priority]}>
                  {ticket?.priority}
                </Tag>
              </td>
              <td>{ticket?.comments?.length}</td>
              <td>{ticket?.status}</td>
              <td>
                {onOpenTicket ? ( <b
                  style={{cursor:"pointer"}}
                    type="primary"
                    className="pe-auto text-primary hover-pointer"
                    onClick={() => onOpenTicket(ticket._id)}>
                   SetOpen Ticket
                  </b> ) : ""}

                {onResolve ? (
                  <b
                  style={{cursor:"pointer"}}
                    type="primary"
                    className="pe-auto text-primary hover-pointer"
                    onClick={() => onResolve(ticket._id)}>
                    Resolve Ticket
                  </b>
                ) : (
                <b>{""}</b>
                )}

               {pathName === "/admin/allTickets" ? (   <b style={{cursor:"pointer"}}
                  type="primary"
                   className="pe-auto text-primary text-underline"
                    onClick={() =>
                      router(`/admin/ticketDetail/${ticket._id}`)
                    }><ins> 
                Show Details
                    </ins>
                  </b>) : ""}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientTable;
