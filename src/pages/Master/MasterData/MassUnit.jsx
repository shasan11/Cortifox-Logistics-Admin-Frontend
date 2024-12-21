import React from "react";
import * as Yup from "yup";
import { Modal, Button, Input, Form, Typography } from 'antd';
import { useFormik } from "formik";
import SingleTonCrud from "../../../components/SingletonCrud";
const { Text } = Typography;

const UnitOfMeasurementFormModal = ({ visible, onCancel, formik, modalTitle }) => (
  <Modal title={modalTitle} visible={visible} onCancel={onCancel} onOk={formik.handleSubmit} footer={[
    <Button key="back" onClick={onCancel}>Cancel</Button>,
    <Button key="submit" type="primary" onClick={formik.handleSubmit}>Submit</Button>,
  ]}>
    <Form layout="vertical">
      <Form.Item label="Name">
        <Input size="large" id="name" name="name" placeholder="Enter unit name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {formik.touched.name && formik.errors.name && <Text type="danger">{formik.errors.name}</Text>}
      </Form.Item>
      <Form.Item label="Symbol">
        <Input size="large" id="symbol" name="symbol" placeholder="Enter symbol" value={formik.values.symbol} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {formik.touched.symbol && formik.errors.symbol && <Text type="danger">{formik.errors.symbol}</Text>}
      </Form.Item>
      <Form.Item label="Conversion to KG">
        <Input size="large" id="conversion_to_kg" name="conversion_to_kg" type="number" placeholder="Enter conversion rate to KG" value={formik.values.conversion_to_kg} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {formik.touched.conversion_to_kg && formik.errors.conversion_to_kg && <Text type="danger">{formik.errors.conversion_to_kg}</Text>}
      </Form.Item>
    </Form>
  </Modal>
);

const UnitOfMeasurementValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  symbol: Yup.string().required("Symbol is required"),
  conversion_to_kg: Yup.number().nullable().typeError("Conversion to KG must be a number"),
});

const MassUnit = () => {
  const forTitle = "Unit of Measurement", endpoint = "/master/unit-of-measurement/", modalTitle = "Unit of Measurement Form", initialFormValues = {
    name: "", symbol: "", conversion_to_kg: null,
  };
  const tableColumns = [
    { headerName: "Name", field: "name", sortable: true, filter: true, flex: 2 },
    { headerName: "Symbol", field: "symbol", sortable: true, filter: true, flex: 2 },
    { headerName: "Conversion to KG", field: "conversion_to_kg", sortable: true, filter: true, flex: 2 },
  ];
  return (
    <SingleTonCrud forTitle={forTitle} endpoint={endpoint} modalTitle={modalTitle} columnDefs={tableColumns} formModal={UnitOfMeasurementFormModal} validationSchema={UnitOfMeasurementValidationSchema} initialFormValues={initialFormValues} />
  );
};

export default MassUnit;
