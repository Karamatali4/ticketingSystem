import React, { useEffect, useState } from "react";
import { Card, Row, Col, Statistic, message, Avatar } from "antd";
import { LikeOutlined } from "@ant-design/icons";
import { MdOutlineDashboard } from "react-icons/md";
import { FaCircleUser } from "react-icons/fa6";
import Heading from "../../component/common/Heading";
import { useTheme } from "../../../context/theme.context";
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  ReferenceLine,
  CartesianGrid,
  Tooltip,
  Area,
  Legend,
  PieChart,
  Pie,
  Bar,
  Line,
  ComposedChart,
} from "recharts";
import { useAuth } from "../../../context/auth.context";
import { fetAllUsers, getTicketsStats, useDeleteUser } from "../../../action/admin";
const AdminDashboard = () => {
  const { theme } = useTheme();
  const [auth] = useAuth();
  const { users: fetchAllUsers, fetchUsers } = fetAllUsers("/all-users") // Bottom table User List get from api
  const { stats, ticketStats } = getTicketsStats(); // Tickets Stats Current Data get from api
  const { deleteUser } = useDeleteUser() // single Delete User 


  // this is data stats in this
  const ticketData = {
    resolved: stats?.resolvedCount,
    open: stats?.openCount,
    inProgress: stats?.inProgressCount,
    reOpen: stats?.reopenedCount,
  };
  const totalEscaleted = stats?.escalatedTickets?.reduce((acce, items) => acce + items.count, 0);
  const totalTickets = stats?.createdTickets?.reduce((acc, item) => acc + item.count, 0);
  
  
  // columns Heading of bottom users table data
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Action",
      dataIndex: `_id`,
      key: "id",
    },
  ];
  // some cards styling
  const cardStyle = {
    background: "#f2f2f2",
    color: theme.primary,
  };

  const data01 = [
    {
      name: "Group A",
      value: 400,
    },
    {
      name: "Group B",
      value: 300,
    },
    {
      name: "Group C",
      value: 300,
    },
    {
      name: "Group D",
      value: 200,
    },
    {
      name: "Group E",
      value: 278,
    },
    {
      name: "Group F",
      value: 189,
    },
  ];
  const data = [
    {
      name: "April",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "May",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "June",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "july",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "August",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "September",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "October",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  return (
    <>
      <Heading
        icon={<MdOutlineDashboard />}
        title="Admin Dashboard"
        desc=""
        style={{ color: theme.primary }}
      />

      <div>
        <Row gutter={[16, 16]} className="mb-4">
          <Col xs={24} sm={12} md={4}>
            <Card
              hoverable
              title="Resolved Tickets"
              style={cardStyle}
              bordered={false}
            >
              <p style={{ fontSize: "24px", fontWeight: "bold" }}>
                {ticketData.resolved}
              </p>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Card
              hoverable
              title="Open Tickets"
              style={cardStyle}
              bordered={false}
            >
              <p style={{ fontSize: "24px", fontWeight: "bold" }}>
                {ticketData.open}
              </p>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Card
              hoverable
              title="In Progress Tickets"
              style={cardStyle}
              bordered={false}
            >
              <p style={{ fontSize: "24px", fontWeight: "bold" }}>
                {ticketData.inProgress}
              </p>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Card
              hoverable
              title="Created Tickets"
              style={cardStyle}
              bordered={false}
            >
              <p style={{ fontSize: "24px", fontWeight: "bold" }}>
                {totalTickets}
              </p>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Card
              hoverable
              title="Escalated Tickets"
              style={cardStyle}
              bordered={false}
            >
              <p style={{ fontSize: "24px", fontWeight: "bold" }}>
                {totalEscaleted}
              </p>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Card
              hoverable
              title="ReOpen Tickets"
              style={cardStyle}
              bordered={false}
            >
              <p style={{ fontSize: "24px", fontWeight: "bold" }}>
                {ticketData.reOpen}
              </p>
            </Card>
          </Col>
        </Row>
      </div>
      <Row className="d-flex">
        <Col xs={12} md={16}>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              width={800}
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <ReferenceLine x="user" stroke="green" label="Min PAGE" />
              <ReferenceLine
                y={4000}
                label="Limit"
                stroke="red"
                strokeDasharray="3 3"
              />
              <Area
                type="monotone"
                dataKey="uv"
                stroke="#8884d8"
                fill={theme.primary}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Col>
        <Col xs={12} md={4}>
          <PieChart width={300} height={300}>
            <Pie
              data={data01}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={50}
              fill="#8884d8"
            />
            <Pie
              data={data01}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              f
              fill={theme.primary}
              label
            />
          </PieChart>
        </Col>

        <Col className="mt-5">
          <ComposedChart width={600} height={250} data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid stroke="#f5f5f5" />
            <Area
              type="monotone"
              dataKey="amt"
              fill="#8884d8"
              stroke="#8884d8"
            />
            <Bar dataKey="pv" barSize={20} fill={theme.primary} />
            <Line type="monotone" dataKey="uv" stroke="#ff7300" />
          </ComposedChart>
        </Col>

        <Row
          gutter={24}
          style={{ backgroundColor: "#f1f1f2", height: "230px" }}
          className="rounded-4 p-4 m-2"
        >
          <Col span={24}>
            <Statistic
              title="Feedback"
              value={1128}
              prefix={<LikeOutlined />}
            />
          </Col>
          <Col span={24}>
            <Statistic title="Response Users" value={93} suffix="/ 100" />
          </Col>
        </Row>
      </Row>

      <div className="mt-5 mb-4 ">
        <h3>User Management </h3>
        <table className="table align-middle mb-5 bg-white">
          <thead className="bg-light">
            <tr>
              <th>All Users</th>
              <th>Role</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {fetchAllUsers?.map((user, i) => (
              <tr key={i}>
                <td>
                  <div className="d-flex align-items-center">
                    <Avatar
                      size={45}
                      style={{
                        backgroundColor: theme.primary,
                      }}
                      icon={<FaCircleUser />}
                    />
                    <div className="ms-3">
                      <p className="fw-bold mb-1">{user?.name}</p>
                      <p className="text-muted mb-0">{user?.email}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <p className="fw-normal mb-1"> {user?.role}</p>
                </td>
                <td>{user?.email}</td>
                <td>
                  <button
                    onClick={() => deleteUser(user._id, user.email)}
                    type="button"
                    className="btn btn-danger btn-sm btn-rounded-2"
                  >
                    Delete User
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminDashboard;
