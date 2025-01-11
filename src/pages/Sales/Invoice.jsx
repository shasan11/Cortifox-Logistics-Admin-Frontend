import React, { useEffect,useState } from "react";
import * as Yup from "yup";
import {
  Modal,
  Button,
  Input,
  Select,
  Form,
  Radio,
  DatePicker,
  Typography,
  Row,
  Col,
} from "antd";
import { useFormik } from "formik";
import useFetchApiData from "../../helper/other/fetchData";
import SingleTonCrud from "../../components/SingletonCrud";
import InvoiceTable from "./InvoiceTable";
import InvoiceComponent from "./InvoiceTable";
import Payment from "./CustomerPayment";

const { Option } = Select;
const { Text } = Typography;





const InvoiceFormModal = ({ visible, onCancel, formik, modalTitle }) => {
    const clients = useFetchApiData("/clients/clients/"); // Fetch clients
    const currencies = useFetchApiData("/general-accounting/currency/"); // Fetch currencies
    const shipmentJobs = useFetchApiData("/shipments/shipments/"); // Fetch shipment jobs
  
    const getShipmentData = (id) => {
        return shipmentJobs.find((item) => item.id === id) || {};
      };
    
      useEffect(() => {
        // Compute total whenever `shipment_job` or `discount_amount` changes
        const shipmentTotal =
          formik.values.shipment_job?.reduce((sum, jobId) => {
            const shipment = getShipmentData(jobId);
            return sum + (shipment.total_amount || 0);
          }, 0) || 0;
    
        const discount = parseFloat(formik.values.discount_amount || 0);
        const newTotal = shipmentTotal - discount;
    
        formik.setFieldValue("total_amount", newTotal >= 0 ? newTotal : 0);
      }, [formik.values.shipment_job, formik.values.discount_amount, shipmentJobs]);
    

 
  
    return (
      <Modal
        title={modalTitle}
        visible={visible}
        onCancel={onCancel}
        onOk={formik.handleSubmit}
        width={"100%"}
        style={{ top: "0" }}
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
          <div className="row">
            <div className="col-6">
              <Row gutter={16}>
                {/* Invoice Number */}
                <Col span={12}>
                  <Form.Item label="Invoice Number">
                    <Input
                      size="large"
                      id="invoice_number"
                      name="invoice_number"
                      placeholder="Enter invoice number"
                      value={formik.values.invoice_number}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.invoice_number &&
                      formik.errors.invoice_number && (
                        <Text type="danger">{formik.errors.invoice_number}</Text>
                      )}
                  </Form.Item>
                </Col>
  
                {/* Discount Amount */}
                <Col span={12}>
                  <Form.Item label="Discount Amount">
                    <Input
                      size="large"
                      id="discount_amount"
                      name="discount_amount"
                      type="number"
                      value={formik.values.discount_amount}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.discount_amount &&
                      formik.errors.discount_amount && (
                        <Text type="danger">{formik.errors.discount_amount}</Text>
                      )}
                  </Form.Item>
                </Col>
              </Row>
  
              <Row gutter={16}>
                {/* Total Amount */}
                <Col span={12}>
                  <Form.Item label="Total Amount">
                    <Input
                      size="large"
                      id="total_amount"
                      name="total_amount"
                      type="number"
                      value={formik.values.total_amount}
                      disabled
                    />
                  </Form.Item>
                </Col>
  
                {/* Currency */}
                <Col span={12}>
                  <Form.Item label="Currency">
                    <Select
                      size="large"
                      id="currency"
                      name="currency"
                      placeholder="Select currency"
                      value={formik.values.currency}
                      onChange={(value) =>
                        formik.setFieldValue("currency", value)
                      }
                    >
                      {currencies?.map((currency) => (
                        <Option key={currency.id} value={currency.id}>
                          {currency.name}
                        </Option>
                      ))}
                    </Select>
                    {formik.touched.currency && formik.errors.currency && (
                      <Text type="danger">{formik.errors.currency}</Text>
                    )}
                  </Form.Item>
                </Col>
              </Row>
  
              <Row gutter={16}>
                {/* Created Date */}
                <Col span={12}>
                  <Form.Item label="Created Date">
                    <Input
                      type="date"
                      id="created_date_editable"
                      name="created_date_editable"
                      value={formik.values.created_date_editable}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      format="YYYY-MM-DD"
                    />
                    {formik.touched.created_date_editable &&
                      formik.errors.created_date_editable && (
                        <Text type="danger">
                          {formik.errors.created_date_editable}
                        </Text>
                      )}
                  </Form.Item>
                </Col>
  
                {/* Client */}
                <Col span={12}>
                  <Form.Item label="Client">
                    <Select
                      size="large"
                      id="client"
                      name="client"
                      placeholder="Select client"
                      value={formik.values.client}
                      onChange={(value) => formik.setFieldValue("client", value)}
                    >
                      {clients?.map((client) => (
                        <Option key={client.id} value={client.id}>
                          {client.name}
                        </Option>
                      ))}
                    </Select>
                    {formik.touched.client && formik.errors.client && (
                      <Text type="danger">{formik.errors.client}</Text>
                    )}
                  </Form.Item>
                </Col>
              </Row>
  
              <Row gutter={16}>
                {/* Shipment Jobs */}
                <Col span={24}>
                  <Form.Item label="Shipment Jobs">
                    <Select
                      mode="multiple"
                      size="large"
                      id="shipment_job"
                      name="shipment_job"
                      placeholder="Select shipment jobs"
                      value={formik.values.shipment_job}
                      onChange={(value) =>
                        formik.setFieldValue("shipment_job", value)
                      }
                    >
                      {shipmentJobs?.map((job) => (
                        <Option key={job.id} value={job.id}>
                          {job.shipment_no}
                        </Option>
                      ))}
                    </Select>
                    {formik.touched.shipment_job &&
                      formik.errors.shipment_job && (
                        <Text type="danger">{formik.errors.shipment_job}</Text>
                      )}
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col xs={24}>
                {formik.values.id&&(
                  <Payment invoice_id={formik.values.id}/>
                )}
                </Col>              
              </Row>
            </div>
  
            {/* Shipment Table */}
            <div className="col-lg-6">
            <InvoiceComponent
  shipmentJobs={formik.values.shipment_job || []}
  getShipmentData={getShipmentData}
  total={formik.values.total_amount}
  discountPercent={formik.values.discount_amount}
  companyName="Quest Provider"
  companyAddress="27 Provider Rd, Nashville, Tennessee, 37211, US"
  contactInfo="Phone: 000-000-0000 | Email: support@questprovider.com"
  recipientName="Bob Jones"
  recipientAddress="1 Trims Way, Nashville, Tennessee, 37215"
  invoiceNumber="1052"
  issueDate="2025-01-10"
  dueDate="2025-01-20"
/>

            </div>
          </div>
        </Form>
      </Modal>
    );
  };
  

// Validation schema using Yup
const InvoiceValidationSchema = Yup.object().shape({
  invoice_number: Yup.string().required("Invoice number is required"),
   discount_amount: Yup.number(),
  total_amount: Yup.number().required("Total amount is required"),
   created_date_editable: Yup.string().nullable(),
  client: Yup.string().nullable().required("Client is required"),
  currency: Yup.string().nullable().required("Currency is required"),
  shipment_job: Yup.array().min(1, "At least one shipment job is required"),
});

const Invoice = () => {
  const clients = useFetchApiData("/clients/clients/");
  const currencies = useFetchApiData("general-accounting/currency/");
  const shipmentJobs = useFetchApiData("/shipments/shipments/");
  const forTitle = "Invoices";
  const endpoint = "/sales/invoices/";
  const modalTitle = "Invoice Form";
  const initialFormValues = {
    invoice_number: "",
   
    discount_amount: null,
    total_amount: null,
     
    
    created_date_editable: null,
    client: null,
    currency: null,
    shipment_job: [],
  };

  const tableColumns = [
    {
      headerName: "Invoice Number",
      field: "invoice_number",
      sortable: true,
      filter: true,
      flex: 2,
    },
    {
      headerName: "Status",
      field: "status",
      sortable: true,
      filter: true,
      flex: 2,
    },
    {
      headerName: "Client",
      field: "client",
      valueGetter: (params) => {
        const client = clients.find((c) => c.id === params.data.client);
        return client ? client.name : "";
      },
      sortable: true,
      filter: true,
      flex: 2,
    },
  ];

  return (
    <SingleTonCrud
      forTitle={forTitle}
      endpoint={endpoint}
      modalTitle={modalTitle}
      columnDefs={tableColumns}
      formModal={InvoiceFormModal}
      validationSchema={InvoiceValidationSchema}
      initialFormValues={initialFormValues}
    />
  );
};

export default Invoice;
