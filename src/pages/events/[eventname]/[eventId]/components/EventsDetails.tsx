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
  return (
    <>
      <div className="w-full relative">
        {eventDetails?.eventImageUrl ? (
         <Image
         src={eventDetails?.eventImageUrl}
         alt="event banner"
         width={700} // Increase width
         height={600} // Increase height
         quality={100}
         className="object-cover rounded-xl w-full h-[200px] sm:h-[300px] md:h-[300px] lg:h-[300px] xl:h-[300px]"
       />
        ) : null}
      </div>
      <div className="flex flex-col gap-1 w-full mt-4">
        <h3 className="text-dark_200 font-medium md:text-base text-sm">
          {eventDetails?.eventName}
        </h3>
        <p className="flex items-center gap-1 text-sm font-normal text-grey_100">
          {eventDetails?.eventVenueType?.toLowerCase() === "physical" ? (
            <CiLocationOn className="w-4 h-4" />
          ) : (
            <FaLink />
          )}{" "}
          {eventDetails?.location}{" "}
          {eventDetails?.eventVenueType?.toLowerCase() === "physical" &&
            eventDetails?.city}
        </p>
      </div>
      <div className="flex flex-wrap gap-4 mt-4">
        <div className="bg-grey_500 rounded-md md:w-fit w-full p-2 flex gap-2 items-center">
          <LuCalendarDays className="w-[20px] h-[20px] text-blue_200" />
          <div className="flex flex-col gap-1">
            <h3 className="text-grey_100 text-xs font-normal">Start Date</h3>
            <h5 className="text-dark_200 font-normal md:text-base text-sm">
              {arrayToFormattedDateWithYear(eventDetails?.startDate || [])}
            </h5>
          </div>
        </div>
        <div className="bg-grey_500 rounded-md md:w-fit w-full p-2 flex gap-2 items-center">
          <IoTimeOutline className="text-secondary_500 w-[20px] h-[20px]" />
          <div className="flex flex-col gap-1">
            <h3 className="text-grey_100 text-xs font-normal">Start Time</h3>
            <h5 className="text-dark_200 font-normal md:text-base text-sm">
              {formatTimeToshowAmPm(eventDetails?.startTime)}
            </h5>
          </div>
        </div>
        <div className="bg-grey_500 rounded-md md:w-fit w-full p-2 flex gap-2 items-center">
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
          <div className="h-auto max-h-[200px] overflow-auto bg-grey_500 p-3 text-grey_100 font-normal text-sm">
            {eventDetails?.eventDescription}
          </div>
        </div>
      )}
    </>
  );
}
