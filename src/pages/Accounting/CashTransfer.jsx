 
import { Layout, Menu, Breadcrumb, Row, Col, Card, Divider, Typography,Modal,Form,Select,Button,Input,Drawer} from "antd";
import BreadcrumbItem from "antd/es/breadcrumb/BreadcrumbItem";
import * as Yup from "yup";
const { Header, Content, Footer } = Layout;
const { Title } = Typography;
import SingleTonCrud from "../../components/SingletonCrud";
import useFetchApiData from "../../helper/other/fetchData";
import {React, useState ,useEffect} from "react";

// Form Modal for Cash Transfers
const CashTransferModel = ({ visible, onCancel, formik, modalTitle }) => {
  const bank_account = useFetchApiData(
    "/general-accounting/bankaccounts/?active=True"
  );
  console.log("Bank Accounts",bank_account);
  return (
    <Drawer
      title={modalTitle}
      visible={visible}
      onClose={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" className="green-button" type="primary" onClick={formik.handleSubmit}>
          Submit
        </Button>,
      ]}
    >
      <Form layout="vertical">
        <Form.Item label="Bill No" required>
          <Input
            id="bill_no"
            name="bill_no"
            placeholder="Enter bill number"
            value={formik.values.bill_no}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.bill_no && formik.errors.bill_no && (
            <div className="text-danger">{formik.errors.bill_no}</div>
          )}
        </Form.Item>

        <Form.Item label="Date" required>
          <Input
            id="date"
            name="date"
            type="date"
            placeholder="Enter date"
            value={formik.values.date}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.date && formik.errors.date && (
            <div className="text-danger">{formik.errors.date}</div>
          )}
        </Form.Item>

        <Form.Item label="Amount" required>
          <Input
            id="amount"
            name="amount"
            type="number"
            placeholder="Enter amount"
            value={formik.values.amount}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.amount && formik.errors.amount && (
            <div className="text-danger">{formik.errors.amount}</div>
          )}
        </Form.Item>

        <Form.Item label="Exchange Rate" required>
          <Input
            id="exchange_rate"
            name="exchange_rate"
            type="number"
            placeholder="Enter exchange rate"
            value={formik.values.exchange_rate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.exchange_rate && formik.errors.exchange_rate && (
            <div className="text-danger">{formik.errors.exchange_rate}</div>
          )}
        </Form.Item>

        <Form.Item label="Reference" required>
          <Input
            id="reference"
            name="reference"
            placeholder="Enter reference"
            value={formik.values.reference}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.reference && formik.errors.reference && (
            <div className="text-danger">{formik.errors.reference}</div>
          )}
        </Form.Item>

        <Form.Item label="Notes">
          <Input.TextArea
            id="notes"
            name="notes"
            placeholder="Enter notes"
            value={formik.values.notes}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.notes && formik.errors.notes && (
            <div className="text-danger">{formik.errors.notes}</div>
          )}
        </Form.Item>

        <Form.Item label="Paid From" required>
  <Select
    id="paid_from"
    name="paid_from"
    placeholder="Select paid from account"
    value={formik.values.paid_from}
    onChange={(value) => formik.setFieldValue("paid_from", value)}
    onBlur={formik.handleBlur}
  >
    {bank_account.map((item) => (
      <Select.Option key={item.id} value={item.id}>
        {item.name}
      </Select.Option>
    ))}
  </Select>
  {formik.touched.paid_from && formik.errors.paid_from && (
    <div className="text-danger">{formik.errors.paid_from}</div>
  )}
</Form.Item>

<Form.Item label="To Account" required>
  <Select
    id="to_account"
    name="to_account"
    placeholder="Select to account"
    value={formik.values.to_account}
    onChange={(value) => formik.setFieldValue("to_account", value)}
    onBlur={formik.handleBlur}
  >
    {bank_account.map((item) => (
      <Select.Option key={item.id} value={item.id}>
        {item.name}
      </Select.Option>
    ))}
  </Select>
  {formik.touched.to_account && formik.errors.to_account && (
    <div className="text-danger">{formik.errors.to_account}</div>
  )}
</Form.Item>

      </Form>
    </Drawer>
  );
};

// Validation schema
const CashTransferValidationSchema = Yup.object().shape({
  bill_no: Yup.string()
    .required("Bill number is required")
    .max(50, "Bill number must not exceed 50 characters"),
  date: Yup.date().nullable().required("Date is required"),
  amount: Yup.number()
    .nullable()
    .required("Amount is required")
    .positive("Amount must be positive"),
  exchange_rate: Yup.number()
    .nullable()
    .required("Exchange rate is required")
    .positive("Exchange rate must be positive"),
  reference: Yup.string().max(100, "Reference must not exceed 100 characters"),
  notes: Yup.string().max(255, "Notes must not exceed 255 characters"),
  active: Yup.boolean(),
  paid_from: Yup.string().nullable().required("Paid from account is required"),
  to_account: Yup.string().nullable().required("To account is required"),
});

// Main component for managing cash transfers
const CashTransferMain = () => {
  const bankAccounts = useFetchApiData("/general-accounting/bankaccounts/") || [];
  const modalTitle = "Manage Cash Transfer";
  const forTitle = "Cash Transfers";
  const endpoint = "/general-accounting/cashtransfers/";
  const initialFormValues = {
    bill_no: "",
    date: null,
    amount: null,
    exchange_rate: null,
    reference: "",
    notes: "",
    active: true,
    paid_from: null,
    to_account: null,
  };

  const getBankName = (groupId) => {
    const group = bankAccounts.find((group) => group.id === groupId);
    return group ? group.name : "";
  };
  const tableColumns = [
    { headerName: "Bill No", field: "bill_no", sortable: true, filter: true, flex: 1, },
    { headerName: "Date", field: "date", sortable: true, filter: true, flex: 1, },
    { headerName: "Amount", field: "amount", sortable: true, filter: true, flex: 1, },
    { headerName: "Paid From", field: "paid_from", sortable: true, filter: true, flex: 2,valueGetter:(params)=>getBankName(params.data.paid_from) },
    { headerName: "To Account", field: "to_account", sortable: true, filter: true, flex: 1,valueGetter:(params)=>getBankName(params.data.to_account) },
  ];

  return (
    <div className="layout">
      <div style={{ background: "white", borderTop: "0.7px solid #d9d9d9", padding: "15px", alignItems: "center", height: "100%",}} >
        <Row justify="space-between">
        <Title level={4} style={{ margin: 0,fontWeight:"530" }}>
          Cash Transfers     
        </Title> 
        <Breadcrumb separator="-">
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbItem>Accounting</BreadcrumbItem>
        <BreadcrumbItem>Cash Transfers</BreadcrumbItem>
        </Breadcrumb>       
        </Row>
         
      </div>
      <Layout style={{marginTop:"0px",  borderTop: "0.7px solid #d9d9d9",}}> 
    <SingleTonCrud
      forTitle={forTitle}
      endpoint={endpoint}
      modalTitle={modalTitle}
      columnDefs={tableColumns}
      no_header={true}
       
      formModal={CashTransferModel}
      validationSchema={CashTransferValidationSchema}
      initialFormValues={initialFormValues}
    />
    </Layout>

     
  </div>
  );
};

export default CashTransferMain;
