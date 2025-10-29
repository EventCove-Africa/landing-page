/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/services/apiClients";
import { appUrls } from "@/services/urls";
import { _handleThrowErrorMessage } from "@/utils";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

export type ticketDetailsProps = {
  ticketType: string;
  colour: string;
  classification: string;
  ticketId: string;
  perks: string;
  price: number;
  charges: number;
  transferTransactionFeeToBuyer: boolean;
  validatedCount: number;
  soldCount: number;
  chargeAmount: number;
  capacity: number;
  salesEndDate: [number, number, number];
};

const useEventsHook = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [loadingEventDetails, setLoadingEventDetails] = useState({
    category: false,
    all_events: false,
    details: false,
    isPrivate: false,
    tickets: false,
  });
  const [allEvents, setAllEvents] = useState([]);
  const [allEventTickets, setAllEventTickets] = useState<ticketDetailsProps[]>(
    []
  );
  const [eventDetails, setEventDetails] = useState<any>({});
  const [openPassCodeModal, setOpenPassCodeModal] = useState<boolean>(false);

  const fetchEventCategories = async () => {
    setLoadingEventDetails((prev) => ({
      ...prev,
      category: true,
    }));
    try {
      const res = await api.get(appUrls.EVENT_URL + "/categories");
      const status_code = [200, 201].includes(res?.status);
      if (status_code) {
        const result = res.data?.data ?? [];
        setCategories(result);
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

  const handleGetFilteredEvents = useCallback(
    async (
      eventType?: string | undefined,
      category?: string | undefined | null,
      querySearch?: string
    ) => {
      setLoadingEventDetails((prev) => ({
        ...prev,
        all_events: true,
      }));
      const eventCategory = category ? `&eventCategory=${category}` : "";
      const querySearchParam = querySearch ? `${querySearch}` : "";
      try {
        const { status, data } = await api.get(
          appUrls.EVENT_URL +
            `/guest/all?status=${eventType}${eventCategory}${querySearchParam}`
        );
        // page=${1}&size=9
        const results = data?.data || null;
        const filteredEvents = results?.events;
        if ([200, 201].includes(status)) {
          setAllEvents(filteredEvents);
        }
      } catch (error: any) {
        toast.error(_handleThrowErrorMessage(error?.data?.message));
      } finally {
        setLoadingEventDetails((prev) => ({
          ...prev,
          all_events: false,
        }));
      }
    },
    []
  );

  const handleFetchEventsDetails = useCallback(
    async (eventId: string, isSlug: boolean = false) => {
      setLoadingEventDetails((prev) => ({
        ...prev,
        details: true,
      }));
      try {
        const res = await api.get(
          appUrls.EVENT_URL + `/guest/${eventId}?isSlug=${isSlug}`
        );
        const status_code = [200, 201].includes(res?.status);
        if (status_code) {
          const result = res.data?.data ?? null;
          setEventDetails(result);
          if (isSlug) return handleFetchEventTicketsDetails(result?.eventId);
        }
      } catch (error: any) {
        const err_message = _handleThrowErrorMessage(error?.data?.message);
        toast.error(err_message);
      } finally {
        setLoadingEventDetails((prev) => ({
          ...prev,
          details: false,
        }));
      }
    },
    []
  );

  const handleFetchEventTicketsDetails = useCallback(
    async (eventId: string) => {
      setLoadingEventDetails((prev) => ({
        ...prev,
        tickets: true,
      }));
      try {
        const res = await api.get(
          appUrls.TICKET_TYPE_URL + `/guest/${eventId}`
        );
        const status_code = [200, 201].includes(res?.status);
        if (status_code) {
          const result = res.data?.data?.ticketDetails ?? [];
          setAllEventTickets(result);
        }
      } catch (error: any) {
        const err_message = _handleThrowErrorMessage(error?.data?.message);
        toast.error(err_message);
      } finally {
        setLoadingEventDetails((prev) => ({
          ...prev,
          tickets: false,
        }));
      }
    },
    []
  );

  const handleCheckIfEventIsPrivate = async (
    eventId: string,
    isSlug: boolean = false
  ) => {
    setLoadingEventDetails((prev) => ({
      ...prev,
      isPrivate: true,
    }));
    try {
      const res = await api.get(
        appUrls.EVENT_URL + `/status/guest/${eventId}?isSlug=${isSlug}`
      );
      const status_code = [200, 201].includes(res?.status);
      if (status_code) {
        const isEventPublic = res?.data?.data.toLowerCase();
        if (isEventPublic === "public") {
          if (!isSlug) {
            handleFetchEventTicketsDetails(eventId);
          }
          return handleFetchEventsDetails(eventId, isSlug);
        }
        setOpenPassCodeModal(true);
      }
    } catch (error: any) {
      // const err_message = _handleThrowErrorMessage(error?.data?.message);
      // toast.error(err_message);
    } finally {
      setLoadingEventDetails((prev) => ({
        ...prev,
        isPrivate: false,
      }));
    }
  };

  return {
    categories,
    fetchEventCategories,
    handleFetchEventTicketsDetails,
    allEventTickets,
    loadingEventDetails,
    handleGetFilteredEvents,
    handleFetchEventsDetails,
    handleCheckIfEventIsPrivate,
    openPassCodeModal,
    setOpenPassCodeModal,
    eventDetails,
    allEvents,
  };
};

export default useEventsHook;
