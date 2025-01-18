import React, { useState } from "react";
import { Button, Checkbox, Form, Input, Typography, notification, Card, Row, Col } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./Login.css";

const { Text, Title, Link } = Typography;

const Login = () => {
  const [loading, setLoading] = useState(false); // State to manage the loading state
  const backend_url = import.meta.env.VITE_APP_BACKEND_URL;

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required."),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const openNotification = (type, message) => {
    notification[type]({
      message: "Login Error",
      description: message,
    });
  };

  return (
    <Row className="login-container">
      <Col xs={24} sm={20} md={12} lg={8}>
        <Card className="login-card" bordered={false}>
          <div className="login-header">
            <div className="login-logo">
              <img src="https://pashupaticargo.com/wp-content/uploads/2023/11/WhatsApp-Image-2024-12-12-at-11.51.08.jpeg" width={150} className="mb-3"/>
            </div>
            <Title level={3}>Welcome Back</Title>
          </div>

          <Formik
            initialValues={{ username: "", password: "", remember: true }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              setLoading(true); // Set loading to true on form submit
              axios
                .post(`${backend_url}/auth/jwt/create`, values)
                .then((response) => {
                  localStorage.setItem("accessToken", response.data.access);
                  localStorage.setItem("refreshToken", response.data.refresh);
                  window.location.reload();
                })
                .catch(() => {
                  openNotification("error", "Incorrect username or password. Please try again.");
                })
                .finally(() => {
                  setLoading(false); // Reset loading state after response
                });
            }}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
              <Form layout="vertical" onFinish={handleSubmit} requiredMark={false}>
                <Form.Item
                  label="Username"
                  validateStatus={errors.username && touched.username ? "error" : ""}
                  help={errors.username && touched.username ? errors.username : ""}
                >
                  <Input
                    prefix={<MailOutlined />}
                    size="large"
                    placeholder="Please enter username"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Form.Item>

                <Form.Item
                  label="Password"
                  validateStatus={errors.password && touched.password ? "error" : ""}
                  help={errors.password && touched.password ? errors.password : ""}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    size="large"
                    placeholder="Please enter password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Form.Item>

                <div className="login-form-footer">
                  <Checkbox
                    checked={values.remember}
                    onChange={(e) => setFieldValue("remember", e.target.checked)}
                  >
                    Remember me
                  </Checkbox>
                  <Link href="#" className="forgot-password-link">
                    Forgot password?
                  </Link>
                </div>

                <Form.Item>
                  <Button
                    type="primary"
                    block
                    htmlType="submit"
                    size="large"
                    loading={loading} // Use loading state for button
                  >
                    Log in
                  </Button>
                </Form.Item>

                <div className="login-footer">
                  <Text type="secondary">Don't have an account?</Text>{" "}
                  <Link href="#">Sign up now</Link>
                </div>
              </Form>
            )}
          </Formik>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
