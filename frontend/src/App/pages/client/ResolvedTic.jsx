import React, { useEffect, useState } from "react";
import { FolderOpenOutlined } from "@ant-design/icons";
import { Button, Card, Input, Space, Tag, Typography, message } from "antd";
import axios from "axios";
import { useGetList } from "../../../action/_common";
import { ticketApi } from "../../../helpers/Api";
import { useAuth } from "../../../context/auth.context";
import { useTheme } from "../../../context/theme.context";
import Heading from "../../component/common/Heading";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { priorityColor } from "../../../helpers/constants/Colors";



const ResolvedTicket = () => {
  const { theme } = useTheme();
  const [auth] = useAuth();
  const { data, isLoading, error ,fetchList} = useGetList(`${ticketApi}/resolved-tickets`);
  const [refresh, setRefresh] = useState(false); 

  const toReopenTc = async (ticketId) => {
    try {
     const res = await axios.put(
        `${ticketApi}/reopen-ticket/${ticketId}`, 
        null,
        {
          headers: { Authorization: `Bearer ${auth?.token}` },
        }
      );
      message.success("Tickets was ReOpend ..")
      setRefresh(true);
    } catch (error) {
      console.error("Error reopening ticket", error);
    }
  };
 
  useEffect(() => {
    if (auth && auth.token) {
      fetchList();
    }
  }, [data, refresh, auth, auth.token]);

  return (
    <>
      <Heading
        decs={""}
        title={"Resolved Tickets "}
        icon={<IoCheckmarkDoneSharp />}
      />
      <div className="mb-2">
        <Input placeholder="Search Resolved Tickets" />
      </div>

      <div className="d-flex flex-column justify-content-start gap-3">
        {data?.tickets?.map((x) => (
          <Card key={x?._id} hoverable>
            <div className="d-flex justify-content-between align-items-center">
              <Typography.Title level={5} style={{ color: theme.primary }}>
                Title : {x?.title}
              </Typography.Title>
              <Tag color="green">{x?.resolvedAt?.slice(0, 10)}</Tag>
            </div>
            <Typography.Paragraph ellipsis={{ rows: 3 }}>
              Description : {x?.description}
            </Typography.Paragraph>

            <div className="mt-2">
              <Space direction="vertical">
                <Space className="d-flex justify-content-between">
                  <Typography.Text strong> Category :</Typography.Text>
                  <Typography.Text>{x?.category}</Typography.Text>
                </Space>
                <Space>
                  <Typography.Text strong>Status:</Typography.Text>
                  <Typography.Text>{x?.status}</Typography.Text>
                </Space>
                <Space>
                  <Typography.Text strong>Created At:</Typography.Text>
                  <Typography.Text>
                    {new Date(x?.createdAt).toLocaleDateString()}
                  </Typography.Text>
                </Space>
                <Space>
                  <Typography.Text strong> Priority:</Typography.Text>
                  <Tag color={priorityColor[x.priority]}>{x.priority}</Tag>
                </Space>
              </Space>
            </div>
            <div className="mt-3 pt-3 border-top">
              <Button
                style={{ backgroundColor: theme.primary, color: "white" }}
                onClick={() => toReopenTc(x?._id)}
                icon={<FolderOpenOutlined />}
                className="myBtn">
                Claim to reopen
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
};

export default ResolvedTicket;
