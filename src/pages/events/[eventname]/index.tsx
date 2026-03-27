/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { GetServerSideProps } from "next";

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

type Props = {
  eventname: string;
};

export default function Eventname({ eventname }: Props) {
  console.log(eventname)
  const isSlug = true;
  const formattedEventName = eventname ? eventname.replace(/-/g, " ") : "Event";

  const {
    eventDetails,
    loadingEventDetails,
    handleCheckIfEventIsPrivate,
    handleFetchEventsDetails,
    allEventTickets,
    handleFetchEventTicketsDetails,
    openPassCodeModal,
    setOpenPassCodeModal,
  } = useEventsHook();

  useEffect(() => {
    if (eventname) {
      handleCheckIfEventIsPrivate(eventname, isSlug);
    }
  }, [eventname]);

  useEffect(() => {
    _handleClearCookiesAndSession(
      "selectedTicketPrice",
      "count",
      "ticketType",
      "charges",
      "transferTransactionFeeToBuyer",
    );
  }, []);

  return (
    <>
      <CustomHead title={formattedEventName} />
      <div className="container padding-spacing w-full h-full">
        <DescriptionBar text="Get the full picture of your event 🌟" />
        <div className="w-full flex lg:flex-row flex-col gap-4">
          <div className="bg-white w-full h-full rounded-xl p-3">
            <SkeletonLoaderEventDetails
              isLoading={loadingEventDetails?.details}
            />

            {!loadingEventDetails?.details && !isObjectEmpty(eventDetails) && (
              <EventsDetails eventDetails={eventDetails} />
            )}
          </div>

          <TicketsDetails
            allEventTickets={allEventTickets}
            eventDetails={eventDetails}
            loadingEventDetails={loadingEventDetails}
            eventId={eventname}
            isSlug={isSlug}
          />
        </div>
      </div>

      <ModalPopup
        backdropFilter="30px"
        isOpen={openPassCodeModal}
        closeModal={() => setOpenPassCodeModal(!openPassCodeModal)}
      >
        <PrivatePassCode
          closeModal={() => setOpenPassCodeModal(!openPassCodeModal)}
          eventId={eventname}
          handleFetchEventsDetails={handleFetchEventsDetails}
          handleFetchEventTicketsDetails={handleFetchEventTicketsDetails}
          isSlug={isSlug}
        />
      </ModalPopup>

      <ModalPopup backdropFilter="30px" isOpen={loadingEventDetails?.isPrivate}>
        <Loaders />
      </ModalPopup>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { eventname } = context.params as { eventname: string };

  return {
    props: {
      eventname,
    },
  };
};
