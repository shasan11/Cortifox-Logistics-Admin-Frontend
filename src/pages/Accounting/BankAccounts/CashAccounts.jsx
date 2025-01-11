import React from "react";
import {Modal, Input, Button, Drawer,Form } from "antd";
import SingleTonCrud from "../../../components/SingletonCrud";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useEffect } from "react";


 

const CashAccountFormModal = ({ visible, onCancel, onSubmit, formik, modalTitle }) => {
  return (
    <Drawer
      title={modalTitle}
      onClose={onCancel}
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" className="green-button" type="primary" onClick={formik.handleSubmit}>
          Submit
        </Button>,
      ]}
      width={400}
    >
      <Form
        layout="vertical"
        onFinish={formik.handleSubmit}
      >
        <Form.Item
        required
          size="large"
          label="Name"
          name="name"
          validateStatus={formik.touched.name && formik.errors.name ? 'error' : ''}
          help={formik.touched.name && formik.errors.name ? formik.errors.name : ''}
        >
          <Input
            id="name"
            name="name"
            placeholder="Enter cash account name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>

        <Form.Item
          label="Code"
          name="code"
          required
        >
          <Input
            size="large"
            id="code"
            name="code"
            placeholder="Enter the cash code"
            value={formik.values.code}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>

        <Form.Item
        required
          size="large"
          label="Opening Balance"
          name="opening_balance"
          validateStatus={formik.touched.opening_balance && formik.errors.opening_balance ? 'error' : ''}
          help={formik.touched.opening_balance && formik.errors.opening_balance ? formik.errors.opening_balance : ''}
        >
          <Input
            size="large"
            id="opening_balance"
            name="opening_balance"
            placeholder="Enter opening balance"
            value={formik.values.opening_balance}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>

        <Form.Item
          label="Description (Optional)"
          name="description"
        >
          <Input.TextArea
            size="large"
            id="description"
            name="description"
            placeholder="Enter description (optional)"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            rows={4}
          />
        </Form.Item>
      </Form>
    </Drawer>
  );
};
const CashAccountValidationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    opening_balance: Yup.number()
      .required("Opening balance is required")
      .positive("Opening balance must be a positive number"),
    description: Yup.string().nullable(),
  });

const CashAccount = () => {
  const forTitle = "Cash Account";
  const endpoint = "/general-accounting/bankaccounts/";
  const modalTitle = "Cash Account Form";
  const initialFormValues = {
    name: "",
    code: "",
    acc_type:"Cash",
    opening_balance: "",
    description: "",
  };

  const tableColumns = [
    { headerName: "Name", field: "name", sortable: true, filter: true, flex: 2 },
    { headerName: "Code", field: "code", sortable: true, filter: true, flex: 1 },
    {
      headerName: "Balance",
      field: "opening_balance",
      sortable: true,
      filter: true,
      flex: 2,
    },
     
  ];
  const generateCode = () => {
    return `CASH${Math.floor(Math.random() * 10000)}`;
  };
  useEffect(() => {
    initialFormValues.code = generateCode();  // Autogenerate code
  }, []);

  return (
    <SingleTonCrud
      forTitle={forTitle}
      endpoint={endpoint}
      no_header={true}
      filterurl="?acc_type=Cash&"
      modalTitle={modalTitle}
      columnDefs={tableColumns}
      formModal={CashAccountFormModal}
      validationSchema={CashAccountValidationSchema}
      initialFormValues={initialFormValues}
    />
  );
};

export default CashAccount;
