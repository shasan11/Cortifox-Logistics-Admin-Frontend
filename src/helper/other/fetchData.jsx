import axios from "axios";
import { useState, useEffect } from "react";

const useFetchApiData = (url_endpoint) => {
    const [data, setData] = useState([]);
    const domain =import.meta.env.VITE_APP_BACKEND_URL;
    const endpoint = url_endpoint;
    const url = domain + endpoint;
    const accessToken = localStorage.getItem("accessToken");

    useEffect(() => {
        axios.get(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }).then((response) => {
            setData(response.data);
        }).catch((error) => {
            console.error("Error fetching data:", error);
        });
    }, []); // Dependencies array to ensure useEffect runs when these change

    return data;
}

export default useFetchApiData;
