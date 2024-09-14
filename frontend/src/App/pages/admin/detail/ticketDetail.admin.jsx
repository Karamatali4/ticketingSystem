import { useLocation, useParams } from "react-router-dom";
import { ticketApi } from "../../../../helpers/Api";
import { useGetList } from "../../../../action/_common";
import Heading from "../../../component/common/Heading";
import { MdDetails } from "react-icons/md";
import { Input, Button , Card, Tag } from "antd"; // Ensure Button is imported
import TableSkeletion from "../../../component/common/TableSkeletion";
import { useTheme } from "../../../../context/theme.context";
import { priorityColor } from "../../../../helpers/constants/Colors";

const TicketDetail = () => {
  const id = useParams().id;
  const path = useLocation().pathname;
  const { theme } = useTheme();
  const { data, isLoading } = useGetList(
    `${ticketApi}/admin-ticket-detail/${id}`
  );

  const ticket = data?.ticket;

  if (isLoading) {
    return <TableSkeletion />;
  }

  return (
    <>
      <Heading decs={""} title={"Tickets Details"} icon={<MdDetails />} />
      <div className="w-100 container-fuild mt-3">
      <div className="row">
        <div className="col-md-12 offset-md-12">
          <Card style={{backgroundColor:"#f1f1f1" , fontSize:"16px"}} title="Ticket Details" bordered={true} hoverable>
            <p><strong>Title: </strong> {ticket.title}</p>
            <p><strong>Category: </strong> {ticket.category?.name}</p>
            <p><strong>Assigned At: </strong> {ticket.createdAt?.slice(0, 10)}</p>
            <p><strong>Status: </strong> {ticket.status}</p>
            <p><strong>Description: </strong> {ticket.description}</p>
            <p><strong>Priority: </strong> 
            <Tag color={priorityColor[ticket.priority]}>
                  {ticket?.priority}
                </Tag></p>
            <p><strong>Assigned To:</strong> {ticket.assignedTo?.name}</p>
            <p><strong>Comments:</strong> {ticket.comments?.map(comment => (
              <div key={comment.id} className="mb-2">
                <strong>{comment.author}:</strong> {comment.text}
              </div>
            ))}</p>
            <Button size="large" type="primary" className="mx-2 w-25">Pick</Button>
            <Button size="large" type="dashed" className="w-25 bg-warning text-light" >More Actions</Button>
          </Card>
        </div>
      </div>
    </div>
    </>
  );
};

export default TicketDetail;
