import React, { useEffect } from "react";
import { Formik, Field, FieldArray, Form } from "formik";
import * as Yup from "yup";
import { Table, Input, Button, Select, message } from "antd";
import axios from "axios";
import useFetchApiData from "../../../helper/other/fetchData";

const { Option } = Select;

const validationSchema = Yup.object({
  charges: Yup.array().of(
    Yup.object({
      charge_name: Yup.string().required("Charge name is required"),
      charge_type: Yup.string().required("Charge type is required"),
      rate: Yup.number()
        .required("Rate is required")
        .positive("Rate must be positive"),
      qty: Yup.number()
        .required("Quantity is required")
        .positive("Quantity must be positive"),
      total: Yup.number(), // Calculated dynamically
    })
  ),
});

const ChargeForm = ({ shipment_id }) => {
  const data = useFetchApiData(`/shipments/charges/?shipment=${shipment_id}`);

  const columns = [
    {
      title: "Charge Name",
      dataIndex: "charge_name",
      render: (_, __, index) => (
        <Field name={`charges[${index}].charge_name`}>
          {({ field }) => (
            <Input {...field} placeholder="Charge Name" style={{ width: "100%" }} />
          )}
        </Field>
      ),
    },
    {
      title: "Charge Type",
      dataIndex: "charge_type",
      render: (_, __, index) => (
        <Field name={`charges[${index}].charge_type`}>
          {({ field, form }) => (
            <Select
              {...field}
              onChange={(value) =>
                form.setFieldValue(`charges[${index}].charge_type`, value)
              }
              placeholder="Select Type"
              style={{ width: "100%" }}
            >
              <Option value="per_shipment">Per Shipment</Option>
              <Option value="per_packages">Per Packages</Option>
            </Select>
          )}
        </Field>
      ),
    },
    {
      title: "Rate",
      dataIndex: "rate",
      render: (_, __, index) => (
        <Field name={`charges[${index}].rate`}>
          {({ field, form }) => (
            <Input
              {...field}
              type="number"
              placeholder="Rate"
              onChange={(e) => {
                const rate = parseFloat(e.target.value) || 0;
                const qty = form.values.charges[index].qty || 0;
                form.setFieldValue(`charges[${index}].rate`, rate);
                form.setFieldValue(`charges[${index}].total`, rate * qty);
              }}
            />
          )}
        </Field>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "qty",
      render: (_, __, index) => (
        <Field name={`charges[${index}].qty`}>
          {({ field, form }) => (
            <Input
              {...field}
              type="number"
              placeholder="Quantity"
              onChange={(e) => {
                const qty = parseFloat(e.target.value) || 0;
                const rate = form.values.charges[index].rate || 0;
                form.setFieldValue(`charges[${index}].qty`, qty);
                form.setFieldValue(`charges[${index}].total`, rate * qty);
              }}
            />
          )}
        </Field>
      ),
    },
    {
      title: "Total",
      dataIndex: "total",
      render: (_, __, index) => (
        <Field name={`charges[${index}].total`}>
          {({ field }) => <Input {...field} disabled placeholder="Total" />}
        </Field>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, __, index, remove) => (
        <Button onClick={() => remove(index)} danger>
          Remove
        </Button>
      ),
    },
  ];

  return (
    <Formik
      initialValues={{
        charges: data || [],
      }}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={(values) => {
        
        console.log(values.charges);
        console.log("Charges",data);
        const withId = values.charges.filter(item => item.hasOwnProperty('id'));
        const withoutId = values.charges.filter(item => !item.hasOwnProperty('id'));
        const missingInValues = data.filter(item => !values.charges.some(value => value.id === item.id));
        console.log("Missing in Values:", missingInValues);
        console.log("With ID:", withId);
        console.log("Without ID:", withoutId);
        
        const transformedValues = withoutId.length === 0
    ? []  // If array is empty, set transformedValues to an empty array
    : withoutId.map(item => {
        return {
            ...item,
            shipment: shipment_id // Replace with the actual value for shipment_id
        };
    });
        console.log(transformedValues)
         
        
        
        const handleShipmentsCharges = async () => {
          try {
            // Run all three requests concurrently using Promise.all
            const [patchResponse, postResponse, deleteResponse] = await Promise.all([
              axios.patch(
                `${import.meta.env.VITE_APP_BACKEND_URL}/shipments/charges/`,
                withId,
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                  },
                }
              ),
              axios.post(
                `${import.meta.env.VITE_APP_BACKEND_URL}/shipments/charges/`,
                transformedValues,
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                  },
                }
              ),
              axios.delete(
                `${import.meta.env.VITE_APP_BACKEND_URL}/shipments/charges/`,
                { data: missingInValues },  // Correcting the usage of DELETE with data
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                  },
                }
              ),

            ]);
        
            // All requests were successful, show success message
            message.success("Charge sheets processed successfully!");
          } catch (error) {
            // If any of the requests failed, show error message
            message.error(error.response ? error.response.data.message : error.message);
          }
        };
         handleShipmentsCharges()
         
      }} 
    >
      {({ values }) => (
        <Form>
          <FieldArray name="charges">
            {({ remove, push }) => (
              <>
                <Table
                  dataSource={values.charges}
                  columns={columns.map((col) => {
                    if (col.dataIndex === "action") {
                      return {
                        ...col,
                        render: (_, __, index) => col.render(_, __, index, remove),
                      };
                    }
                    return col;
                  })}
                  pagination={false}
                  rowKey={(record, index) => index}
                />
                <Button
                  type="dashed"
                  onClick={() =>
                    push({
                      charge_name: "",
                      charge_type: "",
                      rate: "",
                      qty: "",
                      total: 0,
                    })
                  }
                  style={{ marginTop: 16 }}
                >
                  Add Charge
                </Button>
                <div style={{ marginTop: 16, fontWeight: "bold" }}>
                  Grand Total:{" "}
                  {values.charges
                    .reduce((sum, charge) => sum + (charge.total || 0), 0)
                    .toFixed(2)}
                </div>
              </>
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

export default ChargeForm;
