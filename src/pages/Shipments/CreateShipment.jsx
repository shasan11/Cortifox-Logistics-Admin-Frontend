import { Formik } from "formik";
import {
  Alert,
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
  Tabs,
} from "antd";
import { IoInformationCircleOutline } from "react-icons/io5";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
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
  newShipmentInitialvalues,
  newShipmentValidationSchema,
} from "./ShipmentMasterValues";
import useFetchApiData from "../../helper/other/fetchData";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { TabPane } = Tabs;

const CreateShipment = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  document.title = `Create Shipment - ${
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
  const consignee = useFetchApiData("/clients/consingee/");

  return (
    <>
      <Formik
        initialValues={newShipmentInitialvalues}
        validationSchema={newShipmentValidationSchema}
        onSubmit={(values) => {
          console.log("Trigger");
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
              navigate(`/operations/shipments/details/${response.data.id}`);
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
        }) => (
          <Form
            layout="vertical"
            onFinish={handleSubmit}
            requiredMark="optional"
          >
            {console.log(errors)}
            <Row
              justify="space-between"
              align="middle"
              wrap
              style={{
                background: "#fafafa",
                borderBottom: "1px solid #d9d9d9",
                padding: "15px 25px",
                position: "sticky",
              }}
            >
              <Title level={4}>Create Shipment </Title>
              <Form.Item style={{ marginBottom: "0px" }}>
                {" "}
                <Button
                  block="true"
                  type="primary"
                  htmlType="submit"
                  size="large"
                >
                  {" "}
                  Save{" "}
                </Button>{" "}
              </Form.Item>
            </Row>
            <Collapse defaultActiveKey={["1"]} className="m-3">
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
                    className="w-25"
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
                      size="large"
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
                </Row>
                <Row>
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
                    style={{ marginLeft: "35px" }}
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
                <Row className="w-100">
                  {/* Origin Section */}
                  <Col xl={10} className="p-2">
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
                        size="large"
                        placeholder="Select Origin Handling Agency"
                        onChange={(value) =>
                          setFieldValue("port_handling_agent_origin", value)
                        }
                        onBlur={handleBlur}
                        value={values.origin_handling_agency}
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
                        size="large"
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
                        size="large"
                        type="date"
                        placeholder="Enter Scheduled Date "
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.scheduled_start_date}
                        name="scheduled_start_date"
                      />
                    </Form.Item>
                  </Col>

                  {/* Destination Section */}
                  <Col xl={10} className="p-2 ml-5">
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
                        size="large"
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
                        size="large"
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
                        size="large"
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
                        size="large"
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
                        size="large"
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
                  <Col xl={8}>
                    <Form.Item
                      label="Consignee"
                      required
                      layout="vertical"
                      validateStatus={
                        errors.consignee && touched.consignee ? "error" : ""
                      }
                      help={
                        errors.consignee && touched.consignee
                          ? errors.consignee
                          : ""
                      }
                    >
                      {values.client ? (
                        consignee.filter(
                          (item) => item.client === values.client
                        ).length > 0 ? (
                          <Select
                            size="large"
                            placeholder="Please Select Consignee"
                            onChange={(value) =>
                              setFieldValue("consignee", value)
                            }
                            onBlur={handleBlur}
                            value={values.consignee}
                            name="consignee"
                          >
                            {consignee
                              .filter((item) => item.client === values.client)
                              .map((item) => (
                                <Select.Option key={item.id} value={item.id}>
                                  {item.name}
                                </Select.Option>
                              ))}
                          </Select>
                        ) : (
                          <span style={{ color: "red" }}>
                            No consignee found
                          </span>
                        )
                      ) : (
                        <span style={{ color: "red" }}>
                          Please Select the Client
                        </span>
                      )}
                    </Form.Item>
                  </Col>

                  <Col xl={8}>
                    <Form.Item
                      size="large"
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
                        size="large"
                        name="inco_terms"
                      />
                    </Form.Item>
                  </Col>

                  <Col xl={8}>
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
                      <Radio.Group
                        onChange={(e) =>
                          setFieldValue("priority", e.target.value)
                        }
                        onBlur={handleBlur}
                        value={values.priority}
                        name="priority"
                      >
                        {priorityOptions.map((option) => (
                          <Radio key={option.value} value={option.value}>
                            {option.label}
                          </Radio>
                        ))}
                      </Radio.Group>
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
                        size="large"
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
                        placeholder="Please Enter Total Amount"
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
                        placeholder="Please Enter Paid Amount"
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
                        checked={values.complementary}
                        onChange={(checked) =>
                          setFieldValue("complementary", checked)
                        }
                        onBlur={handleBlur}
                        name="complementary"
                      />
                    </Form.Item>
                  </Col>

                  
                </Row>
                <Row gutter={[16.16]} className="p-3">
                {values.transport_mode === "AIR" && (
                    <>
                      <div className="row">
                        <p className="form-sub-divider">
                          <IoInformationCircleOutline /> Air Freight Specific
                        </p>
                        <div className="col-lg-6">
                          <Form.Item label="AWB">
                            <Input
                              size="large"
                              id="awb"
                              name="awb"
                              placeholder="Enter AWB"
                              value={values.awb}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {touched.awb && errors.awb && (
                              <Text type="danger">{errors.awb}</Text>
                            )}
                          </Form.Item>
                        </div>

                        <div className="col-lg-6">
                          <Form.Item label="Flight Number">
                            <Input
                              size="large"
                              id="flight_number"
                              name="flight_number"
                              placeholder="Enter Flight Number"
                              value={values.flight_number}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {touched.flight_number && errors.flight_number && (
                              <Text type="danger">{errors.flight_number}</Text>
                            )}
                          </Form.Item>
                        </div>

                        <div className="col-lg-6">
                          <Form.Item label="Cargo Terminal">
                            <Input
                              size="large"
                              id="cargo_terminal"
                              name="cargo_terminal"
                              placeholder="Enter Cargo Terminal"
                              value={values.cargo_terminal}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {touched.cargo_terminal &&
                              errors.cargo_terminal && (
                                <Text type="danger">
                                  {errors.cargo_terminal}
                                </Text>
                              )}
                          </Form.Item>
                        </div>

                        <div className="col-lg-6">
                          <Form.Item label="Handling Code">
                            <Input
                              size="large"
                              id="handling_code"
                              name="handling_code"
                              placeholder="Enter Handling Code"
                              value={values.handling_code}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {touched.handling_code && errors.handling_code && (
                              <Text type="danger">{errors.handling_code}</Text>
                            )}
                          </Form.Item>
                        </div>

                        <div className="col-lg-6">
                          <Form.Item label="ULD No">
                            <Input
                              size="large"
                              id="uld_no"
                              name="uld_no"
                              placeholder="Enter ULD Number"
                              value={values.uld_no}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {touched.uld_no && errors.uld_no && (
                              <Text type="danger">{errors.uld_no}</Text>
                            )}
                          </Form.Item>
                        </div>
                      </div>
                    </>
                  )}

                  {values.transport_mode === "SEA" && (
                    <>
                      <p className="form-sub-divider">
                        <IoInformationCircleOutline /> Sea Freight Specific
                      </p>
                      <Row gutter={[16, 16]}>
                        <Col span={12}>
                          <Form.Item label="BOL">
                            <Input
                              size="large"
                              id="bol"
                              name="bol"
                              placeholder="Enter BOL"
                              value={values.bol}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {touched.bol && errors.bol && (
                              <Text type="danger">{errors.bol}</Text>
                            )}
                          </Form.Item>
                        </Col>

                        <Col span={12}>
                          <Form.Item label="Vessel Name">
                            <Input
                              size="large"
                              id="vessel_name"
                              name="vessel_name"
                              placeholder="Enter Vessel Name"
                              value={values.vessel_name}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {touched.vessel_name && errors.vessel_name && (
                              <Text type="danger">{errors.vessel_name}</Text>
                            )}
                          </Form.Item>
                        </Col>

                        <Col span={12}>
                          <Form.Item label="Voyage Number">
                            <Input
                              size="large"
                              id="voyage_number"
                              name="voyage_number"
                              placeholder="Enter Voyage Number"
                              value={values.voyage_number}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {touched.voyage_number && errors.voyage_number && (
                              <Text type="danger">{errors.voyage_number}</Text>
                            )}
                          </Form.Item>
                        </Col>

                        <Col span={12}>
                          <Form.Item label="Container Number">
                            <Input
                              size="large"
                              id="container_number"
                              name="container_number"
                              placeholder="Enter Container Number"
                              value={values.container_number}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {touched.container_number &&
                              errors.container_number && (
                                <Text type="danger">
                                  {errors.container_number}
                                </Text>
                              )}
                          </Form.Item>
                        </Col>

                        <Col span={12}>
                          <Form.Item label="Container Type">
                            <Select
                              size="large"
                              id="container_type"
                              name="container_type"
                              value={values.container_type}
                              onChange={(value) =>
                                setFieldValue("container_type", value)
                              }
                              onBlur={handleBlur}
                            >
                              <Select.Option value="">
                                Select Container Type
                              </Select.Option>
                              <Select.Option value="20ft">20ft</Select.Option>
                              <Select.Option value="40ft">40ft</Select.Option>
                              <Select.Option value="45ft">45ft</Select.Option>
                            </Select>
                            {touched.container_type &&
                              errors.container_type && (
                                <Text type="danger">
                                  {errors.container_type}
                                </Text>
                              )}
                          </Form.Item>
                        </Col>
                      </Row>
                    </>
                  )}

                  {values.transport_mode === "LAND" && (
                    <>
                      <p className="form-sub-divider">
                        <IoInformationCircleOutline /> Land Freight Specific
                      </p>

                      <Row gutter={[16, 16]}>
                        <Col span={12}>
                          <Form.Item label="BOL Land">
                            <Input
                              size="large"
                              id="bol_land"
                              name="bol_land"
                              placeholder="Enter BOL Land"
                              value={values.bol_land}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {touched.bol_land && errors.bol_land && (
                              <Text type="danger">{errors.bol_land}</Text>
                            )}
                          </Form.Item>
                        </Col>

                        <Col span={12}>
                          <Form.Item label="Vehicle Number">
                            <Input
                              size="large"
                              id="vehicle_number"
                              name="vehicle_number"
                              placeholder="Enter Vehicle Number"
                              value={values.vehicle_number}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {touched.vehicle_number &&
                              errors.vehicle_number && (
                                <Text type="danger">
                                  {errors.vehicle_number}
                                </Text>
                              )}
                          </Form.Item>
                        </Col>

                        <Col span={12}>
                          <Form.Item label="Driver Info">
                            <Input
                              size="large"
                              id="driver_info"
                              name="driver_info"
                              placeholder="Enter Driver Info"
                              value={values.driver_info}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {touched.driver_info && errors.driver_info && (
                              <Text type="danger">{errors.driver_info}</Text>
                            )}
                          </Form.Item>
                        </Col>

                        <Col span={12}>
                          <Form.Item label="Route">
                            <Input
                              size="large"
                              id="route"
                              name="route"
                              placeholder="Enter Route"
                              value={values.route}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {touched.route && errors.route && (
                              <Text type="danger">{errors.route}</Text>
                            )}
                          </Form.Item>
                        </Col>

                        <Col span={12}>
                          <Form.Item label="Cargo Type">
                            <Input
                              size="large"
                              id="cargo_type"
                              name="cargo_type"
                              placeholder="Enter Cargo Type"
                              value={values.cargo_type}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {touched.cargo_type && errors.cargo_type && (
                              <Text type="danger">{errors.cargo_type}</Text>
                            )}
                          </Form.Item>
                        </Col>

                        <Col span={12}>
                          <Form.Item label="Trailer Type">
                            <Input
                              size="large"
                              id="trailer_type"
                              name="trailer_type"
                              placeholder="Enter Trailer Type"
                              value={values.trailer_type}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {touched.trailer_type && errors.trailer_type && (
                              <Text type="danger">{errors.trailer_type}</Text>
                            )}
                          </Form.Item>
                        </Col>

                        <Col span={12}>
                          <Form.Item label="Handling Info">
                            <Input
                              size="large"
                              id="handling_info"
                              name="handling_info"
                              placeholder="Enter Handling Info"
                              value={values.handling_info}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {touched.handling_info && errors.handling_info && (
                              <Text type="danger">{errors.handling_info}</Text>
                            )}
                          </Form.Item>
                        </Col>
                      </Row>
                    </>
                  )}
                </Row>

                

                <Tabs
                  defaultActiveKey="1"
                  type="card"
                  style={{ justifyContent: "space-between" }}
                  tabBarClassName="custom-tab-bar"
                >
                  <TabPane tab="Additional Information" key="1">
                    <Alert
                      message="Please save the shipment in order to proceed further"
                      type="warning"
                      showIcon
                    />
                  </TabPane>

                  {type !== "Booking" && (
                    <>
                      <TabPane tab="Transportation" key="2">
                        <Alert
                          message="Please save the shipment in order to proceed further"
                          type="warning"
                          showIcon
                        />
                      </TabPane>

                      <TabPane tab="Waybill" key="3">
                        <Alert
                          message="Please save the shipment in order to proceed further"
                          type="warning"
                          showIcon
                        />
                      </TabPane>
                    </>
                  )}
                  {type !== "Master" && (
                    <TabPane tab="Packages" key="4">
                      <Alert
                        message="Please save the shipment in order to proceed further"
                        type="warning"
                        showIcon
                      />
                    </TabPane>
                  )}

                  <TabPane tab="Charges" key="5">
                    <Alert
                      message="Please save the shipment in order to proceed further"
                      type="warning"
                      showIcon
                    />
                  </TabPane>
                  <TabPane tab="Documents" key="6">
                    <Alert
                      message="Please save the shipment in order to proceed further"
                      type="warning"
                      showIcon
                    />
                  </TabPane>
                </Tabs>
              </Panel>
            </Collapse>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CreateShipment;
