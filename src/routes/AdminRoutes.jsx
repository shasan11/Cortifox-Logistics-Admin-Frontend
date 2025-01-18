import React, { useState } from "react";
import {
  PieChartOutlined,
  TruckOutlined,
  InboxOutlined,
  UserOutlined,
  AccountBookOutlined,
  DollarOutlined,
  WalletOutlined,
  PercentageOutlined,
  TeamOutlined,
  SolutionOutlined,
  FileSearchOutlined,
  FundProjectionScreenOutlined,
  FileOutlined,
  SettingOutlined,
  FileProtectOutlined,
  MessageOutlined,
  InfoCircleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BellOutlined,
  CalculatorOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Button,
  Layout,
  Menu,
  theme,
  Input,
  Badge,
  Dropdown,
  Avatar,
  Row,
} from "antd";
import { Link, Routes, Route } from "react-router-dom";
import logo from "../assets/logo-white.png";

//Dashboard
import Dashboard from "../pages/Dashboard";

//Shipment & Operations
import Shipments from "../pages/Shipments";
import CreateShipment from "../pages/Shipments/CreateShipment";
import ShipmentDetails from "../pages/Shipments/ShipmentDetails";

//Genral Ledger
import GeneralLedger from "../pages/Accounting/GeneralLedger";

//CRM
import ContactGroup from "../pages/CRM/ContactGroup";


import ExpenseForm from "../pages/Purchase/Expenses/AddExpenses";
import ExpenseCategory from "../pages/Purchase/Expensecategory";

//Master
import MasterDataLinks from "../pages/Master/MasterData";
import Port from "../pages/Master/MasterData/Ports";
import MassUnit from "../pages/Master/MasterData/MassUnit";
import LengthUnit from "../pages/Master/MasterData/LengthUnit";
import PackageType from "../pages/Master/MasterData/PackagesType";
import BranchCRUD from "../pages/Master/MasterData/Branches";
import CurrencyManagement from "../pages/Master/MasterData/Currency";
import PaymentMethod from "../pages/Master/MasterData/PaymentMode";
import DeliveryTypeManagement from "../pages/Master/MasterData/DeliveryType";
import ShipmentSubStatus from "../pages/Master/MasterData/ShipmentSubStatus";
import BankAccounts from "../pages/accounting/BankAccounts/BankAccounts";
import ChequeRegister from "../pages/accounting/chequeregister/list_template";
import CashTransferMain from "../pages/accounting/CashTransfer";
import Carrier from "../pages/parties/Carrier";
import BookingAgent from "../pages/parties/BookingAgent";
import CustomsAgent from "../pages/parties/CustomsAgent";
import Vendor from "../pages/parties/Vendor";
import Invoice from "../pages/Sales/Invoice";
import CreditNote from "../pages/Sales/CreditNote";

import ApplicationSettings from "../pages/Master/ApplicationSettings";
import Clients from "../pages/Clients";

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
  getItem("Dashboard", "1", <PieChartOutlined />, null, "/"),
  getItem("Shipments", "2", <TruckOutlined />, null, "/operations/shipments"),
  getItem(
    "Warehouse",
    "3",
    <InboxOutlined />,
    null,
    "/operations/add-shipments"
  ),
  getItem("Parties", "sub1", <UserOutlined />, [
    getItem("Booking Agents", "4", null, null, "/parties/booking-agent"),
    getItem("Vendor", "5", null, null, "/parties/vendor"),
    getItem("Customs Agent", "6", null, null, "/parties/customs-agent/"),
    getItem("Carrier", "7", null, null, "/parties/carrier"),
  ]),
  getItem("Accounting", "sub2", <AccountBookOutlined />, [
    getItem("General Ledger", "8", null, null, "/accounting/general-ledger"),
    getItem("Bank Accounts", "9", null, null, "/accounting/bank-accounts"),
    getItem("Cash Transfers", "10", null, null, "/accounting/cash-transfer/"),
    getItem(
      "Journal Voucher",
      "12",
      null,
      null,
      "/accounting/journal-voucher/add"
    ),
    getItem("Cheque Register", "13", null, null, "/accounting/cheque-register"),
  ]),
  getItem("Sales", "sub3", <DollarOutlined />, [
    getItem("Quotations", "15", null, null, "/sales/credit-note/"),
    getItem("Credit Notes", "16", null, null, "/sales/credit-note/"),
    getItem("Invoices", "17", null, null, "/sales/invoice/"),
   
  ]),
  getItem("Purchase", "sub4", <WalletOutlined />, [
    getItem("Expense Cateory", "19", null, null, "/purchase/expense-category"),
    getItem("Vendor Bills", "20", null, null, "/vendor-bills"),
    getItem("Payment Out", "21", null, null, "/payment-out"),
  ]),
 
  getItem("CRM", "sub6", <TeamOutlined />, [
    getItem(
      "Contact Group",
      "25",
      <SolutionOutlined />,
      null,
      "/crm/contact-group"
    ),
    getItem("Client", "26", <UserOutlined />, null, "/clients"),
    getItem(
      "Client Tickets",
      "27",
      <FileSearchOutlined />,
      null,
      "/client-tickets"
    ),
    getItem("Leads", "28", <FundProjectionScreenOutlined />, null, "/leads"),
    getItem("Deals", "29", <DollarOutlined />, null, "/deals"),
    getItem("Quotation", "30", <FileOutlined />, null, "/crm-quotation"),
  ]),
  getItem("Master", "sub7", <SettingOutlined />, [
    getItem(
      "Settings",
      "31",
      <SettingOutlined />,
      null,
      "/master/application-settings"
    ),
    getItem(
      "Unique ID",
      "32",
      <FileProtectOutlined />,
      null,
      "/unique-number"
    ),
    getItem(
      "Master Data",
      "sub8",
      <InboxOutlined />,
      null,
      "/master/master-data"
    ),
  ]),
  getItem("Docs & Support", "sub9", <FileOutlined />, [
    getItem("Raise a Ticket", "35", <MessageOutlined />, null, "/raise-ticket"),
    getItem("About", "36", <InfoCircleOutlined />, null, "/about"),
  ]),
];
const profileMenu = (
  <Menu
    items={[
      {
        key: "1",
        label: <span style={{ color: "#000" }}>Profile</span>,
      },
      {
        key: "2",
        label: <span style={{ color: "#000" }}>Settings</span>,
      },
      {
        key: "3",
        label: <span style={{ color: "#000" }}>Logout</span>,
      },
    ]}
  />
);

const AdminRoutes = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout
      className="layout-main"
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#f0f0f0",
      }}
    >
      {/* Navbar */}
      <Header
        style={{
          padding: 0,
          background: "#030852",
          color: "white",
          display: "flex",
          zIndex:1230,
          alignItems: "center",
          justifyContent: "space-between", // Ensures the elements are spread across the header
        }}
      >
        {/* Left Section: Logo */}
        <div
          style={{
            marginLeft: "16px",
            color: "white",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          <img src={logo} style={{ width: "160px" }} />
        </div>

        {/* Middle Section: Search Field */}
        <div
          style={{ flex: 1, display: "flex", justifyContent: "center" }}
          className="search-input"
        >
          <Input
            placeholder="Search..."
            style={{
              maxWidth: "70%",
              padding: "10px",
              backgroundColor: "#061178",
              color: "white",
              borderRadius: "3px",
            }}
            allowClear
            prefix={
              <SearchOutlined style={{ fontSize: "18px", color: "white" }} />
            }
            suffix={<>Ctrl+/</>}
            bordered={false}
            inputStyle={{
              color: "white",
            }}
          />
        </div>

        {/* Right Section: Notifications, Calculator, Profile */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            icon={<CalculatorOutlined style={{ color: "white" }} />}
            style={{
              margin: "0 8px",
              color: "white",
              background: "rgba(255, 255, 255, 0.2)",
              border: "none",
            }}
          >
            Shipment Calculator
          </Button>
          {/* Notification Icon */}
          <Badge count={5}>
            <Button
              shape="circle"
              icon={<BellOutlined style={{ color: "white" }} />}
              style={{
                backgroundColor: "transparent",
                border: "none",
                color: "white",
              }}
            />
          </Badge>

          {/* Shipment Calculator */}

          {/* Profile Dropdown */}
          <Dropdown overlay={profileMenu} placement="bottomRight">
            <Avatar
              style={{
                margin: "0 16px",
                backgroundColor: "#1890ff",
                cursor: "pointer",
              }}
              icon={<UserOutlined />}
            />
          </Dropdown>
        </div>
      </Header>

      {/* Sider and Content in column layout */}
      <Layout
        style={{
          height: "100vh",
          flex: 1,
          display: "flex",
          flexDirection: "row",
          background: "#f0f0f0",
        }}
      >
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          trigger={null}
          className="custom-sidebar"
          style={{
            background: "white",
            zIndex:1230,
            
          }}
        >
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={items}
          />
        </Sider>
        <Content
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "auto",
          }}
        >
          <div style={{ flex: 1, padding: "0px" }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />

              <Route path="/parties/carrier" element={<Carrier />} />
              <Route path="/parties/booking-agent" element={<BookingAgent />} />
              <Route path="/parties/customs-agent" element={<CustomsAgent />} />
              <Route path="/parties/vendor" element={<Vendor />} />
              

              {/*General Accounting*/}
              <Route
                path="/accounting/general-ledger"
                element={<GeneralLedger />}
              />
              <Route
                path="/accounting/bank-accounts"
                element={<BankAccounts />}
              />
              <Route
                path="/accounting/cheque-register"
                element={<ChequeRegister />}
              />
              <Route
                path="/accounting/journal-voucher"
                element={<GeneralLedger />}
              />
              <Route
                path="/accounting/cash-transfer"
                element={<CashTransferMain />}
              />


              <Route path="/sales/invoice/" element={<Invoice/>}/>


              <Route path="/purchase/expenses/add/" element={<ExpenseForm/>}/>
              <Route path="/purchase/expense-category" element={<ExpenseCategory/>}/>

              <Route path="/operations/shipments/" element={<Shipments />} />
              <Route
                path="/operations/shipments/create/:type/"
                element={<CreateShipment />}
              />
              <Route
                path="/operations/shipments/details/:shipment_no/"
                element={<ShipmentDetails />}
              />
              <Route path="/crm/contact-group" element={<ContactGroup />} />
              <Route path="/master/master-data" element={<MasterDataLinks />} />
              <Route path="/master/master-data/port" element={<Port />} />
              <Route
                path="/master/master-data/mass-unit"
                element={<MassUnit />}
              />
              <Route
                path="/master/master-data/length-unit"
                element={<LengthUnit />}
              />
              <Route
                path="/master/master-data/packages-type"
                element={<PackageType />}
              />
              <Route
                path="/master/master-data/branch"
                element={<BranchCRUD />}
              />
              <Route
                path="/master/master-data/currency"
                element={<CurrencyManagement />}
              />
              <Route
                path="/master/master-data/payment-method"
                element={<PaymentMethod />}
              />
              <Route
                path="/master/master-data/delivery-type"
                element={<DeliveryTypeManagement />}
              />
              <Route
                path="/master/master-data/shipment-sub-type"
                element={<ShipmentSubStatus />}
              />
              <Route path="/sales/credit-note/" element={<CreditNote/>}/>

              <Route path="/master/application-settings" element={<ApplicationSettings/>}/>

              <Route path="/clients" element={<Clients/>}/>
            </Routes>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminRoutes;
