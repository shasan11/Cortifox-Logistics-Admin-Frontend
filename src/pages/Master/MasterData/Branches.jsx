import React from "react";
import * as Yup from "yup";
import { Modal, Button, Input, Form, Select, DatePicker, Typography,Drawer} from 'antd';
import { useFormik } from "formik";
import SingleTonCrud from "../../../components/SingletonCrud";

const { Text } = Typography;
const { Option } = Select;

const BranchFormModal = ({ visible, onCancel, formik, modalTitle }) => (
  <Drawer
    title={modalTitle}
    visible={visible}
    onCancel={onCancel}
    onOk={formik.handleSubmit}
    footer={[
      <Button key="back" onClick={onCancel}>Cancel</Button>,
      <Button key="submit" type="primary" onClick={formik.handleSubmit}>Submit</Button>,
    ]}
  >
    <Form layout="vertical">
      <Form.Item label="Name">
        <Input
          size="large"
          id="name"
          name="name"
          placeholder="Enter branch name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.name && formik.errors.name && <Text type="danger">{formik.errors.name}</Text>}
      </Form.Item>
      <Form.Item label="Address">
        <Input
          size="large"
          id="address"
          name="address"
          placeholder="Enter address"
          value={formik.values.address}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.address && formik.errors.address && <Text type="danger">{formik.errors.address}</Text>}
      </Form.Item>
      <Form.Item label="City">
        <Input
          size="large"
          id="city"
          name="city"
          placeholder="Enter city"
          value={formik.values.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.city && formik.errors.city && <Text type="danger">{formik.errors.city}</Text>}
      </Form.Item>
      <Form.Item label="State">
        <Input
          size="large"
          id="state"
          name="state"
          placeholder="Enter state"
          value={formik.values.state}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.state && formik.errors.state && <Text type="danger">{formik.errors.state}</Text>}
      </Form.Item>
      <Form.Item label="Postal Code">
        <Input
          size="large"
          id="postal_code"
          name="postal_code"
          placeholder="Enter postal code"
          value={formik.values.postal_code}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.postal_code && formik.errors.postal_code && <Text type="danger">{formik.errors.postal_code}</Text>}
      </Form.Item>
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
        {formik.touched.country && formik.errors.country && <Text type="danger">{formik.errors.country}</Text>}
      </Form.Item>
      <Form.Item label="Contact Number">
        <Input
          size="large"
          id="contact_number"
          name="contact_number"
          placeholder="Enter contact number"
          value={formik.values.contact_number}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.contact_number && formik.errors.contact_number && <Text type="danger">{formik.errors.contact_number}</Text>}
      </Form.Item>
      <Form.Item label="Email">
        <Input
          size="large"
          id="email"
          name="email"
          type="email"
          placeholder="Enter email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email && <Text type="danger">{formik.errors.email}</Text>}
      </Form.Item>
      <Form.Item label="Manager Name">
        <Input
          size="large"
          id="manager_name"
          name="manager_name"
          placeholder="Enter manager name"
          value={formik.values.manager_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.manager_name && formik.errors.manager_name && <Text type="danger">{formik.errors.manager_name}</Text>}
      </Form.Item>
      <Form.Item label="Manager Contact">
        <Input
          size="large"
          id="manager_contact"
          name="manager_contact"
          placeholder="Enter manager contact"
          value={formik.values.manager_contact}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.manager_contact && formik.errors.manager_contact && <Text type="danger">{formik.errors.manager_contact}</Text>}
      </Form.Item>
      <Form.Item label="Operational Hours">
        <Input
          size="large"
          id="operational_hours"
          name="operational_hours"
          placeholder="Enter operational hours"
          value={formik.values.operational_hours}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.operational_hours && formik.errors.operational_hours && <Text type="danger">{formik.errors.operational_hours}</Text>}
      </Form.Item>
      <Form.Item label="Status">
        <Select
          size="large"
          id="status"
          name="status"
          placeholder="Select status"
          value={formik.values.status}
          onChange={value => formik.setFieldValue('status', value)}
        >
          <Option value="operational">Operational</Option>
          <Option value="closed">Closed</Option>
          <Option value="under_construction">Under Construction</Option>
        </Select>
        {formik.touched.status && formik.errors.status && <Text type="danger">{formik.errors.status}</Text>}
      </Form.Item>
      <Form.Item label="Established Date">
        <Input
          size="large"
          type="date"
          id="established_date"
          name="established_date"
          placeholder="Select date"
          style={{ width: "100%" }}
          value={formik.values.established_date}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.established_date && formik.errors.established_date && <Text type="danger">{formik.errors.established_date}</Text>}
      </Form.Item>
    </Form>
  </Drawer>
);

const BranchValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  postal_code: Yup.string().required("Postal code is required"),
  country: Yup.string().required("Country is required"),
  contact_number: Yup.string().required("Contact number is required"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  manager_name: Yup.string().required("Manager name is required"),
  manager_contact: Yup.string().required("Manager contact is required"),
  operational_hours: Yup.string().required("Operational hours are required"),
  status: Yup.string().required("Status is required"),
  established_date: Yup.date().nullable().typeError("Invalid date format"),
});

const BranchCRUD = () => {
  const forTitle = "Branch";
  const endpoint = "/master/branch/";
  const modalTitle = "Branch Form";
  const initialFormValues = {
    name: "",
    address: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
    contact_number: "",
    email: "",
    manager_name: "",
    manager_contact: "",
    operational_hours: "",
    status: "operational",
    established_date: null,
  };
  const tableColumns = [
    { headerName: "Name", field: "name", sortable: true, filter: true, flex: 2 },
    { headerName: "City", field: "city", sortable: true, filter: true, flex: 2 },
    { headerName: "State", field: "state", sortable: true, filter: true, flex: 2 },
    { headerName: "Status", field: "status", sortable: true, filter: true, flex: 2,valueGetter:(p)=>{return ( `${p.data.status[0].toUpperCase()}${p.data.status.slice(1)}`) } },
    { headerName: "Established Date", field: "established_date", sortable: true, filter: true, flex: 2 },
  ];
  return (
    <SingleTonCrud
      forTitle={forTitle}
      endpoint={endpoint}
      modalTitle={modalTitle}
      columnDefs={tableColumns}
      formModal={BranchFormModal}
      validationSchema={BranchValidationSchema}
      initialFormValues={initialFormValues}
    />
  );
};

export default BranchCRUD;
