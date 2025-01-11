import React from "react";
import * as Yup from "yup";
import { Modal, Button, Input, Form, Typography, Select, Row, Col, Upload, Checkbox,Drawer } from "antd";
import { useFormik } from "formik";
import SingleTonCrud from "../../components/SingletonCrud";

const { Text } = Typography;
const { Option } = Select;

const VendorFormModal = ({ visible, onCancel, formik, modalTitle }) => (
  <Drawer
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
      <Form.Item label="Image">
        <Upload
          name="image"
          listType="picture-card"
          beforeUpload={() => false}
          onChange={(info) => formik.setFieldValue("image", info.file)}
        >
          {formik.values.image ? null : "Upload"}
        </Upload>
      </Form.Item>
      <Form.Item label="Vendor Class">
        <Input
          size="large"
          id="vendor_class"
          name="vendor_class"
          placeholder="Vendor Class"
          value={formik.values.vendor_class}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.vendor_class && formik.errors.vendor_class && (
          <Text type="danger">{formik.errors.vendor_class}</Text>
        )}
      </Form.Item>
      <Form.Item label="Type">
        <Select
          size="large"
          id="type"
          name="type"
          placeholder="Select Type"
          value={formik.values.type}
          onChange={(value) => formik.setFieldValue("type", value)}
          onBlur={formik.handleBlur}
        >
          <Option value="individual">Individual</Option>
          <Option value="organization">Organization</Option>
        </Select>
        {formik.touched.type && formik.errors.type && (
          <Text type="danger">{formik.errors.type}</Text>
        )}
      </Form.Item>
      <Form.Item label="Name">
        <Input
          size="large"
          id="name"
          name="name"
          placeholder="Enter Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.name && formik.errors.name && (
          <Text type="danger">{formik.errors.name}</Text>
        )}
      </Form.Item>
      <Form.Item label="Phone Number">
        <Row gutter={16}>
          <Col span={8}>
            <Input
              size="large"
              id="country_code"
              name="country_code"
              placeholder="Country Code"
              value={formik.values.country_code}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.country_code && formik.errors.country_code && (
              <Text type="danger">{formik.errors.country_code}</Text>
            )}
          </Col>
          <Col span={16}>
            <Input
              size="large"
              id="phone"
              name="phone"
              placeholder="Phone Number"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.phone && formik.errors.phone && (
              <Text type="danger">{formik.errors.phone}</Text>
            )}
          </Col>
        </Row>
      </Form.Item>
      <Form.Item label="Email">
        <Input
          size="large"
          id="email"
          name="email"
          placeholder="Enter Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email && (
          <Text type="danger">{formik.errors.email}</Text>
        )}
      </Form.Item>
      <Form.Item label="Country">
        <Input
          size="large"
          id="country"
          name="country"
          placeholder="Enter Country"
          value={formik.values.country}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.country && formik.errors.country && (
          <Text type="danger">{formik.errors.country}</Text>
        )}
      </Form.Item>
      <Form.Item label="State">
        <Input
          size="large"
          id="state"
          name="state"
          placeholder="Enter State"
          value={formik.values.state}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.state && formik.errors.state && (
          <Text type="danger">{formik.errors.state}</Text>
        )}
      </Form.Item>
      <Form.Item label="Account Number">
        <Input
          size="large"
          id="acc_no"
          name="acc_no"
          placeholder="Enter Account Number"
          value={formik.values.acc_no}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.acc_no && formik.errors.acc_no && (
          <Text type="danger">{formik.errors.acc_no}</Text>
        )}
      </Form.Item>
      <Form.Item label="Address">
        <Input
          size="large"
          id="address"
          name="address"
          placeholder="Enter Address"
          value={formik.values.address}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.address && formik.errors.address && (
          <Text type="danger">{formik.errors.address}</Text>
        )}
      </Form.Item>
      <Form.Item label="Credit Limit">
        <Input
          size="large"
          id="credit_limit"
          name="credit_limit"
          placeholder="Enter Credit Limit"
          value={formik.values.credit_limit}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.credit_limit && formik.errors.credit_limit && (
          <Text type="danger">{formik.errors.credit_limit}</Text>
        )}
      </Form.Item>
      <Form.Item label="Number of Days">
        <Input
          size="large"
          id="no_of_days"
          name="no_of_days"
          placeholder="Enter Number of Days"
          value={formik.values.no_of_days}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.no_of_days && formik.errors.no_of_days && (
          <Text type="danger">{formik.errors.no_of_days}</Text>
        )}
      </Form.Item>
      <Form.Item label="Bank Info">
        <Input
          size="large"
          id="bank_info"
          name="bank_info"
          placeholder="Enter Bank Info"
          value={formik.values.bank_info}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.bank_info && formik.errors.bank_info && (
          <Text type="danger">{formik.errors.bank_info}</Text>
        )}
      </Form.Item>
      <Form.Item label="Account Head">
        <Select
          size="large"
          id="account_head"
          name="account_head"
          placeholder="Select Account Head"
          value={formik.values.account_head}
          onChange={(value) => formik.setFieldValue("account_head", value)}
          onBlur={formik.handleBlur}
        >
          {/* Add account head options here */}
        </Select>
        {formik.touched.account_head && formik.errors.account_head && (
          <Text type="danger">{formik.errors.account_head}</Text>
        )}
      </Form.Item>
    </Form>
  </Drawer>
);

const VendorValidationSchema = Yup.object().shape({
  vendor_class: Yup.string().required("Vendor Class is required"),
  type: Yup.string().required("Type is required"),
  name: Yup.string().required("Name is required"),
  country_code: Yup.string().required("Country Code is required"),
  phone: Yup.string().required("Phone Number is required"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  country: Yup.string().required("Country is required"),
  state: Yup.string().required("State is required"),
  acc_no: Yup.string().required("Account Number is required"),
  address: Yup.string().required("Address is required"),
  credit_limit: Yup.number().nullable().typeError("Credit Limit must be a number"),
  no_of_days: Yup.number().nullable().typeError("Number of Days must be a number"),
  bank_info: Yup.string().required("Bank Info is required"),
  account_head: Yup.string().required("Account Head is required"),
});

const Vendor = () => {
  const forTitle = "Vendor",
    endpoint = "/parties/vendors/",
    modalTitle = "Manage Vendor",
    initialFormValues = {
      image: null,
      vendor_class: "",
      type: "",
      name: "",
      country_code: "",
      phone: "",
      email: "",
      country: "",
      state: "",
      acc_no: "",
      address: "",
      credit_limit: null,
      no_of_days: null,
      bank_info: "",
      account_head: "",
    };
  const tableColumns = [
    { headerName: "Vendor Class", field: "vendor_class", sortable: true, filter: true, flex: 2 },
    { headerName: "Type", field: "type", sortable: true, filter: true, flex: 2 },
    { headerName: "Name", field: "name", sortable: true, filter: true, flex: 2 },
    { headerName: "Phone", field: "phone", sortable: true, filter: true, flex: 2 },
    { headerName: "Email", field: "email", sortable: true, filter: true, flex: 2 },
    { headerName: "Country", field: "country", sortable: true, filter: true, flex: 2 },
    { headerName: "State", field: "state", sortable: true, filter: true, flex: 2 },
    
  ];

  return (
    <SingleTonCrud
      forTitle={forTitle}
      endpoint={endpoint}
      filterurl="vendor_class=Vendor"
      modalTitle={modalTitle}
      columnDefs={tableColumns}
      formModal={VendorFormModal}
      validationSchema={VendorValidationSchema}
      initialFormValues={initialFormValues}
    />
  );
};

export default Vendor;
