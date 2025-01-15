import React from "react";
import { Formik, Form, Field } from "formik";
import { Form as AntForm, Select, Switch, Button, message } from "antd";
import * as Yup from "yup";
import useFetchApiData from "../../../helper/other/fetchData";
import axios from "axios";

const { Option } = Select;

const AddBooking = ({ shipmentData }) => {
  // Fetch loaded shipments and shipment options
  const loadedShipments = useFetchApiData(`/shipments/shipments/?master=${shipmentData?.id}`) || [];
  const shipmentOptions = useFetchApiData("/shipments/shipments/?is_loaded=false") || [];

  // Validation Schema for Formik
  const BookingSchema = Yup.object().shape({
    subshipments: Yup.array()
      .of(
        Yup.object().shape({
          id: Yup.number().required("ID is required"),
          master: Yup.number().required("Master ID is required"),
          is_loaded: Yup.boolean().required("Is Loaded is required"),
        })
      )
      .min(1, "At least one shipment must be selected"),
    is_loaded: Yup.boolean().required("This field is required"),
  });

  // Initial Values
  const initialValues = {
    subshipments: [...loadedShipments],
    is_loaded: false,
  };

  // Handle Submit
  const handleSubmit = (values) => {
    const submittedSubshipments = values.subshipments;
    const defaultSubshipments = loadedShipments;

    console.log("The Submitted Shipments",submittedSubshipments,"The Default Shipments",defaultSubshipments)
    const unmatched = defaultSubshipments.filter(
      (defaultItem) => !submittedSubshipments.some(
        (submittedItem) => submittedItem.id === defaultItem.id
      )
    );
    
    // Modifying unmatched objects
    const modifiedUnmatched = unmatched.map(item => ({
      ...item,
      master: "",
      is_loaded: false
    }));
    
    // Appending modified unmatched objects to submittedSubshipments
    const updatedSubshipments = [...submittedSubshipments, ...modifiedUnmatched];
    
    console.log(updatedSubshipments);

      
     

    // API Call to update shipments
    axios
      .patch(
        `${import.meta.env.VITE_APP_BACKEND_URL}/shipments/shipments/`,
        updatedSubshipments,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then(() => {
        message.success("Master Booking Shipments Updated Successfully");
      })
      .catch(() => {
        message.error("Something went wrong, Please try again");
      });
      
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={BookingSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, setFieldValue }) => (
        <Form>
          <AntForm.Item
            label="Subshipments"
            validateStatus={touched.subshipments && errors.subshipments ? "error" : ""}
            help={touched.subshipments && errors.subshipments}
          >
            <Select
              mode="multiple"
              placeholder="Select shipments"
              value={values.subshipments.map((item) => item.id)}
              onChange={(selectedIds) => {
                const selectedObjects = selectedIds
                  .map((id) => shipmentOptions.find((opt) => opt.id === id))
                  .filter(Boolean) // Remove undefined entries
                  .map((option) => ({
                    id: option.id,
                    master: shipmentData.id,
                    is_loaded: values.is_loaded,
                  }));
                setFieldValue("subshipments", selectedObjects);
              }}
            >
              {shipmentOptions.map((option) => (
                <Option key={option.id} value={option.id}>
                  {option.shipment_no}
                </Option>
              ))}
            </Select>
          </AntForm.Item>

          <AntForm.Item label="Is Loaded">
            <Field name="is_loaded">
              {({ field }) => (
                <Switch
                  checked={field.value}
                  onChange={(checked) => {
                    setFieldValue("is_loaded", checked);
                    const updatedSubshipments = values.subshipments.map((shipment) => ({
                      ...shipment,
                      is_loaded: checked,
                    }));
                    setFieldValue("subshipments", updatedSubshipments);
                  }}
                />
              )}
            </Field>
          </AntForm.Item>

          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default AddBooking;
