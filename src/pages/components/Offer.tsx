import Image from "next/image";
import React from "react";

export default function Offer() {
  return (
    <section className="container padding-spacing w-full flex lg:flex-row flex-col lg:justify-between justify-around items-center gap-4 h-full pt-28">
      {/* Text Content */}
      <div className="w-full flex flex-col gap-4 text-center lg:text-left">
        <h1
          id="hero-heading"
          className="font-bold text-base md:text-xl lg:text-2xl text-dark_200"
        >
          Plan. Promote. Sell. <span className="text-primary_100">Engage.</span>
        </h1>
        <p className="text-grey_100 md:text-base text-sm font-normal">
          Take control of your events with our all-in-one platform. Whether it’s
          a concert, conference, workshop, or festival, we’ve got everything you
          need to succeed.
        </p>
        <div className="flex flex-col gap-3">
          {[
            "Effortless Ticketing: Create and sell tickets in minutes.",
            "Smart Event Management: Streamline planning and attendee tracking.",
            "Powerful Promotion Tools: Reach the right audience with built-in marketing."
          ].map((text, index) => (
            <div className="flex gap-3 items-center" key={index}>
              <Image
                src="/assets/icons/checked.svg"
                alt="Checked icon"
                width={20}
                height={20}
                className="object-contain"
                priority
              />
              <h3 className="text-dark_200 font-normal md:text-sm text-xs text-left">{text}</h3>
            </div>
          ))}
        </div>
      </div>
      {/* Hero Image Section */}
      <div className="w-full bg-background_100 relative flex justify-center">
        <Image
          src="/assets/images/offer_bg.svg"
          alt="Background image illustrating offer"
          width={593}
          height={402}
          className="object-contain w-full h-auto"
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <Image
          src="/assets/images/calendar.svg"
          alt="Calendar illustration"
          width={207.2}
          height={273.81}
          className="object-contain absolute left-0 animate-zoomInOut"
          priority
          sizes="(max-width: 1024px) 50vw, 25vw"
        />
      </div>
    </section>
  );
}