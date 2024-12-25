import React from "react";
import * as Yup from "yup";
import { Modal, Button, Input, Select, Form, Typography, Switch,Drawer } from 'antd';
import { useFormik } from "formik";
import SingleTonCrud from "../../../components/SingletonCrud";

const { Option } = Select;
const { Text } = Typography;

// Port Form Modal component
const PortFormModal = ({ visible, onCancel, formik, modalTitle }) => {
  return (
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
        {/* Name */}
        <Form.Item label="Name">
          <Input
            size="large"
            id="name"
            name="name"
            placeholder="Enter port name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name && (
            <Text type="danger">{formik.errors.name}</Text>
          )}
        </Form.Item>

        {/* Symbol */}
        <Form.Item label="Symbol">
          <Input
            size="large"
            id="symbol"
            name="symbol"
            placeholder="Enter symbol"
            value={formik.values.symbol}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.symbol && formik.errors.symbol && (
            <Text type="danger">{formik.errors.symbol}</Text>
          )}
        </Form.Item>

        {/* Active Status */}
        <Form.Item label="Active Status">
          <Switch
            id="active_status"
            name="active_status"
            checked={formik.values.active_status}
            onChange={(checked) => formik.setFieldValue("active_status", checked)}
          />
        </Form.Item>

        {/* ISO */}
        <Form.Item label="ISO">
          <Input
            size="large"
            id="iso"
            name="iso"
            placeholder="Enter ISO code"
            value={formik.values.iso}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>

        {/* IATA */}
        <Form.Item label="IATA">
          <Input
            size="large"
            id="iata"
            name="iata"
            placeholder="Enter IATA code"
            value={formik.values.iata}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>

        {/* EDI */}
        <Form.Item label="EDI">
          <Input
            size="large"
            id="edi"
            name="edi"
            placeholder="Enter EDI code"
            value={formik.values.edi}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>

        {/* Country */}
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
        </Form.Item>

        {/* Region */}
        <Form.Item label="Region">
          <Input
            size="large"
            id="region"
            name="region"
            placeholder="Enter region"
            value={formik.values.region}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>

        {/* City */}
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
        </Form.Item>

        {/* Flags */}
        <Form.Item label="Is Land">
          <Switch
            id="is_land"
            name="is_land"
            checked={formik.values.is_land}
            onChange={(checked) => formik.setFieldValue("is_land", checked)}
          />
        </Form.Item>
        <Form.Item label="Is Air">
          <Switch
            id="is_air"
            name="is_air"
            checked={formik.values.is_air}
            onChange={(checked) => formik.setFieldValue("is_air", checked)}
          />
        </Form.Item>
        <Form.Item label="Is Sea">
          <Switch
            id="is_sea"
            name="is_sea"
            checked={formik.values.is_sea}
            onChange={(checked) => formik.setFieldValue("is_sea", checked)}
          />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

// Validation schema using Yup
const PortValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  symbol: Yup.string().required("Symbol is required"),
  active_status: Yup.boolean(),
  iso: Yup.string(),
  iata: Yup.string(),
  edi: Yup.string(),
  country: Yup.string(),
  region: Yup.string(),
  city: Yup.string(),
  is_land: Yup.boolean(),
  is_air: Yup.boolean(),
  is_sea: Yup.boolean(),
});

const Port = () => {
  const forTitle = "Ports";
  const endpoint = "/master/ports/";
  const modalTitle = "Port Form";
  const initialFormValues = {
    name: "",
    symbol: "",
    active_status: false,
    iso: "",
    iata: "",
    edi: "",
    country: "",
    region: "",
    city: "",
    is_land: false,
    is_air: false,
    is_sea: false,
  };

  const tableColumns = [
    { headerName: "Name", field: "name", sortable: true, flex: 2,checkboxSelection:true,headerCheckboxSelection:true },
    { headerName: "Symbol", field: "symbol", sortable: true, flex: 2 },
    { headerName: "Country", field: "country", sortable: true, filter: true, flex: 2 },
    { headerName: "Region", field: "region", sortable: true, filter: true, flex: 2 },
    { headerName: "City", field: "city", sortable: true, filter: true, flex: 2 },
  ];

  return (
    <SingleTonCrud
      forTitle={forTitle}
      endpoint={endpoint}
      modalTitle={modalTitle}
      columnDefs={tableColumns}
      formModal={PortFormModal}
      validationSchema={PortValidationSchema}
      initialFormValues={initialFormValues}
    />
  );
};

export default Port;
