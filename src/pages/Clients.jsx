import React from "react";
import * as Yup from "yup";
import { Modal, Button, Input, Select, Form, Typography } from "antd";
import { useFormik } from "formik";
import SingleTonCrud from "../components/SingletonCrud";
import useFetchApiData from "../helper/other/fetchData";

const { Option } = Select;
const { Text } = Typography;

// Clients Form Modal Component
const ClientFormModal = ({ visible, onCancel, formik, modalTitle }) => {
  const contactOptions = useFetchApiData("/crm/contacts/");
  const currency = useFetchApiData("general-accounting/currency/");

  return (
    <Modal
      title={modalTitle}
      visible={visible}
      onCancel={onCancel}
      onOk={formik.handleSubmit}
      width={`100%`}
      style={{ top: "0", left: 0 }}
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={formik.handleSubmit}>
          Submit
        </Button>,
      ]}
    >
      <Form layout="vertical" className="row">
        {/* Name */}
        <div className="col-lg-6">
          <Form.Item label="Name">
            <Input
              size="large"
              id="name"
              name="name"
              placeholder="Enter client name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && (
              <Text type="danger">{formik.errors.name}</Text>
            )}
          </Form.Item>
        </div>

        <div className="col-lg-6">
          <Form.Item label="Type">
            <Select
              size="large"
              id="type"
              name="type"
              placeholder="Select client type"
              value={formik.values.type}
              onChange={(value) => formik.setFieldValue("type", value)}
              allowClear
            >
              <Option value="Individual">Individual</Option>
              <Option value="Company">Company</Option>
            </Select>
            {formik.touched.type && formik.errors.type && (
              <Text type="danger">{formik.errors.type}</Text>
            )}
          </Form.Item>
        </div>

        <div className="col-lg-6">
          <Form.Item label="Contact Person">
            <Input
              size="large"
              id="contact_person"
              name="contact_person"
              placeholder="Enter contact person name"
              value={formik.values.contact_person}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.contact_person && formik.errors.contact_person && (
              <Text type="danger">{formik.errors.contact_person}</Text>
            )}
          </Form.Item>
        </div>

        <div className="col-lg-6">
          <Form.Item label="Phone">
            <Input
              size="large"
              id="phone"
              name="phone"
              placeholder="Enter phone number"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.phone && formik.errors.phone && (
              <Text type="danger">{formik.errors.phone}</Text>
            )}
          </Form.Item>
        </div>

        <div className="col-lg-6">
          <Form.Item label="Email">
            <Input
              size="large"
              id="email"
              name="email"
              placeholder="Enter email address"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <Text type="danger">{formik.errors.email}</Text>
            )}
          </Form.Item>
        </div>

        <div className="col-lg-6">
          <Form.Item label="Address Line 1">
            <Input
              size="large"
              id="address1"
              name="address1"
              placeholder="Enter address line 1"
              value={formik.values.address1}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.address1 && formik.errors.address1 && (
              <Text type="danger">{formik.errors.address1}</Text>
            )}
          </Form.Item>
        </div>

        <div className="col-lg-6">
          <Form.Item label="Address Line 2">
            <Input
              size="large"
              id="address2"
              name="address2"
              placeholder="Enter address line 2"
              value={formik.values.address2}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.address2 && formik.errors.address2 && (
              <Text type="danger">{formik.errors.address2}</Text>
            )}
          </Form.Item>
        </div>

        <div className="col-lg-6">
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
        </div>

        <div className="col-lg-6">
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
        </div>

        <div className="col-lg-6">
          <Form.Item label="Payment Terms">
            <Input
              size="large"
              id="payment_terms"
              name="payment_terms"
              placeholder="Enter payment terms"
              value={formik.values.payment_terms}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.payment_terms && formik.errors.payment_terms && (
              <Text type="danger">{formik.errors.payment_terms}</Text>
            )}
          </Form.Item>
        </div>

        <div className="col-lg-6">
          <Form.Item label="Currency">
            <Input
              size="large"
              id="currency"
              name="currency"
              placeholder="Enter currency"
              value={formik.values.currency}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.currency && formik.errors.currency && (
              <Text type="danger">{formik.errors.currency}</Text>
            )}
          </Form.Item>
        </div>

        <div className="col-lg-6">
          <Form.Item label="Contacts (Optional)">
            <Select
              size="large"
              id="contact"
              name="contact"
              mode="multiple"
              placeholder="Select contacts"
              value={formik.values.contact}
              onChange={(value) => formik.setFieldValue("contact", value)}
              allowClear
            >
              {contactOptions?.map((contact) => (
                <Option value={contact.id} key={contact.id}>
                  {contact.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

// Validation Schema
const ClientValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  type: Yup.string().required("Type is required"),
  contact_person: Yup.string().required("Contact person is required"),
  phone: Yup.string().required("Phone is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  address1: Yup.string().required("Address Line 1 is required"),
  address2: Yup.string(),
  province: Yup.string().required("Province is required"),
  country: Yup.string().required("Country is required"),
  payment_terms: Yup.string().nullable(),
  currency: Yup.string().nullable(),
  contact: Yup.array().nullable(),
});

// Clients Component
const Clients = () => {
  const forTitle = "Clients";
  const endpoint = "/clients/clients";
  const modalTitle = "Client Form";
  const initialFormValues = {
    name: "",
    type: "",
    contact_person: "",
    phone: "",
    email: "",
    address1: "",
    address2: "",
    province: "",
    country: "",
    payment_terms: null,
    currency: null,
    contact: [],
  };

  const tableColumns = [
    { headerName: "Name", field: "name", sortable: true, flex: 2 },
    { headerName: "Type", field: "type", sortable: true, flex: 1 },
    { headerName: "Contact Person", field: "contact_person", flex: 2 },
    { headerName: "Email", field: "email", sortable: true, flex: 2 },
  ];

  return (
    <SingleTonCrud
      forTitle={forTitle}
      endpoint={endpoint}
      modalTitle={modalTitle}
      columnDefs={tableColumns}
      formModal={ClientFormModal}
      validationSchema={ClientValidationSchema}
      initialFormValues={initialFormValues}
    />
  );
};

export default Clients;
