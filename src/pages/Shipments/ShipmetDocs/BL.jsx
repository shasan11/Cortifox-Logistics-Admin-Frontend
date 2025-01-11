import React from 'react';

const BillOfLading = ({ shipmentData }) => {
    const renderPackages = () => (
        shipmentData.shipment_packages.map((pkg, index) => (
            <tr key={index}>
                <td>{pkg.shipment_package}</td>
                <td>{pkg.quantity} {pkg.package_type_display}</td>
                <td>{pkg.good_desc}</td>
                <td>{pkg.gross_weight} {pkg.mass_unit_display}</td>
                <td>{pkg.volumetric_weight}</td>
                <td>{pkg.length}x{pkg.width}x{pkg.height} {pkg.package_unit_display}</td>
            </tr>
        ))
    );

    return (
        <div>
            <div style={{ textAlign: 'center', fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>BILL OF LADING</div>
            <table style={{ width: '100%', border: '1px solid black', borderCollapse: 'collapse' }}>
                <tbody>
                    <tr>
                        <td style={{ border: '1px solid black', padding: '5px', width: '50%' }}>Shipper: {shipmentData.shipper_details?.name}</td>
                        <td style={{ border: '1px solid black', padding: '5px' }}>Shipper's Reference: {shipmentData.shipment_no}</td>
                        <td style={{ border: '1px solid black', padding: '5px' }}>Bill of Lading Number: {shipmentData.bol}</td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid black', padding: '5px' }}>Consignee: {shipmentData.consignee_details?.consignor_name}</td>
                        <td style={{ border: '1px solid black', padding: '5px' }}>Carrier Name: {shipmentData.port_handling_agent_origin_details?.name}</td>
                        <td style={{ border: '1px solid black', padding: '5px' }}></td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid black', padding: '5px' }}>Notify Party: {shipmentData.notify_party_details?.name || "N/A"}</td>
                        <td style={{ border: '1px solid black', padding: '5px' }}>Additional Notify Party</td>
                        <td style={{ border: '1px solid black', padding: '5px' }}></td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid black', padding: '5px' }}>Pre-Carriage By</td>
                        <td style={{ border: '1px solid black', padding: '5px' }}>Place of Receipt: {shipmentData.port_origin_details?.name}</td>
                        <td style={{ border: '1px solid black', padding: '5px' }}>Additional Information</td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid black', padding: '5px' }}>Vessel / Aircraft: {shipmentData.vessel_name || shipmentData.flight_number}</td>
                        <td style={{ border: '1px solid black', padding: '5px' }}>Voyage No: {shipmentData.voyage_number}</td>
                        <td style={{ border: '1px solid black', padding: '5px' }}>Port of Loading: {shipmentData.port_origin_details?.name}</td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid black', padding: '5px' }}>Port of Discharge: {shipmentData.port_destination_details?.name}</td>
                        <td style={{ border: '1px solid black', padding: '5px' }}>Place of Delivery: {shipmentData.final_address}</td>
                        <td style={{ border: '1px solid black', padding: '5px' }}>Final Destination</td>
                    </tr>
                    <tr>
                        <td colSpan="3" style={{ border: '1px solid black', padding: '5px' }}>
                            <table style={{ width: '100%', border: '1px solid black', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr>
                                        <th style={{ border: '1px solid black', padding: '5px' }}>Marks & Numbers</th>
                                        <th style={{ border: '1px solid black', padding: '5px' }}>Kind & No of Packages</th>
                                        <th style={{ border: '1px solid black', padding: '5px' }}>Description of Goods</th>
                                        <th style={{ border: '1px solid black', padding: '5px' }}>Net Weight (Kg)</th>
                                        <th style={{ border: '1px solid black', padding: '5px' }}>Gross Weight (Kg)</th>
                                        <th style={{ border: '1px solid black', padding: '5px' }}>Measurements (m³)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderPackages()}
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default BillOfLading;
