import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Auth({ accessToken }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/protected-route",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setData(response.data);
      } catch (error) {
        setError("Failed to fetch protected data");
      }
    };

    fetchProtectedData();
  }, []);

  return (
    <div>
      {data ? <div>Protected Data: {data}</div> : <div>Error: {error}</div>}
    </div>
  );
}
