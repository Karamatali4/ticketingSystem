import React, { useState } from "react";
import { Form, Input, Button, Select, message } from "antd";
import axios from "axios";
import { authApi, catsApi } from "../../../helpers/Api";
import Heading from "../../component/common/Heading";
import { GrUserAdd } from "react-icons/gr";
import { useTheme } from "../../../context/theme.context";
import { useGetList } from "../../../action/_common";
import Cookie from "js-cookie";
import { useAuth } from "../../../context/auth.context";

const { Option } = Select;

const CreateUser = () => {
  const [auth] = useAuth();
  const { data, isLoading: categoriesLoading } = useGetList(catsApi);
  const { theme } = useTheme();
  const [form] = Form.useForm();
  const [role, setRole] = useState("");

  const onFinish = async (values) => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      };
      const response = await axios.post(`${authApi}/create-user`, values, {  headers, });
      message.success(response.data.msg);
      // console.log(response, "response");
      form.resetFields();
    } catch (error) {
      console.log(error);
      message.error(error.response?.data?.message || "Registration failed");
    }
  };

  const onRoleChange = (value) => {
    setRole(value);
  };

  return (
    <>
      <Heading
        icon={<GrUserAdd />}
        title="Add User"
        desc=""
        style={{ color: theme.primary }}
      />

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ role: "user" }}>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}>
          <Input type="email" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Role"
          name="role"
          rules={[{ required: true, message: "Please select your role!" }]}>
          <Select onChange={onRoleChange}>
            <Option value="admin">Admin</Option>
            <Option value="agent">Agent</Option>
            <Option value="user">User</Option>
          </Select>
        </Form.Item>
        {role === "agent" && (
          <Form.Item name="category" label="Category">
            <Select loading={categoriesLoading}>
              {data?.categories.map((category) => (
                <Option key={category._id} value={category._id}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        )}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CreateUser;
