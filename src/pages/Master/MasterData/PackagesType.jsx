import React from "react";
import * as Yup from "yup";
import { Modal, Button, Input, Form, Typography, Select } from 'antd';
import { useFormik } from "formik";
import SingleTonCrud from "../../../components/SingletonCrud";
import useFetchApiData from "../../../helper/other/fetchData";

const { Text } = Typography;
const { Option } = Select;

// Modal Component
const PackageTypeFormModal = ({ visible, onCancel, formik, modalTitle }) => {
    const length_unit=useFetchApiData('/master/unit-of-measurement-length/?active=True')
    return( 
  <Modal
    title={modalTitle}
    visible={visible}
    onCancel={onCancel}
    onOk={formik.handleSubmit}
    footer={[
      <Button key="back" onClick={onCancel}>Cancel</Button>,
      <Button key="submit" type="primary" onClick={formik.handleSubmit}>Submit</Button>,
    ]}
  >
    <Form layout="vertical">
      {/* Name */}
      <Form.Item label="Name">
        <Input
          size="large"
          id="name"
          name="name"
          placeholder="Enter package type name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.name && formik.errors.name && <Text type="danger">{formik.errors.name}</Text>}
      </Form.Item>

      {/* Description */}
      <Form.Item label="Description">
        <Input
          size="large"
          id="description"
          name="description"
          placeholder="Enter description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.description && formik.errors.description && <Text type="danger">{formik.errors.description}</Text>}
      </Form.Item>

      {/* Length */}
      <Form.Item label="Length">
        <Input
          size="large"
          id="length"
          name="length"
          type="number"
          placeholder="Enter length"
          value={formik.values.length}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.length && formik.errors.length && <Text type="danger">{formik.errors.length}</Text>}
      </Form.Item>

      {/* Breadth */}
      <Form.Item label="Breadth">
        <Input
          size="large"
          id="breadth"
          name="breadth"
          type="number"
          placeholder="Enter breadth"
          value={formik.values.breadth}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.breadth && formik.errors.breadth && <Text type="danger">{formik.errors.breadth}</Text>}
      </Form.Item>

      {/* Width */}
      <Form.Item label="Width">
        <Input
          size="large"
          id="width"
          name="width"
          type="number"
          placeholder="Enter width"
          value={formik.values.width}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.width && formik.errors.width && <Text type="danger">{formik.errors.width}</Text>}
      </Form.Item>

      {/* Container Type */}
      <Form.Item label="Container Type">
        <Select
          size="large"
          id="container_type"
          name="container_type"
          placeholder="Select container type"
          value={formik.values.container_type}
          onChange={value => formik.setFieldValue("container_type", value)}
          onBlur={formik.handleBlur}
        >
          <Option value="LCL">LCL</Option>
          <Option value="FCL">FCL</Option>
        </Select>
        {formik.touched.container_type && formik.errors.container_type && <Text type="danger">{formik.errors.container_type}</Text>}
      </Form.Item>

      {/* Length Unit */}
      <Form.Item label="Length Unit">
        <Select
          size="large"
          id="length_unit"
          name="length_unit"
          placeholder="Select length unit"
          value={formik.values.length_unit}
          onChange={value => formik.setFieldValue("length_unit", value)}
          onBlur={formik.handleBlur}
        >
         {length_unit?.map(
              (item) =>
              
                  <Option value={item.id} key={item.id}>
                    {item.name}
                  </Option>
               
            )}
        </Select>
        {formik.touched.length_unit && formik.errors.length_unit && <Text type="danger">{formik.errors.length_unit}</Text>}
      </Form.Item>
    </Form>
  </Modal>
  );
}

// Validation Schema
const PackageTypeValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  length: Yup.number().nullable().typeError("Length must be a number"),
  breadth: Yup.number().nullable().typeError("Breadth must be a number"),
  width: Yup.number().nullable().typeError("Width must be a number"),
  container_type: Yup.string().required("Container type is required"),
  length_unit: Yup.string().required("Length unit is required"),
});

// Main Component
const PackageType = () => {
  const length_unit=useFetchApiData('/master/unit-of-measurement-length/?active=True')
  const forTitle = "Package Type";
  const endpoint = "/master/package-type/";
  const modalTitle = "Package Type Form";
  const initialFormValues = {
    name: "",
    description: "",
    length: null,
    breadth: null,
    width: null,
    container_type: "",
    length_unit: "",
  };
  const tableColumns = [
    { headerName: "Name", field: "name", sortable: true, flex: 2 },
    {
      headerName: "Volume",
      field: "length",
      sortable: true,
      filter: true,
      flex: 1,
      valueGetter: (params) => {
        try {
          const { data } = params;
          if (!data) return "N/A"; // Handle cases where data is undefined
            console.log(data);
          // Extract and convert fields to numbers
          const length = parseFloat(data.length) || 0;
          const bredth = parseFloat(data.breadth) || 0;
          const width = parseFloat(data.width) || 0;
  
          // Validate dimensions
          if (length <= 0 || bredth <= 0 || width <= 0) return "Invalid Dimensions";
  
          // Find unit name
          const matchedItem = length_unit?.find((item) => item.id === data.length_unit) || { name: "cm" };
          const unitName = matchedItem.symbol;
  
          // Calculate volume
          const volume = length * bredth * width;
          return `${volume} ${unitName}²`; // Append unit
        } catch (error) {
          console.error("Error calculating volume:", error);
          return "Error";
        }
      },
    },
    { headerName: "Container Type", field: "container_type", sortable: true, filter: true, flex: 1 },
  ];
  
  return (
    <SingleTonCrud
      forTitle={forTitle}
      endpoint={endpoint}
      modalTitle={modalTitle}
      columnDefs={tableColumns}
      formModal={PackageTypeFormModal}
      validationSchema={PackageTypeValidationSchema}
      initialFormValues={initialFormValues}
    />
  );
};

export default PackageType;
