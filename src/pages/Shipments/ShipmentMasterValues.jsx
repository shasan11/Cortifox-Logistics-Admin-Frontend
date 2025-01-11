import * as Yup from "yup";
const transportOptions = [
    { label: "Air", value: "AIR" },
    { label: "Sea", value: "SEA" },
    { label: "Land", value: "LAND" },
];

const priorityOptions = [
  { label: "High", value: "High" },
  { label: "Medium", value: "Medium" },
  { label: "Low", value: "Low" },
];

const directionOptions = [
    { label: "Import", value: "Import" },
    { label: "Export", value: "Export" },
];

const serviceOptions = [
    { label: "LCL", value: "LCL" },
    { label: "FCL", value: "FCL" },
];

const movementOption = [
  { value: "", label: "Select" },  
  { value: "GR", label: "Good Receipt" },
    { value: "GI", label: "Good Issue" },
    { value: "TR", label: "Transfer Posting" },
    { value: "ST", label: "Stock Transfer" },
    { value: "RD", label: "Return Delivery" },
    { value: "ID", label: "Inbound Delivery" },
    { value: "OD", label: "Outbound Delivery" },
    { value: "SM", label: "Special Stock Movement" },
];
const initialValues = {
    shipment_type: "",
    is_roro:false,
    is_third_party:"",
    movement_type: "",
    transport_mode: "",
    service_type: "",
    direction: "",
    inco_terms: "",
    priority: "High",
    payment_type: "",
    payable_at: "",
    client: "",
    currency: "",
    total_amount: "",
    paid_amount: "",
    customs_value: "",
    insurance_value:"",
    invoice_value:"",
    freight_value: "",
    invoices:false,
    packaging_list: false,
    is_dangerous_good: false,
    port_origin: "",
    port_handling_agent_origin: "",
    port_destination: "",
    port_handling_agent_destination: "",
    scheduled_start_date: null,
    is_damaged_goods:false,
    doc_ref_type:"",
    order_number:"",
    declaration_no:'',
    order_no:"",
    final_address:"",
    scheduled_end_date: "",
    shipper:"",
    delivery_type:""
  };



  const newShipmentInitialvalues={
    shipment_type: "",
    is_roro:false,
    is_third_party:false,
    movement_type: "",
    transport_mode: "",
    service_type: "",
    direction: "",
    inco_terms: "",
    priority: "High",
    shipper:"",
    client: "",
    currency: "",
    total_amount: "",
    paid_amount: "",
    complementary:false,
    payment_type:"",
    port_origin: "",
    port_handling_agent_origin: "",
    port_destination: "",
    port_handling_agent_destination: "",
    scheduled_start_date: null,
    scheduled_end_date: "",
    consignee:"",
    complementary:false

  }

  const newShipmentValidationSchema = Yup.object().shape({
    //shipment_type: Yup.string().required("Shipment type is required"),
    is_roro: Yup.boolean(),
    payment_type: Yup.string().required("Payment Type is Required"),
    is_third_party: Yup.boolean(),
    movement_type: Yup.string().required("Movement type is required"),
    transport_mode: Yup.string().required("Transport mode is required"),
    service_type: Yup.string().required("Service type is required"),
    direction: Yup.string().required("Direction is required"),
    consignee: Yup.string().required("Consignee is required."),
    inco_terms: Yup.string().required("Inco terms are required"),
    priority: Yup.string()
      .oneOf(["High", "Medium", "Low"], "Priority must be High, Medium, or Low")
      .required("Priority is required"),
    shipper: Yup.string().required("Shipper is required"),
    client: Yup.string().required("Client is required"),
    currency: Yup.string().required("Currency is required"),
    total_amount: Yup.number()
      .typeError("Total amount must be a number")
      .required("Total amount is required"),
    paid_amount: Yup.number()
      .typeError("Paid amount must be a number")
      .required("Paid amount is required"),
    complementary: Yup.boolean(),
    port_origin: Yup.string().required("Port origin is required"),
    port_handling_agent_origin: Yup.string().required("Port handling agent origin is required"),
    port_destination: Yup.string().required("Port destination is required"),
    port_handling_agent_destination: Yup.string().required("Port handling agent destination is required"),
    scheduled_start_date: Yup.date()
      .nullable()
      .required("Scheduled start date is required"),
    scheduled_end_date: Yup.date()
      .nullable()
      .required("Scheduled end date is required")
      .min(
        Yup.ref('scheduled_start_date'),
        "Scheduled end date cannot be before the start date"
      ),
  });

  const shipmentValidationSchema = Yup.object().shape({
    movement_type: Yup.string().required("Required"),
    transport_mode: Yup.string().required("Required"),
    service_type: Yup.string().required("Required"),
    direction: Yup.string().required("Required"),
    shipment_status: Yup.string().nullable(),
    inco_terms: Yup.string().required("Required"),
    priority: Yup.string().required("Required"),
    payment_type: Yup.string().required("Required"),
    payable_at: Yup.string(), // Optional field
    currency: Yup.string().required("Required"),
    total_amount: Yup.number().nullable(), // Can be null
    paid_amount: Yup.number().nullable(), // Can be null
    customs_value: Yup.number().nullable(), // Can be null
    freight_value: Yup.number().nullable(), // Can be null
    packaging_list: Yup.boolean(), // Boolean value
    is_dangerous_good: Yup.boolean(), // Boolean value
    port_origin: Yup.string().required("Required"),
    port_handling_agent_origin: Yup.string().required("Required"),
    port_destination: Yup.string().required("Required"),
    port_handling_agent_destination: Yup.string().required("Required"),
    client: Yup.string().required("Required"),
    scheduled_start_date: Yup.date().required("Required"), // Start date validation
    scheduled_end_date: Yup.date().required("Required"), // End date validation
    awb: Yup.string().when("transport_mode", {
      is: "air",
      then: Yup.string().required("Required"),
    }),
    flight_number: Yup.string().when("transport_mode", {
      is: "air",
      then: Yup.string().required("Required"),
    }),
    cargo_terminal: Yup.string().when("transport_mode", {
      is: "air",
      then: Yup.string().required("Required"),
    }),
    handling_code: Yup.string().when("transport_mode", {
      is: "air",
      then: Yup.string().required("Required"),
    }),
    airline: Yup.string().when("transport_mode", {
      is: "air",
      then: Yup.string().required("Required"),
    }), // Changed to Yup.object() as airline is an object
    uld_no: Yup.string().when("transport_mode", {
      is: "air",
      then: Yup.string().required("Required"),
    }),
    bol: Yup.string().when("transport_mode", {
      is: "sea",
      then: Yup.string().required("Required"),
    }),
    vessel_name: Yup.string().when("transport_mode", {
      is: "sea",
      then: Yup.string().required("Required"),
    }),
    voyage_number: Yup.string().when("transport_mode", {
      is: "sea",
      then: Yup.string().required("Required"),
    }),
    container_number: Yup.string().when("transport_mode", {
      is: "sea",
      then: Yup.string().required("Required"),
    }),
    container_type: Yup.string().when("transport_mode", {
      is: "sea",
      then: Yup.string().required("Required"),
    }),
    shipping_line: Yup.string().when("transport_mode", {
      is: "sea",
      then: Yup.string().required("Required"),
    }), // Changed to Yup.object() as shipping_line is an object
    bol_land: Yup.string().when("transport_mode", {
      is: "land",
      then: Yup.string().required("Required"),
    }),
    vehicle_number: Yup.string().when("transport_mode", {
      is: "land",
      then: Yup.string().required("Required"),
    }),
    driver_info: Yup.string().when("transport_mode", {
      is: "land",
      then: Yup.string().required("Required"),
    }),
    route: Yup.string().when("transport_mode", {
      is: "land",
      then: Yup.string().required("Required"),
    }),
    cargo_type: Yup.string().when("transport_mode", {
      is: "land",
      then: Yup.string().required("Required"),
    }),
    trailer_type: Yup.string().when("transport_mode", {
      is: "land",
      then: Yup.string().required("Required"),
    }),
    
  });

const payment_choices = [
    {'value': 'prepaid', 'label': 'Prepaid'},
    {'value': 'collect', 'label': 'Collect'},
    {'value': 'third_party_billing', 'label': 'Third Party Billing'},
    {'value': 'freight_prepaid_and_add', 'label': 'Freight Prepaid and Add'},
    {'value': 'cod', 'label': 'Cash on Delivery'},
    {'value': 'credit_account', 'label': 'Credit Account'},
    {'value': 'eft', 'label': 'Electronic Funds Transfer'},
]

const STATUS_CHOICES = [
  { value: "Booking", label: "Booking" },
  { value: "Accepted", label: "Accepted" },
  { value: "Pending", label: "Pending" },
  { value: "Picked up", label: "Picked up" },
  { value: "On Hold", label: "On Hold" },
  { value: "Out for delivery", label: "Out for delivery" },
  { value: "In Transit", label: "In Transit" },
  { value: "Enroute", label: "Enroute" },
  { value: "Cancelled", label: "Cancelled" },
  { value: "Delivered", label: "Delivered" },
  { value: "Returned", label: "Returned" },
];

  const incoterms = [
    { value: "EXW", label: "Ex Works (EXW)" },
    { value: "FCA", label: "Free Carrier (FCA)" },
    { value: "CPT", label: "Carriage Paid To (CPT)" },
    { value: "CIP", label: "Carriage and Insurance Paid To (CIP)" },
    { value: "DAP", label: "Delivered At Place (DAP)" },
    { value: "DPU", label: "Delivered At Place Unloaded (DPU)" },
    { value: "DDP", label: "Delivered Duty Paid (DDP)" },
    { value: "FAS", label: "Free Alongside Ship (FAS)" },
    { value: "FOB", label: "Free On Board (FOB)" },
    { value: "CFR", label: "Cost and Freight (CFR)" },
    { value: "CIF", label: "Cost, Insurance, and Freight (CIF)" }
  ];
  

export { STATUS_CHOICES,priorityOptions,payment_choices,transportOptions, directionOptions, serviceOptions, movementOption,initialValues,shipmentValidationSchema,incoterms,newShipmentInitialvalues,newShipmentValidationSchema };
