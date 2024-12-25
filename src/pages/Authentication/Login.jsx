import React from "react";
import { Button, Checkbox, Form, Input, Typography, notification, Card, Row, Col } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./Login.css"; // Assuming you've created the CSS file

const { Text, Title, Link } = Typography;

const Login = () => {
  const backend_url = import.meta.env.VITE_APP_BACKEND_URL;

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required. "),
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
          {/* Header Section */}
          <div className="login-header">
            <div className="login-logo">
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="0.464294" width="24" height="24" rx="4.8" fill="#1890FF" />
                <path d="M14.8643 3.6001H20.8643V9.6001H14.8643V3.6001Z" fill="white" />
                <path d="M10.0643 9.6001H14.8643V14.4001H10.0643V9.6001Z" fill="white" />
                <path d="M4.06427 13.2001H11.2643V20.4001H4.06427V13.2001Z" fill="white" />
              </svg>
            </div>
            <Title level={3}>Welcome Back</Title>
             
          </div>

          {/* Form Section */}
          <Formik
            initialValues={{ username: "", password: "", remember: true }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              axios
                .post(`${backend_url}/auth/jwt/create`, values)
                .then((response) => {
                  localStorage.setItem("accessToken", response.data.access);
                  localStorage.setItem("refreshToken", response.data.refresh);
                  window.location.reload();
                })
                .catch(() => {
                  openNotification("error", "Incorrect username or password. Please try again.");
                });
            }}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
              <Form layout="vertical" onFinish={handleSubmit} requiredMark={false}>
                {/* Username Field */}
                <Form.Item
                  label="Username"
                  validateStatus={errors.username && touched.username ? "error" : ""}
                  help={errors.username && touched.username ? errors.username : ""}
                >
                  <Input
                    prefix={<MailOutlined />}
                    size="large"
                    required
                    placeholder="Please enter username"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Form.Item>

                {/* Password Field */}
                <Form.Item
                  style={{marginTop:'1px'}}
                  label="Password"
                  required
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

                {/* Remember Me & Forgot Password */}
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

                {/* Submit Button */}
                <Form.Item>
                  <Button type="primary" block htmlType="submit" size="large">
                    Log in
                  </Button>
                </Form.Item>

                {/* Footer Section */}
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
