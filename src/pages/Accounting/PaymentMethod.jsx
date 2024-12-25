import React, { useState } from "react";
import {
  Modal,
  Button,
  Table,
  Form,
  Input,
  Space,
  Upload,
  message,
  Row,
  Typography,
} from "antd";
import { Formik } from "formik";
import * as Yup from "yup";
import * as XLSX from "xlsx";
import axios from "axios";

const PaymentMethod = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      filters: [
        { text: "John", value: "John" },
        { text: "Jane", value: "Jane" },
      ],
      onFilter: (value, record) => record.name.includes(value),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => handleEdit(record)}> Edit </Button>
          <Button type="link" danger onClick={() => handleDelete(record.key)}> Delete </Button>
        </Space>
      ),
    },
  ];

  const showModal = () => {
    setEditingItem(null);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleEdit = (record) => {
    setEditingItem(record);
    setIsModalVisible(true);
  };

  const handleDelete = (key) => {
    setData(data.filter((item) => item.key !== key));
    message.success("Record deleted successfully");
  };

  const handleSave = (values) => {
    if (editingItem) {
      setData(
        data.map((item) =>
          item.key === editingItem.key ? { ...item, ...values } : item
        )
      );
      message.success("Record updated successfully");
    } else {
      setData([...data, { ...values, key: Date.now() }]);
      message.success("Record added successfully");
    }
    setIsModalVisible(false);
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    XLSX.writeFile(workbook, "data.xlsx");
    message.success("Data exported to Excel");
  };

  const importFromExcel = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const workbook = XLSX.read(e.target.result, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const importedData = XLSX.utils.sheet_to_json(sheet);
      setData(importedData.map((item, index) => ({ ...item, key: index })));
      message.success("Data imported successfully");
    };
    reader.readAsBinaryString(file);
    return false;
  };

  return (
    <div>
      <Row justify="space-between" align="middle" wrap style={{ background: "#fafafa", borderBottom: "1px solid #d9d9d9", padding: "15px 15px", }} >
        <Typography.Title level={4} style={{ margin: 0 }}> Payment Method </Typography.Title>
        <div>
          <Button type="primary" onClick={showModal}> Add Record </Button>{" "}
          <Button onClick={exportToExcel}>Export to Excel</Button>{" "}
          <Upload beforeUpload={importFromExcel} showUploadList={false}>
            <Button>Import from Excel</Button>
          </Upload>
        </div>
      </Row>
      {/* Responsive Table */}
      <Table columns={columns} dataSource={data} scroll={{ x: "max-content" }} />

      <Modal title={editingItem ? "Edit Record" : "Add Record"} visible={isModalVisible} footer={null} onCancel={handleCancel} >
        <Formik
          initialValues={{
            name: editingItem?.name || "",
            email: editingItem?.email || "",
          }}
          validationSchema={Yup.object({
            name: Yup.string().required("Name is required"),
            email: Yup.string()
              .email("Invalid email")
              .required("Email is required"),
          })}
          onSubmit={(values) => handleSave(values)}
        >
          {({ values, errors, touched, handleChange, handleSubmit }) => (
            <>
              <Form layout="vertical" onFinish={handleSubmit}>
                <Form.Item
                  label="Name"
                  required
                  validateStatus={touched.name && errors.name ? "error" : ""}
                  help={touched.name && errors.name}
                >
                  <Input
                    name="name"
                    size="large"
                    value={values.name}
                    onChange={handleChange}
                  />
                </Form.Item>
                <Form.Item
                  label="Email"
                  validateStatus={touched.email && errors.email ? "error" : ""}
                  help={touched.email && errors.email}
                >
                  <Input
                    size="large"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ marginRight: 8 }}
                  >
                    Save
                  </Button>
                  <Button onClick={handleCancel}>Cancel</Button>
                </Form.Item>
              </Form>
            </>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

export default PaymentMethod;
