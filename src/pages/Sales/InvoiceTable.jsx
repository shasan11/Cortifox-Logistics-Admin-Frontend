import React, { useRef } from "react";
import { Row, Col, Table } from "antd";
import html2pdf from "html2pdf.js";
import './InvoiceStyles.css'

const InvoiceComponent = ({
  companyName = "Quest Provider",
  companyAddress = "27 Provider Rd, Nashville, Tennessee, 37211, US",
  contactInfo = "Phone: 000-000-0000 | Email: support@questprovider.com",
  recipientName = "Bob Jones",
  recipientAddress = "1 Trims Way, Nashville, Tennessee, 37215",
  invoiceNumber = "1052",
  issueDate = "2025-01-10",
  dueDate = "2025-01-20",
  shipmentJobs = [],
  getShipmentData,
  total = 0,
  discountPercent = 0,
}) => {
  const invoiceRef = useRef(); // Ref to the invoice container
  const discount = (total * discountPercent) / 100 || 0;
  const grandTotal = total - discount;

  const columns = [
    {
      title: "Product / Service",
      dataIndex: "shipment_no",
      key: "shipment_no",
      render: (_, item) => getShipmentData(item).shipment_no || "",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (_, item) => getShipmentData(item).description || "N/A",
    },
    {
      title: "Qty.",
      dataIndex: "quantity",
      key: "quantity",
      render: () => "1", // Static value for simplicity
    },
    {
      title: "Unit Price",
      dataIndex: "unit_price",
      key: "unit_price",
      render: (_, item) => `$${getShipmentData(item).total_amount || 0}`,
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (_, item) => `$${getShipmentData(item).total_amount || 0}`,
    },
  ];

  const handlePrint = () => {
    const invoiceElement = document.querySelector('.invoice-container');
    const printWindow = window.open('', '_blank','landscape');
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Invoice</title>
          <style>
            /* General Invoice Styles */
.invoice-container {
  font-family: Arial, sans-serif;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  max-width: 800px;
  margin: auto;
  color: #333;
}

.invoice-container h2,
.invoice-container h3,
.invoice-container h4 {
  margin: 0;
}

.invoice-container h2 {
  font-size: 24px;
  font-weight: bold;
}

.invoice-container h3 {
  font-size: 20px;
  font-weight: bold;
  color: #666;
}

.invoice-container h4 {
  font-size: 18px;
  margin-bottom: 10px;
}

.invoice-container p {
  margin: 4px 0;
  color: #555;
}

.invoice-container table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.invoice-container th,
.invoice-container td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
  font-size: 14px;
}

.invoice-container th {
  background-color: #f4f4f4;
  font-weight: bold;
  color: #333;
}

.invoice-container .total-row {
  font-weight: bold;
}

.invoice-container .summary {
  text-align: right;
}

.invoice-container .summary p {
  margin: 5px 0;
  font-size: 16px;
}

.invoice-container .summary b {
  font-size: 18px;
  color: #000;
}

/* Button Styles */
.no-print {
  margin-top: 20px;
  text-align: center;
}

.no-print button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 5px;
  transition: background-color 0.3s ease;
}

.no-print button:hover {
  background-color: #0056b3;
}

/* Print-Specific Styles */
@media print {
  .invoice-container {
    font-family: Arial, sans-serif;
    color: #000;
    width: 100%;
    margin: 0 auto;
  }

  .no-print {
    display: none;
  }

  table {
    width: 100%;
  }

  th, td {
    border: 1px solid #000;
    padding: 8px;
  }
}

/* Responsive Styles */
@media (max-width: 1200px) {
  .invoice-container {
    max-width: 90%;
  }
  .invoice-container h2 {
    font-size: 22px;
  }
  .invoice-container h3 {
    font-size: 18px;
  }
  .invoice-container h4 {
    font-size: 16px;
  }
}

@media (max-width: 768px) {
  .invoice-container {
    max-width: 100%;
    padding: 15px;
  }
  .invoice-container h2 {
    font-size: 20px;
  }
  .invoice-container h3 {
    font-size: 16px;
  }
  .invoice-container h4 {
    font-size: 14px;
  }
  .invoice-container table th,
  .invoice-container table td {
    font-size: 12px;
    padding: 6px;
  }
}

@media (max-width: 480px) {
  .invoice-container {
    padding: 10px;
  }
  .invoice-container h2 {
    font-size: 18px;
  }
  .invoice-container h3 {
    font-size: 14px;
  }
  .invoice-container h4 {
    font-size: 12px;
  }
  .invoice-container table th,
  .invoice-container table td {
    font-size: 10px;
    padding: 5px;
  }
  .no-print button {
    font-size: 14px;
    padding: 8px 16px;
  }
}

          </style>
        </head>
        <body>
          ${invoiceElement.outerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };
  
  const handleSaveAsPDF = () => {
    const invoiceElement = invoiceRef.current;
    const options = {
      filename: `Invoice_${invoiceNumber}.pdf`,
      jsPDF: { unit: "pt", format: "a4" },
      html2canvas: { scale: 1 },
    };
    html2pdf().set(options).from(invoiceElement).save();
  };

  return (
    <div>
      {/* Invoice Content */}
      <div className="invoice-container" ref={invoiceRef}>
        <Row>
          <Col xl={12}>
            <h2>{companyName}</h2>
            <p>{companyAddress}</p>
            <p>{contactInfo}</p>
          </Col>
          <Col xl={12} style={{ textAlign: "right" }}>
            <h3>Invoice #{invoiceNumber}</h3>
            <p>Issued: {issueDate}</p>
            <p>Due: {dueDate}</p>
          </Col>
        </Row>

        <Row style={{ marginTop: "20px" }}>
          <Col span={12}>
            <h4>Invoice To:</h4>
            <p>{recipientName}</p>
            <p>{recipientAddress}</p>
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={shipmentJobs}
          pagination={false}
          rowKey={(item) => item.shipment_no}
          style={{ marginTop: "20px" }}
        />

        <Row justify="end" style={{ marginTop: "20px", textAlign: "right" }}>
          <Col span={8}>
            <p>Subtotal: <b>${total}</b></p>
            <p>Discount ({discountPercent}%): <b>-${discount.toFixed(2)}</b></p>
            <p>Grand Total: <b>${grandTotal.toFixed(2)}</b></p>
          </Col>
        </Row>
      </div>

      {/* Buttons */}
      <div className="no-print" style={{ textAlign: "center", marginTop: "20px" }}>
        <button onClick={handlePrint} style={{ marginRight: "10px" }}>
          Print Invoice
        </button>
        <button onClick={handleSaveAsPDF}>
          Save as PDF
        </button>
      </div>
    </div>
  );
};

export default InvoiceComponent;
