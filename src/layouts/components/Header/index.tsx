import React from "react";
import Image from "next/image";

export default function Header() {
  return (
    <header className="container padding-spacing w-full flex lg:gap-20 md:gap-10 gap-5 items-center">
      {/* Logo */}
        <Image
          src="/assets/icons/logo.svg"
          alt="Company Logo"
          width={155}
          height={38}
          className="object-contain"
          sizes="(max-width: 768px) 100px, 155px"
          priority
        />
      {/* Navigation Links */}
      <nav
        className="pl-2 lg:pl-0 sm:hidden lg:gap-10 gap-5 hidden md:flex"
        aria-label="Main Navigation"
      >
        <ul className="flex gap-5 lg:gap-10">
          <li>
            <a
            //   href="/about-us"
              className="font-normal text-sm text-grey_100 hover:text-primary_100 transition-colors cursor-pointer"
            >
              About us
            </a>
          </li>
          <li>
            <a
            //   href="/event-attended"
              className="font-normal text-sm text-grey_100 hover:text-primary_100 transition-colors cursor-pointer"
            >
              Event Attended
            </a>
          </li>
          <li>
            <a
            //   href="/faqs" 
              className="font-normal text-sm text-grey_100 hover:text-primary_100 transition-colors cursor-pointer"
            >
              FAQs
            </a>
          </li>
          <li>
            <a
            //   href="/contact-us"
              className="font-normal text-sm text-grey_100 hover:text-primary_100 transition-colors cursor-pointer"
            >
              Contact Us
            </a>
          </li>
        </ul>
      </nav>

      {/* Call-to-Action Button */}
      {/* <div className="ml-auto flex md:gap-5 gap-3 items-center">
        <button
          type="button"
          className="py-3 px-4 bg-primary_100 text-white rounded-xl text-sm font-medium hover:bg-primary_200 transition-colors"
          // onClick={() => {
          //   window.location.href = "/sign-up";
          // }}
        >
          Sign up
        </button>
      </div> */}
    </header>
  );
}
