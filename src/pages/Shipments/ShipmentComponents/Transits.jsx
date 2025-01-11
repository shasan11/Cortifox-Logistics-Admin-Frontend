import React from "react";
import * as Yup from "yup";
import {
  Modal,
  Button,
  Input,
  Select,
  DatePicker,
  Form,
  Row,
  Col,
  Radio,
  Typography,
} from "antd";
import { useFormik } from "formik";
import SingleTonCrud from "../../../components/SingletonCrud";
import useFetchApiData from "../../../helper/other/fetchData";
import moment from "moment";
import { IoInformationCircleOutline } from "react-icons/io5";

const { Option } = Select;
const { Text } = Typography;

// Transit Form Modal component
const TransitFormModal = ({ visible, onCancel, formik, modalTitle }) => {
  const ports= useFetchApiData("/master/ports"); // Assuming this fetches data for select options

  return (
    <Modal
      title={modalTitle}
      size="large"
      visible={visible}
      onCancel={onCancel}
      onOk={formik.handleSubmit}
      width={1000}
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
        <div className="row">
          <div className="col-lg-6">
            <Form.Item label="Transport Mode">
              <Radio.Group
                id="transport_mode"
                name="transport_mode"
                size="large"
                buttonStyle="solid"
                value={formik.values.transport_mode}
                onChange={(e) =>
                  formik.setFieldValue("transport_mode", e.target.value)
                }
                onBlur={formik.handleBlur}
              >
                <Radio.Button value="AIR">Air</Radio.Button>
                <Radio.Button value="SEA">Sea</Radio.Button>
                <Radio.Button value="LAND">Land</Radio.Button>
              </Radio.Group>
              {formik.touched.transport_mode &&
                formik.errors.transport_mode && (
                  <Text type="danger">{formik.errors.transport_mode}</Text>
                )}
            </Form.Item>
          </div>
          <div className="col-lg-6">
            <Form.Item label="Status">
              <Radio.Group
                id="status"
                name="status"
                size="large"
                buttonStyle="solid"
                value={formik.values.status}
                onChange={(e) => formik.setFieldValue("status", e.target.value)}
                onBlur={formik.handleBlur}
              >
                <Radio.Button value="started">Started</Radio.Button>
                <Radio.Button value="in_progress">In Progress</Radio.Button>
                <Radio.Button value="completed">Completed</Radio.Button>
              </Radio.Group>
              {formik.touched.status && formik.errors.status && (
                <Text type="danger">{formik.errors.status}</Text>
              )}
            </Form.Item>
          </div>
          <div className="col-lg-6">
            <Form.Item label="Port of Arrival">
              <Select
                size="large"
                id="poa"
                name="poa"
                value={formik.values.poa}
                onChange={(value) => formik.setFieldValue("poa", value)}
                onBlur={formik.handleBlur}
              >
                {/* Add your dynamic ports data here */}
                {ports?.map((item) => (
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
              {formik.touched.poa && formik.errors.poa && (
                <Text type="danger">{formik.errors.poa}</Text>
              )}
            </Form.Item>
          </div>
          <div className="col-lg-6">
            <Form.Item label="Transit Handling Agent">
              <Select
                size="large"
                id="port_handling_agent"
                name="port_handling_agent"
                value={formik.values.port_handling_agent}
                onChange={(value) => formik.setFieldValue("port_handling_agent", value)}
                onBlur={formik.handleBlur}
              >
                {/* Add your dynamic ports data here */}
                {ports?.map((item) => (
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
              {formik.touched.poa && formik.errors.port_handling_agent && (
                <Text type="danger">{formik.errors.port_handling_agent}</Text>
              )}
            </Form.Item>
          </div>
          <div className="col-lg-6">
            <Form.Item label="Port of Destination">
              <Select
                size="large"
                id="pod"
                name="pod"
                placeholder="Enter Port of Destination"
                value={formik.values.pod}
                onChange={(value) => formik.setFieldValue("pod", value)}
                onBlur={formik.handleBlur}
              >
                {/* Add your dynamic ports data here */}
                {ports?.map((item) => (
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
              {formik.touched.pod && formik.errors.pod && (
                <Text type="danger">{formik.errors.pod}</Text>
              )}
            </Form.Item>
          </div>
          <div className="col-lg-6">
            <Form.Item label="Tracking Number">
              <Input
                size="large"
                id="tracking_no"
                name="tracking_no"
                placeholder="Enter tracking number"
                value={formik.values.tracking_no}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.tracking_no && formik.errors.tracking_no && (
                <Text type="danger">{formik.errors.tracking_no}</Text>
              )}
            </Form.Item>
          </div>
          <div className="col-lg-6">
            <Form.Item label="Estimated Time of Arrival (ETA)">
              <Input
                type="date"
                size="large"
                id="eta"
                name="eta"
                value={formik.values.eta}
                onChange={formik.handleChange}
              />
              {formik.touched.eta && formik.errors.eta && (
                <Text type="danger">{formik.errors.eta}</Text>
              )}
            </Form.Item>
          </div>
          <div className="col-lg-6">
            <Form.Item label="Estimated Time of Departure (ETD)">
              <Input
                type="date"
                size="large"
                id="etd"
                name="etd"
                value={formik.values.etd}
                onChange={formik.handleChange}
              />
              {formik.touched.etd && formik.errors.etd && (
                <Text type="danger">{formik.errors.etd}</Text>
              )}
            </Form.Item>
          </div>
          <div className="col-lg-6">
            <Form.Item label="Remarks">
              <Input
                size="large"
                id="remarks"
                name="remarks"
                placeholder="Enter remarks"
                value={formik.values.remarks}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.remarks && formik.errors.remarks && (
                <Text type="danger">{formik.errors.remarks}</Text>
              )}
            </Form.Item>
          </div>
          <div className="col-lg-6">
            <Form.Item label="Expected Start Date">
              <Input
                type="date"
                size="large"
                id="expected_start_date"
                name="expected_start_date"
                value={formik.values.expected_start_date}
                onChange={formik.handleChange}
              />
              {formik.touched.expected_start_date &&
                formik.errors.expected_start_date && (
                  <Text type="danger">{formik.errors.expected_start_date}</Text>
                )}
            </Form.Item>
          </div>
          <div className="col-lg-6">
            <Form.Item label="Expected End Date">
              <Input
                type="date"
                size="large"
                id="expected_end_date"
                name="expected_end_date"
                value={ formik.values.expected_end_date }
                onChange={formik.handleChange}
              />
              {formik.touched.expected_end_date &&
                formik.errors.expected_end_date && (
                  <Text type="danger">{formik.errors.expected_end_date}</Text>
                )}
            </Form.Item>
          </div>
        </div>

        {/* Status */}

        {formik.values.transport_mode === "AIR" && (
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
                    value={formik.values.awb}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.awb && formik.errors.awb && (
                    <Text type="danger">{formik.errors.awb}</Text>
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
                    value={formik.values.flight_number}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.flight_number &&
                    formik.errors.flight_number && (
                      <Text type="danger">{formik.errors.flight_number}</Text>
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
                    value={formik.values.cargo_terminal}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.cargo_terminal &&
                    formik.errors.cargo_terminal && (
                      <Text type="danger">{formik.errors.cargo_terminal}</Text>
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
                    value={formik.values.handling_code}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.handling_code &&
                    formik.errors.handling_code && (
                      <Text type="danger">{formik.errors.handling_code}</Text>
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
                    value={formik.values.uld_no}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.uld_no && formik.errors.uld_no && (
                    <Text type="danger">{formik.errors.uld_no}</Text>
                  )}
                </Form.Item>
              </div>
            </div>
          </>
        )}

        {formik.values.transport_mode === "SEA" && (
          <Row gutter={[16, 16]}>
            <p className="form-sub-divider">
              <IoInformationCircleOutline /> Sea Freight Specific
            </p>
            <Col span={12}>
              <Form.Item label="BOL">
                <Input
                  size="large"
                  id="bol"
                  name="bol"
                  placeholder="Enter BOL"
                  value={formik.values.bol}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.bol && formik.errors.bol && (
                  <Text type="danger">{formik.errors.bol}</Text>
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
                  value={formik.values.vessel_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.vessel_name && formik.errors.vessel_name && (
                  <Text type="danger">{formik.errors.vessel_name}</Text>
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
                  value={formik.values.voyage_number}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.voyage_number &&
                  formik.errors.voyage_number && (
                    <Text type="danger">{formik.errors.voyage_number}</Text>
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
                  value={formik.values.container_number}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.container_number &&
                  formik.errors.container_number && (
                    <Text type="danger">{formik.errors.container_number}</Text>
                  )}
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Container Type">
                <Select
                  size="large"
                  id="container_type"
                  name="container_type"
                  value={formik.values.container_type}
                  onChange={(value) =>
                    formik.setFieldValue("container_type", value)
                  }
                  onBlur={formik.handleBlur}
                >
                  <Select.Option value="">Select Container Type</Select.Option>
                  <Select.Option value="20ft">20ft</Select.Option>
                  <Select.Option value="40ft">40ft</Select.Option>
                  <Select.Option value="45ft">45ft</Select.Option>
                </Select>
                {formik.touched.container_type &&
                  formik.errors.container_type && (
                    <Text type="danger">{formik.errors.container_type}</Text>
                  )}
              </Form.Item>
            </Col>
          </Row>
        )}

        {formik.values.transport_mode === "LAND" && (
          <Row gutter={[16, 16]}>
            <p className="form-sub-divider">
              <IoInformationCircleOutline /> Land Freight Specific
            </p>
            <Col span={12}>
              <Form.Item label="BOL Land">
                <Input
                  size="large"
                  id="bol_land"
                  name="bol_land"
                  placeholder="Enter BOL Land"
                  value={formik.values.bol_land}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.bol_land && formik.errors.bol_land && (
                  <Text type="danger">{formik.errors.bol_land}</Text>
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
                  value={formik.values.vehicle_number}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.vehicle_number &&
                  formik.errors.vehicle_number && (
                    <Text type="danger">{formik.errors.vehicle_number}</Text>
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
                  value={formik.values.driver_info}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.driver_info && formik.errors.driver_info && (
                  <Text type="danger">{formik.errors.driver_info}</Text>
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
                  value={formik.values.route}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.route && formik.errors.route && (
                  <Text type="danger">{formik.errors.route}</Text>
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
                  value={formik.values.cargo_type}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.cargo_type && formik.errors.cargo_type && (
                  <Text type="danger">{formik.errors.cargo_type}</Text>
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
                  value={formik.values.trailer_type}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.trailer_type && formik.errors.trailer_type && (
                  <Text type="danger">{formik.errors.trailer_type}</Text>
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
                  value={formik.values.handling_info}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.handling_info &&
                  formik.errors.handling_info && (
                    <Text type="danger">{formik.errors.handling_info}</Text>
                  )}
              </Form.Item>
            </Col>
          </Row>
        )}
      </Form>
    </Modal>
  );
};

const validationSchema = Yup.object({
  transport_mode: Yup.string()
    .oneOf(["AIR", "SEA", "LAND"])
    .required("Transport mode is required"),
  poa: Yup.string().required("Port of Arrival is required"),
  pod: Yup.string().required("Port of Destination is required"),
  tracking_no: Yup.string().required("Tracking Number is required"),
  port_handling_agent: Yup.string(),
  eta: Yup.string().required("Estimated Time of Arrival is required"),
  etd: Yup.string().required("Estimated Time of Departure is Required"),
  remarks: Yup.string().required("Remarks are required"),
  expected_start_date: Yup.string().required("Expected Start Date is Required"),
  expected_end_date: Yup.string().required("Expected End Date is Required"),
  status: Yup.string()
    .oneOf(["started", "in_progress", "completed"])
    .required("Status is required"),

   
});

const Transits = ({ shipment_id }) => {
  const forTitle = "Transits";
  const endpoint = "/shipments/transits/"
  const modalTitle = "Transit Form";

  // Initial values for the form
  const initialValues = {
    shipment: shipment_id,
   
    transport_mode: "AIR", // Default value selected
    poa: "", // Select options for ports
    pod: "",
    tracking_no: "",
    port_handling_agent: "",
    eta: "",
    etd: "",
    remarks: "",
    expected_start_date: "",
    expected_end_date: "",
    status: "started",

    // AIR-specific fields
    awb: "",
    flight_number: "",
    cargo_terminal: "",
    handling_code: "",    
    uld_no: "",

    // SEA-specific fields
    bol: "",
    vessel_name: "",
    voyage_number: "",
    container_number: "",
    container_type: "",

    // LAND-specific fields
    bol_land: "",
    vehicle_number: "",
    driver_info: "",
    route: "",
    cargo_type: "",
    trailer_type: "",
    handling_info: "",
  };

  const ports= useFetchApiData("/master/ports");


  const tableColumns = [
    
    {
      headerName: "Mode",
      field: "transport_mode",
      sortable: true,
      filter: true,
      width:200
    },
    {
      headerName: "Port of Arrival",
      field: "poa",
      sortable: true,
      filter: true,
      valueGetter: (params) => {
        const matchedItem = ports.filter(
          (item) => item.id === params.data.poa
        )[0];
        const result = matchedItem ? matchedItem.name : ""; // Check if matchedItem exists
        
        return result;
        
      },
      width:250,
    },
    {
      headerName: "Port of Destination",
      field: "pod",
      sortable: true,
      filter: true,
      valueGetter: (params) => {
        const matchedItem = ports.filter(
          (item) => item.id === params.data.poa
        )[0];
        const result = matchedItem ? matchedItem.name : ""; // Check if matchedItem exists
        
        return result;
      },
      width:250
    },
    {
      headerName: "Tracking Number",
      field: "tracking_no",
      sortable: true,
      filter: true,
      width:250
    },
  ];

  return (
    <SingleTonCrud
      forTitle={forTitle}
      endpoint={endpoint}
      filterurl={"shipment="+shipment_id}
      modalTitle={modalTitle}
      columnDefs={tableColumns}
      formModal={TransitFormModal}
      validationSchema={validationSchema}
      initialFormValues={initialValues}
      no_header={true}
    />
  );
};

export default Transits;
