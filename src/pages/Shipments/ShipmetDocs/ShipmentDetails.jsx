import React from 'react';
import ReactToPrint from 'react-to-print';
import { jsPDF } from 'jspdf';
import './ShipmentDetails.css';

const ShipmentDetails = ({ shipmentData }) => {
  const {
    shipment_no,
    si_no,
    shipper_details,
    consignee_details,
    shipment_packages,
    shipment_charges,
    total_amount,
    payment_type,
    shipment_status,
    scheduled_start_date,
    scheduled_end_date,
    customs_value,
    freight_value,
    insurance_value,
    invoice_value,
    transport_mode,
    transit_details,
    tracking_info,
    
    documents,
    additionalInfo,
  } = shipmentData;

  // Function to generate PDF
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.html(document.getElementById('shipment-details'), {
      callback: (doc) => {
        doc.save('shipment_details.pdf');
      },
      margin: [20, 20, 20, 20],
      autoPaging: true,
    });
  };

  return (
    <div className="shipment-details" id="shipment-details">
      {/* Header Section */}
      <div className="shipment-header">
        <h1>Shipment Details</h1>
        <div className="shipment-header-info">
          <div><strong>Shipment No:</strong> {shipment_no}</div>
          <div><strong>SI No:</strong> {si_no}</div>
          <div><strong>Status:</strong> {shipment_status}</div>
          <div><strong>Scheduled Dates:</strong> {scheduled_start_date} - {scheduled_end_date}</div>
        </div>
      </div>

      {/* Shipper and Consignee Details */}
      <div className="section">
        <h2>Shipper Details</h2>
        <div><strong>Name:</strong> {shipper_details.name}</div>
        <div><strong>Country:</strong> {shipper_details.country}</div>
        <div><strong>Address:</strong> {shipper_details.address}</div>
        <div><strong>Phone:</strong> {shipper_details.phone}</div>
        <div><strong>Email:</strong> {shipper_details.email}</div>

        <h2>Consignee Details</h2>
        <div><strong>Consignor Name:</strong> {consignee_details.consignor_name}</div>
        <div><strong>Consignor Address:</strong> {consignee_details.address}</div>
        <div><strong>Consignor Phone:</strong> {consignee_details.consigner_phone}</div>
        <div><strong>Consignor Email:</strong> {consignee_details.consigner_email}</div>
      </div>

      {/* Freight Transport Specific Details */}
      <div className="section">
        <h2>Freight Transport Details</h2>
        <div><strong>Transport Mode:</strong> {transport_mode}</div>
        <div><strong>Freight Carrier:</strong> {shipper.name}</div>
        <div><strong>Carrier Phone:</strong> {shipper.phone}</div>
        <div><strong>Carrier Email:</strong> {shipper.email}</div>

        <h3>Transit Details</h3>
        {transit_details.map((transit, index) => (
          <div key={index}>
            <div><strong>Route:</strong> {transit.route}</div>
            <div><strong>Departure:</strong> {transit.departure}</div>
            <div><strong>Arrival:</strong> {transit.arrival}</div>
            <div><strong>Transit Time:</strong> {transit.transit_time}</div>
            <div><strong>Estimated Delivery Date:</strong> {transit.estimated_delivery}</div>
          </div>
        ))}
        
        <h3>Tracking Information</h3>
        {tracking_info ? (
          <div><strong>Tracking Number:</strong> {tracking_info.tracking_number}</div>
        ) : (
          <div>No tracking information available.</div>
        )}
      </div>

      {/* Shipment Charges */}
      <div className="section">
        <h2>Shipment Charges</h2>
        <table className="charges-table">
          <thead>
            <tr>
              <th>Charge Name</th>
              <th>Rate</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {shipment_charges.map((charge) => (
              <tr key={charge.id}>
                <td>{charge.charge_name}</td>
                <td>{charge.rate}</td>
                <td>{charge.qty}</td>
                <td>{charge.total}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="charges-summary">
          <div><strong>Total Amount:</strong> {total_amount}</div>
          <div><strong>Payment Type:</strong> {payment_type}</div>
          <div><strong>Customs Value:</strong> {customs_value}</div>
          <div><strong>Freight Value:</strong> {freight_value}</div>
          <div><strong>Insurance Value:</strong> {insurance_value}</div>
          <div><strong>Invoice Value:</strong> {invoice_value}</div>
        </div>
      </div>

      {/* Package Details */}
      <div className="section">
        <h2>Package Details</h2>
        <table className="package-table">
          <thead>
            <tr>
              <th>Package Type</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Dimensions (L x W x H)</th>
              <th>Weight</th>
            </tr>
          </thead>
          <tbody>
            {shipment_packages.map((pkg) => (
              <tr key={pkg.id}>
                <td>{pkg.package_type_display}</td>
                <td>{pkg.good_desc}</td>
                <td>{pkg.quantity}</td>
                <td>{pkg.length} x {pkg.width} x {pkg.height} {pkg.package_unit_display}</td>
                <td>{pkg.gross_weight} {pkg.mass_unit_display}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Additional Information */}
      {additionalInfo && (
        <div className="section">
          <h2>Additional Information</h2>
          <p>{additionalInfo}</p>
        </div>
      )}

      {/* Documents Section */}
      {documents && documents.length > 0 && (
        <div className="section">
          <h2>Documents</h2>
          <ul>
            {documents.map((doc, index) => (
              <li key={index}>{doc}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Print and Save as PDF */}
      <div className="footer">
        <ReactToPrint
          trigger={() => <button>Print Shipment Details</button>}
          content={() => document.getElementById('shipment-details')}
        />
        <button onClick={generatePDF}>Save as PDF</button>
      </div>
    </div>
  );
};

export default ShipmentDetails;
