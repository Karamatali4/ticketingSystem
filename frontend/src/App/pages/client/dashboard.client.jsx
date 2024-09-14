import React from "react";
import { Card, Table, Row, Col, Statistic } from "antd";
import { LikeOutlined } from "@ant-design/icons";
import { MdOutlineDashboard } from "react-icons/md";
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
  Bar,Line,
  ComposedChart,
  ZAxis,
  Scatter,
  ScatterChart,
} from "recharts";


const ClientDashboard = () => {
  const { theme } = useTheme();
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

  const ticketData = {
    resolved: 15,
    open: 7,
    inProgress: 3,
    total: 25,
  };

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
  ];

  const cardStyle = {
    background: "#f2f2f2",
    color: theme.primary,
  };

  const data02 = [
    {
      "x": 200,
      "y": 260,
      "z": 240
    },
    {
      "x": 240,
      "y": 290,
      "z": 220
    },
    {
      "x": 190,
      "y": 290,
      "z": 250
    },
    {
      "x": 198,
      "y": 250,
      "z": 210
    },
    {
      "x": 180,
      "y": 280,
      "z": 260
    },
    {
      "x": 210,
      "y": 220,
      "z": 230
    }
  ];
  const data03 = [
    {
      "x": 100,
      "y": 200,
      "z": 200
    },
    {
      "x": 120,
      "y": 100,
      "z": 260
    },
    {
      "x": 170,
      "y": 300,
      "z": 400
    },
    {
      "x": 140,
      "y": 250,
      "z": 280
    },
    {
      "x": 150,
      "y": 400,
      "z": 500
    },
    {
      "x": 110,
      "y": 280,
      "z": 200
    }
  ];
  
  return (
    <>
      <Heading
        icon={<MdOutlineDashboard />}
        title="Client Dashboard"
        desc=""
        style={{ color: theme.primary }}
      />

      <div style={{ padding: "20px" }}  data-aos="fade-zoom-in" data-aos-offset="200"
            data-aos-easing="ease-in-sine"
            data-aos-duration="600">
        <Row gutter={[16, 16]} className="mb-4">
          <Col xs={24} sm={12} md={6}>
            <Card title="Resolved Tickets" style={cardStyle} bordered={false}>
              <p style={{ fontSize: "24px", fontWeight: "bold" }}>
                {ticketData.resolved}
              </p>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card title="Open Tickets" style={cardStyle} bordered={false}>
              <p style={{ fontSize: "24px", fontWeight: "bold" }}>
                {ticketData.open}
              </p>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card
              title="In Progress Tickets"
              style={cardStyle}
              bordered={false}>
              <p style={{ fontSize: "24px", fontWeight: "bold" }}>
                {ticketData.inProgress}
              </p>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card title="Total Tickets" style={cardStyle} bordered={false}>
              <p style={{ fontSize: "24px", fontWeight: "bold" }}>
                {ticketData.total}
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
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
          <ComposedChart width={730} height={250} data={data}>
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
          style={{ backgroundColor: "#f1f1f2", height:"230px" }}
          className="rounded-4 p-4 m-2">
          <Col span={24} >
            <Statistic 
              title="Feedback"
              value={1128}
              prefix={<LikeOutlined />}
            />
          </Col>
          <Col span={24} >
            <Statistic title="Response Users" value={93} suffix="/ 100" />
          </Col>
        </Row>
      </Row>
    <Row>
      <Col>
    <ScatterChart
  width={990}
  height={290}
  margin={{
    top: 30,
    right: 20,
    bottom: 10,
    left: 10,
  }}
>
  <CartesianGrid strokeDasharray="3 2" />
  <XAxis dataKey="x" type="number" name="last uptade" unit="9" />
  <YAxis dataKey="y" type="number" name="online" unit="3" />
  <ZAxis dataKey="z" type="number" range={[220, 134]} name="Users" unit="total" />
  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
  <Legend />
  <Scatter name="A Clients" data={data03} fill={theme.primary} />
  <Scatter name="B Agents" data={data02} fill="#82ca9d" />
</ScatterChart>
  </Col>
    </Row>
    
    </>
  );
};

export default ClientDashboard;
