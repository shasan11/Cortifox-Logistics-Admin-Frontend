import React from "react";
import * as Yup from "yup";
import { Modal, Button, Input, Form, Typography, Upload } from 'antd';
import { useFormik } from "formik";
import SingleTonCrud from "../../../components/SingletonCrud";
import { UploadOutlined } from '@ant-design/icons';

const { Text } = Typography;

// Modal Component
const DocumentFormModal = ({ visible, onCancel, formik, modalTitle }) => (
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
    <Form layout="vertical" encType="multipart/form-data">
      {/* Document Name */}
      <Form.Item label="Document Name">
        <Input
          size="large"
          id="document_name"
          name="document_name"
          placeholder="Enter document name"
          value={formik.values.document_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.document_name && formik.errors.document_name && (
          <Text type="danger">{formik.errors.document_name}</Text>
        )}
      </Form.Item>

      {/* Document Number */}
      <Form.Item label="Document Number">
        <Input
          size="large"
          id="document_no"
          name="document_no"
          placeholder="Enter document number"
          value={formik.values.document_no}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.document_no && formik.errors.document_no && (
          <Text type="danger">{formik.errors.document_no}</Text>
        )}
      </Form.Item>

      {/* File */}
      <Form.Item label="File">
      <Input
          size="large"
          type="file"
          id="file"
          name="file"
          placeholder="Enter document number"
          value={formik.values.file}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.file && formik.errors.file && (
          <Text type="danger">{formik.errors.file}</Text>
        )}
      </Form.Item>

      {/* Description */}
      <Form.Item label="Description">
        <Input.TextArea
          size="large"
          id="description"
          name="description"
          placeholder="Enter description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          rows={4}
        />
        {formik.touched.description && formik.errors.description && (
          <Text type="danger">{formik.errors.description}</Text>
        )}
      </Form.Item>
    </Form>
  </Modal>
);

// Validation Schema
const DocumentValidationSchema = Yup.object().shape({
  document_name: Yup.string().required("Document name is required"),
  document_no: Yup.string().required("Document number is required"),
  file: Yup.mixed().required("File is required"),
  description: Yup.string().nullable(),
});

// Main Component
const DocumentManagement = ({shipment_id}) => {
  const forTitle = "Document";
  const endpoint = "/shipments/documents/";
  const modalTitle = "Document Form";
  const initialFormValues = {
    shipment:shipment_id,
    document_name: "",
    document_no: "",
    file: null,
    description: "",
  };
  const tableColumns = [
    { headerName: "Document Name", field: "document_name", sortable: true, filter: true, flex: 2 },
    { headerName: "Document Number", field: "document_no", sortable: true, filter: true, flex: 1 },
    { headerName: "Description", field: "description", sortable: false, filter: true, flex: 2 },
  ];
  return (
    <SingleTonCrud
      forTitle={forTitle}
      endpoint={endpoint}
      modalTitle={modalTitle}
      columnDefs={tableColumns}
       filterurl={`shipment=${shipment_id}`}
      formModal={DocumentFormModal}
      validationSchema={DocumentValidationSchema}
      initialFormValues={initialFormValues}
    />
  );
};

export default DocumentManagement;
