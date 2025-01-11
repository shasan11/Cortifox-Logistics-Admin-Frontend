import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const PackagingList = ({ shipmentData }) => {
  const componentRef = useRef();
  console.log("Shipment Data",shipmentData)
  // Save as PDF
  const saveAsPdf = async () => {
    if (!componentRef.current) {
      alert("Packaging list is not available for download.");
      return;
    }

    const element = componentRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("Packaging_List.pdf");
  };

  // Print the document
  const printDocument = () => {
    if (!componentRef.current) {
      alert("Packaging list is not available for printing.");
      return;
    }

    const printContent = componentRef.current;
    const originalContent = document.body.innerHTML;

    // Replace the page content with the printable section
    document.body.innerHTML = printContent.innerHTML;

    window.print(); // Trigger the browser's print functionality

    // Restore the original content
    document.body.innerHTML = originalContent;
    window.location.reload(); // Refresh to reapply React state
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", margin: "20px" }}>
      {shipmentData && shipmentData.shipment_packages?.length > 0 ? (
        <div
          ref={componentRef}
          style={{
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            backgroundColor: "#fff",
          }}
        >
          {/* Header Section */}
          <div style={{ marginBottom: "20px", textAlign: "center" }}>
            <h1 style={{ textTransform: "uppercase", fontWeight: "bold" }}>
              Packing List
            </h1>
            {/* Exporter and Consignee Details */}
            <div>
              <div style={{ float: "left", textAlign: "left", width: "50%" }}>
                <strong>Exporter:</strong> <br />
                ABC Exports <br />
                4300 Longbeach Blvd <br />
                Longbeach, California, 90807 <br />
                +123456789
              </div>
              <div style={{ float: "right", textAlign: "right", width: "50%" }}>
                <strong>Consignee:</strong> <br />
                XYZ Imports <br />
                430 Queen Street <br />
                Brisbane, Queensland, 4814 <br />
                +6144022536
              </div>
            </div>
          </div>
          <div style={{ clear: "both", marginBottom: "20px" }} />

          {/* Shipment Details */}
          <table
            style={{
              width: "100%",
              marginBottom: "20px",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr>
                <th style={{ border: "1px solid #ddd", padding: "5px" }}>
                  Method of Dispatch
                </th>
                <th style={{ border: "1px solid #ddd", padding: "5px" }}>
                  Type of Shipment
                </th>
                <th style={{ border: "1px solid #ddd", padding: "5px" }}>
                  Country of Origin
                </th>
                <th style={{ border: "1px solid #ddd", padding: "5px" }}>
                  Final Destination
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "5px",
                    textAlign: "center",
                  }}
                >
                  Sea
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "5px",
                    textAlign: "center",
                  }}
                >
                  FCL
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "5px",
                    textAlign: "center",
                  }}
                >
                  United States
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "5px",
                    textAlign: "center",
                  }}
                >
                  Australia
                </td>
              </tr>
            </tbody>
          </table>

          {/* Package Details */}
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "12px",
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: "#f4f4f4",
                  textAlign: "left",
                }}
              >
                {[
                  "Package ID",
                  "Description",
                  "HS Code",
                  "Length",
                  "Width",
                  "Height",
                  "Weight (kg)",
                  "Quantity",
                  "Volumetric Weight",
                  "Chargable Weight",
                ].map((header) => (
                  <th
                    key={header}
                    style={{
                      border: "1px solid #ddd",
                      padding: "8px",
                      textAlign: "center",
                    }}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {shipmentData.shipment_packages.map((pkg, index) => (
                <tr key={index}>
                  {[
                    pkg.shipment_package,
                    pkg.good_desc,
                    pkg.hs_code,
                    pkg.length,
                    pkg.width,
                    pkg.height,
                    pkg.gross_weight,
                    pkg.quantity,
                    pkg.volumetric_weight,
                    pkg.chargable,
                  ].map((cell, i) => (
                    <td
                      key={i}
                      style={{
                        border: "1px solid #ddd",
                        padding: "8px",
                        textAlign: "center",
                      }}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Signature Section */}
          <div style={{ marginTop: "20px", textAlign: "left" }}>
            <div style={{ float: "left" }}>
              <strong>Authorized Signatory</strong>
              <div>____________________________</div>
              <div style={{ marginTop: "10px" }}>Randy Clarke</div>
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            backgroundColor: "#fff",
            textAlign: "center",
          }}
        >
          <h2>No Packaging List Available</h2>
          <p>Please provide valid shipment data to view the packaging list.</p>
        </div>
      )}

      {/* Buttons */}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button
          onClick={saveAsPdf}
          style={{
            marginRight: "10px",
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Save as PDF
        </button>
        <button
          onClick={printDocument}
          style={{
            marginLeft: "10px",
            padding: "10px 20px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Print
        </button>
      </div>
    </div>
  );
};

export default PackagingList;
