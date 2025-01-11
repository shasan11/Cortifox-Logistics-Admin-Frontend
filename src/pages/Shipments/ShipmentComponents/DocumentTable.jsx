import React, { useEffect, useState } from "react";
import { Button, Modal, Table, Upload, Space, message } from "antd";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

const DocumentSchema = Yup.object().shape({
  document_name: Yup.string().required("Document name is required"),
  document_no: Yup.string().required("Document number is required"),
  file: Yup.mixed().required("File is required"),
  description: Yup.string(),
  shipment: Yup.string(),
});

const DocumentCrud = () => {
  const [documents, setDocuments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDocument, setCurrentDocument] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_APP_BACKEND_URL+"/shipments/documents/";

  // Fetch all documents
  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setDocuments(response.data.map((doc, index) => ({ ...doc, key: doc.id || index })));
    } catch (error) {
      message.error("Failed to fetch documents");
    } finally {
      setLoading(false);
    }
  };

  // Add or update a document
  const saveDocument = async (values) => {
    try {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
      });

      if (currentDocument !== null) {
        await axios.put(`${API_URL}/${values.id}`, formData);
        message.success("Document updated successfully");
      } else {
        await axios.post(API_URL, formData,{headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        }},);
        message.success("Document added successfully");
      }
      fetchDocuments();
    } catch (error) {
      message.error(`Failed to save document - ${error.message}`);
    } finally {
      setIsModalOpen(false);
      setCurrentDocument(null);
    }
  };

  // Delete a document
  const deleteDocument = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      message.success("Document deleted successfully");
      fetchDocuments();
    } catch (error) {
      message.error("Failed to delete document");
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const openModal = (record = null) => {
    setCurrentDocument(record);
    setIsModalOpen(true);
  };

  return (
    <div>
      <Button type="primary" onClick={() => openModal()}>
        Add Document
      </Button>
      <Table
        dataSource={documents}
        loading={loading}
        columns={[
          { title: "Document Name", dataIndex: "document_name", key: "document_name" },
          { title: "Document No", dataIndex: "document_no", key: "document_no" },
          { title: "Description", dataIndex: "description", key: "description" },
          {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
              <Space>
                <Button onClick={() => openModal(record)}>Edit</Button>
                <Button danger onClick={() => deleteDocument(record.id)}>Delete</Button>
              </Space>
            ),
          },
        ]}
        pagination={false}
      />
      <Modal
        title={currentDocument ? "Edit Document" : "Add Document"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Formik
          initialValues={
            currentDocument || {
              id: null,
              document_name: "",
              document_no: "",
              file: null,
              description: "",
              shipment: 6,
            }
          }
          validationSchema={DocumentSchema}
          onSubmit={saveDocument}
        >
          {({ setFieldValue, values, errors, touched }) => (
            <Form  encType="multipart/form-data">
              <div style={{ marginBottom: 16 }}>
                <label>Document Name</label>
                <Field name="document_name" className="ant-input" />
                {touched.document_name && errors.document_name && (
                  <div style={{ color: "red" }}>{errors.document_name}</div>
                )}
              </div>
              <div style={{ marginBottom: 16 }}>
                <label>Document No</label><br/>
                <Field name="document_no" className="ant-input" />
                {touched.document_no && errors.document_no && (
                  <div style={{ color: "red" }}>{errors.document_no}</div>
                )}
              </div>
              <div style={{ marginBottom: 16 }}>
                <label>File</label><br/>
                <Upload
                  beforeUpload={(file) => {
                    setFieldValue("file", file);
                    return false;
                  }}
                  maxCount={1}
                >
                  <Button icon={<UploadOutlined />}>Upload File</Button>
                </Upload>
                {touched.file && errors.file && (
                  <div style={{ color: "red" }}>{errors.file}</div>
                )}
              </div>
              <div style={{ marginBottom: 16 }}>
                <label>Description</label><br/>
                <Field name="description" className="ant-input" as="textarea" />
              </div>
              
              <div style={{ textAlign: "right" }}>
                <Button onClick={() => setIsModalOpen(false)} style={{ marginRight: 8 }}>
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit">
                  {currentDocument ? "Update" : "Add"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

export default DocumentCrud;
