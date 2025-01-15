import React, { useState } from "react";
import { Popover, Button, Menu, message, Modal } from "antd";
import { CgMoreVertical } from "react-icons/cg";
import MasterAssign from "./MasterAssign";
import axios from "axios";
import AddBooking from "./AddBooking";
import ManifestForm from "./ManifestForm";
import BulkInvoicing from "./BulkInvoicing";
import Invoice from "../../Sales/Invoice";

const ShipmentActions = ({ shipment_type, shipment_data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    title: "",
    component: <></>,
  });

  // Modal Handlers
  const showModal = () => setIsModalOpen(true);
  const handleOk = () => setIsModalOpen(false);
  const handleCancel = () => setIsModalOpen(false);

  // Function to handle dynamic modal operations
  const handleModalOperations = (Component, title) => {
    setModalData({
      title,
      component: <Component shipmentData={shipment_data} />,
    });
    showModal();
  };

  // Function for shipment-related API actions
  const shipmentActions = (id, object) => {
    object["shipment"] = id;
    axios
      .patch(
        `${import.meta.env.VITE_APP_BACKEND_URL}/shipments/shipments/${id}/`,
        object,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then(() => {
        message.success("Shipment Status Updated Successfully");
      })
      .catch(() => {
        message.error("Something went wrong, Please try again");
      });
  };

  // Specific Action Handlers
  const handleSetManifestSiNo = () => alert("You clicked Set Manifest SI No");
  const handleAddBooking = () => alert("You clicked Add Booking");
  const handleAddBookingCharges = () =>
    alert("You clicked Add Booking Charges");
  const handleBatchInvoiceAndBill = () =>
    alert("You clicked Batch Invoice & Bill");
  const handleAssignToMaster = () => alert("You clicked Assign to Master");
  const handleLoadedMaster = () => alert("You clicked Loaded Master");

  // Render actions dynamically based on shipment type
  const renderContent = () => {
    if (shipment_type === "Direct" || shipment_type === "Master") {
      return (
        <Menu>
          {/* Global Actions */}
          <Menu.Item
            key="close-operationally"
            onClick={() =>
              shipmentActions(shipment_data.id, { open_operationally: false })
            }
          >
            Close Operationally
          </Menu.Item>
          <Menu.Item
            key="close-financially"
            onClick={() =>
              shipmentActions(shipment_data.id, { open_financially: false })
            }
          >
            Close Financially
          </Menu.Item>

          {/* Custom Clearance Submenu */}
          <Menu.SubMenu key="custom-clearance" title="Custom Clearance">
            <Menu.Item
              key="origin-clearance"
              onClick={() =>
                shipmentActions(shipment_data.id, { origin_custom_clearance: true })
              }
            >
              Origin Custom Clearance
            </Menu.Item>
            <Menu.Item
              key="destination-clearance"
              onClick={() =>
                shipmentActions(shipment_data.id, {
                  destination_custom_clearance: true,
                })
              }
            >
              Destination Custom Clearance
            </Menu.Item>
            <Menu.Item
              key="remove-origin-clearance"
              onClick={() =>
                shipmentActions(shipment_data.id, { origin_custom_clearance: false })
              }
            >
              Remove Origin Custom Clearance
            </Menu.Item>
            <Menu.Item
              key="remove-destination-clearance"
              onClick={() =>
                shipmentActions(shipment_data.id, {
                  destination_custom_clearance: false,
                })
              }
            >
              Remove Destination Custom Clearance
            </Menu.Item>
          </Menu.SubMenu>

          {/* Direct or Master-specific actions */}
          <Menu.Item key="set-manifest" onClick={()=>handleModalOperations(ManifestForm,"Set Manifest SI Number")}>
            Set Manifest SI No
          </Menu.Item>
          {shipment_type === "Master" && (
            <>
              <Menu.Item key="add-booking"  onClick={() => handleModalOperations(AddBooking, "Assign to Master")}>
                Add Booking
              </Menu.Item>
               
              <Menu.Item
                key="batch-invoice-and-bill"
                onClick={()=>handleModalOperations(BulkInvoicing,"Batch Billing & Invoicing")}
              >
                Batch Invoice & Bill
              </Menu.Item>
            </>
          )}
        </Menu>
      );
    }

    if (shipment_type === "Booking") {
      return (
        <Menu>
          <Menu.Item
            key="close-operationally"
            onClick={() =>
              shipmentActions(shipment_data.id, { open_operationally: false })
            }
          >
            Close Operationally
          </Menu.Item>
          <Menu.Item key="close-financially" onClick={() => shipmentActions(shipment_data.id, { open_financially: false }) } >
            Close Financially
          </Menu.Item>
          <Menu.Item key="assign-to-master" onClick={() => handleModalOperations(MasterAssign, "Assign to Master")}> Assign to Master </Menu.Item> 
          <Menu.Item key="loaded-master" onClick={handleLoadedMaster}>
            Loaded Master
          </Menu.Item>
        </Menu>
      );
    }

    return (
      <Menu>
        <Menu.Item key="no-actions">No actions available</Menu.Item>
      </Menu>
    );
  };

  return (
    <>
      <Modal
        title={modalData.title}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        
      >
        {modalData.component}
      </Modal>
      <Popover
        content={renderContent()}
        title={`${shipment_type} Actions`}
        trigger="click"
      >
        <Button type="button" icon={<CgMoreVertical />} />
      </Popover>
    </>
  );
};

export default ShipmentActions;
