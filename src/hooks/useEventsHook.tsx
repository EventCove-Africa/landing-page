/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/services/apiClients";
import { appUrls } from "@/services/urls";
import { _handleThrowErrorMessage } from "@/utils";
import { useState } from "react";
import toast from "react-hot-toast";

type EventCategoryProp = {
  label: string;
  value: string;
};

const useEventsHook = () => {
  const [categories, setCategories] = useState<EventCategoryProp[]>([]);
  const [loadingEventDetails, setLoadingEventDetails] = useState({
    category: false,
  });

  const fetchEventCategories = async () => {
    setLoadingEventDetails((prev) => ({
      ...prev,
      category: true,
    }));
    try {
      const res = await api.get(appUrls.EVENT_URL + "/categories");
      const status_code = [200, 201].includes(res?.status);
      if (status_code) {
        const result = res.data?.data ?? null;
        const formatted_data = [];
        for (let index = 0; index < result.length; index++) {
          const res = result[index];
          formatted_data.push({
            label: res,
            value: res,
          });
        }
        setCategories(formatted_data);
      }
    } catch (error: any) {
      const err_message = _handleThrowErrorMessage(error?.data?.message);
      toast.error(err_message);
    } finally {
      setLoadingEventDetails((prev) => ({
        ...prev,
        category: false,
      }));
    }
  };

  return {
    categories,
    fetchEventCategories,
    loadingEventDetails,
  };
};

export default useEventsHook;
