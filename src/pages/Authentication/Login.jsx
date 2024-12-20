import React from "react";
import { Button, Checkbox, Form, Grid, Input, theme, Typography,message,notification } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Formik } from "formik";
import * as Yup from "yup"; // Import Yup for validation
import axios from "axios";

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title, Link } = Typography;

export default function Login() {
const backend_url = import.meta.env.VITE_APP_BACKEND_URL;

  const { token } = useToken();
  const screens = useBreakpoint();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required()
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const styles = {
    container: {
      margin: "0 auto",
      maxWidth: "380px",
      padding: "30px",
      backgroundColor: "#fff",
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      height: "100%",
      overflow: "hidden",
    },
    footer: {
      marginTop: token.marginLG,
      textAlign: "center",
      width: "100%",
    },
    forgotPassword: {
      float: "right",
    },
    header: {
      marginBottom: token.marginXL,
      textAlign: "center",
    },
    section: {
      alignItems: "center",
      backgroundColor: token.colorBgContainer,
      display: "flex",
      height: "100vh",
      justifyContent: "center",
      padding: screens.md ? `${token.sizeXXL}px 0px` : "0px",
      overflow: "hidden",
    },
    text: {
      color: token.colorTextSecondary,
      textAlign: "center",
    },
    title: {
      fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3,
      fontWeight: "bold",
    },
    logo: {
      display: "block",
      margin: "0 auto 20px",
    },
    input: {
      borderRadius: "4px",
    },
    formFooter: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: "20px",
    },
  };
  const openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: 'Login Error',
      description: message,
    });
  };

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={styles.logo}
          >
            <rect x="0.464294" width="24" height="24" rx="4.8" fill="#1890FF" />
            <path d="M14.8643 3.6001H20.8643V9.6001H14.8643V3.6001Z" fill="white" />
            <path d="M10.0643 9.6001H14.8643V14.4001H10.0643V9.6001Z" fill="white" />
            <path d="M4.06427 13.2001H11.2643V20.4001H4.06427V13.2001Z" fill="white" />
          </svg>

          <Title style={styles.title}>Welcome Back</Title>
          <Text style={styles.text}>
            Welcome back to Application! Please enter your details below to sign in.
          </Text>
        </div>

        <Formik
          initialValues={{
            username: "",
            password: "",
            remember: true,
          }}
          
          validationSchema={validationSchema} // Attach validation schema
          onSubmit={(values) => {
            const url = `${backend_url}/auth/jwt/create`;
            axios.post(url, values)
              .then((response) => {
                localStorage.setItem("accessToken", response.data.access);
                localStorage.setItem("refreshToken", response.data.refresh);
                window.location.reload();
              })
              .catch((error) => {
                console.log(error);
                openNotificationWithIcon('error', 'Incorrect username or password. Please try again.');
              });
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
          }) => (
            <Form layout="vertical" onFinish={handleSubmit} requiredMark="optional">
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
                  style={styles.input}
                />
              </Form.Item>

              <Form.Item
                label="Password"
                validateStatus={errors.password && touched.password ? "error" : ""}
                help={errors.password && touched.password ? errors.password : ""}
              >
                <Input.Password
                  size="large"
                  prefix={<LockOutlined />}
                  placeholder="Please enter password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={styles.input}
                />
              </Form.Item>

              <div style={styles.formFooter}>
                <Form.Item name="remember" valuePropName="checked">
                  <Checkbox
                    checked={values.remember}
                    onChange={(e) => setFieldValue("remember", e.target.checked)}
                  >
                    Remember me
                  </Checkbox>
                </Form.Item>
                <a style={styles.forgotPassword} href="#">
                  Forgot password?
                </a>
              </div>

              <Form.Item style={{ marginBottom: "0px" }}>
                <Button block="true" type="primary" htmlType="submit" size="large">
                  Log in
                </Button>

                <div style={styles.footer}>
                  <Text style={styles.text}>Don't have an account?</Text>{" "}
                  <Link href="#">Sign up now</Link>
                </div>
              </Form.Item>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
}
