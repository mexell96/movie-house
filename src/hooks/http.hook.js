import { useState, useCallback } from "react";

const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setLoading(true);
      try {
        if (body) {
          body = JSON.stringify(body);
          headers["Content-Type"] = "application/json";
        }
        const response = await fetch(url, { method, body, headers });
        console.log(response, "response 55555");
        const data = await response.json();
        console.log(data, "data http.hook 99999999");

        if (!response.ok) {
          throw new Error(data.message || "Something error");
        }

        setLoading(false);
        return data;
      } catch (error) {
        console.log(error.message, "Error http.hook");
        setLoading(false);
        setError(error.message);
        throw error;
      }
    },
    []
  );
  const clearError = useCallback(() => setError(null), []);

  return { loading, error, request, clearError };
};

export { useHttp };
