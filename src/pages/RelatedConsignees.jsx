import React from "react";
import * as Yup from "yup";
import { Modal, Button, Input, Form, Typography, Row, Col } from "antd";
import { useFormik } from "formik";
import SingleTonCrud from "../components/SingletonCrud";
import useFetchApiData from "../helper/other/fetchData";

const { Text } = Typography;

// Consignee Form Modal Component
const ConsigneeFormModal = ({ visible, onCancel, formik, modalTitle }) => {
  return (
    <Modal
      title={modalTitle}
      visible={visible}
      onCancel={onCancel}
      onOk={formik.handleSubmit}
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={formik.handleSubmit}>
          Submit
        </Button>,
      ]}
    >
      <Form layout="vertical">
        {/* Address */}
        <Form.Item label="Address">
          <Input
            size="large"
            id="address"
            name="address"
            placeholder="Enter consignee address"
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.address && formik.errors.address && (
            <Text type="danger">{formik.errors.address}</Text>
          )}
        </Form.Item>

        <Row gutter={16}>
          {/* Consignor Name */}
          <Col span={12}>
            <Form.Item label="Consignor Name">
              <Input
                size="large"
                id="consignor_name"
                name="consignor_name"
                placeholder="Enter consignor name"
                value={formik.values.consignor_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.consignor_name && formik.errors.consignor_name && (
                <Text type="danger">{formik.errors.consignor_name}</Text>
              )}
            </Form.Item>
          </Col>

          {/* Consigner Phone */}
          <Col span={12}>
            <Form.Item label="Consigner Phone">
              <Input
                size="large"
                id="consigner_phone"
                name="consigner_phone"
                placeholder="Enter consignor phone"
                value={formik.values.consigner_phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.consigner_phone && formik.errors.consigner_phone && (
                <Text type="danger">{formik.errors.consigner_phone}</Text>
              )}
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          {/* Consigner Email */}
          <Col span={12}>
            <Form.Item label="Consigner Email">
              <Input
                size="large"
                id="consigner_email"
                name="consigner_email"
                placeholder="Enter consignor email"
                value={formik.values.consigner_email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.consigner_email && formik.errors.consigner_email && (
                <Text type="danger">{formik.errors.consigner_email}</Text>
              )}
            </Form.Item>
          </Col>

          {/* Remarks */}
          <Col span={12}>
            <Form.Item label="Remarks">
              <Input
                size="large"
                id="remarks"
                name="remarks"
                placeholder="Enter any remarks"
                value={formik.values.remarks}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.remarks && formik.errors.remarks && (
                <Text type="danger">{formik.errors.remarks}</Text>
              )}
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          {/* Province */}
          <Col span={12}>
            <Form.Item label="Province">
              <Input
                size="large"
                id="province"
                name="province"
                placeholder="Enter province"
                value={formik.values.province}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.province && formik.errors.province && (
                <Text type="danger">{formik.errors.province}</Text>
              )}
            </Form.Item>
          </Col>

          {/* Country */}
          <Col span={12}>
            <Form.Item label="Country">
              <Input
                size="large"
                id="country"
                name="country"
                placeholder="Enter country"
                value={formik.values.country}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.country && formik.errors.country && (
                <Text type="danger">{formik.errors.country}</Text>
              )}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

// Validation Schema
const ConsigneeValidationSchema = Yup.object().shape({
  address: Yup.string().required("Address is required"),
  consignor_name: Yup.string().required("Consignor name is required"),
  consigner_phone: Yup.string().required("Consigner phone is required"),
  consigner_email: Yup.string().email("Invalid email").required("Consigner email is required"),
  remarks: Yup.string(),
  province: Yup.string().required("Province is required"),
  country: Yup.string().required("Country is required"),
});

// Consignees Component
const Consignees = ({id}) => {
  const forTitle = "Consignees";
  const endpoint = "/consignees/consignees";
  const modalTitle = "Consignee Form";
  const initialFormValues = {
    address: "",
    consignor_name: "",
    consigner_phone: "",
    consigner_email: "",
    remarks: "",
    province: "",
    country: "",
    client:id,
  };

  const tableColumns = [
    { headerName: "Address", field: "address", sortable: true, flex: 2 },
    { headerName: "Consignor Name", field: "consignor_name", flex: 2 },
    { headerName: "Phone", field: "consigner_phone", flex: 1 },
    { headerName: "Email", field: "consigner_email", flex: 2 },
  ];

  return (
    <SingleTonCrud
      forTitle={forTitle}
      endpoint={endpoint}
      modalTitle={modalTitle}
      filterurl={"client="+id}
      columnDefs={tableColumns}
      formModal={ConsigneeFormModal}
      validationSchema={ConsigneeValidationSchema}
      initialFormValues={initialFormValues}
    />
  );
};

export default Consignees;
