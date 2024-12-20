import "ag-grid-enterprise";

import { Typography, Row, Col, Breadcrumb, Empty ,Button,Dropdown,Input,Menu} from "antd"; // Fixed the import for Breadcrumb
import { MdOutlineAirplanemodeActive } from "react-icons/md";
import { LiaShippingFastSolid } from "react-icons/lia";
import useFetchApiData from "../../helper/other/fetchData";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community'
import { themeAlpine} from "ag-grid-community";
import { ClientSideRowModelModule } from "ag-grid-enterprise";
import { EditOutlined, CopyOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom"; 

const { Title } = Typography;
const getTransportModeIcon = (mode) => {
  switch (mode) {
    case "AIR":
      return (<><MdOutlineAirplanemodeActive size={20} /></>);
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

  // Formatting the date as MM/DD/YYYY
  return date.toLocaleDateString('en-US');
  }

 

export default function Shipments() {
  document.title = `${
    import.meta.env.VITE_APP_APPLICATION_NAME
  } - All Shipments`;
  const data = useFetchApiData("/shipments/shipments/");
  console.log(data);
  const columns = [
    {
      headerName: "Actions",
      field: "actions",
      flex: 2,
      minWidth: 120,
      maxWidth: 120,
      pinned: "left",
      cellRenderer: (params) => (
        <>
          <Button
            type="link"
            icon={<EditOutlined style={{ fontSize: "18px" }} />}
            onClick={() => handleEdit(params.data.id)}
            style={{ padding: 0 }}
          ></Button>
          <Button
            type="link"
            icon={<CopyOutlined style={{ fontSize: "18px" }} />}
            onClick={() => handleDelete(params.data.id)}
            style={{ padding: 0 }}
          ></Button>
        </>
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
      minWidth: 100,
      maxWidth: 100,
      cellRenderer: (params) => getTransportModeIcon(params.value), // Show icon based on transport mode
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
      cellRenderer: (params) => (
        <>
          <Link to={`/operations/shipments/details/${params.data.id}`}>
            {params.data.shipment_status}
          </Link>
        </>
      ),
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
      <Menu.Item key="1"><Link to='/operations/shipments/create/Master/'>Master</Link></Menu.Item>
      <Menu.Item key="2"><Link to='/operations/shipments/create/Booking/'>Booking</Link></Menu.Item>
      <Menu.Item key="3"><Link to='/operations/shipments/create/Direct/'>Direct</Link></Menu.Item>
    </Menu>
  );
  return (
    <>
      <Row justify="space-between">
        <Title level={3}>Shipments</Title>
        <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Shipments</Breadcrumb.Item>
        </Breadcrumb>
      </Row>
      <Row gutter={16}>
      <Col xl={20}>
        <Input size="large" placeholder="Search for the shipments" />
      </Col>
      <Col xl={4}>
        <Dropdown overlay={menu} placement="bottomRight">
          <Button size="large">Create Shipment</Button>
        </Dropdown>
      </Col>
    </Row>
      <Row>
        {data.length > 0 ? (
          <div            
            className="ag-theme-material"
            style={{ height: "300px", borderRadius:"0px",width:"100%" }}
          >
            <AgGridReact theme={themeAlpine} columnDefs={columns} rowData={data} domLayout="autoHeight"  modules={[ClientSideRowModelModule]} />
          </div>
        ) : (
          <Empty description="No Shipments" />
        )}
      </Row>
    </>
  );
}
