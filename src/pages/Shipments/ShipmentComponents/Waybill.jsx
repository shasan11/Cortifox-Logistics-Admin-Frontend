import React, { useState, useEffect } from "react";
import { Button, Input, Modal, Card, Space, notification } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import useFetchApiData from "../../../helper/other/fetchData";

const types = [
  "Notify Party",
  "Exporter",
  "Importer",
  "Notify Party Exporter",
  "Notify Party Importer",
  "Forwarding",
  "Executed By",
];

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  phone: Yup.string().required("Phone is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  address: Yup.string().required("Address is required"),
});

const Waybill = ({ shipment }) => {
  const [existingEntries, setExistingEntries] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentType, setCurrentType] = useState(null);

  const data = useFetchApiData(`/shipments/shipment-parties/?shipment=${shipment}`);

  useEffect(() => {
    if (data && Array.isArray(data)) {
      const entries = data.reduce((acc, item) => {
        acc[item.type] = {
          id: item.id,
          name: item.name,
          phone: item.phone,
          email: item.email,
          address: item.address,
        };
        return acc;
      }, {});
      setExistingEntries(entries);
    }
  }, [data]);

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      address: "",
    },
    validationSchema,
    onSubmit: (values) => {
      handleSave(values);
    },
  });

  const openModal = (type) => {
    setCurrentType(type);
    setIsModalVisible(true);
    formik.resetForm({
      values: {
        name: existingEntries[type]?.name || "",
        phone: existingEntries[type]?.phone || "",
        email: existingEntries[type]?.email || "",
        address: existingEntries[type]?.address || "",
      },
    });
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setCurrentType(null);
    formik.resetForm();
  };

  const handleSave = (values) => {
    const updatedEntries = { ...existingEntries, [currentType]: values };
    
    values.type = currentType;
    values.shipment = shipment;

    const existingId = existingEntries[currentType]?.id;

    const url = existingId
      ? `${import.meta.env.VITE_APP_BACKEND_URL}/shipments/shipment-parties/${existingId}/`
      : `${import.meta.env.VITE_APP_BACKEND_URL}/shipments/shipment-parties/`;

    const method = existingId ? "put" : "post";
    console.log("Way Bill Values",values);
    axios[method](url, values, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then(() => {
        notification.success({
          message: "Success",
          description: existingId
            ? `Updated entry for ${currentType}.`
            : `Created entry for ${currentType}.`,
        });

        setExistingEntries(updatedEntries);
        closeModal();
      })
      .catch((error) => {
        notification.error({
          message: "Error",
          description: error.message,
        });
      });
  };

  const handleDelete = (type) => {
    const existingId = existingEntries[type].id;
    console.error(existingId);

    if (existingId) {
      axios
        .delete(
          `${import.meta.env.VITE_APP_BACKEND_URL}/shipments/shipment-parties/${existingId}/`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        )
        .then(() => {
          const updatedEntries = { ...existingEntries };
          delete updatedEntries[type];
          setExistingEntries(updatedEntries);

          notification.success({
            message: "Deleted",
            description: `Entry for ${type} has been deleted.`,
          });
        })
        .catch((error) => {
          notification.error({
            message: "Error",
            description: error.message,
          });
        });
    } else {
      notification.error({
        message: "Error",
        description: `No entry exists for ${type} to delete.`,
      });
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          justifyContent: "flex-start",
          width: "100%",
        }}
      >
        {types.map((type) => (
          <Card
            key={type}
            title={type}
            extra={
              <Space>
                <EditOutlined onClick={() => openModal(type)} />
                <DeleteOutlined
                  onClick={() => handleDelete(type)}
                  style={{ color: "red" }}
                />
              </Space>
            }
            style={{ flex: "1 1 calc(33.33% - 16px)", minWidth: "300px" }}
          >
            <p>Name: {existingEntries[type]?.name || "N/A"}</p>
            <p>Email: {existingEntries[type]?.email || "N/A"}</p>
            <p>Address: {existingEntries[type]?.address || "N/A"}</p>
          </Card>
        ))}
      </div>

      <Modal
        title={`Edit Entry for ${currentType}`}
        visible={isModalVisible}
        onCancel={closeModal}
        footer={null}
      >
        {currentType && (
          <form onSubmit={formik.handleSubmit}>
            <div style={{ marginBottom: 8 }}>
              <label>Name:</label>
              <Input
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name && (
                <div style={{ color: "red" }}>{formik.errors.name}</div>
              )}
            </div>
            <div style={{ marginBottom: 8 }}>
              <label>Phone:</label>
              <Input
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.phone && formik.errors.phone && (
                <div style={{ color: "red" }}>{formik.errors.phone}</div>
              )}
            </div>
            <div style={{ marginBottom: 8 }}>
              <label>Email:</label>
              <Input
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <div style={{ color: "red" }}>{formik.errors.email}</div>
              )}
            </div>
            <div style={{ marginBottom: 8 }}>
              <label>Address:</label>
              <Input
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.address && formik.errors.address && (
                <div style={{ color: "red" }}>{formik.errors.address}</div>
              )}
            </div>
            <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
              Save
            </Button>
            <Button onClick={closeModal}>Cancel</Button>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default Waybill;
