/* eslint-disable react-hooks/exhaustive-deps */ 
/* eslint-disable @typescript-eslint/no-explicit-any */ 
import React, { useEffect,} from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import CustomHead from "@/components/CustomHead";
import DescriptionBar from "@/components/DescriptionBar";
import { _handleClearCookiesAndSession, isObjectEmpty } from "@/utils";
import ModalPopup from "@/components/ModalPopup";
import PrivatePassCode from "../components/PrivatePassCode";
import useEventsHook from "@/hooks/useEventsHook";
import EventsDetails from "../components/EventsDetails";
import Loaders from "@/components/Loaders";
import TicketsDetails from "../components/TicketsDetails";
import SkeletonLoaderEventDetails from "@/pages/components/SkeletonLoaderEventDetails";
import { api } from "@/services/apiClients";
import { appUrls } from "@/services/urls";
import InfoModal from "@/pages/components/InfoModal";
import { useRouter } from "next/router";

type Props = {
  eventname: string;
  eventImageUrl: string;
  description: string;
};

export default function Eventname({
  eventname,
  eventImageUrl,
  description,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const formattedEventName = eventname ? eventname.replace(/-/g, " ") : "Event";

  const {
    eventDetails,
    eventExpired,
    eventStatusDescription,
    loadingEventDetails,
    handleCheckIfEventIsPrivate,
    handleFetchEventsDetails,
    allEventTickets,
    handleFetchEventTicketsDetails,
    openPassCodeModal,
    setOpenPassCodeModal,
  } = useEventsHook();

  /**
   * Check whether the event is private.
   *
   * `isSlug` is always true for this route, so there is no reason
   * to keep it as component state/props.
   */
  useEffect(() => {
    if (!eventname) return;

    handleCheckIfEventIsPrivate(eventname, true);
  }, [eventname, handleCheckIfEventIsPrivate]);

  /**
   * Clear stale checkout/session data when entering an event.
   */
  useEffect(() => {
    _handleClearCookiesAndSession(
      "selectedTicketPrice",
      "count",
      "ticketType",
      "charges",
      "transferTransactionFeeToBuyer",
      "callBackUrl",
    );
  }, []);

  const closePassCodeModal = () => {
    setOpenPassCodeModal(false);
  };

  const handleViewMoreEvents = () => {
    router.push("/events");
  };

  return (
    <>
      <CustomHead
        title={formattedEventName}
        image={eventImageUrl}
        slug={eventname}
        description={description}
      />

      <main className="container padding-spacing w-full h-full">
        <DescriptionBar text="Get the full picture of your event 🌟" />

        <div className="w-full flex lg:flex-row flex-col gap-4">
          {/* Event details */}
          <section className="bg-white w-full h-full rounded-xl p-3">
            <SkeletonLoaderEventDetails
              isLoading={loadingEventDetails?.details}
            />

            {!loadingEventDetails?.details && !isObjectEmpty(eventDetails) && (
              <EventsDetails eventDetails={eventDetails} />
            )}
          </section>

          {/* Tickets */}
          <TicketsDetails
            allEventTickets={allEventTickets}
            eventDetails={eventDetails}
            loadingEventDetails={loadingEventDetails}
            eventId={eventname}
            isSlug={true}
          />
        </div>
      </main>

      {/* Private event passcode */}
      <ModalPopup
        backdropFilter="30px"
        isOpen={openPassCodeModal}
        closeModal={closePassCodeModal}
      >
        <PrivatePassCode
          closeModal={closePassCodeModal}
          eventId={eventname}
          handleFetchEventsDetails={handleFetchEventsDetails}
          handleFetchEventTicketsDetails={handleFetchEventTicketsDetails}
          isSlug={true}
        />
      </ModalPopup>

      {/* Private event loading state */}
      <ModalPopup
        backdropFilter="30px"
        isOpen={Boolean(loadingEventDetails?.isPrivate)}
      >
        <Loaders />
      </ModalPopup>

      {/* Expired event */}
      <ModalPopup isOpen={Boolean(eventExpired)}>
        <InfoModal
          info={eventStatusDescription}
          onClick={handleViewMoreEvents}
          title="View more Events"
        />
      </ModalPopup>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context,
) => {
  const eventname = context.params?.eventname;

  if (typeof eventname !== "string" || !eventname.trim()) {
    return {
      notFound: true,
    };
  }

  try {
    const response = await api.get(
      `${appUrls.EVENT_URL}/guest/${encodeURIComponent(eventname)}?isSlug=true`,
    );

    const result = response.data?.data;

    if (!result) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        eventname,
        eventImageUrl: result.eventImageUrl ?? "",
        description: result.eventDescription ?? "",
      },
    };
  } catch (error: unknown) {
   
    /**
     * If the backend explicitly says the event doesn't exist,
     * render Next's 404.
     */
    const status = (error as { status?: number })?.status;
    if (status === 404) {
      return {
        notFound: true,
      };
    }

    /**
     * For unexpected backend/network errors, throw a REAL Error.
     */
    throw error instanceof Error ? error : new Error("Failed to fetch event");
  }
};
