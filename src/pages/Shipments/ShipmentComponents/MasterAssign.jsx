import React from "react";
import { Button, Input, Select, message, Switch, Card, Form } from "antd";
import { Formik, Form as FormikForm, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import useFetchApiData from "../../../helper/other/fetchData";

const MasterAssign = ({ shipmentData }) => {
  // Fetch data for base shipment and master shipments
  const baseShipment = useFetchApiData(
    `/shipments/shipments/${shipmentData.id}/`
  );
  const shipments = useFetchApiData(
    "/shipments/shipments/?shipment_type=Master"
  );

  // Validation schema
  const validationSchema = Yup.object({
    master: Yup.string().required("Master Shipment is required."),
    additionalInfo: Yup.string().required("Additional info is required."),
  });

  // Initial values
  const initialValues = {
    master: baseShipment?.master || "",
    additionalInfo: baseShipment?.additionalInfo || "",
    is_loaded: baseShipment.is_loaded || false,
  };

  // Form submission handler
  const handleSubmitForm = async (values) => {
    try {
      console.log("Form values submitted:", values);
      values["shipment"] = shipmentData["id"];

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

  // Handle loading state
  if (!baseShipment || !shipments) {
    return <p>Loading...</p>;
  }

  return (
    <Card title="Assign Master Shipment" bordered style={{ maxWidth: 600, margin: "0 auto", marginTop: 20 }}>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmitForm}
      >
        {({ values, errors, touched, handleSubmit, setFieldValue }) => (
          <FormikForm>
            <Form layout="vertical">
              <Form.Item
                label="Master Shipment"
                validateStatus={touched.master && errors.master ? "error" : ""}
                help={touched.master && errors.master}>   
                    <Select
                      name="master"
                      value={values.master}
                      onChange={(value) => setFieldValue("master", value)}
                      placeholder="Select Master Shipment"
                      options={shipments.map((item) => ({
                        value: item.id,
                        label: item.shipment_no,
                      }))}
                    />
                
                
              </Form.Item>

              <Form.Item
                label="Additional Info"
                validateStatus={touched.additionalInfo && errors.additionalInfo ? "error" : ""}
                help={touched.additionalInfo && errors.additionalInfo}
              >
                <Field name="additionalInfo">
                  {({ field }) => (
                    <Input {...field} placeholder="Enter Additional Info" />
                  )}
                </Field>
              </Form.Item>

              <Form.Item label="Is Loaded">
                <Field name="is_loaded">
                  {({ field }) => (
                    <Switch
                      checked={values.is_loaded}
                      onChange={(checked) => setFieldValue("is_loaded", checked)}
                    />
                  )}
                </Field>
              </Form.Item>

              <Form.Item>
                <Button type="primary" onClick={handleSubmit} block>
                  Save Shipment
                </Button>
              </Form.Item>
            </Form>
          </FormikForm>
        )}
      </Formik>
    </Card>
  );
};

export default MasterAssign;
