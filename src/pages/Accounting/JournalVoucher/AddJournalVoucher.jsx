import React from "react";
import { Button, Row, Col, Typography, Input, Select, Table, Breadcrumb, Form, message, notification,Card } from "antd";
import { Formik, FieldArray, Field, Form as FormikForm } from "formik";
import * as Yup from "yup";
import axios from "axios";
import useFetchApiData from "../../../helper/other/fetchData";
import '../../../styles/Inline.css'
import {DeleteOutlined}from "@ant-design/icons"

const { Title, Text } = Typography;

const initialFormValues = { date: "", reference: "", entries: [{ coa: "", dr_amount: "", cr_amount: "" }] };

const validationSchema = Yup.object({
  date: Yup.date().required("Date is required").typeError("Invalid date format"),
  reference: Yup.string().max(100, "Reference cannot exceed 100 characters"),
  entries: Yup.array().of(Yup.object({ coa: Yup.string().required("Chart of accounts is required"), dr_amount: Yup.number().min(0, "Amount must be positive"), cr_amount: Yup.number().min(0, "Amount must be positive") })).min(1, "At least one journal entry is required"),
});

const AddJournalVoucher = () => {
  const coaOptions = useFetchApiData("/general-accounting/chartofaccounts/");

  const handleSubmit = (values, { setSubmitting }) => {
    const totalDebit = values.entries.reduce((sum, entry) => sum + (parseFloat(entry.dr_amount) || 0), 0);
    const totalCredit = values.entries.reduce((sum, entry) => sum + (parseFloat(entry.cr_amount) || 0), 0);

    if (totalDebit !== totalCredit) {
      message.error("Total debit must equal total credit");
      setSubmitting(false);
      return;
    }

    const postData = async () => {
      const parentValue = { date: values.date, reference: values.reference };
      try {
        const journalEntryRes = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/general-accounting/journalentries/`, parentValue, { headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` } });
        const journalEntryId = journalEntryRes.data.id;
        const entriesWithJournalId = values.entries.map(entry => ({ ...entry, chart_of_accounts: entry.coa, journal_entry: journalEntryId, dr_amount: entry.dr_amount || 0, cr_amount: entry.cr_amount || 0 }));
        await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/general-accounting/journalentryitems/`, entriesWithJournalId, { headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` } });
        notification.success({ message: "Journal Voucher Added Successfully" });
      } catch (error) {
        notification.error({ message: error.message });
      } finally {
        setSubmitting(false);
      }
    };
    postData();
  };

  return (
    <div className="layout">
      <div style={{ background: "white", padding: "15px" }}>
        <Row justify="space-between"><Title level={4} style={{ margin: 0 }}>Add Cash Transfers</Title>
          <Breadcrumb separator="-">
            <Breadcrumb.Item>Home</Breadcrumb.Item><Breadcrumb.Item>Accounting</Breadcrumb.Item><Breadcrumb.Item>Cash Transfers</Breadcrumb.Item>
          </Breadcrumb>
        </Row>
      </div>

<Card> 
      <Formik initialValues={initialFormValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ values, errors, touched, setFieldValue, isSubmitting }) => {
          const totalBalance = values.entries.reduce((sum, entry) => sum + (parseFloat(entry.dr_amount) || 0) - (parseFloat(entry.cr_amount) || 0), 0);

          return (
            <FormikForm style={{ padding: "10px" }}>
              <Row gutter={16} style={{ marginBottom: 16 }}>
                <Col span={12}>
                  <Form.Item layout="vertical" label="Date" required validateStatus={touched.date && errors.date ? "error" : ""} help={errors.date}>
                    <Field name="date">{({ field }) => <Input {...field} type="date" placeholder="Enter Date" />}</Field>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item layout="vertical" label="Reference" validateStatus={touched.reference && errors.reference ? "error" : ""} help={errors.reference}>
                    <Field name="reference">{({ field }) => <Input {...field} type="text" placeholder="Enter Reference" />}</Field>
                  </Form.Item>
                </Col>
              </Row>

              <FieldArray name="entries">
                {({ push, remove }) => (
                  <>
                    <Table
                      dataSource={values.entries.map((entry, index) => ({
                        key: index,
                        coa: (
                          <Field name={`entries.${index}.coa`}>
                            {({ field, meta }) => (
                              <div>
                                <Select showSearch {...field} placeholder="Select COA" onChange={value => setFieldValue(`entries.${index}.coa`, value)} style={{ width: "100%" }} status={meta.touched && meta.error ? "error" : ""}>
                                  {coaOptions.map(coa => <Select.Option key={coa.id} value={coa.id}>{coa.name} ({coa.code})</Select.Option>)}
                                </Select>
                                {meta.touched && meta.error && <div style={{ color: "red" }}>{meta.error}</div>}
                              </div>
                            )}
                          </Field>
                        ),
                        dr_amount: (
                          <Field name={`entries.${index}.dr_amount`}>
                            {({ field, meta }) => (
                              <Input {...field} placeholder="Debit Amount" type="number" min="0" onChange={e => {
                                setFieldValue(`entries.${index}.dr_amount`, e.target.value);
                                if (e.target.value) setFieldValue(`entries.${index}.cr_amount`, "");
                              }} status={meta.touched && meta.error ? "error" : ""} />
                            )}
                          </Field>
                        ),
                        cr_amount: (
                          <Field name={`entries.${index}.cr_amount`}>
                            {({ field, meta }) => (
                              <Input {...field} placeholder="Credit Amount" type="number" min="0" onChange={e => {
                                setFieldValue(`entries.${index}.cr_amount`, e.target.value);
                                if (e.target.value) setFieldValue(`entries.${index}.dr_amount`, "");
                              }} status={meta.touched && meta.error ? "error" : ""} />
                            )}
                          </Field>
                        ),
                        actions: <Button type="link" onClick={() => remove(index)} style={{ color: "red" }} disabled={values.entries.length === 1} icon={<DeleteOutlined/>}></Button>,
                      }))}
                      columns={[{ title: "COA", dataIndex: "coa", key: "coa",width:430 }, { title: "Debit Amount", dataIndex: "dr_amount", key: "dr_amount" }, { title: "Credit Amount", dataIndex: "cr_amount", key: "cr_amount" }, { title: "Actions", dataIndex: "actions", key: "actions" }]}
                      pagination={false}
                    />
                    <Button type="dashed" onClick={() => push({ coa: "", dr_amount: "", cr_amount: "" })} style={{ marginTop: 16 }}>Add Entry</Button>
                  </>
                )}
              </FieldArray>

              <div style={{ marginTop: 16,marginBottom:16 }}><Text strong>Total Balance: </Text> ${totalBalance.toFixed(2)}</div>

              <Col span={24}>
                  <Form.Item label="Note" layout="vertical" validateStatus={touched.note && errors.note ? "error" : ""} help={errors.note}>
                    <Field name="note">{({ field }) => <Input.TextArea {...field} type="text" placeholder="Enter Note" />}</Field>
                  </Form.Item>
                </Col>
              <Button type="primary" htmlType="submit" disabled={isSubmitting} loading={isSubmitting} style={{ marginTop: 16 }}>Save</Button>
            </FormikForm>
          );
        }}
      </Formik>
      </Card>
    </div>
  );
};

export default AddJournalVoucher;
