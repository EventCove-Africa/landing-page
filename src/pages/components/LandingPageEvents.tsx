/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CiLocationOn } from "react-icons/ci";
import { FaArrowRight, FaLink } from "react-icons/fa6";
import { PiCalendarDotsThin } from "react-icons/pi";
import { TfiTimer } from "react-icons/tfi";
import useEventsHook from "@/hooks/useEventsHook";
import {
  arrayToFormattedDateWithYear,
  formatTimeToshowAmPm,
  isArrayEmpty,
} from "@/utils";
import SkeletonLoader from "@/components/SkeletonLoader";

type allEventsProps = {
  eventId: string;
  eventName: string;
  eventImageUrl: string;
  startDate: any;
  endDate: any;
  startTime: string;
  endTime: string;
  eventCategory: string;
  eventDescription: string;
  location: string;
  organizerEmail: string;
  city: string;
  eventVenueType: string;
};

type EventsProps = {
  title: string;
  status?: string;
  querySearch?: string;
  endingIndex?: number;
  category?: string | undefined | null;
  showViewAll?: boolean;
};

// A dedicated card component for each event
const EventCard: React.FC<{ event: allEventsProps }> = ({ event }) => {
  const router = useRouter();
  const {
    eventName,
    // location,
    startDate,
    eventId,
    eventImageUrl,
    startTime,
    city,
    eventVenueType,
  } = event;

  return (
    <article
      className="bg-white shadow-md rounded-lg md:p-3 p-2 cursor-pointer flex flex-row-reverse h-[180px]"
      onClick={() =>
        router.push(`/events/${eventName?.replaceAll(" ", "-")}/${eventId}`)
      }
      id="event"
    >
      <div
        className="relative w-full max-w-[323px] rounded-xl overflow-hidden"
        style={{ aspectRatio: (323.11 / 203.61).toString() }}
      >
        <Image
          src={eventImageUrl}
          alt={`Event banner for ${eventName}`}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </div>

      <div className="mt-2 flex flex-col gap-4 w-full">
        <h3 className="text-dark_200 font-medium text-sm md:text-base">
          {eventName}
        </h3>
        <p className="flex md:items-center items-start gap-1 md:text-sm text-xs font-normal text-grey_100">
          {eventVenueType?.toLowerCase() === "physical" ? (
            <CiLocationOn className="w-8 h-8" />
          ) : (
            <FaLink />
          )}{" "}
          {'British Council, Ibrahim Babangida Way, Maitama, Abuja FCT'} {eventVenueType?.toLowerCase() === "physical" && city}
        </p>
        <div className="flex md:flex-row flex-col md:items-center items-start md:gap-2 gap-4">
          <div className="flex items-center gap-1 md:text-sm text-xs font-medium text-primary_100">
            <PiCalendarDotsThin className="w-4 h-4" />{" "}
            {arrayToFormattedDateWithYear(startDate)}
          </div>
          <div className="flex items-center justify-center gap-1 rounded-md md:text-sm text-xs font-medium text-dark_100">
            <TfiTimer className="w-4 h-4" /> {formatTimeToshowAmPm(startTime)}
          </div>
        </div>
      </div>
    </article>
  );
};

export default function Events({
  title,
  showViewAll = false,
  status,
  querySearch,
  category,
  endingIndex,
}: EventsProps) {
  const router = useRouter();

  const {
    handleGetFilteredEvents,
    allEvents: filteredEvents,
    loadingEventDetails,
  } = useEventsHook();

  useEffect(() => {
    let mounted = false;
    (async () => {
      mounted = true;
      if (mounted) {
        handleGetFilteredEvents(status, category, querySearch);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [category, querySearch]);

  const renderSkeletonLoaderForEventDetails = () => {
    if (!loadingEventDetails?.all_events) return null;
    return (
      <div className="rounded-lg p-3 w-full h-[180px]">
        <SkeletonLoader
          count={1}
          className="w-full h-full"
          style={{ aspectRatio: (323.11 / 203.61).toString() }}
        />
      </div>
    );
  };

  return (
    <section className="container mx-auto md:p-3 p-1">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="md:text-lg text-base font-bold text-dark_200">
          {title}
        </h3>
        {showViewAll && (
          <button
            type="button"
            className="flex items-center gap-1 text-sm font-medium text-secondary_300"
            onClick={() => router.push("/events")}
          >
            View More{" "}
            <FaArrowRight className="w-[14px] h-[14px] text-secondary_300" />
          </button>
        )}
      </div>
      {/* Event Cards Grid */}
      <div className="w-full grid gap-4 grid-cols-1 lg:grid-cols-2">
        {renderSkeletonLoaderForEventDetails()}
        {!loadingEventDetails?.all_events && (
          <>
            {filteredEvents.slice(0, endingIndex).map((event, index) => (
              <EventCard key={`event-${index}`} event={event} />
            ))}
          </>
        )}
      </div>
      {!loadingEventDetails?.all_events && (
        <div className="w-full flex justify-center items-center">
          {isArrayEmpty(filteredEvents) && (
            <Image
              width={250}
              height={300}
              src="/assets/images/empty_state.svg"
              alt="empty_state"
              priority
            />
          )}
        </div>
      )}
    </section>
  );
}
