import { URLS } from "@/constants";
import { openNewTabWithUrl } from "@/utils";
import Image from "next/image";
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
  return (
    <section
      className="container padding-spacing w-full flex lg:flex-row flex-col lg:justify-between justify-around items-center gap-4 h-full pt-12"
      aria-labelledby="hero-heading"
    >
      {/* Text Content */}
      <div className="w-full flex flex-col gap-4 text-center lg:text-left">
        <h1
          id="hero-heading"
          className="font-bold text-2xl md:text-4xl lg:text-6xl text-dark_200"
        >
          Level Up Your Event <span className="text-primary_100">Game.</span>
        </h1>
        <p className="text-grey_100 md:text-base text-sm font-normal">
          We’ve got the tools to help you slay every detail and give your
          audience the legendary experience they deserve. Let’s make magic
          happen!
        </p>
        <div>
          <button
            type="button"
            className="py-3 px-4 bg-primary_100 text-white rounded-md text-sm font-medium outline-none"
            onClick={() => openNewTabWithUrl(`${URLS.webAllURL}/#/auth/signup`)}
            aria-label="Get Started"
          >
            Get Started
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
          className="absolute bottom-0 right-0 animate-zoomInOut"
          priority
          loading="eager"
          sizes="(max-width: 768px) 40vw, 324px"
        />

        {/* Face Icon */}
        {/* <Image
          src="/assets/icons/face_hero.svg"
          alt="A smiling face icon"
          width={60}
          height={60}
          className="absolute lg:top-24 -right-4 top-16 lg:block hidden"
          priority
          loading="eager"
          sizes="60px"
        /> */}

        {/* Crown Icon */}
        {/* <Image
          src="/assets/icons/crown-hero.svg"
          alt="Crown icon representing premium experience"
          width={60}
          height={60}
          className="absolute lg:top-48 left-16 lg:block hidden"
          priority
          loading="eager"
          sizes="60px"
        /> */}

        {/* Decorative Blue Circle */}
        {/* <div
          className="w-[20px] h-[20px] rounded-full bg-blue_100 absolute -top-4 right-4 lg:block hidden"
          aria-hidden="true"
        /> */}

        {/* Decorative Green Circle */}
        {/* <div
          className="w-[20px] h-[20px] rounded-full bg-green_100 absolute lg:top-48 lg:block hidden -right-2 top-48"
          aria-hidden="true"
        /> */}

        {/* Secondary Chart Image */}
        <Image
          src="/assets/icons/hero_chart2.svg"
          alt="Additional graph chart showing data points"
          width={309}
          height={84}
          className="absolute lg:bottom-12 lg:-left-48 -left-4"
          priority
          loading="eager"
          sizes="(max-width: 768px) 100vw, 309px"
        />
      </div>
    </section>
  );
}
