import React,{useState}from "react";
import { Popover, Button, Menu, message } from "antd";
import { CgMoreVertical } from "react-icons/cg";
import axios from "axios";

const ShipmentActions = ({ shipment_type, shipment_data }) => {
  const [currentShipment,setCurrentShipment]=useState([])



  const shipmentActions = ( id, object ) => {
    object["shipment"] = id;
    axios.patch(
      import.meta.env.VITE_APP_BACKEND_URL + "/shipments/shipments/" + id+"/",
      object,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
    .then(() => { message.success("Shipment Status Updated Successfully"); })
    .catch(() => { message.error("Something went wrong, Please try again"); });
  };

  // Specific Actions
  const handleCloseOperationally = () => alert("You clicked Close Operationally");
  const handleCloseFinancially = () => alert("You clicked Close Financially");
  const handleCustomClearance = (type) => alert(`You clicked ${type} Custom Clearance`);
  const handleSetManifestSiNo = () => alert("You clicked Set Manifest SI No");
  const handleAddBooking = () => alert("You clicked Add Booking");
  const handleAddBookingCharges = () => alert("You clicked Add Booking Charges");
  const handleBatchInvoiceAndBill = () => alert("You clicked Batch Invoice & Bill");
  const handleAssignToMaster = () => alert("You clicked Assign to Master");
  const handleLoadedMaster = () => alert("You clicked Loaded Master");

  const renderContent = () => {
    if (shipment_type === "Direct" || shipment_type === "Master") {
      return (
        <Menu>
          {/* Global Actions */}
          <Menu.Item onClick={handleCloseOperationally}>Close Operationally</Menu.Item>
          <Menu.Item onClick={handleCloseFinancially}>Close Financially</Menu.Item>
          
          {/* Custom Clearance Submenu */}
          <Menu.SubMenu title="Custom Clearance">
            <Menu.Item onClick={() => shipmentActions(shipment_data.id,{"origin_custom_clearance":true,})}>Origin Custom Clearance</Menu.Item>
            <Menu.Item onClick={() => shipmentActions(shipment_data.id,{"destination_custom_clearance":true,})}>Destination Custom Clearance</Menu.Item>
            <Menu.Item onClick={() => shipmentActions(shipment_data.id,{"origin_custom_clearance":false,})}>Remove Origin Custom Clearance</Menu.Item>
            <Menu.Item onClick={() => shipmentActions(shipment_data.id,{"destination_custom_clearance":false,})}>Remove Destination Custom Clearance</Menu.Item>
          </Menu.SubMenu>

          <Menu.Item onClick={handleSetManifestSiNo}>Set Manifest SI No</Menu.Item>

          {/* Master Shipment Specific */}
          {shipment_type === "Master" && (
            <>
              <Menu.Item onClick={handleAddBooking}>Add Booking</Menu.Item>
              <Menu.Item onClick={handleAddBookingCharges}>Add Booking Charges</Menu.Item>
              <Menu.Item onClick={handleBatchInvoiceAndBill}>Batch Invoice & Bill</Menu.Item>
            </>
          )}

          {/* Booking Shipment Specific */}
          {shipment_type === "Booking" && (
            <>
              <Menu.Item onClick={handleAssignToMaster}>Assign to Master</Menu.Item>
              <Menu.Item onClick={handleLoadedMaster}>Loaded Master</Menu.Item>
            </>
          )}
        </Menu>
      );
    }
    return <Menu>No actions available</Menu>;
  };

  return (
    <Popover content={renderContent()} title={`${shipment_type} Actions`} trigger="click">
      <Button type="button" icon={<CgMoreVertical />} />
    </Popover>
  );
};

export default ShipmentActions;
