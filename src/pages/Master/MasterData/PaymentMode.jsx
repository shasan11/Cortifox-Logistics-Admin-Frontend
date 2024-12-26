import React from "react";
import * as Yup from "yup";
import { Modal, Button, Input, Form, Typography } from "antd";
import { useFormik } from "formik";
import SingleTonCrud from "../../../components/SingletonCrud";

const { Text } = Typography;

const PaymentMethodFormModal = ({ visible, onCancel, formik, modalTitle }) => (
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
      <Form.Item label="Name">
        <Input
          size="large"
          id="name"
          name="name"
          placeholder="Enter payment method name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.name && formik.errors.name && (
          <Text type="danger">{formik.errors.name}</Text>
        )}
      </Form.Item>
      <Form.Item label="Description">
        <Input.TextArea
          id="description"
          name="description"
          placeholder="Enter description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.description && formik.errors.description && (
          <Text type="danger">{formik.errors.description}</Text>
        )}
      </Form.Item>
      <Form.Item label="Commission">
        <Input
          size="large"
          id="commission"
          name="commission"
          type="number"
          placeholder="Enter commission percentage"
          value={formik.values.commission}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.commission && formik.errors.commission && (
          <Text type="danger">{formik.errors.commission}</Text>
        )}
      </Form.Item>
    </Form>
  </Modal>
);

const PaymentMethodValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().nullable(),
  commission: Yup.number()
    .nullable()
    .typeError("Commission must be a number"),
});

const PaymentMethod = () => {
  const forTitle = "Payment Method";
  const endpoint = "/general-accounting/paymentmethods/";
  const modalTitle = "Payment Method Form";
  const initialFormValues = {
    name: "",
    description: "",
    commission: null,
  };

  const tableColumns = [
    { headerName: "Name", field: "name", sortable: true, filter: true, flex: 2 },
    { headerName: "Description", field: "description", sortable: true, filter: true, flex: 2 },
    { headerName: "Commission", field: "commission", sortable: true, filter: true, flex: 2 },
  ];

  return (
    <SingleTonCrud
      forTitle={forTitle}
      endpoint={endpoint}
      modalTitle={modalTitle}
      columnDefs={tableColumns}
      formModal={PaymentMethodFormModal}
      validationSchema={PaymentMethodValidationSchema}
      initialFormValues={initialFormValues}
    />
  );
};

export default PaymentMethod;
