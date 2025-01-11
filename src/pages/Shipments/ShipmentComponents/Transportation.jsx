import React, { useState } from 'react';
import { Formik,ErrorMessage} from 'formik';
import { Tabs, Radio, Select, DatePicker, Input, Button, Row, Col,Form } from 'antd';
import * as Yup from 'yup';
import { IoInformationCircleOutline } from "react-icons/io5";
const { TabPane } = Tabs;
const { Option } = Select;
const { TextArea } = Input;

const validationSchema = Yup.object({
    type: Yup.string().required('Type is required'),
    transport_mode: Yup.string().oneOf(['AIR', 'SEA', 'LAND']).required('Transport mode is required'),
    poa: Yup.string().required("Port of Arrival is required"),
    pod: Yup.string().required("Port of Destination is required"),
    tracking_no: Yup.string().required("Tracjong Number is is required"),
    port_handling_agent: Yup.string(),
    eta: Yup.date().required("Estimated Time of  of Arrival is required"),
    etd: Yup.date().required("Estimated Time of Departure is Required"),
    remarks: Yup.string().required("Estimated Time of Departure is required"),
    expected_start_date: Yup.date().required("Expected Started Date is Required"),
    expected_end_date: Yup.date().required("Expected End Date id Required"),
    actual_start_date: Yup.date().required("This is required"),
    actual_end_date: Yup.date().required("This Field is Required"),
    status: Yup.string().oneOf(['started', 'in_progress', 'completed']).required('Status is required'),
  
    // AIR-specific fields
    awb: Yup.string().when('transport_mode', {
      is: 'AIR',
      then: Yup.string().required('AWB is required for AIR transport'),
      otherwise: Yup.string(),
    }),
    flight_number: Yup.string().when('transport_mode', {
      is: 'AIR',
      then: Yup.string().required('Flight number is required for AIR transport'),
      otherwise: Yup.string(),
    }),
    cargo_terminal: Yup.string().when('transport_mode', {
      is: 'AIR',
      then: Yup.string().required('Cargo terminal is required for AIR transport'),
      otherwise: Yup.string(),
    }),
    handling_code: Yup.string().when('transport_mode', {
      is: 'AIR',
      then: Yup.string().required('Handling code is required for AIR transport'),
      otherwise: Yup.string(),
    }),
    master: Yup.string().when('transport_mode', {
      is: 'AIR',
      then: Yup.string().required('Master is required for AIR transport'),
      otherwise: Yup.string(),
    }),
    is_loaded: Yup.string().when('transport_mode', {
      is: 'AIR',
      then: Yup.string().required('Is loaded is required for AIR transport'),
      otherwise: Yup.string(),
    }),
    booking_status: Yup.string().when('transport_mode', {
      is: 'AIR',
      then: Yup.string().required('Booking status is required for AIR transport'),
      otherwise: Yup.string(),
    }),
    uld_no: Yup.string().when('transport_mode', {
      is: 'AIR',
      then: Yup.string().required('ULD No is required for AIR transport'),
      otherwise: Yup.string(),
    }),
  
    // SEA-specific fields
    bol: Yup.string().when('transport_mode', {
      is: 'SEA',
      then: Yup.string().required('BOL is required for SEA transport'),
      otherwise: Yup.string(),
    }),
    vessel_name: Yup.string().when('transport_mode', {
      is: 'SEA',
      then: Yup.string().required('Vessel name is required for SEA transport'),
      otherwise: Yup.string(),
    }),
    voyage_number: Yup.string().when('transport_mode', {
      is: 'SEA',
      then: Yup.string().required('Voyage number is required for SEA transport'),
      otherwise: Yup.string(),
    }),
    container_number: Yup.string().when('transport_mode', {
      is: 'SEA',
      then: Yup.string().required('Container number is required for SEA transport'),
      otherwise: Yup.string(),
    }),
    container_type: Yup.string().when('transport_mode', {
      is: 'SEA',
      then: Yup.string().required('Container type is required for SEA transport'),
      otherwise: Yup.string(),
    }),
  
    // LAND-specific fields
    bol_land: Yup.string().when('transport_mode', {
      is: 'LAND',
      then: Yup.string().required('BOL is required for LAND transport'),
      otherwise: Yup.string(),
    }),
    vehicle_number: Yup.string().when('transport_mode', {
      is: 'LAND',
      then: Yup.string().required('Vehicle number is required for LAND transport'),
      otherwise: Yup.string(),
    }),
    driver_info: Yup.string().when('transport_mode', {
      is: 'LAND',
      then: Yup.string().required('Driver info is required for LAND transport'),
      otherwise: Yup.string(),
    }),
    route: Yup.string().when('transport_mode', {
      is: 'LAND',
      then: Yup.string().required('Route is required for LAND transport'),
      otherwise: Yup.string(),
    }),
    cargo_type: Yup.string().when('transport_mode', {
      is: 'LAND',
      then: Yup.string().required('Cargo type is required for LAND transport'),
      otherwise: Yup.string(),
    }),
    trailer_type: Yup.string().when('transport_mode', {
      is: 'LAND',
      then: Yup.string().required('Trailer type is required for LAND transport'),
      otherwise: Yup.string(),
    }),
    handling_info: Yup.string().when('transport_mode', {
      is: 'LAND',
      then: Yup.string().required('Handling info is required for LAND transport'),
      otherwise: Yup.string(),
    }),
  });

const Transportation = () => {
  const [currentTab, setCurrentTab] = useState('pre');
  const [transportMode, setTransportMode] = useState('AIR');

  const handleSubmit = (values) => {
    console.log('Form values:', values);
  };


  const tabHandler=(value)=>{
    
  }

  return (
    <Formik
      initialValues={{
        type: 'pre',
        transport_mode: 'AIR',
        poa: '',
        pod: '',
        tracking_no: '',
        port_handling_agent: '',
        eta: '',
        etd: '',
        remarks: '',
        expected_start_date: '',
        expected_end_date: '',
        actual_start_date: '',
        actual_end_date: '',
        status: 'started',

        // AIR-specific fields
        awb: '',
        flight_number: '',
        cargo_terminal: '',
        handling_code: '',
        master: '',
        is_loaded: '',
        booking_status: '',
        uld_no: '',

        // SEA-specific fields
        bol: '',
        vessel_name: '',
        voyage_number: '',
        container_number: '',
        container_type: '',

        // LAND-specific fields
        bol_land: '',
        vehicle_number: '',
        driver_info: '',
        route: '',
        cargo_type: '',
        trailer_type: '',
        handling_info: '',
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, touched,handleChange, setFieldValue,errors,handleSubmit }) => (
        <Form>
          <Tabs activeKey={currentTab} onChange={(key) => setCurrentTab(key)} type='card'>
            <TabPane tab="Pre" key="pre" />
            <TabPane tab="Post" key="post" />
            <TabPane tab="Main" key="main" />
          </Tabs>
{console.log("Error",errors,"Values",values)}
          
          <Row gutter={32} style={{ marginTop: "35px" }}>
  <Col span={12}>
    <Form.Item
      label="Transport Mode"
      required
      layout="vertical"
      help={touched.transport_mode && errors.transport_mode ? errors.transport_mode : ""}
      validateStatus={touched.transport_mode && errors.transport_mode ? "error" : ""}
    >
      <Radio.Group
        onChange={(e) => {
          setFieldValue('transport_mode', e.target.value);
          setTransportMode(e.target.value);
        }}
        value={values.transport_mode}
      >
        <Radio value="AIR">AIR</Radio>
        <Radio value="SEA">SEA</Radio>
        <Radio value="LAND">LAND</Radio>
      </Radio.Group>
    </Form.Item>
  </Col>

  <Col span={12}>
    <Form.Item
      required
      label="Status"
      layout="vertical"
      help={touched.status && errors.status ? errors.status : ""}
      validateStatus={touched.status && errors.status ? "error" : ""}
    >
      <Radio.Group
        onChange={(e) => setFieldValue('status', e.target.value)}
        value={values.status}
      >
        <Radio value="started">Started</Radio>
        <Radio value="inprogress">In Progress</Radio>
        <Radio value="customs-progress">Customs Progress</Radio>
        <Radio value="customs-cleared">Customs Cleared</Radio>
        <Radio value="ended">Ended</Radio>
      </Radio.Group>
    </Form.Item>
  </Col>
</Row>

<Row gutter={32} style={{ marginTop: "35px" }}>
  <Col span={12}>
    <Form.Item
      label="Port of Arrival"
      required
      layout="vertical"
      help={touched.poa && errors.poa ? errors.poa : ""}
      validateStatus={touched.poa && errors.poa ? "error" : ""}
    >
      <Select
        onChange={(value) => setFieldValue('poa', value)}
        value={values.poa}
      >
        <Option value="poa1">POA1</Option>
        <Option value="poa2">POA2</Option>
      </Select>
    </Form.Item>
  </Col>

  <Col span={12}>
    <Form.Item
      label="Tracking No"
       layout="vertical"
      help={touched.tracking_no && errors.tracking_no ? errors.tracking_no : ""}
      validateStatus={touched.tracking_no && errors.tracking_no ? "error" : ""}
    >
      <Input
        name="tracking_no"
        value={values.tracking_no}
        onChange={handleChange}
      />
    </Form.Item>
  </Col>
</Row>

<Row gutter={32} style={{ marginTop: "35px" }}>
  <Col span={12}>
    <Form.Item
      label="Port of Destination"
      required
      layout="vertical"
      help={touched.pod && errors.pod ? errors.pod : ""}
      validateStatus={touched.pod && errors.pod ? "error" : ""}
    >
      <Select
        onChange={(value) => setFieldValue('pod', value)}
        value={values.pod}
      >
        <Option value="pod1">POD1</Option>
        <Option value="pod2">POD2</Option>
      </Select>
    </Form.Item>
  </Col>
  
  <Col span={12}>
    <Form.Item
      label="Port of Origin Handling Agent"
       layout="vertical"
      help={touched.port_handling_agent && errors.port_handling_agent ? errors.port_handling_agent : ""}
      validateStatus={touched.port_handling_agent && errors.port_handling_agent ? "error" : ""}
    >
      <Select
        onChange={(value) => setFieldValue('port_handling_agent', value)}
        value={values.port_handling_agent}
      >
        <Option value="agent1">Agent 1</Option>
        <Option value="agent2">Agent 2</Option>
      </Select>
    </Form.Item>
  </Col>
</Row>

<Row gutter={32} style={{ marginTop: "35px" }}>
  <Col span={12}>
    <Form.Item
      label="ETA"
       layout="vertical"
      help={touched.eta && errors.eta ? errors.eta : ""}
      validateStatus={touched.eta && errors.eta ? "error" : ""}
    >
      <Input
        type='date'
        onChange={handleChange}
        value={values.eta}
        name="eta"
      />
    </Form.Item>
  </Col>
  
  <Col span={12}>
    <Form.Item
      label="ETD"
       layout="vertical"
      help={touched.etd && errors.etd ? errors.etd : ""}
      validateStatus={touched.etd && errors.etd ? "error" : ""}
    >
      <Input
        type='date'
        onChange={handleChange}
        value={values.etd}
        name="etd"
      />
    </Form.Item>
  </Col>
</Row>

<Row gutter={32} style={{ marginTop: "35px" }}>
  <Col span={12}>
    <Form.Item
      label="Remarks"
       layout="vertical"
      help={touched.remarks && errors.remarks ? errors.remarks : ""}
      validateStatus={touched.remarks && errors.remarks ? "error" : ""}
    >
      <Input
        name="remarks"
        value={values.remarks}
        onChange={handleChange}
      />
    </Form.Item>
  </Col>
</Row>

<Row gutter={32} style={{ marginTop: "35px" }}>
  <Col span={12}>
    <Form.Item
      label="Expected Start Date"
       layout="vertical"
      help={touched.expected_start_date && errors.expected_start_date ? errors.expected_start_date : ""}
      validateStatus={touched.expected_start_date && errors.expected_start_date ? "error" : ""}
    >
      <Input
        type='date'
        onChange={(date, dateString) => setFieldValue('expected_start_date', dateString)}
        value={values.expected_start_date}
      />
    </Form.Item>
  </Col>

  <Col span={12}>
    <Form.Item
      label="Expected End Date"
       layout="vertical"
      help={touched.expected_end_date && errors.expected_end_date ? errors.expected_end_date : ""}
      validateStatus={touched.expected_end_date && errors.expected_end_date ? "error" : ""}
    >
      <Input
        type='date'
        onChange={(date, dateString) => setFieldValue('expected_end_date', dateString)}
        value={values.expected_end_date}
      />
    </Form.Item>
  </Col>
</Row>

<Row gutter={32} style={{ marginTop: "35px" }}>
  <Col span={12}>
    <Form.Item
      label="Actual Start Date"
       layout="vertical"
      help={touched.actual_start_date && errors.actual_start_date ? errors.actual_start_date : ""}
      validateStatus={touched.actual_start_date && errors.actual_start_date ? "error" : ""}
    >
      <Input
        type='date'
         layout="vertical"
        onChange={(date, dateString) => setFieldValue('actual_start_date', dateString)}
        value={values.actual_start_date}
      />
    </Form.Item>
  </Col>

  <Col span={12}>
    <Form.Item
      label="Actual End Date"
       layout="vertical"
      help={touched.actual_end_date && errors.actual_end_date ? errors.actual_end_date : ""}
      validateStatus={touched.actual_end_date && errors.actual_end_date ? "error" : ""}
    >
      <Input
        type='date'
        onChange={(date, dateString) => setFieldValue('actual_end_date', dateString)}
        value={values.actual_end_date}
      />
    </Form.Item>
  </Col>
</Row>





          {transportMode === 'AIR' && (
            <>
             <Col xl={10} className="p-2">
                <p className="form-sub-divider">
                    <IoInformationCircleOutline /> Air Freight Specific
                </p>
            </Col>
            <Row gutter={16}>
              <Col span={8}>
                <label>AWB</label>
                <Input name="awb" value={values.awb} onChange={handleChange} />
              </Col>
              <Col span={8}>
                <label>Flight Number</label>
                <Input name="flight_number" value={values.flight_number} onChange={handleChange} />
              </Col>
              <Col span={8}>
                <label>Cargo Terminal</label>
                <Input name="cargo_terminal" value={values.cargo_terminal} onChange={handleChange} />
              </Col>
            </Row>
          
            <Row gutter={16}>
              <Col span={8}>
                <label>Handling Code</label>
                <Input name="handling_code" value={values.handling_code} onChange={handleChange} />
              </Col>
              <Col span={8}>
                <label>Master</label>
                <Input name="master" value={values.master} onChange={handleChange} />
              </Col>
              <Col span={8}>
              <Form.Item label="Is Loaded" required layout='vertical' style={{marginTop:"10px"}}> 
                 <Radio.Group
                  onChange={(e) => setFieldValue('is_loaded', e.target.value)}
                  value={values.is_loaded}
                >
                  <Radio value={true}>Yes</Radio>
                  <Radio value={false}>No</Radio>
                </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
          
            <Row gutter={16}>
              <Col span={8}>
                <label>Booking Status</label>
                <Input name="booking_status" value={values.booking_status} onChange={handleChange} />
              </Col>
              <Col span={8}>
                <label>ULD No</label>
                <Input name="uld_no" value={values.uld_no} onChange={handleChange} />
              </Col>
            </Row>
          </>
          
          )}

          {transportMode === 'SEA' && (
            <>
                        <Col xl={10} className="p-2">
                <p className="form-sub-divider">
                    <IoInformationCircleOutline /> Sea Freight Specific
                </p>
            </Col>
            <Row gutter={16}>
              <Col span={8}>
                <label>BOL</label>
                <Input name="bol" value={values.bol} onChange={handleChange} />
              </Col>
              <Col span={8}>
                <label>Vessel Name</label>
                <Input name="vessel_name" value={values.vessel_name} onChange={handleChange} />
              </Col>
              <Col span={8}>
                <label>Voyage Number</label>
                <Input name="voyage_number" value={values.voyage_number} onChange={handleChange} />
              </Col>
            </Row>
          
            <Row gutter={16}>
              <Col span={8}>
                <label>Container Number</label>
                <Input name="container_number" value={values.container_number} onChange={handleChange} />
              </Col>
              <Col span={8}>
                <label>Container Type</label>
                <Input name="container_type" value={values.container_type} onChange={handleChange} />
              </Col>
            </Row>
          </>
          
          )}

          {transportMode === 'LAND' && (
            <>
            <Col xl={10} className="p-2">
                <p className="form-sub-divider">
                    <IoInformationCircleOutline /> Land Freight Specific
                </p>
            </Col>
            <Row gutter={16}>
              <Col span={8}>
                <label>BOL (Land)</label>
                <Input name="bol_land" value={values.bol_land} onChange={handleChange} />
              </Col>
              <Col span={8}>
                <label>Vehicle Number</label>
                <Input name="vehicle_number" value={values.vehicle_number} onChange={handleChange} />
              </Col>
              <Col span={8}>
                <label>Driver Info</label>
                <Input name="driver_info" value={values.driver_info} onChange={handleChange} />
              </Col>
            </Row>
          
            <Row gutter={16}>
              <Col span={8}>
                <label>Route</label>
                <Input name="route" value={values.route} onChange={handleChange} />
              </Col>
              <Col span={8}>
                <label>Cargo Type</label>
                <Input name="cargo_type" value={values.cargo_type} onChange={handleChange} />
              </Col>
              <Col span={8}>
                <label>Trailer Type</label>
                <Input name="trailer_type" value={values.trailer_type} onChange={handleChange} />
              </Col>
            </Row>
          
            <Row gutter={16}>
              <Col span={8}>
                <label>Handling Info</label>
                <Input name="handling_info" value={values.handling_info} onChange={handleChange} />
              </Col>
            </Row>
          </>
          
          )}

          <Button type="primary" htmlType="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default Transportation;
