"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CiLocationOn } from "react-icons/ci";
import { FaArrowRight } from "react-icons/fa6";
import { PiCalendarDotsThin } from "react-icons/pi";
import { TfiTimer } from "react-icons/tfi";

// Sample event data
const allEvents = [
  {
    title: "🎉Amazing-Carnival🎉",
    isFree: true,
    location: "Eko Hotel, Lagos, Nigeria",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    date: "19th July",
    ticketsSold: "30 / 100",
    progress: "30",
    eventType: "upcoming",
    isPublished: true,
  },
  {
    title: "🎉 Jey Uso’s Birthday bash 🎉",
    isFree: false,
    location: "Eko Hotel, Lagos, Nigeria",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    date: "19th August",
    ticketsSold: "10 / 100",
    progress: "50",
    eventType: "completed",
    isPublished: true,
  },
  // {
  //   title: "Missoes",
  //   isFree: true,
  //   location: "Eko Hotel, Lagos, Nigeria",
  //   description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  //   date: "19th January",
  //   ticketsSold: "80 / 100",
  //   progress: "80",
  //   eventType: "cancelled",
  //   isPublished: false,
  // },
  // {
  //   title: "🎉 House Music Party 🎉",
  //   isFree: false,
  //   location: "Eko Hotel, Lagos, Nigeria",
  //   description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  //   date: "19th January",
  //   ticketsSold: "80 / 100",
  //   progress: "80",
  //   eventType: "cancelled",
  //   isPublished: false,
  // },
];

type EventsProps = {
  title: string;
  showViewAll?: boolean;
};

// A dedicated card component for each event
const EventCard: React.FC<{ event: (typeof allEvents)[0] }> = ({ event }) => {
  const router = useRouter();
  const { title, isFree, location, date } = event;

  return (
    <article
      className="bg-white shadow rounded-lg p-3 cursor-pointer"
      onClick={() => router.push(`/events/${title}`)}
    >
      {/* Image container with fixed aspect ratio */}
      <div className="relative w-full">
        <div
          className="relative rounded-xl overflow-hidden"
          style={{ aspectRatio: (323.11 / 203.61).toString() }}
        >
          <Image
            src={`https://picsum.photos/300/300?${new Date().getTime()}`}
            alt={`Event banner for ${title}`}
            fill
            sizes="(max-width: 768px) 100vw, 323.11px"
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute top-3 left-3">
          <span
            className={`px-3 py-2 text-xs font-normal rounded-md capitalize ${
              isFree
                ? "bg-grey_300 text-grey_100"
                : "bg-green_400 text-green_200"
            }`}
          >
            {isFree ? "Free" : "Paid"}
          </span>
        </div>
      </div>

      <div className="mt-2 flex flex-col gap-1">
        <h3 className="text-dark_200 font-medium text-xs md:text-sm">
          {title}
        </h3>
        <p className="flex items-center gap-1 text-xs font-normal text-grey_100">
          <CiLocationOn className="w-4 h-4" /> {location}
        </p>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-xs font-medium text-primary_100">
            <PiCalendarDotsThin className="w-4 h-4" /> {date}
          </div>
          <div className="flex items-center justify-center gap-1 rounded-md p-2 text-xs font-medium text-dark_100">
            <TfiTimer className="w-4 h-4" /> 9:PM
          </div>
        </div>
      </div>
    </article>
  );
};

export default function Events({ title, showViewAll = false }: EventsProps) {
  const router = useRouter();
  return (
    <section className="container mx-auto p-3">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-dark_200">{title}</h3>
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
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {allEvents.map((event, index) => (
          <EventCard key={`event-${index}`} event={event} />
        ))}
      </div>
    </section>
  );
}
