import axios from "axios";
import { useEffect, useState } from "react";
import { getUsername } from '../helper/helper';
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

// Custom hook
export default function useFetch(query) {
  const [getData, setData] = useState({
    isLoading: false,
    apiData: undefined,
    status: null,
    serverError: null,
  });

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      try {
        setData((prev) => ({ ...prev, isLoading: true }));
        const { username } = await getUsername();
        const { data, status } = await axios.get(`/api/auth/${query || username}`);
        if (status === 201) {
          setData((prev) => ({
            ...prev,
            isLoading: false,
            apiData: data,
            status: status,
          }));
        } else {
          setData((prev) => ({ ...prev, isLoading: false }));
        }
      } catch (error) {
        setData((prev) => ({
          ...prev,
          isLoading: false,
          serverError: error,
        }));
      }
    };

    fetchData();
  }, [query]);

  return [getData, setData];
}
