import React, { useEffect, useState } from "react";
 
import { Input, Button, Form, Drawer, InputNumber, Select, DatePicker, notification, message } from "antd";
import { useFormik } from "formik";
import SingleTonCrud from "../../../components/SingletonCrud";
import useFetchApiData from "../../../helper/other/fetchData";
import axios from "axios";
 
import * as Yup from "yup"; // Assuming Yup is used for validation

// Form Modal for Cheques
const ChequeFormModal = ({ visible,
  onCancel,
  onSubmit,
  formik,
  modalTitle, }) => {
    const bankAccounts=useFetchApiData("/general-accounting/bankaccounts/?active=true")
    const contacts=useFetchApiData('/crm/contacts/?active=True')
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
        <Form.Item label="Reference">
          <Input
            size="large"
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

       

        <Form.Item label="Cheque No" required>
          <Input
           size="large"
            id="cheque_no"
            name="cheque_no"
            placeholder="Enter cheque number"
            value={formik.values.cheque_no}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.cheque_no && formik.errors.cheque_no && (
            <div className="text-danger">{formik.errors.cheque_no}</div>
          )}
        </Form.Item>

        <Form.Item label="Issued Date">
          <Input
           size="large"
            type="date"
            id="issued_date"
            name="issued_date"
            value={formik.values.issued_date}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
             format="YYYY-MM-DD"
          />
            
          
          {formik.touched.issued_date && formik.errors.issued_date && (
            <div className="text-danger">{formik.errors.issued_date}</div>
          )}
        </Form.Item>

        <Form.Item label="Status">
          <Select
           size="large"
            id="status"
            name="status"
            value={formik.values.status}
            onChange={(value) => formik.setFieldValue("status", value)}
            onBlur={formik.handleBlur}
          >
            <Select.Option value="pending">Pending</Select.Option>
            <Select.Option value="cleared">Cleared</Select.Option>
            <Select.Option value="bounced">Bounced</Select.Option>
          </Select>
          {formik.touched.status && formik.errors.status && (
            <div className="text-danger">{formik.errors.status}</div>
          )}
        </Form.Item>

        <Form.Item label="Amount" required>
          <InputNumber
           size="large"
            id="amount"
            name="amount"
            placeholder="Enter amount"
            value={formik.values.amount}
            onChange={(value) => formik.setFieldValue("amount", value)}
            onBlur={formik.handleBlur}
            style={{ width: "100%" }}
          />
          {formik.touched.amount && formik.errors.amount && (
            <div className="text-danger">{formik.errors.amount}</div>
          )}
        </Form.Item>

        <Form.Item label="Bank Account" required>
          <Select
           size="large"
            showSearch
            id="bank_account"
            name="bank_account"
            placeholder="Select bank account"
            value={formik.values.bank_account}
            onChange={(value) => formik.setFieldValue("bank_account", value)}
            onBlur={formik.handleBlur}
          >
            {bankAccounts.map((account) => (
              <Select.Option key={account.id} value={account.id}>
                {account.name}
              </Select.Option>
            ))}
          </Select>
          {formik.touched.bank_account && formik.errors.bank_account && (
            <div className="text-danger">{formik.errors.bank_account}</div>
          )}
        </Form.Item>

        <Form.Item label="Contact" required>
          <Select
           size="large"
            showSearch
            id="contact"
            name="contact"
            placeholder="Select contact"
            value={formik.values.contact}
            onChange={(value) => formik.setFieldValue("contact", value)}
            onBlur={formik.handleBlur}
          >
            {contacts.map((contact) => (
              <Select.Option key={contact.id} value={contact.id}>
                {contact.name}
              </Select.Option>
            ))}
          </Select>
          {formik.touched.contact && formik.errors.contact && (
            <div className="text-danger">{formik.errors.contact}</div>
          )}
        </Form.Item>
      </Form>
    </Drawer>
  );
};


const StatusSelect = ({ value, onChange }) => {
  const statusOptions = [
    { value: 'cleared', label: 'Cleared', color: '#00C897' },
    { value: 'pending', label: 'Pending', color: '#595959' },
    { value: 'partial', label: 'Partial', color: '#595959' },
  ];

  
  return (
    <Select
    
      value={value}
      onChange={onChange}
      style={{ width: '100%', borderColor: 'white', backgroundColor: 'transparent',padding:"-10px"}}
      dropdownStyle={{ padding: 0 }}
    >
      {statusOptions.map((status) => (
        <Select.Option key={status.value} value={status.value}>
          <span style={{ display: 'flex', alignItems: 'center' }}>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: status.color,
                marginRight: 8,
              }}
            />
            {status.label}
          </span>
        </Select.Option>
      ))}
    </Select>
  );
};

const ChequesIssued = () => {
  const [chqstatus, setStatus] = useState(null);
  const bankAccounts = useFetchApiData("/general-accounting/bankaccounts/") || [];
  const contacts = useFetchApiData('/crm/contacts/') || [];
  const [tableData, setTableData] = useState([]); // Manage table data state

  const forTitle = "Cheque Issued";
  const endpoint = "/general-accounting/chequeregister/";
  const modalTitle = "Manage Cheque";

  // Define validation schema using Yup
  const validationSchema = Yup.object({
    reference: Yup.string().required("Reference is required"),
    
    cheque_no: Yup.string().required("Cheque number is required"),
    issued_date: Yup.date().required("Issued date is required"),
    cheque_type: Yup.string().oneOf(["issued"]).required(),
    status: Yup.string().nullable(),
    amount: Yup.number().required("Amount is required"),
    bank_account: Yup.string().nullable(),
    contact: Yup.string().nullable(),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      reference: "",
      cheque_no: "",
      issued_date: null,
      cheque_type: "issued",
      status: null,
      amount: null,
      bank_account: null,
      contact: null,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form values submitted:", values);
      // Make your API call here to submit form data
    },
  });

  // Function to handle status change with API call
  const handleStatusChange = async (newStatus, params) => {
    const updatedRowId = params.data.id;

    try {
      await axios.patch(`${import.meta.env.VITE_APP_BACKEND_URL + endpoint}${updatedRowId}/`, { status: newStatus });
      notification.success({ message: "Successfully Updated" });
      setStatus(newStatus);
      window.location.reload()

      // Update the table data state to reflect the new status
      setTableData((prevData) =>
        prevData.map((row) =>
          row.id === updatedRowId ? { ...row, status: newStatus } : row
        )
      );
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const getContactName = (groupId) => {
    const group = contacts.find((group) => group.id === groupId);
    return group ? group.name : "";
  };

  const getBankName = (groupId) => {
    const group = bankAccounts.find((group) => group.id === groupId);
    return group ? group.name : "";
  };

  const tableColumns = [
    {
      headerName: "Cheque No",
      field: "cheque_no",
      sortable: true,
      filter: true,
      width: 150,
      checkboxSelection: true,
      headerCheckboxSelection: true,
    },
    {
      headerName: "Date",
      field: "issued_date",
      sortable: true,
      filter: "agDateColumnFilter",
      width: 120,
    },
    {
      headerName: "Amount",
      field: "amount",
      sortable: true,
      filter: false,
      width: 120,
    },
    {
      headerName: "Bank",
      field: "bank_account",
      sortable: true,
      filter: true,
      width: 250,
      valueGetter: (params) => getBankName(params.data.bank_account),
    },
    {
      headerName: "Issued To",
      field: "contact",
      sortable: true,
      filter: true,
      width: 180,
      valueGetter: (params) => getContactName(params.data.contact),
    },
    {
      headerName: "Status",
      field: "status",
      filter: true,
      width: 150,
      cellRenderer: (params) => (
        <StatusSelect
          style={{ padding: "-10px" }}
          value={params.data.status}
          onChange={(newValue) => handleStatusChange(newValue, params)}
        />
      ),
    },
  ];

  useEffect(() => {
    // Load initial data for the table
    const fetchData = async () => {
      const data = await useFetchApiData(endpoint);
      setTableData(data);
    };
    fetchData();
  }, [endpoint]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <SingleTonCrud
        forTitle={forTitle}
        endpoint={endpoint}
        modalTitle={modalTitle}
        filterurl="?cheque_type=issued&"
        columnDefs={tableColumns}
        formModal={ChequeFormModal}
        no_header={true}
        permission_level={3}
        validationSchema={validationSchema}
        initialFormValues={formik.initialValues}
        additionalProps={{ bankAccounts, contacts, rowData: tableData }} // Pass rowData as a prop
      />
    </form>
  );
};

export default ChequesIssued;