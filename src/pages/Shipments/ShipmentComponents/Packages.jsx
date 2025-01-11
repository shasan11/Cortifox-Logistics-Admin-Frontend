import React, { useState, useEffect,useRef } from "react";
import * as Yup from "yup";
import { Modal, Button, Input, Form, Typography, Select, InputNumber, Row, Col,Checkbox} from 'antd';
import { useFormik } from "formik";
import SingleTonCrud from "../../../components/SingletonCrud";
import useFetchApiData from "../../../helper/other/fetchData";
const { Text } = Typography;
const { Option } = Select;

// Modal Component

 
// Validation Schema
const ShipmentPackageValidationSchema = Yup.object().shape({
  good_desc: Yup.string().required("Goods description is required"),
  hs_code: Yup.string().nullable(),
  package_type: Yup.string().required("Package type is required"),
  quantity: Yup.number().nullable().typeError("Quantity must be a number"),
  length: Yup.number().nullable(),
  width: Yup.number().nullable(),
  height: Yup.number().nullable(),
  package_unit: Yup.string().required("Package unit is required"),
  gross_weight: Yup.number().nullable(),
  mass_unit: Yup.string().required("Mass unit is required"),
  volumetric_weight: Yup.number().nullable(),
  chargable: Yup.number().nullable(),
});

// Main Component
const ShipmentPackages = ({shipment_no,transport_mode}) => {
  const mass_unit = useFetchApiData('/master/unit-of-measurement/');
  const length_unit = useFetchApiData('/master/unit-of-measurement-length/');
  const package_type = useFetchApiData('/master/package-type/');

  console.warn("Shipment_no",shipment_no)
  const forTitle = "Shipment Packages";
  const endpoint = "/shipments/shipment-packages/";
  const modalTitle = "Shipment Package Form";
  const initialFormValues = {
    shipment:shipment_no,
    good_desc: "",
    hs_code: "",
    package_type: "",
    quantity: 1,
    length: null,
    width: null,
    height: null,
    package_unit: "",
    gross_weight: null,
    mass_unit: "",
    volumetric_weight: null,
    chargable: null,
  };
   

  const getUnitName=(pid)=>{
    const lunit=length_unit.filter((item)=>item.id===pid)[0]?.symbol ||"N/A"  
    return lunit  
  }
  const tableColumns = [
    { headerName: "Goods Description", field: "good_desc", sortable: true, filter: true,  checkboxSelection: true,width:400 },
    { headerName: "HS Code", field: "hs_code", sortable: true, filter: true, width:200 },
    { headerName: "Package", field: "package_type", sortable: true, filter: true,width:200,
      valueGetter: (params) => {
        const matchedItem = package_type.filter(
          (item) => item.id === params.data.package_type
        )[0];
        const result = matchedItem ? matchedItem.name : ""; // Check if matchedItem exists
        
        return result;
      },
      },
    { headerName: "Quantity", field: "quantity", sortable: true, filter: true, width:200 },
    { headerName: "Dimensions (LxWxH)", field: "dimensions", sortable: true, filter: true,width:200,  
      valueFormatter: ({ data }) =>
        `${data.length || 0}x${data.width || 0}x${data.height || 0} (${getUnitName(data.package_unit) || "N/A"})` },
    { headerName: "Gross Weight", field: "gross_weight", sortable: true, filter: true, width:300, 
      valueFormatter: ({ value }) => (value ? `${value} kg` : "N/A") },
    { headerName: "Volumetric Weight", field: "volumetric_weight", sortable: true, filter: true, width:400 },
    { headerName: "Chargeable Weight", field: "chargable", sortable: true, filter: true,  width:400 },
  ];



  const ShipmentPackageFormModal = ({ visible, onCancel, formik, modalTitle }) => {
    const [selectedPackageType, setSelectedPackageType] = useState(null);
    const [autoCalculateVolumetric, setAutoCalculateVolumetric] = useState(false);
    const [autoCalculateChargeable, setAutoCalculateChargeable] = useState(false);
    const volumetric = useRef(0);
    const chargable_wt = useRef(0);
  
  
    useEffect(()=>{
      formik.setFieldValue("volumetric_weight", volumetric.current);
      formik.setFieldValue("chargable",chargable_wt.current);
    },[autoCalculateChargeable,autoCalculateVolumetric,selectedPackageType])
  
     
  
     
  
    const handlePackageTypeChange = (value) => {
      const selectedType = package_type.find((type) => type.id === value);
      if (selectedType) {
        setSelectedPackageType(selectedType);
        formik.setValues({
          ...formik.values,
          package_type: value,
          length: parseFloat(selectedType.length),
          width: parseFloat(selectedType.breadth),
          height: parseFloat(selectedType.width),
          package_unit: length_unit.find((unit) => unit.id === selectedType.length_unit)?.id || "",
        });
      }
    };
  
    const calculateVolumetricWeight = (length, breadth, height, lengthUnitId,quantity) => {
      const lengthUnit = length_unit.find(unit => unit.id === lengthUnitId);
      if (!lengthUnit) return 0;
  
      const conversionFactor = parseFloat(lengthUnit.conversion_to_cm);
      const volume = (length * breadth * height * Math.pow(conversionFactor, 3)*quantity);
  
      let divisor;
      switch (transport_mode.toUpperCase()) {
          case 'AIR':
              divisor = 6000;
              break;
          case 'SEA':
              divisor = 1000; // Adjust according to SEA divisor
              break;
          case 'LAND':
              divisor = 4000; // Adjust according to LAND divisor
              break;
          default:
              throw new Error('Invalid transport mode');
      }
  
      const volumetricWeight = (volume / divisor).toFixed(2);
      volumetric.current = volumetricWeight; // Assuming volumetric is a ref or state
  
      return volumetricWeight;
  };
  
  
  const calculateChargeableWeight = () => {
    const grossWeight = parseFloat(formik.values.gross_weight || 0);
    const massUnitConversion = parseFloat(mass_unit.find(unit => unit.id === formik.values.mass_unit)?.conversion_to_kg || 1);
    const chargeableWeight = Math.max(grossWeight * massUnitConversion, volumetric.current);
    const roundedChargeableWeight = Math.ceil(chargeableWeight); // Round up to the next whole number
    chargable_wt.current = roundedChargeableWeight;
    return roundedChargeableWeight;
  };
  
  
    useEffect(() => {
      if (!visible) {
        setSelectedPackageType(null);
      }
    }, [visible]);
  
    return (
      <Modal
        title={modalTitle}
        visible={visible}
        onCancel={onCancel}
        onOk={formik.handleSubmit}
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
          <Form.Item label="Goods Description">
            <Input.TextArea
              id="good_desc"
              name="good_desc"
              placeholder="Enter goods description"
              value={formik.values.good_desc}
              onChange={formik.handleChange}
              rows={4}
            />
            {formik.touched.good_desc && formik.errors.good_desc && (
              <Text type="danger">{formik.errors.good_desc}</Text>
            )}
          </Form.Item>
  
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="HS Code">
                <Input
                  id="hs_code"
                  name="hs_code"
                  placeholder="Enter HS Code"
                  value={formik.values.hs_code}
                  onChange={formik.handleChange}
                />
              </Form.Item>
            </Col>
  
            <Col span={8}>
              <Form.Item label="Package Type">
                <Select
                  id="package_type"
                  name="package_type"
                  placeholder="Select package type"
                  value={formik.values.package_type}
                  onChange={(value) => {
                    formik.setFieldValue("package_type", value);
                    handlePackageTypeChange(value);
                  }}
                >
                  {package_type?.map((type) => (
                    <Option key={type.id} value={type.id}>
                      {type.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
  
            <Col span={8}>
              <Form.Item label="Quantity">
                <InputNumber
                  id="quantity"
                  name="quantity"
                  placeholder="Enter quantity"
                  value={formik.values.quantity}
                  onChange={(value) => formik.setFieldValue("quantity", value)}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
          </Row>
  
          <Row gutter={16}>
            {/* Dimensions */}
            <Col span={6}>
              <Form.Item label="Length">
                <InputNumber
                  id="length"
                  name="length"
                  value={formik.values.length}
                  onChange={(value) => formik.setFieldValue("length", value)}
                  disabled={!!selectedPackageType}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Width">
                <InputNumber
                  id="width"
                  name="width"
                  value={formik.values.width}
                  onChange={(value) => formik.setFieldValue("width", value)}
                  disabled={!!selectedPackageType}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Height">
                <InputNumber
                  id="height"
                  name="height"
                  value={formik.values.height}
                  onChange={(value) => formik.setFieldValue("height", value)}
                  disabled={!!selectedPackageType}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Package Unit">
                <Select
                  id="package_unit"
                  name="package_unit"
                  value={formik.values.package_unit}
                  onChange={(value) => formik.setFieldValue("package_unit", value)}
                  disabled={!!selectedPackageType}
                >
                  {length_unit?.map((unit) => (
                    <Option key={unit.id} value={unit.id}>
                      {unit.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
  
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Gross Weight">
                <InputNumber
                  id="gross_weight"
                  name="gross_weight"
                  value={formik.values.gross_weight}
                  onChange={(value) => formik.setFieldValue("gross_weight", value)}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Mass Unit">
                <Select
                  id="mass_unit"
                  name="mass_unit"
                  value={formik.values.mass_unit}
                  onChange={(value) => formik.setFieldValue("mass_unit", value)}
                >
                  {mass_unit?.map((unit) => (
                    <Option key={unit.id} value={unit.id}>
                      {unit.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
  
            <Col span={12}>
              <Form.Item label="Volumetric Weight">
                <InputNumber
                  id="volumetric_weight"
                  name="volumetric_weight"
                  value={autoCalculateVolumetric ? calculateVolumetricWeight(formik.values.length, formik.values.width, formik.values.height, formik.values.package_unit,formik.values.quantity) : formik.values.volumetric_weight}
                  onChange={(value) => formik.setFieldValue("volumetric_weight", value)}
                />
              </Form.Item>
            </Col>
  
            <Col span={12}>
              <Form.Item label="Chargeable Weight">
                <InputNumber
                  id="chargable"
                  name="chargable"
                  value={autoCalculateChargeable ? calculateChargeableWeight() : formik.values.chargable}
                  onChange={(value) => formik.setFieldValue("chargable", value)}
                />
              </Form.Item>
            </Col>
          </Row>
  
          <Row>
            <Col span={12}>
              <Checkbox
                checked={autoCalculateVolumetric}
                onChange={(e) => setAutoCalculateVolumetric(e.target.checked)}
              >
                Auto-calculate Volumetric Weight?
              </Checkbox>
            </Col>
  
            <Col span={12}>
              <Checkbox
                checked={autoCalculateChargeable}
                onChange={(e) => setAutoCalculateChargeable(e.target.checked)}
              >
                Auto-calculate Chargeable Weight?
              </Checkbox>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  };
  
  
  return (
    <SingleTonCrud
      forTitle={forTitle}
      endpoint={endpoint}
      modalTitle={modalTitle}
      columnDefs={tableColumns}
      filterurl={`shipment=${shipment_no}`}
      formModal={ShipmentPackageFormModal}
      validationSchema={ShipmentPackageValidationSchema}
      initialFormValues={initialFormValues}
      inactiveAction={false}
      no_header={true}
      deleteAct={true}
    />
  );
};

export default ShipmentPackages;

             
