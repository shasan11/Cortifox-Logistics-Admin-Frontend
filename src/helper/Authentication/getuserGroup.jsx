import axios from "axios";
import { useEffect, useState } from "react";

const useUserGroup = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);      // Error state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const backendUrl = `${import.meta.env.VITE_APP_BACKEND_URL}/core/get-user-group/`;
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
          throw new Error("No access token available");
        }

        const response = await axios.get(backendUrl, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (response) {
          setData(response.data[0].group_name);
        } else {
          throw new Error("Invalid response data");
        }
      } catch (err) {
        console.error("Error fetching user group:", err);
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false); // Ensure loading state is reset
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs once

  return { data, loading, error };
};

export default useUserGroup;
