import React from 'react'; 
import { PoundCircleOutlined, BankOutlined } from '@ant-design/icons';
import { Tabs,Row,Breadcrumb,Typography,} from 'antd';
import ChequeRecieved from './ChequesRecieved';
import ChequesIssued from './ChequesIssued';

const ChequeRegister = () => {
  const { Title } = Typography;

  const tabItems = [
    { key: '1', icon: <BankOutlined />, label: 'Cheque Issued', content: <ChequesIssued/>},
    { key: '2', icon: <PoundCircleOutlined />, label: 'Cheque Recieved', content: <ChequeRecieved/> },
  ];

  return (
    <div style={{ padding: "0px" }}>
      <div
        style={{
          background: "white",
          borderTop: "0.7px solid #d9d9d9",
          borderBottom: "0.7px solid #d9d9d9",
          padding: "15px",

          alignItems: "center",
          height: "100%", // Ensure the div has a defined height
        }}
      >
        <Row justify="space-between">
          <Title level={4} style={{ margin: 0, fontWeight: "530" }}>
            Cheque Register
          </Title>
          <Breadcrumb separator="/">
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Accounting</Breadcrumb.Item>
            <Breadcrumb.Item>Cheque Register</Breadcrumb.Item>
          </Breadcrumb>
        </Row>
      </div>

      
      <Tabs
      style={{background:"white",padding:"10px"}}
      title='Bank Accounts'
        defaultActiveKey="1"
        items={tabItems.map(({ key, icon, label, content }) => ({
          key,
          label: (
            <span style={{ fontSize: "18px" }}>
              {icon} {label}
            </span>
          ),
          children: content,
        }))}
      />
    </div>
  );
};

export default ChequeRegister;
