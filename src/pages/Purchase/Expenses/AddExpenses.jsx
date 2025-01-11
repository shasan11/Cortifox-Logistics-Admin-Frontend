import React from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import {
  Input,
  Button,
  Select,
  DatePicker,
  Collapse,
  Table,
  Row,
  Col,
} from "antd";

const { Panel } = Collapse;
const { Option } = Select;

const validationSchema = Yup.object({
  bill_no: Yup.string().required("Bill No is required"),
  expense_cat: Yup.string().required("Expense category is required"),
  exchange_rate_to_npr: Yup.number().required("Exchange rate is required"),
  date: Yup.date().required("Date is required"),
  currency: Yup.string().required("Currency is required"),
  chart_of_accounts: Yup.string().required("Chart of accounts is required"),
  bank_accounts: Yup.string().required("Bank account is required"),
  note_item: Yup.array()
    .of(
      Yup.object({
        product: Yup.string().required("Product is required"),
        amount: Yup.number().required("Amount is required"),
        qty: Yup.number().required("Quantity is required"),
        discount: Yup.number(),
        discount_type: Yup.string().oneOf(["percent", "amount"]),
        tax_percent: Yup.number(),
        remarks: Yup.string(),
      })
    )
    .required("Note items are required"),
});

const ExpenseForm = () => {
  const initialValues = {
    bill_no: "",
    expense_cat: "",
    exchange_rate_to_npr: null,
    date: null,
    remarks: "",
    currency: "",
    chart_of_accounts: "",
    bank_accounts: "",
    note_item: [
      {
        product: "",
        amount: null,
        qty: null,
        discount: null,
        discount_type: "percent",
        tax_percent: null,
        remarks: "",
      },
    ],
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ values, handleChange, setFieldValue }) => (
        <Form className="p-3">
          <Row gutter={16}>
            <Col span={8}>
              <label>Bill No</label>
              <Field name="bill_no" as={Select} style={{ width: "100%" }}>
                <Option value="1">Bill 1</Option>
                <Option value="2">Bill 2</Option>
              </Field>
            </Col>
            <Col span={8}>
              <label>Expense Category</label>
              <Field name="expense_cat" as={Input} />
            </Col>
            <Col span={8}>
              <label>Exchange Rate to NPR</label>
              <Field name="exchange_rate_to_npr" as={Input} type="number" />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <label>Date</label>
              <DatePicker
                style={{ width: "100%" }}
                onChange={(date, dateString) => setFieldValue("date", dateString)}
              />
            </Col>
            <Col span={8}>
              <label>Currency</label>
              <Field name="currency" as={Select} style={{ width: "100%" }}>
                <Option value="USD">USD</Option>
                <Option value="NPR">NPR</Option>
              </Field>
            </Col>
            <Col span={8}>
              <label>Chart of Accounts</label>
              <Field name="chart_of_accounts" as={Select} style={{ width: "100%" }}>
                <Option value="COA1">Chart 1</Option>
                <Option value="COA2">Chart 2</Option>
              </Field>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <label>Bank Accounts</label>
              <Field name="bank_accounts" as={Select} style={{ width: "100%" }}>
                <Option value="Bank1">Bank 1</Option>
                <Option value="Bank2">Bank 2</Option>
              </Field>
            </Col>
            <Col span={16}>
              <label>Remarks</label>
              <Field name="remarks" as={Input.TextArea} />
            </Col>
          </Row>

          <FieldArray name="note_item">
            {({ push, remove }) => (
              <Table
                dataSource={values.note_item}
                columns={[
                  {
                    title: "Product",
                    dataIndex: "product",
                    render: (text, record, index) => (
                      <Field name={`note_item.${index}.product`} as={Input} />
                    ),
                  },
                  {
                    title: "Amount",
                    dataIndex: "amount",
                    render: (text, record, index) => (
                      <Field name={`note_item.${index}.amount`} as={Input} type="number" />
                    ),
                  },
                  {
                    title: "Quantity",
                    dataIndex: "qty",
                    render: (text, record, index) => (
                      <Field name={`note_item.${index}.qty`} as={Input} type="number" />
                    ),
                  },
                  {
                    title: "Discount",
                    dataIndex: "discount",
                    render: (text, record, index) => (
                      <Field name={`note_item.${index}.discount`} as={Input} type="number" />
                    ),
                  },
                  {
                    title: "Discount Type",
                    dataIndex: "discount_type",
                    render: (text, record, index) => (
                      <Field
                        name={`note_item.${index}.discount_type`}
                        as={Select}
                        style={{ width: "100%" }}
                      >
                        <Option value="percent">Percent</Option>
                        <Option value="amount">Amount</Option>
                      </Field>
                    ),
                  },
                  {
                    title: "Tax Percent",
                    dataIndex: "tax_percent",
                    render: (text, record, index) => (
                      <Field name={`note_item.${index}.tax_percent`} as={Input} type="number" />
                    ),
                  },
                  {
                    title: "Actions",
                    render: (text, record, index) => (
                      <Button type="danger" onClick={() => remove(index)}>
                        Remove
                      </Button>
                    ),
                  },
                ]}
                expandable={{
                  expandedRowRender: (record, index) => (
                    <Field
                      name={`note_item.${index}.remarks`}
                      as={Input.TextArea}
                      placeholder="Add remarks"
                    />
                  ),
                }}
                pagination={false}
                footer={() => (
                  <Button
                    type="dashed"
                    onClick={() =>
                      push({
                        product: "",
                        amount: null,
                        qty: null,
                        discount: null,
                        discount_type: "percent",
                        tax_percent: null,
                        remarks: "",
                      })
                    }
                  >
                    Add Note Item
                  </Button>
                )}
                rowKey={(record, index) => index}
              />
            )}
          </FieldArray>

          <Button type="primary" htmlType="submit" style={{ marginTop: 16 }}>
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ExpenseForm;
