import { useState, useCallback } from "react";
import axios from "axios";

import { API_BASE } from "../consts";

const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const request = useCallback(
    async (url, method = "GET", data = null, headers = {}) => {
      setLoading(true);
      try {
        if (data) {
          data = JSON.stringify(data);
          headers["Content-Type"] = "application/json";
        }
        const response = await axios({
          method,
          headers,
          data,
          url: `${API_BASE}${url}`,
        });
        setLoading(false);
        return response.data;
      } catch (error) {
        const message = (error as Error).message;
        console.log(message, "Error http.hook");
        setLoading(false);
        setError(message);
        throw error;
      }
    },
    []
  );

  const clearError = () => setError(null);

  return { loading, error, request, clearError };
};

export { useHttp };
