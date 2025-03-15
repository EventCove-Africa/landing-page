import React, { useMemo } from "react";
import Image from "next/image";
import { Rating } from "react-simple-star-rating";
import { FaArrowLeftLong, FaArrowRight } from "react-icons/fa6";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    image: "/assets/icons/testimonial_1.svg",
    text: "Managing our annual conference has never been this simple. The platform saved us so much time!",
    name: "Benita Oriaku",
    location: "Lagos, Nigeria",
  },
  {
    image: "/assets/icons/testimonial_2.svg",
    text: "Managing our annual conference has never been this simple. The platform saved us so much time!",
    name: "Benita Oriaku",
    location: "Lagos, Nigeria",
  },
  {
    image: "/assets/icons/testimonial_3.svg",
    text: "Managing our annual conference has never been this simple. The platform saved us so much time!",
    name: "Benita Oriaku",
    location: "Lagos, Nigeria",
  },
  {
    image: "/assets/icons/testimonial_4.svg",
    text: "Managing our annual conference has never been this simple. The platform saved us so much time!",
    name: "Benita Oriaku",
    location: "Lagos, Nigeria",
  },
];

export default function Testimonial() {
  const memoizedTestimonials = useMemo(() => testimonials, []);
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    prevArrow: (
      <button
        className="absolute -left-6 bottom-20 cursor-pointer"
        aria-label="Previous Testimonial"
      >
        <FaArrowLeftLong />
      </button>
    ),
    nextArrow: (
      <button
        className="absolute -right-6 bottom-16 cursor-pointer bg-white w-10 h-10 flex items-center justify-center rounded-full shadow-md"
        aria-label="Next Testimonial"
      >
        <FaArrowRight className="text-dark_200" />
      </button>
    ),
  };

  return (
    <section className="bg-secondary_100 w-full py-16 flex justify-center items-center">
      <div className="container px-4 flex lg:flex-row flex-col gap-8">
        {/* Left Section */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          <h3 className="text-white font-bold text-2xl">
            Our Clients Love Us!
          </h3>
          <p className="font-normal text-base text-white">
            See why our customers rave about us! Explore real reviews from pet
            lovers just like you. Join the conversation and share your
            experience with our top-rated products!
          </p>
          <div className="flex -space-x-1 overflow-hidden">
            {memoizedTestimonials.map((t, index) => (
              <Image
                key={index}
                src={t.image}
                alt={`Profile picture of ${t.name}`}
                width={32}
                height={32}
                className="inline-block rounded-full"
                priority={index === 0}
              />
            ))}
          </div>
          <div className="flex" aria-label="User rating">
            <Rating
              emptyStyle={{ display: "flex" }}
              emptyColor="#ffbc0b"
              initialValue={5}
              readonly
              allowHover={false}
              size={16}
              aria-label="Rated 5 out of 5 stars"
            />
          </div>
        </div>

        {/* Right Section (Carousel) */}
        <div className="w-[97%] lg:w-1/2 relative">
          <Slider {...settings}>
            {memoizedTestimonials.map((t, index) => (
              <div
                key={index}
                className="bg-white rounded-md p-6 flex flex-col shadow-md gap-8 relative min-h-[220px] h-full"
              >
                <Image
                  src={t.image}
                  alt={`Image of ${t.name}`}
                  width={72}
                  height={72}
                  className="rounded-full shadow-lg mb-2"
                  priority={index === 0}
                />
                <p className="text-dark_200 md:text-base text-sm font-normal">
                  {t.text}
                </p>
                <h3 className="text-grey_200 md:text-sm text-xs font-semibold my-1">
                  {t.name}
                </h3>
                <h3 className="text-grey_200 text-xs font-medium">
                  {t.location}
                </h3>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}
