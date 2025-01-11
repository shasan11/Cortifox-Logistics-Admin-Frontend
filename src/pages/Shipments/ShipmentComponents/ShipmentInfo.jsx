import React, { useState } from "react";
import { Row, Col, Button, Dropdown, Menu, Typography, Modal } from "antd";
import {
  SendOutlined,
  PrinterOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import PackagingList from "../ShipmetDocs/PackagingList";
import BillOfLading from "../ShipmetDocs/BL";

const { Title, Text } = Typography;
import { MdOutlineAirplanemodeActive } from "react-icons/md";
import { LiaShippingFastSolid } from "react-icons/lia";
import { GiCargoShip } from "react-icons/gi";
import useFetchApiData from "../../../helper/other/fetchData";

const getTransportModeIcon = (mode) => {
  switch (mode) {
    case "AIR":
      return <MdOutlineAirplanemodeActive size={50} style={{ color: "white" }} />;
    case "SEA":
      return <GiCargoShip style={{ fontSize: "50px", color: "white" }} />;
    case "LAND":
      return <LiaShippingFastSolid style={{ fontSize: "50px", color: "white" }} />;
    default:
      return null;
  }
};

const ShipmentInfo = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    title: "",
    component: <></>,
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  function handleModalOperations(Component,title, data) {
    setModalData({
      title,
      component: <Component shipmentData={data} />,
    });
    showModal();
  }

   
  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={() => { if (data) { handleModalOperations(PackagingList,"Packaging List", data); } }} >
        Generate Packaging List
      </Menu.Item>
      <Menu.Item  key="1" onClick={() => { if (data) { handleModalOperations(BillOfLading,"Bill of Landing", data); } }}>Generate Bill of Landing</Menu.Item>
      <Menu.Item key="3">Action 3</Menu.Item>
    </Menu>
  );

  return (
    <div style={{ background: "#f9f9f9", padding: "20px", borderRadius: "8px" }} className="m-3">
      <Modal
        title={modalData.title}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
        height={150}
      >
        {modalData.component}
      </Modal>
      <Row justify="space-between" align="middle">
        {/* Left Section */}
        <Col xs={24} md={12}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              className="bg-primary"
              style={{
                padding: "10px",
                borderRadius: "4px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {getTransportModeIcon(data.transport_mode)}
            </div>
            <div>
              <Title level={4} style={{ margin: 0 }}>
                {data.transport_mode} SHIPPING ORDER
              </Title>
              <Text style={{ fontSize: "18px" }}>{data.shipment_no}</Text>
            </div>
          </div>
        </Col>

        {/* Right Buttons Section */}
        <Col xs={24} md={12} style={{ textAlign: "right" }}>
          <Button
            type="primary"
            icon={<SendOutlined />}
            style={{ marginRight: "8px" }}
          >
            Send
          </Button>

          <Button type="default" style={{ marginRight: "8px" }}>
            Attachments
          </Button>
          <Button
            type="default"
            icon={<PrinterOutlined />}
            style={{ marginRight: "8px" }}
          >
            Print
          </Button>

          <Dropdown overlay={menu} placement="bottomRight">
            <Button type="default" icon={<MoreOutlined />}>
              Actions
            </Button>
          </Dropdown>
        </Col>
      </Row>

      <Row style={{ marginTop: "20px" }} gutter={16}>
        <Col xs={12} sm={6} className="mb-4">
          <Text strong>DIRECTION</Text>
          <br />
          <Text style={{ fontSize: "18px" }}>{data.direction}</Text>
        </Col>
        <Col xs={12} sm={6}>
          <Text strong>SHIPPER NAME</Text>
          <br />
          <Text style={{ fontSize: "18px" }}>{data.shipper}</Text>
        </Col>
        <Col xs={12} sm={6}>
          <Text strong>CUSTOMER NAME</Text>
          <br />
          <Text style={{ fontSize: "18px" }}>{data.client}</Text>
        </Col>
        <Col xs={12} sm={6}>
          <Text strong>LOAD TYPE</Text>
          <br />
          <Text style={{ fontSize: "18px" }}>{data.service_type}</Text>
        </Col>
        <Col xs={12} sm={6}>
          <Text strong>Start Date</Text>
          <br />
          <Text style={{ fontSize: "18px" }}>{data.scheduled_start_date}</Text>
        </Col>
        <Col xs={12} sm={6}>
          <Text strong>End Date</Text>
          <br />
          <Text style={{ fontSize: "18px" }}>{data.scheduled_end_date}</Text>
        </Col>
      </Row>
    </div>
  );
};

export default ShipmentInfo;
