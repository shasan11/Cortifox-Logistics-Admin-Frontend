import React from "react";
import { Card, Row, Col,Typography,Breadcrumb } from "antd";

const Dashboard = () => {
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
          Dashboard
        </Typography.Title>

        <Breadcrumb separator="-">
          <Breadcrumb.Item>Application</Breadcrumb.Item>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        </Breadcrumb>
      </Row>

    <div style={{ padding: "16px" }}>
      <Row gutter={[16, 16]} justify="center">
        <Col xs={24} sm={8}>
          <Card bordered={false} className="card-1"/>
        </Col>
        <Col xs={24} sm={8}>
          <Card bordered={false} className="card-1"/>
        </Col>
        <Col xs={24} sm={8}>
          <Card bordered={false} className="card-1"/>
        </Col>
      </Row>
      <Row gutter={[16, 16]} justify="center">
        <Col xs={24} sm={12}>
          <Card bordered={false} className="card-2"/>
        </Col>
        <Col xs={24} sm={12}>
          <Card bordered={false} className="card-2"/>
        </Col>
      </Row>
      <Row gutter={[16, 16]} justify="center">
        <Col xs={24}>
          <Card bordered={false}className="card-2" />
        </Col>
      </Row>
      <Row gutter={[16, 16]} justify="center">
        <Col xs={24}>
          <Card bordered={false} className="card-2" />
        </Col>
      </Row>
    </div>
    </>
  );
};

export default Dashboard;
