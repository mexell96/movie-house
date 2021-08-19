import { API_BASE } from "../variables";
import { useState, useCallback } from "react";

const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const request = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setLoading(true);
      try {
        if (body) {
          body = JSON.stringify(body);
          headers["Content-Type"] = "application/json";
        }
        const response = await fetch(`${API_BASE}${url}`, {
          method,
          body,
          headers,
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Something error");
        }

        setLoading(false);
        return data;
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
  const clearError = useCallback(() => setError(null), []);

  return { loading, error, request, clearError };
};

export { useHttp };
