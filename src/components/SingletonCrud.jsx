import React, { useState, useEffect, useRef, useCallback } from "react";
import { Modal, Button, Input, Space, notification, Row, Col, Drawer, Dropdown, Menu, Empty, Typography, Spin, Tooltip, } from "antd";
import { AgGridReact } from "ag-grid-react";
import axios from "axios";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import "ag-grid-enterprise";
import { EditOutlined, DeleteOutlined, PlusCircleOutlined, ExportOutlined, SearchOutlined, MoreOutlined, RocketOutlined, MenuOutlined, EyeInvisibleOutlined, } from "@ant-design/icons";
import { useFormik } from "formik";
import { VscLaw } from "react-icons/vsc";

const ActionCell = ({ onEdit, onDelete, record, inactiveAction, custom_actions, is_delete}) => (  
  <> 
    <Tooltip title="Edit"> {" "} <Button icon={<EditOutlined />} onClick={() => onEdit(record)} type="default" />{" "} </Tooltip>
    {is_delete && (
  <Tooltip title="Edit">
    {" "}
    <Button icon={<DeleteOutlined />} onClick={() => onDelete(record)} type="default" />
    {" "}
  </Tooltip>
)}

    </>  );

const SingleTonCrud = ({ endpoint, formModal: FormModal,deleteAct, validationSchema, filterurl, initialFormValues, columnDefs, forTitle, modalTitle, no_title, permission_level, render_type, no_header, inactiveAction,getData}) => {
  const gridRef = useRef();
  const inactivegridRef = useRef();
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const dataref=useRef([])
  const [inactivedata, setinactiveData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedInactiveRows, setInactiveSelectedRows] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [filteredData,setFilteredData]=useState([])
  const [searchTerm, setSearchTerm] = useState("");
  const [drawerVisible, setDrawerVisible] = useState({ history: false, inactive: false, });

  const [tableColumns, setColumns] = useState(columnDefs);
  const backendurl = `${import.meta.env.VITE_APP_BACKEND_URL}${endpoint}`;
  const filters = filterurl+"&"|| "";

  const onSelectionChange = useCallback(() => {
    const selectedNodes = gridRef.current.api.getSelectedNodes();
    const selectedIds = selectedNodes.map((node) => node.data); // Assuming 'id' is the unique field
    setSelectedRows(selectedIds);
  }, []);

  const onInactiveSelectionChange = useCallback(() => {
    const selectedNodes = inactivegridRef.current.api.getSelectedNodes();
    const selectedIds = selectedNodes.map((node) => node.data); // Assuming 'id' is the unique field
    setInactiveSelectedRows(selectedIds);
  }, []);

  useEffect(() => {
    const updatedFilteredData = data.filter((record) =>
      Object.values(record).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredData(updatedFilteredData);
  }, [data, searchTerm]); 


  useEffect(() => {
    const updatedColumnDefs = [
      ...columnDefs,
      {
        suppressRowClickSelection: true,
        headerName: "",
        suppressMenu: true, // Disable the menu for this column
        field: "action",
        sortable: false,
        cellRenderer: (params) => (
          <ActionCell onEdit={handleEdit} onDelete={handleDelete} record={params.data} inactiveAction={inactiveAction} is_delete={deleteAct} />
        ),
        pinned: "left",
        minWidth: 80,
        maxWidth: 80,
        flex: 1,
      },
    ];
    setColumns(updatedColumnDefs);
  }, [columnDefs]);

  // Fetch data from backend
  const fetchData = async () => {
    console.log("Fetch Data Triggered",backendurl);
    setLoading(true);
    try {
      const response = await axios.get(backendurl +"?" +filters + "active=True", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setData(response.data);
      dataref.current=response.data
    } catch (error) {
      notification.error({ message: "Error fetching data" });
    } finally {
      setLoading(false);
    }
  };
  const fetchInactiveData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(backendurl + "?"+filters + "active=False", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setinactiveData(response.data);
      console.log(response.data, "Inactive Data");
    } catch (error) {
      notification.error({ message: "Error fetching data" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchInactiveData();
  }, [backendurl]);

  
 

  // Add new record
  const handleAdd = () => {
    console.log("Function triggerd");
    setEditingRecord(null);
    setIsEditMode(false);
    setModalVisible(true);
    formik.resetForm();
  };

  // Edit existing record
  const handleEdit = (record) => {
    const formdata=dataref.current.filter((item)=>item.id==record.id)[0]||record
    console.log("Real Form Data",formdata)
    console.log('dataref',dataref.current)
    console.log(record);
    formik.setValues(formdata);
    setEditingRecord(record);
    setIsEditMode(true);
    setModalVisible(true);     
  };

  // Delete record with confirmation
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${backendurl}${id}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      fetchData();
      fetchInactiveData();
      notification.success({ message: `${forTitle} deleted successfully` });
    } catch (error) {
      notification.error({
        message:
          "The record cannot be deleted because it is currently in use by the application.",
      });
    }
  };
  const handleBulkDelete = async () => {
    try {
      await axios.delete(`${backendurl}`,selectedRows, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      fetchData();
      fetchInactiveData();
      notification.success({ message: `${forTitle} deleted successfully` });
    } catch (error) {
      notification.error({
        message:
          "The record cannot be deleted because it is currently in use by the application.",
      });
    }
  };
  // Formik setup for form handling
  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
        console.warn("Values to be processed in SingleTonCrud",VscLaw)
        let response; // Declare a variable to hold the response
    
        if (isEditMode) {
          response = await axios.put(`${backendurl}${values.id}/`, values, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          });
        } else {
          console.log(values); // Log the values being submitted
          response = await axios.post(backendurl, values, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          });
        }
        try{
          getData(response);     
        }
        finally{
        setModalVisible(false);
        fetchData();
        fetchInactiveData();
        notification.success({
          message: `${isEditMode ? "Updated" : "Created"} successfully`,
        });
       }
    },
  });

 

  // Export grid data to Excel
  const onBtExport = useCallback(() => {
    gridRef.current.api.exportDataAsExcel();
  }, []);

  const onBtClearSelection = useCallback(() => {
    gridRef.current.api.deselectAll();
  }, []);

  const onBtExportSelected = useCallback(() => {
    gridRef.current.api.exportDataAsCsv({
      onlySelected: true,
    });
  }, []);

  const onInactiveBtExport = useCallback(() => {
    inactivegridRef.current.api.exportDataAsExcel();
  }, []);

  const onInactiveBtClearSelection = useCallback(() => {
    inactivegridRef.current.api.deselectAll();
  }, []);

  const onInactiveBtExportSelected = useCallback(() => {
    inactivegridRef.current.api.exportDataAsCsv({
      onlySelected: true,
    });
  }, []);

  const onBtnBulkDelete = useCallback(() => {
    axios
      .delete(backendurl, selectedRows, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        notification.success({ message: "Data Deleted Successfully" }),
          fetchData();
        fetchInactiveData();
      })
      .catch((response) => {
        notification.error({
          message:
            "The record cannot be deleted because it is currently in use by the application.",
        }),
          fetchData();
        fetchInactiveData();
      });
  });

  const onBtnBulkInactive = useCallback(() => {
    const updatedRows = selectedRows.map((row) => ({
      ...row,
      active: false,
    }));
    console.info("This is the data for bulk inactive", updatedRows);
    console.log(updatedRows);
    axios
      .put(backendurl, updatedRows, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        notification.success({ message: "Successfully Marked Inactive" }),
          fetchData();
        fetchInactiveData();
        setInactiveSelectedRows([]), setSelectedRows([]);
      })
      .catch((response) => {
        notification.error({
          message: "Something Went Wrong , Please Try Again !",
        }),
          fetchData();
        fetchInactiveData();
      });
  });

  const onBtnBulkActive = useCallback(() => {
    const updatedRows = selectedInactiveRows.map((row) => ({
      ...row,
      active: true,
    }));
    console.info("This is the data for bulk inactive", updatedRows);
    console.log(updatedRows);
    axios
      .put(backendurl, updatedRows, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        notification.success({
          message: "Records Successfully Marked Active.",
        }),
          fetchData(),
          fetchInactiveData();
      })
      .catch((response) => {
        notification.error({
          message: "Something Went Wrong , Please Try Again !",
        }),
          fetchData();
        fetchInactiveData();
      });
  });

  const onBtnSingleEdit = useCallback(
    (propertyValueArray, record) => {
      const updatedRecord = { ...record };
      propertyValueArray.forEach(({ the_property, the_value }) => {
        updatedRecord[the_property] = the_value;
      });

      axios
        .put(backendurl, updatedRecord, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        .then((response) => {
          notification.success({ message: "Successfully Updated" });
          fetchData(); // Refresh data after update
          fetchInactiveData();
        })
        .catch((error) => {
          notification.error({
            message: "Something Went Wrong, Please Try Again!",
          });
          fetchData(); // Optional: refresh or handle errors accordingly
          fetchInactiveData();
        });
    },
    [backendurl, fetchData, fetchInactiveData]
  );

  const onBtnBulkEdit = useCallback(
    (propertyValueArray) => {
      const updatedRows = selectedRows.map((row) => {
        propertyValueArray.forEach(({ the_property, the_value }) => {
          row[the_property] = the_value;
        });
        return { ...row };
      });

      axios
        .put(backendurl, updatedRows, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        .then((response) => {
          notification.success({ message: "Successfully Updated" });
          fetchData(); // Refresh data after update
          fetchInactiveData();
        })
        .catch((error) => {
          notification.error({
            message: "Something Went Wrong, Please Try Again!",
          });
          fetchData(); // Optional: refresh or handle errors accordingly
          fetchInactiveData();
        });
    },
    [selectedRows, backendurl, fetchData]
  );

  // Drawer handling
  const toggleDrawer = (type, visible) => {
    setDrawerVisible({ ...drawerVisible, [type]: visible });
  };

  // Dropdown menu for options
  const menu = (
    <Menu>
      <Menu.Item key="export" icon={<ExportOutlined />} onClick={onBtExport}> {" "} Export All{" "} </Menu.Item>
      {inactiveAction&&(
        <Menu.Item key="viewInactive" icon={<ExportOutlined />} onClick={() => toggleDrawer("inactive", true)} > {" "} View Inactive{" "} </Menu.Item>
      )}
       
    </Menu>
  );

  return (
    <>
      <FormModal visible={modalVisible} onCancel={() => setModalVisible(false)} onSubmit={formik.handleSubmit} formik={formik} modalTitle={modalTitle} />

      {render_type === "add_related" ? (
        <div style={{ width: "100%" }}>
          <Button shape="square" icon={<PlusCircleOutlined />} onClick={handleAdd} />
        </div>
      ) : render_type === "edit_related" ? (
        <p>Success!</p>
      ) : (
        <>
          <div
            style={{
              borderRadius: "10px",
              padding: "0px 0px",
              backgroundColor: "white",
            }}
          >
            {/* Header */}

            {no_header ? (
              <></>
            ) : (
              <>
                <Row justify="space-between" align="middle" wrap style={{ background: "#fafafa", borderBottom: "1px solid #d9d9d9", padding: "15px 15px", }} >
                  <Typography.Title level={4} style={{ margin: 0 }}>
                    {forTitle}
                  </Typography.Title>

                  <Button type="primary" icon={<PlusCircleOutlined />} onClick={handleAdd} size="large" style={{ background: "#389e0d" }} > Add New </Button>
                </Row>

                {/* Search and Export Row */}

                {/* Selected Actions Row */}
              </>
            )}
            <Row justify="space-between" align="middle" wrap style={{ borderBottom: "1px solid #d9d9d9", borderRight: "1px solid #d9d9d9",background: "#FFF" }} >
              <Input size="large" placeholder="Search records..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} prefix={<SearchOutlined />} style={{ flex: 1, borderRadius: "0px", height: "100%", border: "none",padding:"15px",borderRight: "1px solid #d9d9d9" }} />
              <Space style={{ paddingInline: "20px" }}>
                 
                <Button icon={<MenuOutlined />} type="text" />
                <Dropdown overlay={menu} trigger={["click"]}>
                  <Button icon={<MoreOutlined />} size="large" type="text" style={{ color: "#52c41a" }} > Options </Button>
                </Dropdown>
                {no_header && (
                  <>
                    <Button type="primary" icon={<PlusCircleOutlined />} onClick={handleAdd} size="large" style={{ background: "#389e0d" }} > Add New </Button>
                  </>
                )}
              </Space>
            </Row>
            {selectedRows.length > 0 && (
              <Row justify="space-between" style={{ padding: "10px 0", backgroundColor: "#e6f4ff" }} >
                <Button type="text" style={{ fontWeight: "600", color: "#001d66" }} onClick={onBtExportSelected} > Export Selected </Button>
                <Button type="text" style={{ fontWeight: "600", color: "#820014" }} onClick={onBtnBulkInactive} > Mark Inactive </Button>
                {deleteAct&&(
                    <Button type="text" style={{ fontWeight: "600", color: "#820014" }} onClick={handleBulkDelete} > Delete </Button>

                )}
                <Button type="text" style={{ fontWeight: "600", color: "#820014" }} onClick={onBtExport} > Export All </Button>
                <Button type="text" style={{ fontWeight: "600", color: "#001d66" }} onClick={onBtClearSelection} > Clear Selection </Button>
              </Row>
            )}
            <Spin spinning={loading}>
              {data.length > 0 ? (
                <div className="ag-theme-material" style={{ height: "auto", borderRadius: "0px" }} >
                  <AgGridReact ref={gridRef} rowData={filteredData} columnDefs={tableColumns} rowSelection="multiple" pagination={true} paginationPageSize={10} domLayout="autoHeight" animateRows={true} rowClass="ag-grid-table-row" getRowId={(params) => params.data.id} onSelectionChanged={onSelectionChange}  suppressRowClickSelection={true} />
                </div>
              ) : (
                <Empty description="No records found" style={{ padding: "100px" }} />
              )}
            </Spin>

            {/* Form Modal */}
            

            {/* History Drawer */}
            <Drawer title="History" placement="right" onClose={() => toggleDrawer("history", false)} visible={drawerVisible.history} width={400} >
              <Empty description="No history records" />
            </Drawer>

            <Drawer title="Inactive Items" placement="right" onClose={() => toggleDrawer("inactive", false)} visible={drawerVisible.inactive} width={1000} >
              <Spin spinning={loading}>
                <h4 style={{ color: "#1677ff" }}>
                  {inactivedata.length} Inactive Items
                </h4>
                {selectedInactiveRows.length > 0 && (
                  <Row justify="space-between" style={{ paddingBlock: "10px", background: "#bae0ff" }} >
                    <Col>
                      <Button type="text" style={{ fontWeight: "600", color: "#001d66" }} onClick={onInactiveBtExportSelected} > Export Selected </Button>
                    </Col>
                    <Col>
                     <Button type="text" style={{ fontWeight: "600", color: "#820014" }} onClick={onBtnBulkActive} > Mark Active </Button>
                    </Col>
                    <Col>
                      <Button type="text" style={{ fontWeight: "600", color: "#820014" }} onClick={onInactiveBtExport} > Export All </Button>
                    </Col>
                    <Col>
                      <Button type="text" style={{ fontWeight: "600", color: "#001d66" }} onClick={onInactiveBtClearSelection} > Clear Selection </Button>
                    </Col>
                  </Row>
                )}
                {inactivedata.length > 0 ? (
                  <div
                    className="ag-theme-material"
                    style={{ height: "auto", borderRadius: "0px" }}
                  >
                    <AgGridReact ref={inactivegridRef} rowData={inactivedata} columnDefs={columnDefs} onSelectionChanged={onInactiveSelectionChange} domLayout="autoHeight" rowSelection="multiple" pagination={true} paginationPageSize={10} suppressClickEdit />
                  </div>
                ) : (
                  <Empty description="No records found" style={{ padding: "100px" }} />
                )}
              </Spin>
            </Drawer>
          </div>
         
              
            
        </>
      )}
     </>
  );
};

export default SingleTonCrud;
