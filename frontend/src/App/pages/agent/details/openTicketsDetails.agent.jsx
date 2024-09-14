import { useLocation, useParams } from "react-router-dom";
import Heading from "../../../component/common/Heading";
import { BiFolderOpen } from "react-icons/bi";
import { Button, Input, Modal } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";
import { useLocale } from "antd/es/locale";
import { useState } from "react";
import { useAvailableAgents, useSingleTicket } from "../../../../action/agent";
import TcDetailHead from "../../../component/panel/agent/TcDetailHead";
import { useAuth } from "../../../../context/auth.context";
import CommentsSection from "../../../component/common/CommentsSection";

const AgentOpenTicketDetail = () => {
  const id = useParams().id;
  const path = useLocation().pathname;
  const [auth] = useAuth();

  const [handoverModel, setHandoverModel] = useState(false);

  const [openEscModal, setOpenEscModal] = useState(false);
  const [why, setWhy] = useState("");

  const {
    loading,
    ticket: ticketData,
    EscTicket,
    closeTicket,
    doComment,
    deleteComment,
    comment,
    setComment,
  } = useSingleTicket(id);
  const {
    loading: usersLoading,
    list: usersList,
    handoverTc,
  } = useAvailableAgents(handoverModel);

  const AlertEsc = () => {
    let ok = window?.confirm("Are you sure?");
    if (ok) {
      setOpenEscModal(true);
    }
  };

  return (
    <>
      <Heading
        desc={""}
        title={ticketData?.title}
        icon={<BiFolderOpen size={20} />}
      />

      <div className="d-flex justify-content-end gap-2 mb-5">
        <Button
          onClick={closeTicket}
          className="myBtn"
          icon={<MinusCircleOutlined />}>
          Close Ticket
        </Button>

        {!path.includes("escalated/ticket") && (
          <Button onClick={AlertEsc} className="myBtn">
            Escalate Ticket
          </Button>
        )}

        {!path.includes("handover") && !path.includes("escalated/ticket") && (
          <Button className="myBtn" onClick={() => setHandoverModel(true)}>
            Handover Ticket
          </Button>
        )}
      </div>

      <TcDetailHead singleItem={ticketData} />

      <Modal
        centered
        width={700}
        title={<span className="text-capitalize">{ticketData?.title}</span>}
        open={openEscModal}
        onCancel={() => setOpenEscModal(false)}
        footer={null}>
        <div className="mt-4">
          <Input.TextArea
            value={why}
            onChange={(e) => setWhy(e.target.value)}
            placeholder="Please write the reason, why you are escalating this ticket?"
          />

          <Button className="myBtn mt-2" onClick={() => EscTicket(id, why)}>
            Escalate to manager
          </Button>
        </div>
      </Modal>
    {/* {JSON.stringify(usersList)} */}
      <Modal
        centered
        width={700}
        title={loading ? "..." : "Available Users"}
        open={handoverModel}
        onCancel={() => setHandoverModel(false)}
        footer={null}>
        <div className="mt-4 ">
          {usersList?.filter((x) => x._id !== auth?.user?._id).length > 0 ? (
            usersList
              ?.filter((x) => x._id !== auth?.user?._id)
              .map((x) => (
                <div
                  key={x._id}
                  className="d-flex justify-content-between align-items-center mb-4">
                  <div className="d-flex flex-column justify-content-start align-items-start ">
                    <b>{x.name}</b>
                    <small>{x.email}</small>
                  </div>
                  <Button
                    className="myBtn"
                    onClick={() => handoverTc(id, x._id ,x.name)}>
                    Handover
                  </Button>
                </div>
              ))
          ) : (
            <>No Available User</>
          )}
        </div>
      </Modal>

      <CommentsSection
        list={ticketData?.comments}
        loading={loading}
        deleteComment={deleteComment}
        doComment={doComment}
        comment={comment}
        setComment={setComment}
      />
    </>
  );
};

export default AgentOpenTicketDetail;
