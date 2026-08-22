/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Image from "next/image";
import { CiLocationOn, CiUser } from "react-icons/ci";
import { LuCalendarDays } from "react-icons/lu";
import { IoTimeOutline } from "react-icons/io5";
import { FaLink } from "react-icons/fa6";
import { arrayToFormattedDateWithYear, formatTimeToshowAmPm } from "@/utils";

export default function EventsDetails({
  eventDetails,
  showDescription = true,
}: any) {
  const isPhysical = eventDetails?.eventVenueType?.toLowerCase() === "physical";
  const shouldShowAddress = eventDetails?.displayAddressToUsers;

  const locationText = shouldShowAddress
    ? `${eventDetails?.location ?? ""} ${
        isPhysical ? (eventDetails?.city ?? "") : ""
      }`
    : "To be communicated after registration";

  return (
    <>
      <div className="w-full relative">
        {eventDetails?.eventImageUrl ? (
          <div className="relative w-full overflow-hidden rounded-xl">
            {/* Blurred background */}
            <div
              className="absolute inset-0 scale-110 bg-cover bg-center blur-md"
              style={{
                backgroundImage: `url(${eventDetails?.eventImageUrl})`,
              }}
            />
            {/* Optional dark/transparent overlay to make blur more visible */}
            <div className="absolute inset-0 bg-black/10" />
            {/* Main image */}
            <Image
              src={eventDetails?.eventImageUrl}
              alt="event banner"
              width={700}
              height={600}
              quality={100}
              priority
              className="relative z-10 block w-full h-[300px] sm:h-[350px] md:h-[350px] lg:h-[350px] xl:h-[400px] rounded-xl object-contain"
            />
          </div>
        ) : null}
      </div>
      <div className="flex flex-col gap-1 w-full mt-4">
        <h3 className="text-dark_200 font-medium md:text-base text-sm">
          {eventDetails?.eventName}
        </h3>
        <p className="flex items-center gap-1 text-sm font-normal text-grey_100">
          {isPhysical ? <CiLocationOn className="w-4 h-4" /> : <FaLink />}
          {locationText}
        </p>
      </div>
      <div className="flex flex-wrap gap-4 mt-4">
        <div className="bg-grey_300 rounded-md md:w-fit w-full p-2 flex gap-2 items-center">
          <LuCalendarDays className="w-[20px] h-[20px] text-blue_200" />
          <div className="flex flex-col gap-1">
            <h3 className="text-grey_100 text-xs font-normal">Date</h3>
            <h5 className="text-dark_200 font-normal md:text-base text-sm">
              {arrayToFormattedDateWithYear(eventDetails?.startDate || [])}
            </h5>
          </div>
        </div>
        <div className="bg-grey_300 rounded-md md:w-fit w-full p-2 flex gap-2 items-center">
          <IoTimeOutline className="text-secondary_500 w-[20px] h-[20px]" />
          <div className="flex flex-col gap-1">
            <h3 className="text-grey_100 text-xs font-normal">Time</h3>
            <h5 className="text-dark_200 font-normal md:text-base text-sm">
              {formatTimeToshowAmPm(eventDetails?.startTime)}
            </h5>
          </div>
        </div>
        <div className="bg-grey_300 rounded-md md:w-fit w-full p-2 flex gap-2 items-center">
          <CiUser className="text-secondary_500 w-[20px] h-[20px]" />
          <div className="flex flex-col gap-1">
            <h3 className="text-grey_100 text-xs font-normal">
              Organizer Email
            </h3>
            <h5 className="text-dark_200 font-normal md:text-base text-sm">
              {eventDetails?.organizerEmail}
            </h5>
          </div>
        </div>
      </div>
      {showDescription && (
        <div className="mt-4">
          <h3 className="text-dark_200 font-normal text-sm">Event Details</h3>
          <div className="h-auto max-h-[200px] overflow-auto bg-grey_300 p-3 text-grey_100 font-normal text-sm">
            {eventDetails?.eventDescription}
          </div>
        </div>
      )}
    </>
  );
}
