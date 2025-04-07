import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const HeroStat = ({
  value,
  label,
}: {
  value: string;
  label: string;
}): JSX.Element => (
  <div className="flex flex-col items-center">
    <h3 className="text-dark_300 text-base font-bold">{value}</h3>
    <p className="text-grey_100 text-sm font-normal">{label}</p>
  </div>
);

export default function Hero() {
  const router = useRouter();
  return (
    <section
      className="container padding-spacing w-full flex lg:flex-row flex-col lg:justify-between justify-around items-center gap-4 h-full pt-12"
      aria-labelledby="hero-heading"
    >
      {/* Text Content */}
      <div className="w-full flex flex-col gap-4 text-center lg:text-left">
        <h1
          id="hero-heading"
          className="font-bold text-2xl md:text-4xl lg:text-6xl text-dark_200 animate-pulse"
        >
          Elevate Your
          <span className="text-primary_100 animate-pulse"> Experience!</span>
        </h1>
        <p className="text-grey_100 md:text-base text-sm font-normal">
          Unlock incredible experiences and create lasting memories—every detail
          perfected, every moment unforgettable. Your next great event is just a
          click away!
        </p>
        <div className="flex gap-4 lg:justify-start justify-center">
          <button
            type="button"
            className="w-auto py-3 px-4 bg-primary_100 text-white rounded-md text-sm font-medium outline-none"
            onClick={() => router.push("/events")}
            aria-label="Discover Events"
          >
            Discover Events
          </button>
        </div>

        {/* Stats Section */}
        <div className="flex gap-6 justify-center lg:justify-start mt-6">
          <HeroStat value="+12" label="Available tickets" />
          <HeroStat value="+2k" label="Tickets sold" />
        </div>
      </div>

      {/* Hero Image Section */}
      <div className="w-full bg-background_100 relative flex justify-center h-full">
        {/* Main Hero Image */}
        <Image
          src="/assets/images/hero_img.png"
          alt="Illustration of event success tools"
          width={538}
          height={515}
          className="object-contain"
          priority
          loading="eager"
          //   sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 538px"
        />

        {/* Chart Image */}
        <Image
          src="/assets/images/hero_chart.svg"
          alt="Graph chart showing ticket statistics"
          width={324}
          height={217}
          className="absolute bottom-0 right-0 animate-zoomInOut lg:block hidden"
          priority
          loading="eager"
          sizes="(max-width: 768px) 40vw, 324px"
        />

        {/* Secondary Chart Image */}
        <Image
          src="/assets/icons/hero_chart2.svg"
          alt="Additional graph chart showing data points"
          width={309}
          height={84}
          className="absolute lg:bottom-12 lg:-left-48 -left-4 lg:block hidden"
          priority
          loading="eager"
          sizes="(max-width: 768px) 100vw, 309px"
        />
      </div>
    </section>
  );
}
