import React from "react";
import { Form, Input, Button, Row, Col, DatePicker, Upload, message, Typography,Breadcrumb } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Formik, Field, Form as FormikForm } from "formik";
import * as Yup from "yup";
import axios from "axios";
import useFetchApiData from "../../helper/other/fetchData";

const { Title } = Typography;

const ApplicationSettings = () => {
  const initialValues = useFetchApiData("/master/application-settings/")[0];

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Company name is required"),
    country: Yup.string().required("Country is required"),
    state: Yup.string().required("State is required"),
    address: Yup.string().required("Address is required"),
    bank_details: Yup.string().required("Bank details are required"),
    accounting_details: Yup.string().required("Accounting details are required"),
    financial_period_start: Yup.date().required("Start date is required"),
    financial_period_end: Yup.date().required("End date is required"),
    phone: Yup.string().required("Phone number is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    PAN: Yup.string().required("PAN is required"),
  });

  const handleSubmit = (values) => {
    console.log(values);
    delete values.logo
    axios
      .patch(
        import.meta.env.VITE_APP_BACKEND_URL + `/master/application-settings/${initialValues.id}/`,
        values
      )
      .then(() => {
        message.success("Settings updated successfully");
      })
      .catch((error) => {
        console.error("Error updating settings:", error);
        message.error("Failed to update settings");
      });
  };

  if (!initialValues) {
    return <p>Loading...</p>;
  }

  return (
    <>
     <Row
        justify="space-between"
        align="middle"
        wrap
        style={{
          background: "#fafafa",
          borderBottom: "1px solid #d9d9d9",
          padding: "15px 25px",
        }}
      >
        <Title level={4} style={{ margin: 0 }}>
          General Settings
        </Title>

        <Breadcrumb separator="-">
          <Breadcrumb.Item>Application</Breadcrumb.Item>
          <Breadcrumb.Item>General Settings</Breadcrumb.Item>
        </Breadcrumb>
      </Row>
    
    <div style={{ padding: "20px", backgroundColor: "white", borderRadius: "0px" }}>
     
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, setFieldValue }) => (
          <FormikForm>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item layout="vertical"
                  label="Company Name"
                  validateStatus={errors.name && touched.name ? "error" : ""}
                  help={errors.name && touched.name ? errors.name : null}
                >
                  <Field name="name" as={Input} />
                </Form.Item>
              </Col>
              
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item layout="vertical"
                  label="Country"
                  validateStatus={errors.country && touched.country ? "error" : ""}
                  help={errors.country && touched.country ? errors.country : null}
                >
                  <Field name="country" as={Input} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item layout="vertical"
                  label="State"
                  validateStatus={errors.state && touched.state ? "error" : ""}
                  help={errors.state && touched.state ? errors.state : null}
                >
                  <Field name="state" as={Input} />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item layout="vertical"
              label="Address"
              validateStatus={errors.address && touched.address ? "error" : ""}
              help={errors.address && touched.address ? errors.address : null}
            >
              <Field name="address" as={Input.TextArea} rows={2} />
            </Form.Item>

            <Form.Item layout="vertical"
              label="Bank Details"
              validateStatus={errors.bank_details && touched.bank_details ? "error" : ""}
              help={errors.bank_details && touched.bank_details ? errors.bank_details : null}
            >
              <Field name="bank_details" as={Input.TextArea} rows={2} />
            </Form.Item>

            <Form.Item layout="vertical"
              label="Accounting Details"
              validateStatus={errors.accounting_details && touched.accounting_details ? "error" : ""}
              help={errors.accounting_details && touched.accounting_details ? errors.accounting_details : null}
            >
              <Field name="accounting_details" as={Input.TextArea} rows={2} />
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item layout="vertical"
                  label="Financial Period Start"
                  validateStatus={
                    errors.financial_period_start && touched.financial_period_start ? "error" : ""
                  }
                  help={
                    errors.financial_period_start && touched.financial_period_start
                      ? errors.financial_period_start
                      : null
                  }
                >
                  <DatePicker
                    style={{ width: "100%" }}
                    onChange={(date, dateString) =>
                      setFieldValue("financial_period_start", dateString)
                    }
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item layout="vertical"
                  label="Financial Period End"
                  validateStatus={
                    errors.financial_period_end && touched.financial_period_end ? "error" : ""
                  }
                  help={
                    errors.financial_period_end && touched.financial_period_end
                      ? errors.financial_period_end
                      : null
                  }
                >
                  <DatePicker
                    style={{ width: "100%" }}
                    onChange={(date, dateString) =>
                      setFieldValue("financial_period_end", dateString)
                    }
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item layout="vertical"
                  label="Phone"
                  validateStatus={errors.phone && touched.phone ? "error" : ""}
                  help={errors.phone && touched.phone ? errors.phone : null}
                >
                  <Field name="phone" as={Input} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item layout="vertical"
                  label="Email"
                  validateStatus={errors.email && touched.email ? "error" : ""}
                  help={errors.email && touched.email ? errors.email : null}
                >
                  <Field name="email" as={Input} />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item layout="vertical"
              label="PAN"
              validateStatus={errors.PAN && touched.PAN ? "error" : ""}
              help={errors.PAN && touched.PAN ? errors.PAN : null}
            >
              <Field name="PAN" as={Input} />
            </Form.Item>

            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <Button type="primary" htmlType="submit">
                Update Settings
              </Button>
            </div>
          </FormikForm>
        )}
      </Formik>
    </div>
    </>
  );
};

export default ApplicationSettings;
