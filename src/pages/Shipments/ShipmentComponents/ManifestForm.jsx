import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input, Button, message, Spin } from "antd";
import axios from "axios";
import useFetchApiData from "../../../helper/other/fetchData";

// Validation schema for the form
const validationSchema = Yup.object().shape({
  manifest_si_no: Yup.string()
    .required("Manifest SI No is required")
    .matches(/^\d+$/, "Must be a number"),
  additionalInfo: Yup.string()
    .required("Additional Info is required")
    .max(200, "Cannot exceed 200 characters"),
});

const ManifestForm = ({shipmentData}) => {
  const [loading, setLoading] = useState(false);

  const baseShipmentData=useFetchApiData('/shipments/shipments/'+shipmentData.id)
 

  

  // Function to update data
  const handlePatch = async (values) => {
    try {
      await axios.patch("/api/manifest/update", values);
      message.success("Updated successfully!");
    } catch (error) {
      message.error("Failed to update!");
    }
  };

  // Form submission handler
  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true);
    try {
      const existingData = baseShipmentData;
      if (existingData) {
        message.info("Data already exists!");
      } else {
        await handlePatch(values);
        resetForm(); // Reset form after successful submission
      }
    } catch (error) {
      message.error("An error occurred during submission!");
    }
    setLoading(false);
  };


  const handleSubmitForm = async (values) => {
    try {
      console.log("Form values submitted:", values);
      values["shipment"] = shipmentData["id"]; // Add shipment ID to values

      await axios.patch(
        `${import.meta.env.VITE_APP_BACKEND_URL}/shipments/shipments/${shipmentData.id}/`,
        values,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      message.success("Shipment Master Updated Successfully");
    } catch (error) {
      console.error("Error updating shipment:", error);
      message.error("Something went wrong, Please try again");
    }
  };

  console.warn(baseShipmentData.manifest_si_no)
  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <h4>Manifest Form</h4>
      {loading ? (
        <Spin />
      ) : (
        <Formik
        enableReinitialize
          initialValues={{
            manifest_si_no: baseShipmentData?.manifest_si_no||"",
            additionalInfo:  baseShipmentData?.additionalInfo||"",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmitForm}
        >
          {({ values,errors, touched }) => (
            <Form>
              {/* Manifest SI No Field */}
              <div style={{ marginBottom: "16px" }}>
                <label>Manifest SI No</label>
                <Field
                  name="manifest_si_no"
                  as={Input}
                  value={values.manifest_si_no}
                  placeholder="Enter Manifest SI No"
                />
                {touched.manifest_si_no && errors.manifest_si_no && (
                  <div style={{ color: "red" }}>{errors.manifest_si_no}</div>
                )}
              </div>

              {/* Additional Info Field */}
              <div style={{ marginBottom: "16px" }}>
                <label>Additional Info</label>
                <Field
                  name="additionalInfo"
                  as={Input.TextArea}
                  placeholder="Enter Additional Info"
                  rows={4}
                />
                {touched.additionalInfo && errors.additionalInfo && (
                  <div style={{ color: "red" }}>{errors.additionalInfo}</div>
                )}
              </div>

              {/* Submit Button */}
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default ManifestForm;
