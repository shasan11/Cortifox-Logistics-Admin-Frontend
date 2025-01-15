import Invoice from "../../Sales/Invoice";
import useFetchApiData from "../../../helper/other/fetchData";

const BulkInvoicing=({shipmentData})=>{
    const bookingShipments=useFetchApiData(`/shipments/shipments/?master=${shipmentData?.id}`) || [];
    const bookingShipmentIds = bookingShipments.map(shipment => shipment.id);

    return(
<Invoice shipmentsDatasArray={bookingShipmentIds} ui_type={"add_related"}/>
    )
     

}

export default BulkInvoicing;