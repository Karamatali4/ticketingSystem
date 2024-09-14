import { useState } from "react";
import { Button, Divider, Input, List, Row, Col } from "antd";
import { CommentOutlined, DeleteOutlined } from "@ant-design/icons";
import { useAuth } from "../../../context/auth.context";
// import ClientCommentReplies from "./ClientCommentReplies";

const CommentsSection = ({
  loading,
  doComment,
  comment,
  setComment,
  list,
  deleteComment,
}) => {
  const [auth] = useAuth();

  const [open, setOpen] = useState(false);
  const [currentComment, setCurrentComment] = useState({});

  return (
    <>
      <div
        className="mt-5"
        style={{
          border: "1px solid #dee2e6",
          padding: "20px",
          borderRadius: "10px",
          backgroundColor: "#f9f9f9",
        }}>
        <Row className="mt-2" gutter={16}>
          <Col xs={24} sm={20} md={20}>
            <Input.TextArea
              className="fs-6 text-capitalize"
              style={{
                backgroundColor: "#fff",
                color: "#333",
                fontWeight: "400",
                borderRadius: "8px",
              }}
              placeholder="Write a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </Col>
          <Col
            xs={24}
            sm={4}
            md={4}
            className="d-flex justify-content-start p-2 mt-2 mt-sm-0">
            <Button
              size="large"
              loading={loading}
              className=" myBtn"
              onClick={doComment}>
              Submit
            </Button>
          </Col>
        </Row>

        <div className="mt-4">
          <h5>All Comments</h5>
        </div>
        <Divider />

        <List
          className="border rounded comment-list"
          itemLayout="vertical"
          dataSource={list}
          renderItem={(item) => (
            <List.Item className="my-1 p-2">
              <Row>
                <Col xs={24} sm={2} className="d-flex align-items-center">
                  <CommentOutlined
                    style={{ fontSize: "30px", cursor: "pointer" }}
                    onClick={() => {
                      setOpen(true);
                      setCurrentComment(item);
                    }}
                  />
                </Col>
                <Col xs={24} sm={20}>
                  <List.Item.Meta
                    title={
                      <a className="text-dark text-capitalize">
                        {item?.createdBy?._id === auth?.user?._id
                          ? "Me"
                          : item?.createdBy?.role}
                      </a>
                    }
                    description={
                      <p className="fs-5 text-dark">{item?.content}</p>
                    }
                  />
                </Col>
                <Col
                  xs={24}
                  sm={2}
                  className="d-flex align-items-center justify-content-end">
                  {item.createdBy?._id === auth?.user?._id && (
                    <DeleteOutlined
                      style={{
                        fontSize: "22px",
                        cursor: "pointer",
                        color: "red",
                      }}
                      onClick={() => deleteComment(item._id)}
                    />
                  )}
                </Col>
              </Row>
            </List.Item>
          )}
        />
      </div>

      {/* <ClientCommentReplies open={open} setOpen={setOpen} currentComment={currentComment} /> */}
    </>
  );
};

export default CommentsSection;
