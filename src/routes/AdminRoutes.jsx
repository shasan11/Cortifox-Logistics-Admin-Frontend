import React, { useState } from 'react';
import { PieChartOutlined, TruckOutlined, InboxOutlined, UserOutlined, AccountBookOutlined, DollarOutlined, WalletOutlined, PercentageOutlined, TeamOutlined, SolutionOutlined, FileSearchOutlined, FundProjectionScreenOutlined, FileOutlined, SettingOutlined, FileProtectOutlined, MessageOutlined, InfoCircleOutlined, MenuFoldOutlined, MenuUnfoldOutlined, SearchOutlined, } from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { Link, Routes,Route } from 'react-router-dom';


//Shipment & Operations
import Shipments from '../pages/Shipments';
import CreateShipment from '../pages/Shipments/CreateShipment';
import ShipmentDetails from '../pages/Shipments/ShipmentDetails';

const { Header, Sider, Content, Footer } = Layout;

function getItem(label, key, icon, children, link) {
  return {
    key,
    icon,
    children,
    label: link ? <Link to={link}>{label}</Link> : label,
  };
}

const items = [
  getItem('Dashboard', '1', <PieChartOutlined />, null, '/'),
  getItem('Shipments', '2', <TruckOutlined />, null, '/operations/shipments'),
  getItem('Warehouse', '3', <InboxOutlined />, null, '/operations/add-shipments'),
  getItem('Parties', 'sub1', <UserOutlined />, [
    getItem('Booking Agents', '4', null, null, '/parties/booking-agents'),
    getItem('Vendor', '5', null, null, '/parties/vendor'),
    getItem('Customs Agent', '6', null, null, '/parties/customs-agent/'),
    getItem('Carrier', '7', null, null, '/parties/carrier/'),
  ]),
  getItem('Accounting', 'sub2', <AccountBookOutlined />, [
    getItem('General Ledger', '8', null, null, '/general-accounting/general-ledger'),
    getItem('Bank Accounts', '9', null, null, '/general-accounting/bank-accounts'),
    getItem('Cash Transfers', '10', null, null, '/general-accounting/cash-transfer/'),
    getItem('Payment Method', '11', null, null, '/general-accounting/paymentmethod/'),
    getItem('Journal Voucher', '12', null, null, '/general-accounting/journal-voucher/add'),
    getItem('Cheque Register', '13', null, null, '/general-accounting/chequeregister'),
    getItem('Currency', '14', null, null, '/general-accounting/currency'),
  ]),
  getItem('Sales', 'sub3', <DollarOutlined />, [
    getItem('Quotations', '15', null, null, '/quotations'),
    getItem('Costings', '16', null, null, '/costings'),
    getItem('Invoice', '17', null, null, '/invoice'),
    getItem('Payments', '18', null, null, '/payments'),
  ]),
  getItem('Purchase', 'sub4', <WalletOutlined />, [
    getItem('Expenses', '19', null, null, '/expenses'),
    getItem('Vendor Bills', '20', null, null, '/vendor-bills'),
    getItem('Payment Out', '21', null, null, '/payment-out'),
  ]),
  getItem('Tariff & Rates', 'sub5', <PercentageOutlined />, [
    getItem('General Charge Sheet', '22', null, null, '/charge-sheet'),
    getItem('Freight Rate Manager', '23', null, null, '/freight-rate-manager'),
    getItem('Local Port Charges', '24', null, null, '/port-charges'),
  ]),
  getItem('CRM', 'sub6', <TeamOutlined />, [
    getItem('Contact Group', '25', <SolutionOutlined />, null, '/crm/contact-group'),
    getItem('Client', '26', <UserOutlined />, null, '/client'),
    getItem('Client Tickets', '27', <FileSearchOutlined />, null, '/client-tickets'),
    getItem('Leads', '28', <FundProjectionScreenOutlined />, null, '/leads'),
    getItem('Deals', '29', <DollarOutlined />, null, '/deals'),
    getItem('Quotation', '30', <FileOutlined />, null, '/crm-quotation'),
  ]),
  getItem('Master', 'sub7', <SettingOutlined />, [
    getItem('Application Settings', '31', <SettingOutlined />, null, '/master/master-data/'),
    getItem('Unique Number', '32', <FileProtectOutlined />, null, '/unique-number'),
    getItem('Master Data', 'sub8', <InboxOutlined />, [
      getItem('Users', '33', <UserOutlined />, null, '/users'),
      getItem('Reports', '34', <FileOutlined />, null, '/reports'),
    ]),
  ]),
  getItem('Docs & Support', 'sub9', <FileOutlined />, [
    getItem('Raise a Ticket', '35', <MessageOutlined />, null, '/raise-ticket'),
    getItem('About', '36', <InfoCircleOutlined />, null, '/about'),
  ]),
];

const AdminRoutes = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer = '#ffffff', borderRadiusLG = 4 },
  } = theme.useToken();

  return (
    <Layout className="layout-main">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical bg-white h-auto p-1 px-4">
          <img src={import.meta.env.VITE_APP_IMAGE_URL} style={{width:"130px"}}/>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={items} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: '16px', width: 64, height: 64 }}
          />
        </Header>
        <Layout
          style={{
            margin: '20px 16px',
            padding: 24,
            overflow:'scroll',
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
         <Routes>
         <Route path="/operations/shipments/" element={<Shipments />} />
         <Route path='/operations/shipments/create/:type/' element={<CreateShipment/>}/>
         <Route path='/operations/shipments/details/:shipment_no/' element={<ShipmentDetails/>}/>
         </Routes>
        </Layout>
        <Footer
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px 20px',
            background: colorBgContainer,
          }}
        >
          <div>
            <a href="#">Documentation</a> | <a href="#">Privacy Policy</a> | <a href="#">Support</a>
          </div>
          <div>&copy; 2024 Cortifox Systems Private Limited</div>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminRoutes;
