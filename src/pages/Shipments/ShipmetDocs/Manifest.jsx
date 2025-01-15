import React from "react";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Barcode from "react-barcode";

const ShipmentManifest = ({ shipmentData }) => {
    const componentRef = useRef();

    const handlePrint = () => {
        const printContent = componentRef.current;
        const windowPrint = window.open("", "PRINT", "height=600,width=800");
        windowPrint.document.write(`
            <html>
                <head>
                    <title>Shipment Manifest</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            padding: 20px;
                            position: relative;
                        }
                        table {
                            width: 100%;
                            border-collapse: collapse;
                            margin-bottom: 20px;
                        }
                        th, td {
                            border: 1px solid #000;
                            padding: 8px;
                            text-align: left;
                        }
                        th {
                            background-color: #f2f2f2;
                        }
                        .barcode {
                            margin-top: 20px;
                            text-align: center;
                        }
                        .watermark {
                            position: fixed;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            font-size: 5rem;
                            color: rgba(0, 0, 0, 0.1);
                            white-space: nowrap;
                            pointer-events: none;
                            z-index: -1;
                        }
                    </style>
                </head>
                <body>
                    <div class="watermark">CONFIDENTIAL</div>
                    ${printContent.innerHTML}
                </body>
            </html>
        `);
        windowPrint.document.close();
        windowPrint.focus();
        windowPrint.print();
        windowPrint.close();
    };

    return (
        <div>
            <div ref={componentRef} className="shipment-manifest">
                <h1 style={{ textAlign: "center" }}>Shipment Manifest</h1>
                <h2>Shipment No: {shipmentData.shipment_no}</h2>
                <h3>SI No: {shipmentData.si_no}</h3>

                <table>
                    <thead>
                        <tr>
                            <th colSpan="2">Client Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Name</td>
                            <td>{shipmentData.client_details.name}</td>
                        </tr>
                        <tr>
                            <td>Country</td>
                            <td>{shipmentData.client_details.country}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>{shipmentData.client_details.email}</td>
                        </tr>
                        <tr>
                            <td>Phone</td>
                            <td>{shipmentData.client_details.phone}</td>
                        </tr>
                    </tbody>
                </table>

                <table>
                    <thead>
                        <tr>
                            <th colSpan="2">Consignee Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Name</td>
                            <td>{shipmentData.consignee_details.consignor_name}</td>
                        </tr>
                        <tr>
                            <td>Phone</td>
                            <td>{shipmentData.consignee_details.consigner_phone}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>{shipmentData.consignee_details.consigner_email}</td>
                        </tr>
                        <tr>
                            <td>Address</td>
                            <td>{shipmentData.consignee_details.address}</td>
                        </tr>
                        <tr>
                            <td>Remarks</td>
                            <td>{shipmentData.consignee_details.remarks}</td>
                        </tr>
                    </tbody>
                </table>

                <table>
                    <thead>
                        <tr>
                            <th colSpan="2">Shipper Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Name</td>
                            <td>{shipmentData.shipper_details.name}</td>
                        </tr>
                        <tr>
                            <td>Country</td>
                            <td>{shipmentData.shipper_details.country}</td>
                        </tr>
                        <tr>
                            <td>Address</td>
                            <td>{shipmentData.shipper_details.address}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>{shipmentData.shipper_details.email}</td>
                        </tr>
                    </tbody>
                </table>

                <table>
                    <thead>
                        <tr>
                            <th>Package</th>
                            <th>Description</th>
                            <th>Dimensions</th>
                            <th>Weight</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {shipmentData.shipment_packages.map((pkg) => (
                            <tr key={pkg.id}>
                                <td>{pkg.shipment_package}</td>
                                <td>{pkg.good_desc}</td>
                                <td>{pkg.length}x{pkg.width}x{pkg.height} {pkg.package_unit_display}</td>
                                <td>{pkg.gross_weight} {pkg.mass_unit_display}</td>
                                <td>{pkg.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <table>
                    <thead>
                        <tr>
                            <th>Charge Name</th>
                            <th>Type</th>
                            <th>Rate</th>
                            <th>Quantity</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {shipmentData.shipment_charges.map((charge) => (
                            <tr key={charge.id}>
                                <td>{charge.charge_name}</td>
                                <td>{charge.charge_type}</td>
                                <td>{charge.rate}</td>
                                <td>{charge.qty}</td>
                                <td>{charge.total}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="barcode">
                    <Barcode value={shipmentData.shipment_no} />
                </div>
            </div>

            <button onClick={handlePrint} className="print-button">Print / Save as PDF</button>
        </div>
    );
};

export default ShipmentManifest;
