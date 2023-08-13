import React, { useEffect, useState } from "react";
import api from "../../axios/api";

export default function Auth({ accessToken }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        const response = await api.get("/protected-route", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
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
