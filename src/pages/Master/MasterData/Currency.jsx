import React from "react";
import * as Yup from "yup";
import { Modal, Button, Input, Form, Typography, Switch } from 'antd';
import { useFormik } from "formik";
import SingleTonCrud from "../../../components/SingletonCrud";

const { Text } = Typography;

// Modal Component
const CurrencyFormModal = ({ visible, onCancel, formik, modalTitle }) => (
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
          placeholder="Enter currency name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.name && formik.errors.name && <Text type="danger">{formik.errors.name}</Text>}
      </Form.Item>

      {/* Symbol */}
      <Form.Item label="Symbol">
        <Input
          size="large"
          id="symbol"
          name="symbol"
          placeholder="Enter currency symbol"
          value={formik.values.symbol}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.symbol && formik.errors.symbol && <Text type="danger">{formik.errors.symbol}</Text>}
      </Form.Item>

      {/* Decimal Places */}
      <Form.Item label="Decimal Places">
        <Input
          size="large"
          id="decimal_places"
          name="decimal_places"
          type="number"
          placeholder="Enter number of decimal places"
          value={formik.values.decimal_places}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.decimal_places && formik.errors.decimal_places && <Text type="danger">{formik.errors.decimal_places}</Text>}
      </Form.Item>

      {/* Is Default */}
      <Form.Item label="Default Currency">
        <Switch
          id="is_default"
          name="is_default"
          checked={formik.values.is_default}
          onChange={(checked) => formik.setFieldValue("is_default", checked)}
        />
        {formik.touched.is_default && formik.errors.is_default && <Text type="danger">{formik.errors.is_default}</Text>}
      </Form.Item>
    </Form>
  </Modal>
);

// Validation Schema
const CurrencyValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  symbol: Yup.string().required("Symbol is required"),
  decimal_places: Yup.number().nullable().typeError("Decimal Places must be a number"),
  is_default: Yup.boolean(),
});

// Main Component
const CurrencyManagement = () => {
  const forTitle = "Currency";
  const endpoint = "/general-accounting/currency/";
  const modalTitle = "Currency Form";
  const initialFormValues = {
    name: "",
    symbol: "",
    decimal_places: null,
    is_default: false,
  };
  const tableColumns = [
    { headerName: "Name", field: "name", sortable: true, filter: true, flex: 2 },
    { headerName: "Symbol", field: "symbol", sortable: true, filter: true, flex: 1 },
    { headerName: "Decimal Places", field: "decimal_places", sortable: true, filter: true, flex: 1 },
    { headerName: "Default", field: "is_default", sortable: true, filter: true, flex: 1, valueFormatter: ({ value }) => (value ? "Yes" : "No") },
  ];
  return (
    <SingleTonCrud
      forTitle={forTitle}
      endpoint={endpoint}
      modalTitle={modalTitle}
      columnDefs={tableColumns}
      formModal={CurrencyFormModal}
      validationSchema={CurrencyValidationSchema}
      initialFormValues={initialFormValues}
    />
  );
};

export default CurrencyManagement;
