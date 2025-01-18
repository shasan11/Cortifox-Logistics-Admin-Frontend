import React, { useState, useEffect } from "react";
import "ag-grid-enterprise";
import {
  Typography,
  Row,
  Col,
  Breadcrumb,
  Empty,
  Button,
  Dropdown,
  Input,
  Menu,
  Spin,  // Import Spin component for loading
} from "antd";
import { MdOutlineAirplanemodeActive } from "react-icons/md";
import { LiaShippingFastSolid } from "react-icons/lia";
import useFetchApiData from "../../helper/other/fetchData";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { GiCargoShip } from "react-icons/gi";
import { ClientSideRowModelModule } from "ag-grid-enterprise";
import { Link } from "react-router-dom";
import ShipmentActions from "./ShipmentComponents/ShipmentListActions";

const { Title } = Typography;

const getTransportModeIcon = (mode) => {
  switch (mode) {
    case "AIR":
      return <MdOutlineAirplanemodeActive size={20} />;
    case "SEA":
      return <GiCargoShip style={{ fontSize: "20px" }} />;
    case "LAND":
      return <LiaShippingFastSolid style={{ fontSize: "20px" }} />;
    default:
      return null;
  }
};

function formatBeautifulDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US");
}

export default function Shipments() {
  document.title = `${
    import.meta.env.VITE_APP_APPLICATION_NAME
  } - All Shipments`;

  const rawData = useFetchApiData("/shipments/shipments/");
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true); // Initialize loading state

  // Update filtered data when rawData changes
  useEffect(() => {
    if (rawData) {
      setFilteredData(rawData);
      setLoading(false); // Set loading to false after data is fetched
    }
  }, [rawData]);

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const filtered = rawData.filter(
      (item) =>
        item.transport_mode.toLowerCase().includes(searchValue) ||
        item.shipment_type.toLowerCase().includes(searchValue) ||
        item.shipment_no.toLowerCase().includes(searchValue) ||
        item.shipment_status.toLowerCase().includes(searchValue) ||
        item.port_origin_details?.name?.toLowerCase().includes(searchValue) ||
        item.port_destination_details?.name?.toLowerCase().includes(searchValue) ||
        item.port_handling_agent_origin_details?.name
          ?.toLowerCase()
          .includes(searchValue) ||
        item.port_handling_agent_destination_details?.name
          ?.toLowerCase()
          .includes(searchValue)
    );
    setFilteredData(filtered);
  };

  const columns = [
    {
      headerName:"Actions",
      suppressMenu: true,  
      width:'100',
      cellRenderer: (params) => (
        <ShipmentActions shipment_type={params.data.shipment_type} shipment_data={params.data} />
      ),
    },
    {
      headerName: "Mode",
      field: "transport_mode",
      sortable: true,
      filter: true,
      checkboxSelection: true,
      headerCheckboxSelection: true,
      flex: 1,
      minWidth: 150,
      maxWidth: 150,
      cellRenderer: (params) => getTransportModeIcon(params.value),
    },
    {
      headerName: "Shipping Type",
      field: "shipment_type",
      sortable: true,
      filter: true,
      flex: 2,
      minWidth: 150,
      maxWidth: 150,
    },
    {
      headerName: "Code",
      field: "shipment_no",
      sortable: true,
      filter: true,
      cellRenderer: (params) => (
        <Link to={`/operations/shipments/details/${params.data.id}`}>
          {params.data.shipment_no}
        </Link>
      ),
      flex: 2,
      minWidth: 230,
      maxWidth: 230,
    },
    {
      headerName: "Status",
      field: "shipment_status",
      sortable: true,
      filter: true,
      flex: 2,
      minWidth: 150,
      maxWidth: 150,
    },
    {
      headerName: "Origin",
      field: "port_origin_details.name",
      sortable: true,
      filter: true,
      flex: 2,
      minWidth: 300,
      maxWidth: 300,
    },
    {
      headerName: "Destination",
      field: "port_destination_details.name",
      sortable: true,
      filter: true,
      flex: 5,
      minWidth: 200,
      maxWidth: 200,
    },
    {
      headerName: "Agent of Origin",
      field: "port_handling_agent_origin_details.name",
      sortable: true,
      filter: true,
      flex: 2,
      minWidth: 200,
      maxWidth: 200,
    },
    {
      headerName: "Agent of Destination",
      field: "port_handling_agent_destination_details.name",
      sortable: true,
      filter: true,
      flex: 2,
      minWidth: 250,
      maxWidth: 250,
    },
    {
      headerName: "Created",
      field: "created",
      sortable: true,
      filter: true,
      flex: 2,
      minWidth: 150,
      maxWidth: 150,
      cellRenderer: (params) => <>{formatBeautifulDate(params.data.created)}</>,
    },
  ];

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <Link to="/operations/shipments/create/Master/">Master</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/operations/shipments/create/Booking/">Booking</Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to="/operations/shipments/create/Direct/">Direct</Link>
      </Menu.Item>
    </Menu>
  );

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
        <Title level={4} style={{ margin: 0 }}>
          Shipments
        </Title>

        <Breadcrumb separator="-">
          <Breadcrumb.Item>Application</Breadcrumb.Item>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        </Breadcrumb>
      </Row>
      <Row
        gutter={16}
        style={{
          background: "#fafafa",
          borderBottom: "1px solid #d9d9d9",
          padding: "15px",
        }}
      >
        <Col xl={20}>
          <Input
            size="large"
            placeholder="Search for the shipments"
            onChange={handleSearch}
          />
        </Col>
        <Col xl={4}>
          <Dropdown overlay={menu} placement="bottomRight">
            <Button size="large">Create Shipment</Button>
          </Dropdown>
        </Col>
      </Row>
      <Row justify="center" align="middle" style={{ height: "60vh" }} className="bg-light">
  {loading ? (  // Show the loader while data is being fetched
    <Spin size="large" tip="Loading..." style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }} />
  ) : filteredData.length > 0 ? (
    <div
      className="ag-theme-material"
      style={{ height: "300px", borderRadius: "0px", width: "100%" }}
    >
      <AgGridReact
        columnDefs={columns}
        rowData={filteredData}
        domLayout="autoHeight"
        modules={[ClientSideRowModelModule]}
      />
    </div>
  ) : (
    loading ? (
      <Spin size="large" tip="Loading..." style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }} />
    ) : (
      <Empty
        description="No Shipments"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
        }}
      />
    )
  )}
</Row>

    </>
  );
}
