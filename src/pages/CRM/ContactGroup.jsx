import React, { useEffect } from "react";
import * as Yup from "yup";
import { Modal, Button, Input, Select, Form, Typography } from "antd";
import { useFormik } from "formik";
import SingleTonCrud from "../../components/SingletonCrud";
import useFetchApiData from "../../helper/other/fetchData";
const { Option } = Select;
const { Text } = Typography;

// Contact Group Form Modal component
const ContactGroupFormModal = ({ visible, onCancel, formik, modalTitle }) => {
  const parent = useFetchApiData("/crm/contacts-groups/");
  return (
    <Modal
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
            placeholder="Enter contact group name"
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

        {/* Under */}
        <Form.Item label="Under (Optional)">
          <Select
            size="large"
            id="under"
            name="under"
            placeholder="Select category"
            value={formik.values.under}
            onChange={(value) => formik.setFieldValue("under", value)}
            allowClear
          >
            {parent?.map(
              (item) =>
                item.id !== formik.values.id && ( // Skip the option if the value matches formik.values.under
                  <Option value={item.id} key={item.id}>
                    {item.name}
                  </Option>
                )
            )}
          </Select>
          {formik.touched.under && formik.errors.under && (
            <Text type="danger">{formik.errors.under}</Text>
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
};

// Validation schema using Yup
const ContactGroupValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  under: Yup.string().nullable(),
});

const ContactGroup = () => {
  const parent = useFetchApiData("/crm/contacts-groups/");

  const forTitle = "Contact Groups";
  const endpoint = "/crm/contacts-groups/";
  const modalTitle = "Contact Group Form";
  const initialFormValues = {
    name: "",
    description: "",
    under: null,
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
      headerName: "Under",
      field: "under",
      valueGetter: (params) => {
        const matchedItem = parent.filter(
          (item) => item.id === params.data.under
        )[0];
        const result = matchedItem ? matchedItem.name : ""; // Check if matchedItem exists
        console.log("ValueGetter Result for 'Under':", result); // Log the result
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
      formModal={ContactGroupFormModal}
      validationSchema={ContactGroupValidationSchema}
      initialFormValues={initialFormValues}
    />
  );
};

export default ContactGroup;
