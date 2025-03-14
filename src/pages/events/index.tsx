/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
// useEffect,
import Image from "next/image";
import CustomHead from "@/components/CustomHead";
import dynamic from "next/dynamic";
import Button from "@/components/FormComponents/Button";
import DatePickerComponent from "@/components/FormComponents/DatePickerComponent";
import SearchField from "@/components/FormComponents/SearchField";
import SearchableSelect from "@/components/FormComponents/SearchableSelect";
import useEventsHook from "@/hooks/useEventsHook";
import SkeletonLoader from "@/components/SkeletonLoader";

const LandingPageEvents = dynamic(
  () => import("../components/LandingPageEvents"),
  { ssr: false }
);

export type EventsPageSearchQueryProps = {
  setQueryParams: React.Dispatch<
    React.SetStateAction<{
      city: string;
      date: any;
      eventName: string;
    }>
  >;
};

export default function EventsPage() {
  const { fetchEventCategories, categories, loadingEventDetails } =
    useEventsHook();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [queryParams, setQueryParams] = useState<{
    city: string;
    date: string;
    eventName: string;
  }>({
    city: "",
    date: "",
    eventName: "",
  });
  const [querySearch, setQuerySearch] = useState("");

  const handleEventsSearch = () => {
    if (!queryParams) {
      console.error("queryParams is undefined");
      return;
    }
    const queryParts: string[] = [];
    if (queryParams.city) {
      queryParts.push(`city=${encodeURIComponent(queryParams.city)}`);
    }
    if (queryParams.date) {
      const date = new Date(queryParams.date);
      if (!isNaN(date.getTime())) {
        const formattedDate =
          date.getFullYear() +
          "-" +
          String(date.getMonth() + 1).padStart(2, "0") +
          "-" +
          String(date.getDate()).padStart(2, "0");
        queryParts.push(`date=${formattedDate}`);
      } else {
        console.error("Invalid date format:", queryParams.date);
      }
    }
    if (queryParams.eventName) {
      queryParts.push(`eventName=${encodeURIComponent(queryParams.eventName)}`);
    }
    const searchQuery = queryParts.length ? `&${queryParts.join("&")}` : "";
    setQuerySearch(searchQuery);
  };

  useEffect(() => {
    let mounted = false;
    (async () => {
      mounted = true;
      if (mounted) {
        fetchEventCategories();
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="w-full container padding-spacing px-4 sm:px-6 lg:px-8">
      <CustomHead title="EVENTCOVE - Events" />
      {/* Responsive Image Container */}
      <div className="relative w-full h-[250px] sm:h-[300px] md:h-[350px] mb-20">
        <Image
          src="/assets/images/events_bg.png"
          alt="event bg"
          fill
          className="object-cover cursor-pointer rounded-xl"
          priority
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-secondary_200 opacity-60 rounded-xl" />
        <div className="h-full flex flex-col justify-center items-center gap-3">
          <h3 className="text-white lg:text-4xl md:text-2xl text-xl font-bold z-50">
            Our Culture Circuit
          </h3>
          <h5 className="text-white md:text-base text-sm font-bold z-50">
            All The Feels
          </h5>
        </div>
        {/* filter Options */}
        <div className="absolute -bottom-8 rounded-xl left-8 right-8 bg-white min-h-[68px] h-auto md:flex hidden items-center justify-between px-4">
          <div className="w-full">
            <SearchableSelect setQueryParams={setQueryParams} />
          </div>
          <div className="w-full">
            <DatePickerComponent setQueryParams={setQueryParams} />
          </div>
          <div className="w-full">
            <SearchField setQueryParams={setQueryParams} />
          </div>
          <Button
            backgroundColor="bg-primary_300"
            textColor="text-primary_100"
            title="Search"
            type="button"
            onClick={handleEventsSearch}
          />
        </div>
      </div>
      {/*Event Category */}
      <div className="w-full h-full flex flex-col gap-2 mb-3">
        <h3 className="text-base font-bold text-dark_200">
          Explore by category
        </h3>
        <div className="w-full overflow-x-auto sm:overflow-visible">
          {loadingEventDetails?.category && (
            <div className="grid grid-cols-4 gap-3">
              <SkeletonLoader count={4} className="h-[50px]" />
            </div>
          )}
          {!loadingEventDetails?.category && (
            <div className="flex gap-2 items-center py-2 flex-nowrap sm:flex-wrap">
              {categories.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedCategory(item)}
                  className={`min-w-max px-4 py-4 cursor-pointer hover:border border-primary_100 ${
                    selectedCategory === item
                      ? "border border-primary_100 bg-secondary_400"
                      : "bg-white"
                  } hover:bg-secondary_400 text-xs rounded-md shadow flex gap-1 items-center justify-center text-dark_400`}
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="w-full h-full z-40">
        <LandingPageEvents
          title="Upcoming Events"
          status="upcoming"
          category={selectedCategory}
          querySearch={querySearch}
        />
      </div>
    </div>
  );
}
