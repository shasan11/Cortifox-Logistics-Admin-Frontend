import axios from "axios"
import { Collapse,Form,Input,Select,Radio,Alert} from "antd"

const ShipmentPackages=({data})=>{
    return(
        <>
        {data?<h2>The preview is loading</h2>:
        <Alert type="warning">Please Save the Shipment In Order to Add Packages</Alert>}
        </>
    )

}

export default ShipmentPackages