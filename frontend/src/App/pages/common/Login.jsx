import React, { useEffect } from "react";
import { Col, Row, Button, Checkbox, Form, Input } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { useTheme } from "../../../context/theme.context";
import { _useAuth } from "../../../action/_useAuth";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/auth.context";
import { paths } from "../../../helpers/paths";

const Login = () => {
  const { theme } = useTheme();
  const { handleLogin, loading, error } = _useAuth();


  return (
    <section
      style={{ height: "100vh", backgroundColor: "#f1f1f1" }}
      className="py-3 py-md-5 py-xl-8">
      <div className="container-fuild">
        <Row>
          <Col
            xs={24}
            lg={12}
            style={{
              background: `linear-gradient(to right, #342945, ${theme.primary})`,
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}>
            <div>
              <h3 className="display-5 fw-bold">
                <h4>Welcome Back!</h4> Ticketing App{" "}
              </h3>
              <p className="fs-5">
                Welcome Back to TicketMaster! Sign In to Your TicketHub Account.
                Access Your Tickets. Log In to Your Event Portal. Sign In to
                Manage Your Tickets. Welcome Back! Let's Get You In. Log In to
                Your Ticket Vault. Enter Your TicketWorld Account. Welcome to
                Your Ticket Dashboard. Sign In to Your Ticket Experience
              </p>
            </div>
          </Col>
          <Col xs={24} lg={12}>
            <div className="my-5 text-center">
              <h2
                style={{ color: theme.primary }}
                className="display-5 fw-bold">
                Sign in
              </h2>
              <p>
                Don't have an account? <Link to={paths.signup}>Sign up</Link>
              </p>
              {error?.message && <p className="text-danger">{error.message}</p>}
            </div>
            <Row justify="center">
              <Col xs={24} lg={18}>
                <Form name="login" onFinish={handleLogin}>
                  <Row gutter={3}>
                    <Col span={24}>
                      <Form.Item
                        name="email"
                        rules={[
                          {
                            required: true,
                            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Please input a valid email address!",
                          },
                        ]}>
                        <Input
                          prefix={<MailOutlined />}
                          placeholder="Email"
                          className="fs-4 p-2"
                        />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: "Please input your password!",
                          },
                        ]}>
                        <Input.Password
                          prefix={<LockOutlined />}
                          placeholder="Password"
                          className="fs-4 p-2 "
                        />
                      </Form.Item>
                    </Col>
                    <Col className="d-flex justify-content-between" span={24}>
                      <Form.Item name="remember" valuePropName="checked">
                        <Checkbox className="fs-4">Remember me</Checkbox>
                      </Form.Item>
                      <Form.Item>
                        <Link to="/forgot-password" className="float-right">
                          Forgot password?
                        </Link>
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item>
                        <Button
                          style={{
                            background: `linear-gradient(to right, #342945, ${theme.primary})`,
                          }}
                          type="primary"
                          htmlType="submit"
                          className="w-50 "
                          loading={loading}>
                          Log in
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default Login;
