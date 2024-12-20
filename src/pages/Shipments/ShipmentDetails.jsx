import { Formik } from "formik";
import {
   Spin,
  Form,
  Grid,
  Input,
  Radio,
  Col,
  Row,
  Select,
  Divider,
  Switch,
  Collapse,
  Typography,
  Button,
  message,
} from "antd";
import { IoInformationCircleOutline } from "react-icons/io5";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import {
  directionOptions,
  movementOption,
  serviceOptions,
  transportOptions,
  initialValues,
  shipmentValidationSchema,
  incoterms,
  payment_choices,
  priorityOptions,
} from "./ShipmentMasterValues";
import useFetchApiData from "../../helper/other/fetchData";
import axios from "axios";
import { useState,useEffect } from "react";

const ShipmentDetails= () => {
  const { shipment_no } = useParams();
  const [data,setData]=useState({})
  const navigate=useNavigate()
  

  function fetchdata(){
    axios.get(import.meta.env.VITE_APP_BACKEND_URL+'/shipments/shipments/'+shipment_no,{

    }).then((response)=>{setData(response.data)})
    .catch((error)=>{navigate('/')})
  }


  useEffect(()=>{
    fetchdata();
  },[shipment_no])

  console.log(data)
  document.title = `${data.shipment_no} - ${
    import.meta.env.VITE_APP_APPLICATION_NAME
  }`;
  const { Title } = Typography;
  const { Panel } = Collapse;
  const ports = useFetchApiData("/master/ports/");
  const actors = useFetchApiData("/parties/vendors/");
  const client = useFetchApiData("/clients/clients");
  const currency = useFetchApiData("/general-accounting/currency/");
  const aircarrier = useFetchApiData(
    "/parties/vendors/?active=true&type=&vendor_class=Carrier&i_air=true"
  );
  const seacarrier = useFetchApiData(
    "/parties/vendors/?active=true&type=&vendor_class=Carrier&is_sea=true"
  );
  const landcarrier = useFetchApiData(
    "/parties/vendors/?active=true&type=&vendor_class=Carrier&is_land=true"
  );
  const defaultvalue = {
    shipment_type: data.shipment_type || '',
    movement_type: data.movement_type || '',
    transport_mode: data.transport_mode || '',
    service_type: data.service_type || '',
    direction: data.direction || '',
    inco_terms: data.inco_terms || '',
    priority: data.priority || 'High',
    payment_type: data.payment_type || '',
    payable_at: data.payable_at || '',
    client: data.client || '',
    currency: data.currency || '',
    total_amount: data.total_amount || '',
    paid_amount: data.paid_amount || '',
    customs_value: data.customs_value || '',
    freight_value: data.freight_value || '',
    packaging_list: data.packaging_list || false,
    is_dangerous_good: data.is_dangerous_good || false,
    port_origin: data.port_origin || '',
    port_handling_agent_origin: data.port_handling_agent_origin|| '',
    port_destination: data.port_destination|| '',
    port_handling_agent_destination: data.port_handling_agent_destination || '',
    scheduled_start_date: data.scheduled_start_date || '',
    scheduled_end_date: data.scheduled_end_date || '',
    awb: data.awb || '',
    flight_number: data.flight_number || '',
    cargo_terminal: data.cargo_terminal || '',
    handling_code: data.handling_code || '',
    airline: data.airline || '',
    uld_no: data.uld_no || '',
    bol: data.bol || '',
    vessel_name: data.vessel_name || '',
    voyage_number: data.voyage_number || '',
    container_number: data.container_number || '',
    container_type: data.container_type || '',
    shipping_line: data.shipping_line || '',
    bol_land: data.bol_land || '',
    vehicle_number: data.vehicle_number || '',
    carrier: data.carrier || '',
    driver_info: data.driver_info || '',
    route: data.route || '',
    cargo_type: data.cargo_type || '',
    trailer_type: data.trailer_type || '',
  };
  

  console.log("This are the default values to be rendered in the form",defaultvalue)

  return (
    <>
    {
        data? 
      <Formik
      enableReinitialize
        initialValues={defaultvalue}
        validationSchema={shipmentValidationSchema}
        onSubmit={(values) => {
          values.shipment_type = type;
          console.log(values);
          axios
            .post(
              import.meta.env.VITE_APP_BACKEND_URL + "/shipments/shipments/",
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
              message.success("Shipment Created Successfully");
            })
            .catch((error) => {
              message.error(error.message);
            });
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          setValues
        }) => (
          <Form
            layout="vertical"
            onFinish={handleSubmit}
            requiredMark="optional"
        
          
          >  
         
            {console.log(errors)}
            <Row justify="space-between" style={{position:"sticky"}}>
              <Title level={4}>{data.shipment_no}</Title>
              <Form.Item style={{ marginBottom: "0px" }}>
                  <Button
                    block="true"
                    type="primary"
                    htmlType="submit"
                    size="large"
                  >
                    Save
                  </Button>
                </Form.Item>

            </Row>
            <Collapse defaultActiveKey={["1"]} className="mt-3">
              <Panel header="GENERAL INFORMATION" key="1">
                <Row justify="space-between">
                  {/* Transport Mode */}
                  <Form.Item
                    label="Transport Mode"
                    required
                    layout="vertical"
                    validateStatus={
                      errors.transport_mode && touched.transport_mode
                        ? "error"
                        : ""
                    }
                    help={
                      errors.transport_mode && touched.transport_mode
                        ? errors.transport_mode
                        : ""
                    }
                  >
                    <Radio.Group
                      size="large"
                      options={transportOptions}
                      onChange={(e) =>
                        setFieldValue("transport_mode", e.target.value)
                      }
                      onBlur={handleBlur}
                      value={values.transport_mode}
                      name="transport_mode"
                    />
                  </Form.Item>

                  {/* Direction */}
                  <Form.Item
                    label="Direction"
                    required
                    layout="vertical"
                    validateStatus={
                      errors.direction && touched.direction ? "error" : ""
                    }
                    help={
                      errors.direction && touched.direction
                        ? errors.direction
                        : ""
                    }
                  >
                    <Radio.Group
                      size="large"
                      options={directionOptions}
                      onChange={(e) =>
                        setFieldValue("direction", e.target.value)
                      }
                      onBlur={handleBlur}
                      value={values.direction}
                      name="direction"
                    />
                  </Form.Item>

                  {/* Load Type */}
                  <Form.Item
                    label="Load Type"
                    required
                    layout="vertical"
                    validateStatus={
                      errors.service_type && touched.service_type ? "error" : ""
                    }
                    help={
                      errors.service_type && touched.service_type
                        ? errors.service_type
                        : ""
                    }
                  >
                    <Radio.Group
                      options={serviceOptions}
                      onChange={(e) =>
                        setFieldValue("service_type", e.target.value)
                      }
                      onBlur={handleBlur}
                      value={values.service_type}
                      name="service_type"
                    />
                  </Form.Item>

                  {/* Movement Type */}
                  <Form.Item
                    label="Movement Type"
                    required
                    layout="vertical"
                    validateStatus={
                      errors.movement_type && touched.movement_type
                        ? "error"
                        : ""
                    }
                    help={
                      errors.movement_type && touched.movement_type
                        ? errors.movement_type
                        : ""
                    }
                  >
                    <Select
                      options={movementOption}
                      placeholder="Select Movement Type"
                      onChange={(value) =>
                        setFieldValue("movement_type", value)
                      }
                      onBlur={handleBlur}
                      value={values.movement_type}
                      name="movement_type"
                    />
                  </Form.Item>

                  {/* RORO */}
                  <Form.Item
                    label="RORO"
                    required
                    layout="vertical"
                    validateStatus={
                      errors.is_roro && touched.is_roro ? "error" : ""
                    }
                    help={
                      errors.is_roro && touched.is_roro ? errors.is_roro : ""
                    }
                  >
                    <Switch
                      checked={values.is_roro}
                      onChange={(checked) => setFieldValue("is_roro", checked)}
                      onBlur={handleBlur}
                      name="is_roro"
                    />
                  </Form.Item>

                  {/* Third Party */}
                  <Form.Item
                    label="Third Party"
                    required
                    layout="vertical"
                    validateStatus={
                      errors.is_third_party && touched.is_third_party
                        ? "error"
                        : ""
                    }
                    help={
                      errors.is_third_party && touched.is_third_party
                        ? errors.is_third_party
                        : ""
                    }
                  >
                    <Switch
                      checked={values.is_third_party}
                      onChange={(checked) =>
                        setFieldValue("is_third_party", checked)
                      }
                      onBlur={handleBlur}
                      name="is_third_party"
                    />
                  </Form.Item>
                </Row>
                <Divider />
                <Row className="w-100" gutter={30}>
                  {/* Origin Section */}
                  <Col xxl="12">
                    <p className="form-sub-divider">
                      <IoInformationCircleOutline /> Origin
                    </p>
                    <Form.Item
                      label="Origin Agency"
                      required
                      layout="vertical"
                      validateStatus={
                        errors.port_handling_agent_origin &&
                        touched.port_handling_agent_origin
                          ? "error"
                          : ""
                      }
                      help={
                        errors.port_handling_agent_origin &&
                        touched.port_handling_agent_origin
                          ? errors.port_handling_agent_origin
                          : ""
                      }
                    >
                      <Select
                        placeholder="Select Origin Handling Agency"
                        onChange={(value) =>
                          setFieldValue("port_handling_agent_origin", value)
                        }
                        onBlur={handleBlur}
                        value={values.port_handling_agent_origin}
                        name="port_handling_agent_origin"
                      >
                        {actors.map((item) => (
                          <Select.Option key={item.id} value={item.id}>
                            {item.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      label="Port of Origin"
                      required
                      layout="vertical"
                      validateStatus={
                        errors.port_origin && touched.port_origin ? "error" : ""
                      }
                      help={
                        errors.port_origin && touched.port_origin
                          ? errors.port_origin
                          : ""
                      }
                    >
                      <Select
                        placeholder="Select Port of Origin"
                        onChange={(value) =>
                          setFieldValue("port_origin", value)
                        }
                        onBlur={handleBlur}
                        value={values.port_origin}
                        name="port_origin"
                      >
                        {ports.map((item) => (
                          <Select.Option key={item.id} value={item.id}>
                            {item.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      label="Scheduled Start Date"
                      required
                      layout="vertical"
                      validateStatus={
                        errors.scheduled_start_date &&
                        touched.scheduled_start_date
                          ? "error"
                          : ""
                      }
                      help={
                        errors.scheduled_start_date &&
                        touched.scheduled_start_date
                          ? errors.scheduled_start_date
                          : ""
                      }
                    >
                      <Input
                        type="date"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.scheduled_start_date}
                        name="scheduled_start_date"
                      />
                    </Form.Item>
                  </Col>

                  {/* Destination Section */}
                  <Col xxl="12">
                    <p className="form-sub-divider">
                      <IoInformationCircleOutline /> Destination
                    </p>
                    <Form.Item
                      label="Destination Agency"
                      required
                      layout="vertical"
                      validateStatus={
                        errors.port_handling_agent_destinationy &&
                        touched.port_handling_agent_destination
                          ? "error"
                          : ""
                      }
                      help={
                        errors.port_handling_agent_destination &&
                        touched.port_handling_agent_destination
                          ? errors.port_handling_agent_destination
                          : ""
                      }
                    >
                      <Select
                        placeholder="Select Destination Handling Agency"
                        onChange={(value) =>
                          setFieldValue(
                            "port_handling_agent_destination",
                            value
                          )
                        }
                        onBlur={handleBlur}
                        value={values.port_handling_agent_destination}
                        name="port_handling_agent_destination"
                      >
                        {actors.map((item) => (
                          <Select.Option key={item.id} value={item.id}>
                            {item.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      label="Port of Destination"
                      required
                      layout="vertical"
                      validateStatus={
                        errors.port_destination && touched.port_destination
                          ? "error"
                          : ""
                      }
                      help={
                        errors.port_destination && touched.port_destination
                          ? errors.port_destination
                          : ""
                      }
                    >
                      <Select
                        placeholder="Select Port of Destination"
                        onChange={(value) =>
                          setFieldValue("port_destination", value)
                        }
                        onBlur={handleBlur}
                        value={values.port_destination}
                        name="port_destination"
                      >
                        {ports.map((item) => (
                          <Select.Option key={item.id} value={item.id}>
                            {item.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      label="Scheduled End Date"
                      required
                      layout="vertical"
                      validateStatus={
                        errors.scheduled_end_date && touched.scheduled_end_date
                          ? "error"
                          : ""
                      }
                      help={
                        errors.scheduled_end_date && touched.scheduled_end_date
                          ? errors.scheduled_end_date
                          : ""
                      }
                    >
                      <Input
                        type="date"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.scheduled_end_date}
                        name="scheduled_end_date"
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row justify="start" gutter={30}>
                  <Col xl={12}>
                    <Form.Item label="Shipper" required layout="vertical">
                      <Select
                        placeholder="Select the Shipper"
                        onChange={(value) => setFieldValue("shipper", value)}
                        onBlur={handleBlur}
                        name="shipper"
                      >
                        {actors.map((item) => (
                          <Select.Option key={item.id} value={item.id}>
                            {item.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xl={12}>
                    <Form.Item
                      label="Client"
                      required
                      layout="vertical"
                      validateStatus={
                        errors.client && touched.client ? "error" : ""
                      }
                      help={
                        errors.client && touched.client ? errors.client : ""
                      }
                    >
                      <Select
                        placeholder="Select the Client"
                        onChange={(value) => setFieldValue("client", value)}
                        onBlur={handleBlur}
                        value={values.client}
                        name="client"
                      >
                        {client.map((item) => (
                          <Select.Option key={item.id} value={item.id}>
                            {item.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col xl={12}>
                    <Form.Item
                      label="IncoTerms"
                      required
                      layout="vertical"
                      validateStatus={
                        errors.inco_terms && touched.inco_terms ? "error" : ""
                      }
                      help={
                        errors.inco_terms && touched.inco_terms
                          ? errors.inco_terms
                          : ""
                      }
                    >
                      <Select
                        options={incoterms}
                        placeholder="Select the Incoterms"
                        onChange={(value) => setFieldValue("inco_terms", value)}
                        onBlur={handleBlur}
                        value={values.inco_terms}
                        name="inco_terms"
                      />
                    </Form.Item>
                  </Col>

                  <Col xl={12}>
                    <Form.Item
                      label="Priority"
                      required
                      layout="vertical"
                      validateStatus={
                        errors.priority && touched.priority ? "error" : ""
                      }
                      help={
                        errors.priority && touched.priority
                          ? errors.priority
                          : ""
                      }
                    >
                      <Select
                        options={priorityOptions}
                        placeholder="Please Select Priority"
                        onChange={(value) => setFieldValue("priority", value)}
                        onBlur={handleBlur}
                        value={values.priority}
                        name="priority"
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Divider />

                {/* Accounting Information */}
                <p className="form-sub-divider">
                  <IoInformationCircleOutline /> Accounting Information
                </p>
                <Row justify="space-between" gutter={28}>
                  <Col xl={8}>
                    <Form.Item
                      label="Currency"
                      required
                      layout="vertical"
                      validateStatus={
                        errors.currency && touched.currency ? "error" : ""
                      }
                      help={
                        errors.currency && touched.currency
                          ? errors.currency
                          : ""
                      }
                    >
                      <Select
                        placeholder="Please Select Currency"
                        onChange={(value) => setFieldValue("currency", value)}
                        onBlur={handleBlur}
                        value={values.currency}
                        name="currency"
                      >
                        {currency.map((item) => (
                          <Select.Option key={item.id} value={item.id}>
                            {item.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col xl={8}>
                    <Form.Item
                      label="Total Amount"
                      required
                      layout="vertical"
                      validateStatus={
                        errors.total_amount && touched.total_amount
                          ? "error"
                          : ""
                      }
                      help={
                        errors.total_amount && touched.total_amount
                          ? errors.total_amount
                          : ""
                      }
                    >
                      <Input
                        type="number"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.total_amount}
                        name="total_amount"
                      />
                    </Form.Item>
                  </Col>

                  <Col xl={8}>
                    <Form.Item
                      label="Paid Amount"
                      required
                      layout="vertical"
                      validateStatus={
                        errors.paid_amount && touched.paid_amount ? "error" : ""
                      }
                      help={
                        errors.paid_amount && touched.paid_amount
                          ? errors.paid_amount
                          : ""
                      }
                    >
                      <Input
                        type="number"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.paid_amount}
                        name="paid_amount"
                      />
                    </Form.Item>
                  </Col>

                  <Col xl={12}>
                    <Form.Item
                      label="Payment Type"
                      required
                      layout="vertical"
                      validateStatus={
                        errors.payment_type && touched.payment_type
                          ? "error"
                          : ""
                      }
                      help={
                        errors.payment_type && touched.payment_type
                          ? errors.payment_type
                          : ""
                      }
                    >
                      <Radio.Group
                        options={payment_choices}
                        onChange={(e) =>
                          setFieldValue("payment_type", e.target.value)
                        }
                        onBlur={handleBlur}
                        value={values.payment_type}
                        name="payment_type"
                      />
                    </Form.Item>
                  </Col>

                  <Col xl={8}>
                    <Form.Item label="Complementary" required layout="vertical">
                      <Switch
                        checked={values.is_complementary}
                        onChange={(checked) =>
                          setFieldValue("is_complementary", checked)
                        }
                        onBlur={handleBlur}
                        name="is_complementary"
                      />
                    </Form.Item>
                  </Col>
                </Row>

                
              </Panel>
            </Collapse>

            <Collapse defaultActiveKey={["2"]} className="mt-3">
              <Panel header="ADDITIONAL INFORMATION" key="2">
                <Row gutter={16}>
                  {/* Customs and Financial Values */}
                  <Col xl={8}>
                    <Form.Item
                      label="Customs Value"
                      name="customs_value"
                      rules={[
                        {
                          required: true,
                          message: "Customs value is required",
                        },
                      ]}
                    >
                      <Input
                        type="number"
                        placeholder="Enter customs value"
                        min={0}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Freight Value"
                      name="freight_value"
                      rules={[
                        {
                          required: true,
                          message: "Freight value is required",
                        },
                      ]}
                    >
                      <Input
                        type="number"
                        placeholder="Enter freight value"
                        min={0}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Insurance Value"
                      name="insurance_value"
                      rules={[
                        {
                          required: true,
                          message: "Insurance value is required",
                        },
                      ]}
                    >
                      <Input
                        type="number"
                        placeholder="Enter insurance value"
                        min={0}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Invoice Value"
                      name="invoice_value"
                      rules={[
                        {
                          required: true,
                          message: "Invoice value is required",
                        },
                      ]}
                    >
                      <Input
                        type="number"
                        placeholder="Enter invoice value"
                        min={0}
                      />
                    </Form.Item>
                  </Col>

                  {/* Switches */}
                  <Col xl={8}>
                    <Form.Item
                      label="Invoice"
                      name="invoices"
                      valuePropName="checked"
                    >
                      <Switch />
                    </Form.Item>
                    <Form.Item
                      label="Is Dangerous Good"
                      name="is_dangerous_good"
                      valuePropName="checked"
                    >
                      <Switch />
                    </Form.Item>
                    <Form.Item
                      label="Damaged Goods"
                      name="is_damaged_goods"
                      valuePropName="checked"
                    >
                      <Switch />
                    </Form.Item>
                    <Form.Item
                      label="Packing List"
                      name="packing_list"
                      valuePropName="checked"
                    >
                      <Switch />
                    </Form.Item>
                  </Col>

                  {/* Conditional Fields */}
                  <Col xl={8}>
                    <Form.Item
                      noStyle
                      shouldUpdate={(prev, cur) =>
                        prev.is_dangerous_good !== cur.is_dangerous_good
                      }
                    >
                      {({ getFieldValue }) =>
                        getFieldValue("is_dangerous_good") ? (
                          <Form.Item
                            label="IMO Number"
                            name="imo_number"
                            rules={[
                              {
                                required: true,
                                message:
                                  "IMO number is required for dangerous goods",
                              },
                            ]}
                          >
                            <Input placeholder="Enter IMO number" />
                          </Form.Item>
                        ) : null
                      }
                    </Form.Item>

                    <Form.Item
                      label="Final Address"
                      name="final_address"
                      rules={[
                        { required: true, message: "Address is required" },
                      ]}
                    >
                      <Input placeholder="Enter final address" />
                    </Form.Item>
                    <Form.Item
                      label="Delivery Type"
                      name="delivery_type"
                      rules={[
                        {
                          required: true,
                          message: "Delivery type is required",
                        },
                      ]}
                    >
                      <Select placeholder="Select delivery type">
                        <Select.Option value="standard">Standard</Select.Option>
                        <Select.Option value="express">Express</Select.Option>
                        <Select.Option value="pickup">Pickup</Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      label="Document Reference Type"
                      name="doc_ref_type"
                    >
                      <Input placeholder="Enter document reference type" />
                    </Form.Item>
                    <Form.Item label="Declaration Number" name="declaration_no">
                      <Input placeholder="Enter declaration number" />
                    </Form.Item>
                    <Form.Item label="Order Number" name="order_no">
                      <Input placeholder="Enter order number" />
                    </Form.Item>
                  </Col>
                </Row>

                {/* Submit Button */}
                <Row justify="end" className="mt-3">
                  <Col>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Col>
                </Row>
              </Panel>
            </Collapse>
          </Form>
        )}
      </Formik>
      :<Spin></Spin>
    }
    </>
  );
};

export default ShipmentDetails;
