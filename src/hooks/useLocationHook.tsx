/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from "react";
import { api } from "../services/apiClients";
import { _handleThrowErrorMessage } from "../utils";
import toast from "react-hot-toast";
import { appUrls } from "../services/urls";

const useLocationHook = () => {
  const [data, setData] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchStateLocations = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get(appUrls.LOCATIONS_URL + "/states");
      const status_code = [200, 201].includes(res?.status);
      if (status_code) {
        const result = res.data?.data ?? [];
        setData(result);
      }
    } catch (error: any) {
      const err_message = _handleThrowErrorMessage(error?.data?.message);
      toast.error(err_message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let mounted = false;
    (async () => {
      mounted = true;
      if (mounted) {
        fetchStateLocations();
      }
    })();
    return () => {
      mounted = false;
    };
  }, [fetchStateLocations]);

  return { cities: data, loading, fetchStateLocations };
};

export default useLocationHook;
