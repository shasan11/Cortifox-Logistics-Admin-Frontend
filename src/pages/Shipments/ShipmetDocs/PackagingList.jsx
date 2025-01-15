import React from 'react';
import ReactBarcode from 'react-barcode';
import './ShipmentPackagingList.css'; // Add CSS file for styling
import logo from './logo.jpeg'; // Assuming you have a logo image
import { jsPDF } from 'jspdf';

const PackagingList = ({ shipmentData }) => {
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
    documents,
  } = shipmentData;

  const handlePrint = () => {
    window.print();
  };

  const handleSavePDF = () => {
    const doc = new jsPDF();

    // Add content to the PDF
    doc.text('Shipment Packaging List', 10, 10);
    doc.text(`Shipment No: ${shipment_no}`, 10, 20);
    doc.text(`SI No: ${si_no}`, 10, 30);
    doc.text(`Status: ${shipment_status}`, 10, 40);
    doc.text(`Shipment Dates: ${scheduled_start_date} to ${scheduled_end_date}`, 10, 50);

    // Add shipper details
    doc.text('Shipper Details:', 10, 60);
    doc.text(`Name: ${shipper_details.name}`, 10, 70);
    doc.text(`Country: ${shipper_details.country}`, 10, 80);
    doc.text(`Address: ${shipper_details.address}`, 10, 90);
    doc.text(`Phone: ${shipper_details.phone}`, 10, 100);
    doc.text(`Email: ${shipper_details.email}`, 10, 110);

    // Add consignee details
    doc.text('Consignee Details:', 10, 120);
    doc.text(`Name: ${consignee_details.consignor_name}`, 10, 130);
    doc.text(`Address: ${consignee_details.address}`, 10, 140);
    doc.text(`Phone: ${consignee_details.consigner_phone}`, 10, 150);
    doc.text(`Email: ${consignee_details.consigner_email}`, 10, 160);

    // Add package details
    doc.text('Package Details:', 10, 170);
    shipment_packages.forEach((pkg, index) => {
      doc.text(
        `Package ${index + 1}: ${pkg.package_type_display} - ${pkg.good_desc} - Quantity: ${pkg.quantity}`,
        10,
        180 + index * 10
      );
    });

    // Add charges details
    doc.text('Shipment Charges:', 10, 200);
    shipment_charges.forEach((charge, index) => {
      doc.text(
        `${charge.charge_name}: ${charge.total}`,
        10,
        210 + index * 10
      );
    });

    // Add total amount
    doc.text(`Total Amount: ${total_amount}`, 10, 220);

    // Add barcode (as base64 image)
    const barcodeUrl = ReactBarcode.createSvg(shipment_no, { format: 'CODE128' }).toDataURL();
    doc.addImage(barcodeUrl, 'JPEG', 10, 230, 100, 20);

    // Save the document
    doc.save('shipment_packaging_list.pdf');
  };

  return (
    <div className="shipment-packaging-list">
      <button onClick={handlePrint} className="print-button">Print</button>
      <button onClick={handleSavePDF} className="save-pdf-button">Save as PDF</button>

      {/* Header Section */}
      <div className="header">
        <img src={logo} alt="Company Logo" className="logo" />
        <div className="shipment-info">
          <h1>Shipment Packaging List</h1>
          <div><strong>Shipment No:</strong> {shipment_no}</div>
          <div><strong>SI No:</strong> {si_no}</div>
          <div><strong>Status:</strong> {shipment_status}</div>
          <div><strong>Shipment Dates:</strong> {scheduled_start_date} to {scheduled_end_date}</div>
        </div>
      </div>

      {/* Shipment Details Section */}
      <div className="shipment-details">
        <h2>Shipper Details</h2>
        <div><strong>Name:</strong> {shipper_details.name}</div>
        <div><strong>Country:</strong> {shipper_details.country}</div>
        <div><strong>Address:</strong> {shipper_details.address}</div>
        <div><strong>Phone:</strong> {shipper_details.phone}</div>
        <div><strong>Email:</strong> {shipper_details.email}</div>

        <h2>Consignee Details</h2>
        <div><strong>Name:</strong> {consignee_details.consignor_name}</div>
        <div><strong>Address:</strong> {consignee_details.address}</div>
        <div><strong>Phone:</strong> {consignee_details.consigner_phone}</div>
        <div><strong>Email:</strong> {consignee_details.consigner_email}</div>
      </div>

      {/* Packaging Details Section */}
      <div className="package-details">
        <h2>Package Details</h2>
        <table>
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

      {/* Charges Section */}
      <div className="charges-details">
        <h2>Shipment Charges</h2>
        <table>
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
        <div className="total-amount">
          <strong>Total Amount:</strong> {total_amount}
        </div>
      </div>

      {/* Barcode Section */}
      <div className="barcode-section">
        <h2>Shipment Barcode</h2>
        <ReactBarcode value={shipment_no} />
      </div>

      {/* Additional Information Section */}
      <div className="additional-info">
        <h2>Additional Information</h2>
        <p>{shipmentData.additionalInfo}</p>
      </div>

      {/* Documents Section */}
      {documents && documents.length > 0 && (
        <div className="documents-section">
          <h2>Documents</h2>
          <ul>
            {documents.map((doc, index) => (
              <li key={index}>{doc}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Footer Section */}
      <div className="footer">
        <div><strong>Payment Type:</strong> {payment_type}</div>
        <div><strong>Customs Value:</strong> {customs_value}</div>
        <div><strong>Freight Value:</strong> {freight_value}</div>
        <div><strong>Insurance Value:</strong> {insurance_value}</div>
        <div><strong>Invoice Value:</strong> {invoice_value}</div>
      </div>
    </div>
  );
};

export default PackagingList;
