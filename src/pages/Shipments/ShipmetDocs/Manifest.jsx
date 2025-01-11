import React from 'react';
import jsPDF from 'jspdf';

const ShipmentManifest = ({ manifest }) => {
  const printManifest = () => {
    const section = document.getElementById('manifest');
    const newWin = window.open('', '_blank');
    newWin.document.write('<html><head><title>Print</title></head><body>');
    newWin.document.write(section.innerHTML);
    newWin.document.write('</body></html>');
    newWin.document.close();
    newWin.print();
  };

  const saveManifestAsPDF = () => {
    const doc = new jsPDF();
    const section = document.getElementById('manifest');
    doc.html(section, {
      callback: function (doc) {
        doc.save('Shipment_Manifest.pdf');
      },
      x: 10,
      y: 10,
    });
  };

  return (
    <div id="manifest" style={{ margin: '20px', padding: '10px', border: '1px solid black', borderRadius: '5px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Shipment Manifest</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid black' }}>
            <th>ID</th>
            <th>Transport Mode</th>
            <th>Tracking Number</th>
            <th>ETA</th>
            <th>ETD</th>
          </tr>
        </thead>
        <tbody>
          {manifest.map((item) => (
            <tr key={item.id} style={{ borderBottom: '1px solid gray' }}>
              <td>{item.id}</td>
              <td>{item.transport_mode}</td>
              <td>{item.tracking_no}</td>
              <td>{item.eta}</td>
              <td>{item.etd}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button style={{ marginRight: '10px' }} onClick={printManifest}>Print Manifest</button>
        <button onClick={saveManifestAsPDF}>Save Manifest as PDF</button>
      </div>
    </div>
  );
};

const ShipmentDetails = ({ details }) => {
  const printDetails = () => {
    const section = document.getElementById('details');
    const newWin = window.open('', '_blank');
    newWin.document.write('<html><head><title>Print</title></head><body>');
    newWin.document.write(section.innerHTML);
    newWin.document.write('</body></html>');
    newWin.document.close();
    newWin.print();
  };

  const saveDetailsAsPDF = () => {
    const doc = new jsPDF();
    const section = document.getElementById('details');
    doc.html(section, {
      callback: function (doc) {
        doc.save('Shipment_Details.pdf');
      },
      x: 10,
      y: 10,
    });
  };

  return (
    <div id="details" style={{ margin: '20px', padding: '10px', border: '1px solid black', borderRadius: '5px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Shipment Details</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid black' }}>
            <th>Shipment No</th>
            <th>Direction</th>
            <th>Shipment Type</th>
            <th>Priority</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{details.shipment_no}</td>
            <td>{details.direction}</td>
            <td>{details.shipment_type}</td>
            <td>{details.priority}</td>
          </tr>
        </tbody>
      </table>
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button style={{ marginRight: '10px' }} onClick={printDetails}>Print Details</button>
        <button onClick={saveDetailsAsPDF}>Save Details as PDF</button>
      </div>
    </div>
  );
};

export { ShipmentManifest, ShipmentDetails };
