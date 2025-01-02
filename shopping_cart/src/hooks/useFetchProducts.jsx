import { useEffect, useState } from "react";

const useFetchProducts = (url) => {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    const fetchData = async () => {
      try {
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        let d = await res.json();
        setData(d);
        setLoading(false);
      } catch (error) {
        setError(error);
      } finally {
        //setLoading(false);
      }
    };
    fetchData();
    return () => controller.abort();
  }, [url]);
  return { data, error, loading };
};

export { useFetchProducts };
