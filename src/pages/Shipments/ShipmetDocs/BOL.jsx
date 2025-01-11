import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const BOL = ({ data }) => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Bill_of_Lading",
  });

  return (
    <div>
      <div ref={componentRef} style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <div style={{ textAlign: "center", fontSize: "18px", fontWeight: "bold", marginBottom: "10px" }}>
          BILL OF LADING
        </div>
        <table style={{ width: "100%", border: "1px solid #000", borderCollapse: "collapse" }}>
          <tbody>
            <tr>
              <td rowSpan="3" style={{ width: "50%", border: "1px solid #000", padding: "5px" }}>
                Shipper
              </td>
              <td style={{ border: "1px solid #000", padding: "5px" }}>Shipper's Reference</td>
              <td rowSpan="3" style={{ border: "1px solid #000", padding: "5px" }}>
                Bill of Lading Number
              </td>
            </tr>
            <tr>
              <td style={{ border: "1px solid #000", padding: "5px" }}>Carrier's Reference</td>
            </tr>
            <tr>
              <td style={{ border: "1px solid #000", padding: "5px" }}>Unique Consignment Reference</td>
            </tr>
            <tr>
              <td style={{ border: "1px solid #000", padding: "5px" }}>Consignee</td>
              <td style={{ border: "1px solid #000", padding: "5px" }}>Carrier Name</td>
              <td style={{ border: "1px solid #000", padding: "5px" }}></td>
            </tr>
            <tr>
              <td style={{ border: "1px solid #000", padding: "5px" }}>
                Notify Party (If not Consignee)
              </td>
              <td style={{ border: "1px solid #000", padding: "5px" }}>
                Additional Notify Party
              </td>
              <td style={{ border: "1px solid #000", padding: "5px" }}></td>
            </tr>
            <tr>
              <td style={{ border: "1px solid #000", padding: "5px" }}>Pre-Carriage By</td>
              <td style={{ border: "1px solid #000", padding: "5px" }}>Place of Receipt</td>
              <td style={{ border: "1px solid #000", padding: "5px" }}>Additional Information</td>
            </tr>
            {/* Additional rows */}
            <tr>
              <td colSpan="3" style={{ border: "1px solid #000", padding: "5px" }}>
                <div style={{ fontSize: "12px" }}>Terms and Conditions</div>
              </td>
            </tr>
            <tr>
              <td style={{ border: "1px solid #000", padding: "5px" }}>Place and Date of Issue</td>
              <td style={{ border: "1px solid #000", padding: "5px" }}>Signatory Company</td>
              <td style={{ border: "1px solid #000", padding: "5px" }}>Name of Authorized Signatory</td>
            </tr>
          </tbody>
        </table>
      </div>
      <button onClick={handlePrint} style={{ marginTop: "20px", padding: "10px", fontSize: "16px" }}>
        Save as PDF / Print
      </button>
    </div>
  );
};

export default BOL;
