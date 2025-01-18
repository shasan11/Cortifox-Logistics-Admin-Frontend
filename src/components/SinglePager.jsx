import React ,{useEffect}from "react";
import { Button, Space } from "antd";
import PropTypes from "prop-types";

const SinglePager = ({
  title,
  visible,
  onCancel,
  onOk,
  formik,
  width = "100%",
  style = {},
  footer,
  children, // This will be the content passed inside the SinglePager
}) => {
  // Render nothing if not visible
  if (!visible) return null;
  useEffect(() => {
    document.body.style.overflow = "hidden"; // Prevent body scroll
    return () => {
      document.body.style.overflow = ""; // Restore body scroll on unmount
    };
  }, []);
  return (
    <div
      style={{
        ...style,
        backgroundColor: "white", // Retain white background if needed
        padding: "20px",
        borderRadius: "8px",
        height:"100vh",
        overflowY: "auto", // Handle overflow of content
        width: width,
        zIndex:1200,
        margin: "0 auto", // Center the container when width is less than 100%
      }}
    >
      {/* Title section */}
      <div
        style={{
          fontSize: "18px",
          fontWeight: "bold",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        {title}
      </div>

      {/* Render passed children (form or any content) */}
      <div>{children}</div>

      {/* Footer with action buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
        }}
      >
        {footer || (
          <Space>
            <Button onClick={onCancel}>Cancel</Button>
            <Button type="primary" onClick={formik.handleSubmit}>
              Submit
            </Button>
          </Space>
        )}
      </div>
    </div>
  );
};

// PropTypes to validate props
SinglePager.propTypes = {
  title: PropTypes.string,
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onOk: PropTypes.func,
  formik: PropTypes.object.isRequired,
  width: PropTypes.string,
  style: PropTypes.object,
  footer: PropTypes.node,
  children: PropTypes.node, // Accepts children to render inside SinglePager
};

export default SinglePager;
