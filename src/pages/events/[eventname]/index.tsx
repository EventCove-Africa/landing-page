/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";

import CustomHead from "@/components/CustomHead";
import DescriptionBar from "@/components/DescriptionBar";
import { _handleClearCookiesAndSession, isObjectEmpty } from "@/utils";
import { useRouter } from "next/router";

import ModalPopup from "@/components/ModalPopup";
import PrivatePassCode from "../components/PrivatePassCode";
import useEventsHook from "@/hooks/useEventsHook";
import EventsDetails from "../components/EventsDetails";
import Loaders from "@/components/Loaders";
import TicketsDetails from "../components/TicketsDetails";
import SkeletonLoaderEventDetails from "@/pages/components/SkeletonLoaderEventDetails";

export default function Eventname() {
  const router = useRouter();
  const { eventname } = router.query as any;
  const isSlug = true;

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
    let mounted = false;
    (async () => {
      mounted = true;
      if (mounted && eventname) {
        handleCheckIfEventIsPrivate(eventname, isSlug);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [eventname]);

  useEffect(() => {
    let mounted = false;
    (async () => {
      mounted = true;
      if (mounted) {
        _handleClearCookiesAndSession(
          "selectedTicketPrice",
          "count",
          "ticketType",
          "charges",
          "transferTransactionFeeToBuyer"
        );
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <CustomHead title={`EVENTCOVE - ${eventname}`} />
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
