/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Image from "next/image";

const features = [
  {
    icon: "/assets/icons/ticket.svg",
    title: "Effortless Ticketing",
    description:
      "Set up your event in minutes and start selling tickets with an intuitive platform that handles it all.",
  },
  {
    icon: "/assets/icons/briefcase.svg",
    title: "Smart Event Management",
    description:
      "From registrations to real-time analytics, manage your event like a pro with powerful tools.",
  },
  {
    icon: "/assets/icons/money-2.svg",
    title: "Secure Payments",
    description:
      "Enjoy safe, seamless transactions with multiple payment options for attendees.",
  },
  {
    icon: "/assets/icons/brush.svg",
    title: "Customizable Branding",
    description:
      "Make your event truly yours with personalized themes, ticket designs, and marketing tools.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="container mx-auto px-4 py-16 flex flex-col gap-8">
      {/* Section Title */}
      <h2 className="text-dark_100 text-3xl font-extrabold text-center">
        Why Choose Us?
      </h2>

      <div className="flex flex-col lg:flex-row lg:justify-between items-center gap-16">
        {/* Left Image Section */}
        <div className="relative w-full lg:w-1/2 flex justify-center">
          <Image
            src="/assets/images/whyChooseUs.svg"
            alt="Event management platform illustration"
            width={593}
            height={402}
            className="object-contain w-full max-w-[593px] h-auto"
            priority
            sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 50vw"
          />

          {/* Floating Cards */}
          <FloatingCard
            position="left-0 -top-10"
            label="Ticket Sold"
            value="100/170"
            badgeText="60%"
            badgeClass="bg-pink_100 text-primary_100"
          />

          <FloatingCard
            position="left-0 -bottom-10"
            label="Ticket Price"
            value="₦ 100,000"
            iconSrc="/assets/icons/ticket_price.svg"
          />

          <FloatingCard
            position="lg:-right-8 right-0 bottom-10"
            label="Event Host"
            value="Eventcove"
            iconSrc="/assets/icons/event_host.svg"
          />
        </div>

        {/* Right Features Section */}
        <div className="w-full lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map(({ icon, title, description }, index) => (
            <FeatureCard
              key={index}
              icon={icon}
              title={title}
              description={description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* Reusable Floating Card Component */
function FloatingCard({
  position,
  label,
  value,
  badgeText,
  badgeClass,
  iconSrc,
}: any) {
  return (
    <div
      className={`absolute ${position} bg-white shadow-lg rounded-lg flex gap-3 items-center p-3 animate-zoomInOut`}
    >
      {badgeText ? (
        <div
          className={`w-16 h-10 flex items-center justify-center text-sm font-medium rounded-lg ${badgeClass}`}
        >
          {badgeText}
        </div>
      ) : (
        <Image
          src={iconSrc}
          alt={`${label} Icon`}
          width={50}
          height={50}
          className="rounded-full"
          loading="lazy"
        />
      )}
      <div>
        <h4 className="text-xs text-grey_100 font-normal">{label}</h4>
        <h4 className="text-sm text-dark_200 font-semibold">{value}</h4>
      </div>
    </div>
  );
}

/* Reusable Feature Card Component */
function FeatureCard({ icon, title, description }: any) {
  return (
    <div className="bg-white rounded-lg p-4 flex flex-col items-start gap-3">
      <Image
        src={icon}
        alt={`${title} Icon`}
        width={30}
        height={30}
        className="rounded-full"
        loading="lazy"
      />
      <h3 className="text-sm font-semibold text-dark_100">{title}</h3>
      <p className="text-sm text-grey_100">{description}</p>
    </div>
  );
}
