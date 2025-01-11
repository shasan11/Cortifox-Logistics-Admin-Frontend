import React from "react";
import * as Yup from "yup";
import { Drawer, Button, Input, Select, DatePicker, Form, Typography, Radio } from "antd";
import { useFormik } from "formik";
import SingleTonCrud from "../../components/SingletonCrud";
import useFetchApiData from "../../helper/other/fetchData";

const { Option } = Select;
const { Text } = Typography;

// Payment Form Drawer component
const PaymentFormDrawer = ({visible, onCancel, formik, modalTitle }) => {
  const bankAccounts = useFetchApiData("/general-accounting/bankaccounts/"); // Fetch bank accounts dynamically
  return (
    <Drawer
      title={modalTitle }
      width={400}
      visible={visible}
      onClose={onCancel} 
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
        {/* Amount */}
        <Form.Item label="Amount">
          <Input
            size="large"
            id="amount"
            name="amount"
            type="number"
            placeholder="Enter amount"
            value={formik.values.amount}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.amount && formik.errors.amount && (
            <Text type="danger">{formik.errors.amount}</Text>
          )}
        </Form.Item>

        {/* Payment Status */}
        <Form.Item label="Payment Status">
          <Radio.Group
            id="payment_status"
            name="payment_status"
            value={formik.values.payment_status}
            onChange={(e) => formik.setFieldValue("payment_status", e.target.value)}
          >
            <Radio value="Paid">Paid</Radio>
            <Radio value="Unpaid">Unpaid</Radio>
          </Radio.Group>
          {formik.touched.payment_status && formik.errors.payment_status && (
            <Text type="danger">{formik.errors.payment_status}</Text>
          )}
        </Form.Item>

        {/* Payment Date */}
        <Form.Item label="Payment Date">
          <DatePicker
            size="large"
            id="payment_date"
            name="payment_date"
            style={{ width: "100%" }}
            value={formik.values.payment_date}
            onChange={(date) => formik.setFieldValue("payment_date", date)}
            onBlur={formik.handleBlur}
          />
          {formik.touched.payment_date && formik.errors.payment_date && (
            <Text type="danger">{formik.errors.payment_date}</Text>
          )}
        </Form.Item>

        {/* Bank Accounts */}
        <Form.Item label="Bank Account">
          <Select
            size="large"
            id="bank_accounts"
            name="bank_accounts"
            placeholder="Select a bank account"
            value={formik.values.bank_accounts}
            onChange={(value) => formik.setFieldValue("bank_accounts", value)}
            onBlur={formik.handleBlur}
            allowClear
          >
            {bankAccounts.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.bank_name}
              </Option>
            ))}
          </Select>
          {formik.touched.bank_accounts && formik.errors.bank_accounts && (
            <Text type="danger">{formik.errors.bank_accounts}</Text>
          )}
        </Form.Item>

        {/* Payment Mode */}
        <Form.Item label="Payment Mode">
          <Select
            size="large"
            id="payment_mode"
            name="payment_mode"
            placeholder="Select payment mode"
            value={formik.values.payment_mode}
            onChange={(value) => formik.setFieldValue("payment_mode", value)}
            onBlur={formik.handleBlur}
            allowClear
          >
            <Option value="cash">Cash</Option>
            <Option value="cheque">Cheque</Option>
            <Option value="online">Online</Option>
          </Select>
          {formik.touched.payment_mode && formik.errors.payment_mode && (
            <Text type="danger">{formik.errors.payment_mode}</Text>
          )}
        </Form.Item>
      </Form>
    </Drawer>
  );
};

// Validation schema using Yup
const PaymentValidationSchema = Yup.object().shape({
  amount: Yup.number().required("Amount is required").positive("Amount must be positive"),
  payment_status: Yup.string().required("Payment status is required"),
  payment_date: Yup.date().nullable().required("Payment date is required"),
  bank_accounts: Yup.string().nullable(),
  payment_mode: Yup.string().nullable(),
});

const Payment = ({invoice_id}) => {
  const forTitle = "Payments";
  const endpoint = "/sales/customer-payments/";
  const drawerTitle = "Payment Form";
  const initialFormValues = {
    invoice:invoice_id,
    amount: null,
    payment_status: "Paid",
    payment_date: null,
    bank_accounts: null,
    payment_mode: null,
  };

  const tableColumns = [
    {
      headerName: "Amount",
      field: "amount",
      sortable: true,
      filter: true,
      flex: 1,
    },
    {
      headerName: "Payment Status",
      field: "payment_status",
      sortable: true,
      filter: true,
      flex: 1,
    },
    {
      headerName: "Payment Date",
      field: "payment_date",
      sortable: true,
      filter: true,
      flex: 1,
    },
    {
      headerName: "Bank Account",
      field: "bank_accounts",
      valueGetter: (params) => {
        const matchedAccount = bankAccounts.find((acc) => acc.id === params.data.bank_accounts);
        return matchedAccount ? matchedAccount.bank_name : "";
      },
      sortable: true,
      filter: true,
      flex: 2,
    },
    {
      headerName: "Payment Mode",
      field: "payment_mode",
      sortable: true,
      filter: true,
      flex: 1,
    },
  ];

  return (
    <SingleTonCrud
      forTitle={forTitle}
      endpoint={endpoint}
      modalTitle={drawerTitle}
      filterurl={"invoice="+invoice_id}
      columnDefs={tableColumns}
      formModal={PaymentFormDrawer}
      validationSchema={PaymentValidationSchema}
      initialFormValues={initialFormValues}
    />
  );
};

export default Payment;
