import React from "react";
import * as Yup from "yup";
import { Modal, Button, Input, Form, Typography } from 'antd';
import { useFormik } from "formik";
import SingleTonCrud from "../../../components/SingletonCrud";

const { Text } = Typography;

// Modal Component
const DeliveryTypeModal = ({ visible, onCancel, formik, modalTitle }) => (
  <Modal
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
      {/* Name */}
      <Form.Item label="Name">
        <Input
          size="large"
          id="name"
          name="name"
          placeholder="Enter name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.name && formik.errors.name && <Text type="danger">{formik.errors.name}</Text>}
      </Form.Item>

      {/* Description */}
      <Form.Item label="Description">
        <Input
          size="large"
          id="description"
          name="description"
          placeholder="Enter description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.description && formik.errors.description && <Text type="danger">{formik.errors.description}</Text>}
      </Form.Item>
    </Form>
  </Modal>
);

// Validation Schema
const MasterDataValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
});

// Main Component
const ShipmentSubStatus = () => {
  const forTitle = "Shipment Sub Type";
  const endpoint = "/master/master-data/";
  const modalTitle = "Master Data Form";
  const initialFormValues = {
    type_master: "ShipmenSubType", // Predefined value
    name: "",
    description: "",
  };
  const tableColumns = [
    { headerName: "Name", field: "name", sortable: true, filter: true, flex: 2 },
    { headerName: "Description", field: "description", sortable: true, filter: true, flex: 3 },
  ];
  return (
    <SingleTonCrud
      forTitle={forTitle}
      endpoint={endpoint}
      modalTitle={modalTitle}
      columnDefs={tableColumns}
      filterurl="type_master=ShipmenSubType"
      formModal={DeliveryTypeModal}
      validationSchema={MasterDataValidationSchema}
      initialFormValues={initialFormValues}
    />
  );
};

export default ShipmentSubStatus;
