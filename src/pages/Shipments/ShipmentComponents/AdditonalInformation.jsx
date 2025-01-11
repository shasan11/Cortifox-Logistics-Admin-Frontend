import React, { useState } from "react";
import { Form, Input, Switch, Select, Button, Row, Col,message, InputNumber } from "antd";
import { Formik, Form as FormikForm } from "formik";
import * as Yup from "yup";
import axios from "axios";
const { TextArea } = Input;
import useFetchApiData from "../../../helper/other/fetchData";

// Validation schema using Yup
const validationSchema = Yup.object({
  customs_value: Yup.string().nullable(),
  freight_value: Yup.string().nullable(),
  insurance_value: Yup.string().nullable(),
  invoice_value: Yup.string().nullable(),
  invoices: Yup.boolean().nullable(),
  is_dangerous_goods: Yup.boolean().nullable(),
  is_damaged_goods: Yup.boolean().nullable(),
  packaging_list: Yup.boolean().nullable(),
  imo_number: Yup.string()
    .nullable()
    .when("is_dangerous_goods", {
      is: true,
      then: (schema) => schema.required("IMO number is required for dangerous goods"),
    }),
  final_address: Yup.string().nullable(),
  delivery_type: Yup.string().nullable(),
  doc_ref_no: Yup.string().nullable(),
  declaration_no: Yup.string().nullable(),
  order_no: Yup.string().nullable(),
});



const AdditionalInformation = ({data}) => {
  const currency=useFetchApiData('/general-accounting/currency/')


  const getSymbol=(cid)=>{
  return currency.filter((item)=>item.id==cid)[0]?.symbol || ""
  }
  const [isDangerousGoods, setIsDangerousGoods] = useState(false);
  console.log("Customs Value",data.customs_value)//it shows the cutoms Values
  console.log(data);
  return (
    <Formik
    enableReinitialize
    initialValues={{
      customs_value:data?.customs_value || "",   //rendered here as initial values
      freight_value: data?.freight_value|| "",
      insurance_value: data?.insurance_value || "",
      invoice_value: data?.invoice_value || "",
      invoices: data?.invoices || false,
      is_dangerous_goods: data?.is_dangerous_goods || false,
      is_damaged_goods: data?.is_damaged_goods || false,
      packaging_list: data?.packaging_list || false,
      imo_number: data?.imo_number || "",
      final_address: data?.final_address || "",
      delivery_type: data?.delivery_type || "",
      doc_ref_no: data?.doc_ref_no || "",
      declaration_no: data?.declaration_no || "",
      order_no: data?.order_no || "",
    }}
    
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);
         axios
            .patchForm(
              import.meta.env.VITE_APP_BACKEND_URL + "/shipments/shipments/"+data.id+"/",
              values,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem(
                    "accessToken"
                  )}`,
                },
              }
            )
            .then((response) => {
              message.success("Shipment Updated Successfully");
             })
            .catch((error) => {
              message.error(error.message);
            });
            
      }}
    >
      {({ values, handleChange, handleBlur, handleSubmit, errors, touched }) => (
        <FormikForm onSubmit={handleSubmit}>
          <Row gutter={[16, 16]}>
            {/* Column 1 */}
            <Col span={8}>
              <Form.Item
              layout="vertical"
                label="Customs Value"
                validateStatus={errors.customs_value && touched.customs_value ? "error" : ""}
                help={touched.customs_value && errors.customs_value}
              >
                <Input
                  id="customs_value"
                  prefix={getSymbol(data.currency)}
                  name="customs_value"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.customs_value}//but not rendered here 
                />
              </Form.Item>
              <Form.Item
            
              layout="vertical"
                label="Freight Value"
                validateStatus={errors.freight_value && touched.freight_value ? "error" : ""}
                help={touched.freight_value && errors.freight_value}
              >
                <Input
                prefix={getSymbol(data.currency)}
                  id="freight_value"
                  name="freight_value"                   
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.freight_value}
                />
              </Form.Item>
              <Form.Item
              layout="vertical"
                label="Insurance Value"
                validateStatus={errors.insurance_value && touched.insurance_value ? "error" : ""}
                help={touched.insurance_value && errors.insurance_value}
              >
                <Input
                prefix={getSymbol(data.currency)}
                  id="insurance_value"
                  name="insurance_value"
                   
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.insurance_value}
                />
              </Form.Item>
              <Form.Item
              layout="vertical"
               
                label="Invoice Value"
                validateStatus={errors.invoice_value && touched.invoice_value ? "error" : ""}
                help={touched.invoice_value && errors.invoice_value}
              >
                <Input
                prefix={getSymbol(data.currency)}
                  id="invoice_value"
                  name="invoice_value"
                  
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.invoice_value}
                />
              </Form.Item>
            </Col>

            {/* Column 2 */}
            <Col span={8}>
              <Form.Item label="Invoices?" layout="vertical">
                <Switch
                  checked={values.invoices}
                  onChange={(checked) =>
                    handleChange({ target: { name: "invoices", value: checked } })
                  }
                />
              </Form.Item>
              <Form.Item label="Dangerous Goods?" layout="vertical">
                <Switch
                  checked={values.is_dangerous_goods}
                  onChange={(checked) => {
                    handleChange({ target: { name: "is_dangerous_goods", value: checked } });
                    setIsDangerousGoods(checked);
                  }}
                />
              </Form.Item>
              <Form.Item label="Damaged Goods?" layout="vertical">
                <Switch
                  checked={values.is_damaged_goods}
                  onChange={(checked) =>
                    handleChange({ target: { name: "is_damaged_goods", value: checked } })
                  }
                />
              </Form.Item>
              <Form.Item label="Packaging List?" layout="vertical">
                <Switch
                  checked={values.packaging_list}
                  onChange={(checked) =>
                    handleChange({ target: { name: "packaging_list", value: checked } })
                  }
                />
              </Form.Item>
            </Col>

            {/* Column 3 */}
            <Col span={8}>
              {isDangerousGoods && (
                <Form.Item
                  label="IMO Number"
                  layout="vertical"
                  validateStatus={errors.imo_number && touched.imo_number ? "error" : ""}
                  help={touched.imo_number && errors.imo_number}
                >
                  <Input
                    id="imo_number"
                    name="imo_number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.imo_number}
                  />
                </Form.Item>
              )}
              <Form.Item
                label="Final Address"
                layout="vertical"
                validateStatus={errors.final_address && touched.final_address ? "error" : ""}
                help={touched.final_address && errors.final_address}
              >
                <TextArea
                  id="final_address"
                  name="final_address"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.final_address}
                />
              </Form.Item>
              <Form.Item
              layout="vertical"
                label="Delivery Type"
                validateStatus={errors.delivery_type && touched.delivery_type ? "error" : ""}
                help={touched.delivery_type && errors.delivery_type}
              >
                <Select
                  id="delivery_type"
                  name="delivery_type"
                  value={values.delivery_type}
                  onChange={(value) =>
                    handleChange({ target: { name: "delivery_type", value } })
                  }
                  onBlur={handleBlur}
                >
                  <Select.Option value="type1">Type 1</Select.Option>
                  <Select.Option value="type2">Type 2</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
              layout="vertical"
                label="Document Ref No."
                validateStatus={errors.doc_ref_no && touched.doc_ref_no ? "error" : ""}
                help={touched.doc_ref_no && errors.doc_ref_no}
              >
                <Input
                  id="doc_ref_no"
                  name="doc_ref_no"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.doc_ref_no}
                />
              </Form.Item>
              <Form.Item
              layout="vertical"
                label="Declaration No."
                validateStatus={errors.declaration_no && touched.declaration_no ? "error" : ""}
                help={touched.declaration_no && errors.declaration_no}
              >
                <Input
                  id="declaration_no"
                  name="declaration_no"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.declaration_no}
                />
              </Form.Item>
              <Form.Item
              layout="vertical"
                label="Order No."
                validateStatus={errors.order_no && touched.order_no ? "error" : ""}
                help={touched.order_no && errors.order_no}
              >
                <Input
                  id="order_no"
                  name="order_no"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.order_no}
                />
              </Form.Item>
            </Col>
          </Row>

          {/* Submit Button */}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </FormikForm>
      )}
    </Formik>
  );
};

export default AdditionalInformation;
