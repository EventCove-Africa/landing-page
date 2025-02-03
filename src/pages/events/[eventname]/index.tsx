import React, { useState } from "react";
import Image from "next/image";
import CustomHead from "@/components/CustomHead";
import DescriptionBar from "@/components/DescriptionBar";
import { formatToNaira } from "@/utils";
import { useRouter } from "next/router";
import { CiLocationOn, CiUser } from "react-icons/ci";
import { LuCalendarDays } from "react-icons/lu";
import { IoTimeOutline } from "react-icons/io5";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FiMinus } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";
import Button from "@/components/FormComponents/Button";

export default function EventName() {
  const router = useRouter();
  const { eventname } = router.query;
  const [count, setCount] = useState(1);

  const increment = () => setCount((prev) => Math.min(5, prev + 1));
  const decrement = () => setCount((prev) => Math.max(1, prev - 1));

  return (
    <>
      <CustomHead title={`EVENTCOVE - ${eventname}`} />
      <div className="container padding-spacing w-full h-full">
        <DescriptionBar text="Get the full picture of your event 🌟" />
        <div className="w-full flex lg:flex-row flex-col gap-4">
          <div className="bg-white w-full h-full rounded-xl p-3">
            <div className="w-full relative">
              <Image
                src="/assets/images/upcoming_event_bg2.png"
                alt="event banner"
                height={191}
                width={100}
                className="object-cover rounded-xl w-full"
                priority
              />
              <div className="absolute top-3 left-3 flex flex-col gap-2">
                <span
                  className={`px-3 py-2 text-xs font-normal rounded-md capitalize ${
                    true
                      ? "bg-grey_300 text-grey_100"
                      : "bg-green_400 text-green_200"
                  }`}
                >
                  {true ? "Free" : "Paid"}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-1 w-full mt-4">
              <h3 className="text-dark_200 font-medium md:text-base text-sm">
                🎉 Get Ready for an Unforgettable House Party! 🎉
              </h3>
              <p className="flex items-center gap-1 text-sm font-normal text-grey_100">
                <CiLocationOn className="w-4 h-4" /> Eko hotel,Lagos, Nigeria
              </p>
            </div>
            <div className="flex flex-wrap gap-4 mt-4">
              <div className="bg-grey_500 rounded-md w-fit p-2 flex gap-2 items-center">
                <LuCalendarDays className="w-[20px] h-[20px] text-blue_200" />
                <div className="flex flex-col gap-1">
                  <h3 className="text-grey_100 text-xs font-normal">
                    Start Date
                  </h3>
                  <h5 className="text-dark_200 font-normal md:text-base text-sm">
                    Sun 12 Jun 2023
                  </h5>
                </div>
              </div>
              <div className="bg-grey_500 rounded-md w-fit p-2 flex gap-2 items-center">
                <IoTimeOutline className="text-secondary_500 w-[20px] h-[20px]" />
                <div className="flex flex-col gap-1">
                  <h3 className="text-grey_100 text-xs font-normal">
                    End Time
                  </h3>
                  <h5 className="text-dark_200 font-normal md:text-base text-sm">
                    12:AM
                  </h5>
                </div>
              </div>
              <div className="bg-grey_500 rounded-md w-fit p-2 flex gap-2 items-center">
                <CiUser className="text-secondary_500 w-[20px] h-[20px]" />
                <div className="flex flex-col gap-1">
                  <h3 className="text-grey_100 text-xs font-normal">
                    Organizer Email
                  </h3>
                  <h5 className="text-dark_200 font-normal md:text-base text-sm">
                    eventcove@gmal.com
                  </h5>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-dark_200 font-normal text-sm">
                Event Details
              </h3>
              <div className="h-auto bg-grey_500 p-3 text-grey_100 font-normal text-sm">
                We’re turning up the vibes and making this a night to remember!
                Join us for an epic house party filled with good music, great
                company, and plenty of fun. Here’s everything you need to know:
              </div>
            </div>
          </div>
          <div className="bg-white w-full rounded-xl h-fit p-3">
            <h3 className="text-sm font-normal text-dark_200">Tickets</h3>
            <div className="grid md:grid-cols-3 grid-cols-1 gap-3 mt-4">
              <div className="bg-grey_500 hover:border border-primary_100 cursor-pointer rounded-md p-2 flex flex-col justify-between">
                <div className="flex gap-2 items-center">
                  <div className="rounded-full bg-[#EEEEFF] p-3 flex justify-center items-center">
                    <FaChalkboardTeacher className="w-[20px] h-[20px] text-blue_400" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-grey_100 text-xs font-normal">
                      Early bird
                    </h3>
                    <h5 className="text-dark_200 font-normal md:text-base text-sm">
                      {formatToNaira(0)}
                    </h5>
                  </div>
                </div>
              </div>
              <div className="bg-grey_500 hover:border border-primary_100 cursor-pointer rounded-md p-2 flex flex-col justify-between">
                <div className="flex gap-2 items-center">
                  <div className="rounded-full bg-[#EEEEFF] p-3 flex justify-center items-center">
                    <FaChalkboardTeacher className="w-[20px] h-[20px] text-blue_400" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-grey_100 text-xs font-normal">
                      Standard
                    </h3>
                    <h5 className="text-dark_200 font-normal md:text-base text-sm">
                      {formatToNaira(0)}
                    </h5>
                  </div>
                </div>
              </div>
              <div className="bg-grey_500 hover:border border-primary_100 cursor-pointer rounded-md p-2 flex flex-col justify-between">
                <div className="flex gap-2 items-center">
                  <div className="rounded-full bg-[#EEEEFF] p-3 flex justify-center items-center">
                    <FaChalkboardTeacher className="w-[20px] h-[20px] text-blue_400" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-grey_100 text-xs font-normal">Vip</h3>
                    <h5 className="text-dark_200 font-normal md:text-base text-sm">
                      {formatToNaira(0)}
                    </h5>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <h4 className="text-grey_100 text-sm font-normal">Quantity</h4>
                <div className="flex items-center gap-3">
                  <div
                    onClick={decrement}
                    className="bg-grey_1000 rounded-full cursor-pointer p-3"
                  >
                    <FiMinus className="text-grey_100 text-xs font-semibold" />
                  </div>
                  <span className="text-dark_200 font-semibold text-sm">
                    {count}
                  </span>
                  <div
                    onClick={increment}
                    className="bg-grey_1000 rounded-full cursor-pointer p-3"
                  >
                    <FaPlus className="text-grey_100 text-xs font-semibold" />
                  </div>
                </div>
                <div>
                  <Button
                    onClick={() =>
                      router.push(`/events/${eventname}/3847448484393`)
                    }
                    title="Get Ticket"
                    type="button"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
