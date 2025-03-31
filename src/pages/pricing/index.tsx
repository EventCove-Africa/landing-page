import React, { useState } from "react";
import Image from "next/image";
import CustomHead from "@/components/CustomHead";
import Button from "@/components/FormComponents/Button";
import ToggleSwitch from "@/components/ToggleSwitch";
import { URLS } from "@/constants";
import { openNewTabWithUrl } from "@/utils";
import { LuWallet } from "react-icons/lu";
import { PiCalendarDotsLight } from "react-icons/pi";

const features = [
  {
    icon: "/assets/icons/secure.svg",
    title: "Secure Transactions",
    description:
      "All payments are securely processed with trusted financial partners",
  },
  {
    icon: "/assets/icons/dashboard.svg",
    title: "Real-time Dashboard",
    description: "Track ticket sales and attendee data in real-time",
  },
  {
    icon: "/assets/icons/support.svg",
    title: "Human Support",
    description: "Get help from our team whenever you need it",
  },
  {
    icon: "/assets/icons/built.svg",
    title: "Built for Africa",
    description: "Optimized for the African market with local payment options",
  },
];

export default function Pricing() {
  const [activeTab, setActiveTab] = useState("free_events");
  const [eventType] = useState([
    { key: "free_events", name: "Free Events" },
    { key: "paid_events", name: "Paid Events" },
  ]);
  const [toggleOnOff, setToggleOnOff] = useState(false);

  const tabHeaders: Record<string, string> = {
    free_events: "Hosting a Free Event?",
    paid_events: "Selling Tickets?",
  };
  const tabDescription: Record<string, string> = {
    free_events: "Free events are completely free. No hidden charges.",
    paid_events: "We only charge 4% + ₦100 per paid ticket.",
  };

  const FeatureCard = ({ icon, title, description }: (typeof features)[0]) => (
    <div className="bg-white p-4 h-full">
      <Image src={icon} alt="icon" width={30} height={30} priority />
      <h4 className="text-dark_200 font-medium text-sm my-4">{title}</h4>
      <p className="text-grey_100 font-normal text-sm">{description}</p>
    </div>
  );

  return (
    <div className="w-full container padding-spacing px-4 sm:px-6 lg:px-4">
      <CustomHead title="EVENTCOVE - Pricing" />
      <div className="relative w-full h-[250px] sm:h-[300px] md:h-[350px] md:mb-8 mb-4">
        <Image
          src="/assets/images/pricing_bg.png"
          alt="event bg"
          fill
          className="object-cover cursor-pointer rounded-xl"
          priority
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-secondary_200 opacity-60 rounded-xl" />
        <div className="h-full flex flex-col justify-center items-center gap-3 p-5">
          <h3 className="text-white lg:text-4xl md:text-2xl text-xl font-bold z-50 text-center">
            Simple & Transparent Pricing
          </h3>
          <h5 className="text-white md:text-base text-sm font-bold z-50 text-center">
            No hidden fees. No surprises. Just straightforward pricing that
            works for your events.
          </h5>
        </div>
      </div>
      <div className="lg:px-28 px-0 w-full h-full flex flex-col items-center justify-center gap-6">
        <div className="bg-white w-full rounded-md flex gap-4">
          {eventType.map(({ key, name }) => {
            const isActive = activeTab === key;
            return (
              <div
                onClick={() => setActiveTab(key)}
                key={key}
                className={`w-full text-center p-3 font-medium lg:text-base md:text-sm text-xs ${
                  isActive
                    ? "text-primary_100 border-b-2 border-primary_100 pb-1"
                    : " text-gray-600 cursor-pointer bg-grey_300 opacity-50"
                }`}
              >
                {name}
              </div>
            );
          })}
        </div>
        <div className="bg-white md:py-5 md:px-10 px-3 py-3 flex flex-col justify-center items-center gap-4 md:w-auto w-full rounded-xl">
          <div className="rounded-full bg-primary_200 p-3">
            <PiCalendarDotsLight className="w-[20px] h-[20px] text-primary_100" />
          </div>
          <h1 className="text-dark_200 font-bold lg:text-2xl md:text-lg text-base">
            {tabHeaders?.[activeTab] || null}
          </h1>
          <p className="text-grey_100 md:text-base text-sm font-normal">
            {tabDescription?.[activeTab] || null}
          </p>
          <div className="bg-primary_200 rounded-md text-jazzberry text-sm p-3 text-center font-normal">
            <span className="md:text-4xl text-2xl font-bold">
              {activeTab === "free_events" ? "₦0" : "4%"}
            </span>
            {activeTab === "free_events" ? "/ticket" : "+ ₦100/ticket"}
          </div>
          {activeTab === "free_events" ? (
            <p className="text-dark_100 text-sm font-normal">
              Only pay when you sell tickets.
            </p>
          ) : (
            <ToggleSwitch
              labelName="Absorb fee yourself"
              name="absorb_fee"
              checked={toggleOnOff}
              onChange={(checked) => setToggleOnOff(checked)}
            />
          )}
          {activeTab === "paid_events" && (
            <div className="w-full bg-grey_300 p-4">
              <h3 className="text-dark_200 font-medium text-sm mb-3">
                Example:
              </h3>
              <ul className="w-full">
                <li className="text-grey_100 font-normal text-sm">
                  Ticket price: ₦5,000
                </li>
                <li className="text-grey_100 font-normal text-sm">
                  Fee: ₦300 (4% + ₦100)
                </li>
                <li className="text-grey_100 font-normal text-sm">
                  Customer pay: {`${toggleOnOff ? "₦5,300" : "₦5,000"}`}
                </li>
                <li className="text-grey_100 font-normal text-sm">
                  You receive: {`${toggleOnOff ? "₦5,000" : "₦4,700"}`}
                </li>
              </ul>
            </div>
          )}
          <Button
            title={`Get Started`}
            className="h-[45px] text-center w-full"
            type="button"
            onClick={() => openNewTabWithUrl(`${URLS.webAllURL}/#/auth/login`)}
          />
        </div>
        <span className="text-dark_200 font-bold md:text-2xl text-base">
          Why EventCove?
        </span>
        <div className="grid w-full gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
        {activeTab === "paid_events" && (
          <div className="bg-white w-full p-2">
            <div className="flex items-center gap-3 mb-2">
              <div className="rounded-full bg-primary_200 p-3">
                <LuWallet className="w-[20px] h-[20px] text-primary_100" />
              </div>
              <h4 className="text-dark_200 font-bold md:text-2xl text-base">
                Payout Information
              </h4>
            </div>
            <p className="text-grey_100 font-normal md:text-base text-sm">
              Payouts are processed within 24 hours after your event ends. Need
              it sooner? Request a withdrawal anytime.All transactions are
              securely processed with trusted financial partners.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
