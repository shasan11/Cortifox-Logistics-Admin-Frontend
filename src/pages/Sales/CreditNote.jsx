import React from "react";
import * as Yup from "yup";
import { Drawer, Button, Input, Select, Form, Typography } from "antd";
import { useFormik } from "formik";
import SingleTonCrud from "../../components/SingletonCrud";
import useFetchApiData from "../../helper/other/fetchData";

const { Option } = Select;
const { Text } = Typography;

// Credit Note Drawer Form component
const CreditNoteFormDrawer = ({ visible, onClose, formik, drawerTitle }) => {
  const invoices = useFetchApiData("/sales/invoice/"); // Fetch invoices dynamically
  const clients = useFetchApiData("/clients/clients/"); // Fetch clients dynamically
  const currencies = useFetchApiData("general-accounting/currency"); // Fetch currencies dynamically

  return (
    <Drawer
      title={drawerTitle}
      width={400}
      onClose={onClose}
      visible={visible}
      footer={
        <div style={{ textAlign: "right" }}>
          <Button onClick={onClose} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button type="primary" onClick={formik.handleSubmit}>
            Submit
          </Button>
        </div>
      }
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

        {/* Reason */}
        <Form.Item label="Reason">
          <Input.TextArea
            id="reason"
            name="reason"
            placeholder="Enter reason for credit note"
            value={formik.values.reason}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.reason && formik.errors.reason && (
            <Text type="danger">{formik.errors.reason}</Text>
          )}
        </Form.Item>

        {/* Invoice */}
        <Form.Item label="Invoice">
          <Select
            size="large"
            id="invoice"
            name="invoice"
            placeholder="Select an invoice"
            value={formik.values.invoice}
            onChange={(value) => formik.setFieldValue("invoice", value)}
            onBlur={formik.handleBlur}
            allowClear
          >
            {invoices.map((invoice) => (
              <Option key={invoice.id} value={invoice.id}>
                {invoice.invoice_number} - {invoice.amount}
              </Option>
            ))}
          </Select>
          {formik.touched.invoice && formik.errors.invoice && (
            <Text type="danger">{formik.errors.invoice}</Text>
          )}
        </Form.Item>

        {/* Client */}
        <Form.Item label="Client">
          <Select
            size="large"
            id="client"
            name="client"
            placeholder="Select a client"
            value={formik.values.client}
            onChange={(value) => formik.setFieldValue("client", value)}
            onBlur={formik.handleBlur}
            allowClear
          >
            {clients.map((client) => (
              <Option key={client.id} value={client.id}>
                {client.name}
              </Option>
            ))}
          </Select>
          {formik.touched.client && formik.errors.client && (
            <Text type="danger">{formik.errors.client}</Text>
          )}
        </Form.Item>

        {/* Currency */}
        <Form.Item label="Currency">
          <Select
            size="large"
            id="currency"
            name="currency"
            placeholder="Select a currency"
            value={formik.values.currency}
            onChange={(value) => formik.setFieldValue("currency", value)}
            onBlur={formik.handleBlur}
            allowClear
          >
            {currencies.map((currency) => (
              <Option key={currency.id} value={currency.id}>
                {currency.code} - {currency.name}
              </Option>
            ))}
          </Select>
          {formik.touched.currency && formik.errors.currency && (
            <Text type="danger">{formik.errors.currency}</Text>
          )}
        </Form.Item>
      </Form>
    </Drawer>
  );
};

// Validation schema using Yup
const CreditNoteValidationSchema = Yup.object().shape({
  amount: Yup.number().required("Amount is required").positive("Amount must be positive"),
  reason: Yup.string().required("Reason is required"),
  invoice: Yup.string().nullable().required("Invoice is required"),
  client: Yup.string().nullable().required("Client is required"),
  currency: Yup.string().nullable().required("Currency is required"),
});

const CreditNote = () => {
  const forTitle = "Credit Notes";
  const endpoint = "/sales/credit-notes/";
  const drawerTitle = "Credit Note Form";
  const initialFormValues = {
    amount: null,
    reason: "",
    invoice: null,
    client: null,
    currency: null,
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
      headerName: "Reason",
      field: "reason",
      sortable: true,
      filter: true,
      flex: 2,
    },
    {
      headerName: "Invoice",
      field: "invoice",
      valueGetter: (params) => {
        const matchedInvoice = invoices.find((inv) => inv.id === params.data.invoice);
        return matchedInvoice ? `${matchedInvoice.invoice_number}` : "";
      },
      sortable: true,
      filter: true,
      flex: 2,
    },
    {
      headerName: "Client",
      field: "client",
      valueGetter: (params) => {
        const matchedClient = clients.find((cli) => cli.id === params.data.client);
        return matchedClient ? matchedClient.name : "";
      },
      sortable: true,
      filter: true,
      flex: 2,
    },
    {
      headerName: "Currency",
      field: "currency",
      valueGetter: (params) => {
        const matchedCurrency = currencies.find((curr) => curr.id === params.data.currency);
        return matchedCurrency ? `${matchedCurrency.code}` : "";
      },
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
      columnDefs={tableColumns}
      formModal={CreditNoteFormDrawer}
      validationSchema={CreditNoteValidationSchema}
      initialFormValues={initialFormValues}
    />
  );
};

export default CreditNote;
