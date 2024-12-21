import React from "react";
import { Card, Row, Col, Typography, Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import {
  DatabaseOutlined,
  BranchesOutlined,
  ContainerOutlined,
  TagOutlined,
  DollarCircleOutlined,
  CreditCardOutlined,
  AppstoreAddOutlined,
  FileSearchOutlined,
  BuildOutlined,
} from "@ant-design/icons";

const MasterDataLinks = () => {
  const masterDataItems = [
    { name: "Ports", path: "/master/master-data/port", icon: <DatabaseOutlined /> },
    {
      name: "Branches",
      path: "/master-data/branches",
      icon: <BranchesOutlined />,
    },
    {
      name: "Length Unit",
      path: "/master/master-data/length-unit",
      icon: <ContainerOutlined />,
    },
    {
      name: "Mass Unit",
      path: "/master/master-data/mass-unit",
      icon: <TagOutlined />,
    },
    {
      name: "Shipping Terms",
      path: "/master-data/shipping-terms",
      icon: <FileSearchOutlined />,
    },
    {
      name: "Packages Types",
      path: "/master-data/packages-types",
      icon: <AppstoreAddOutlined />,
    },
    {
      name: "Currencies",
      path: "/master-data/currencies",
      icon: <DollarCircleOutlined />,
    },
    {
      name: "Payment Mode",
      path: "/master-data/payment-mode",
      icon: <CreditCardOutlined />,
    },
    {
      name: "Delivery Type",
      path: "/master-data/delivery-type",
      icon: <BuildOutlined />,
    },
    {
      name: "Shipment Sub Type",
      path: "/master-data/shipment-sub-type",
      icon: <FileSearchOutlined />,
    },
  ];

  return (
    <>
      <Row
        justify="space-between"
        align="middle"
        wrap
        style={{
          background: "#fafafa",
          borderBottom: "1px solid #d9d9d9",
          padding: "15px 25px",
        }}
      >
        <Typography.Title level={4} style={{ margin: 0 }}>
          Master Data
        </Typography.Title>

        <Breadcrumb separator="-">
          <Breadcrumb.Item>Master</Breadcrumb.Item>
          <Breadcrumb.Item>Master Data</Breadcrumb.Item>
        </Breadcrumb>
      </Row>

      <div className="p-4">
        <Row gutter={[16, 16]}>
          {masterDataItems.map((item, index) => (
            <Col span={6} key={index}>
              <Card
                title={
                  <span>
                    {item.icon} {item.name}
                  </span>
                }
                bordered={false}
                style={{ textAlign: "center",borderRadius:'3px' }}
              >
                <Link to={item.path}>View {item.name}</Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

export default MasterDataLinks;
