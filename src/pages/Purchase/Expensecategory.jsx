import React from "react";
import * as Yup from "yup";
import { Modal, Button, Input, Select, Form, Typography } from "antd";
import { useFormik } from "formik";
import SingleTonCrud from "../../components/SingletonCrud";
import useFetchApiData from "../../helper/other/fetchData";
import SinglePager from "../../components/SinglePager";

const { Option } = Select;
const { Text } = Typography;

// Expense Category Form Modal component
const ExpenseCategoryFormModal = ({ visible, onCancel, formik, modalTitle }) => {
  const parent = useFetchApiData("/purchase/expense-categories/");

  return (
    <Modal
    width="100%"
    className="pager-modal"
    style={{
      top: 0,
      left: 0,
      zIndex:"-21",
      position: 'fixed',
      height: '100%',
      padding: 0,
      zIndex: 1000,
    }}
    bodyStyle={{
      height: '100%',
      overflowY: 'auto',
      padding: 0,
    }}
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
        {/* Name */}
        <Form.Item label="Name">
          <Input
            size="large"
            id="name"
            name="name"
            placeholder="Enter expense category name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name && (
            <Text type="danger">{formik.errors.name}</Text>
          )}
        </Form.Item>

        {/* Description */}
        <Form.Item label="Description">
          <Input.TextArea
            id="description"
            size="large"
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

        {/* Parent */}
        <Form.Item label="Parent (Optional)">
          <Select
            size="large"
            id="parent"
            name="parent"
            placeholder="Select parent category"
            value={formik.values.parent}
            onChange={(value) => formik.setFieldValue("parent", value)}
            allowClear
          >
            {parent?.map(
              (item) =>
                item.id !== formik.values.id && ( // Skip the option if the value matches formik.values.parent
                  <Option value={item.id} key={item.id}>
                    {item.name}
                  </Option>
                )
            )}
          </Select>
          {formik.touched.parent && formik.errors.parent && (
            <Text type="danger">{formik.errors.parent}</Text>
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
};

// Validation schema using Yup
const ExpenseCategoryValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  parent: Yup.string().nullable(),
});

const ExpenseCategory = () => {
  const parent = useFetchApiData("/purchase/expense-categories/");

  const forTitle = "Expense Categories";
  const endpoint = "/purchase/expense-categories/";
  const modalTitle = "Expense Category Form";
  const initialFormValues = {
    name: "",
    description: "",
    parent: null,
  };

  const tableColumns = [
    {
      headerName: "Name",
      field: "name",
      sortable: true,
      filter: true,
      flex: 2,
      checkboxSelection: true,
      headerCheckboxSelection: true,
    },
    {
      headerName: "Parent",
      field: "parent",
      valueGetter: (params) => {
        const matchedItem = parent.filter(
          (item) => item.id === params.data.parent
        )[0];
        const result = matchedItem ? matchedItem.name : ""; // Check if matchedItem exists
        return result;
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
      formModal={ExpenseCategoryFormModal}
      validationSchema={ExpenseCategoryValidationSchema}
      initialFormValues={initialFormValues}
    />
  );
};

export default ExpenseCategory;
