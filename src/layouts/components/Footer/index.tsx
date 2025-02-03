import React from "react";
import Image from "next/image";
import { openNewTabWithUrl } from "@/utils";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="container padding-spacing w-full py-16 ">
      <div className="flex lg:flex-row gap-20 flex-col">
        <div className="lg:w-2/5 w-full flex flex-col gap-4">
          {/* Logo */}
          <Image
            src="/assets/icons/logo.svg"
            alt="Eventcove Technology Inc. logo"
            width={155}
            height={38}
            className="object-contain"
            sizes="(max-width: 768px) 100px, 155px"
            priority
          />
          <h4 className="font-normal text-sm text-dark_200">
            Stay in the loop with the hottest events, exclusive updates, and all
            things unforgettable. 🎉 Sign up for our newsletter and never miss a
            moment of the action. Let’s make memories together!
          </h4>
          <div>
            <button
              type="button"
              className="bg-secondary_200 text-white text-sm font-medium px-3 py-2 rounded-md"
              aria-label="Subscribe to newsletter"
              onClick={() =>
                openNewTabWithUrl("https://forms.gle/VD9cQuiUB46yLQRAA")
              }
            >
              Subscribe
            </button>
          </div>
        </div>

        <div className="lg:w-3/5 w-full flex md:flex-row flex-col gap-6 justify-between">
          <div className="w-full flex flex-col gap-5">
            <h3 className="text-base font-bold text-dark_200">Quick Links</h3>
            <ul className="flex flex-col gap-4">
              <li className="text-sm font-normal text-dark_200 cursor-pointer hover:text-primary_100">
                About us
              </li>
              <li className="text-sm font-normal text-dark_200 cursor-pointer hover:text-primary_100">
                Events
              </li>
              <li className="text-sm font-normal text-dark_200 cursor-pointer hover:text-primary_100">
                Contact Us
              </li>
              <li className="text-sm font-normal text-dark_200 cursor-pointer hover:text-primary_100">
                FAQ’s
              </li>
            </ul>
          </div>

          <div className="w-full flex flex-col gap-5">
            <h3 className="text-base font-bold text-dark_200">Other Links</h3>
            <ul className="flex flex-col gap-4">
              <li className="text-sm font-normal text-dark_200 cursor-pointer hover:text-primary_100">
                Privacy policy
              </li>
              <li className="text-sm font-normal text-dark_200 cursor-pointer hover:text-primary_100">
                Terms & Conditions
              </li>
            </ul>
          </div>

          <div className="w-full flex flex-col gap-5">
            <h3 className="text-base font-bold text-dark_200">
              Connect with us
            </h3>
            <ul className="flex flex-col gap-4">
              <li
                onClick={() =>
                  openNewTabWithUrl("https://x.com/eventcoveafrica")
                }
                className="flex gap-2 items-center text-sm font-normal text-dark_200 cursor-pointer hover:text-primary_100"
              >
                <Image
                  src="/assets/icons/twitter.svg"
                  alt="Twitter icon"
                  width={24}
                  height={24}
                  className="object-contain"
                  sizes="(max-width: 768px) 100px, 155px"
                  priority
                />{" "}
                X
              </li>
              <li
                onClick={() =>
                  openNewTabWithUrl(
                    "https://www.facebook.com/share/14oyN4uSwpE/?mibextid=wwXIfr"
                  )
                }
                className="flex gap-2 items-center text-sm font-normal text-dark_200 cursor-pointer hover:text-primary_100"
              >
                <Image
                  src="/assets/icons/facebook.svg"
                  alt="Facebook icon"
                  width={24}
                  height={24}
                  className="object-contain"
                  sizes="(max-width: 768px) 100px, 155px"
                  priority
                />{" "}
                Facebook
              </li>
              <li
                onClick={() =>
                  openNewTabWithUrl("https://www.instagram.com/eventcoveafrica")
                }
                className="flex gap-2 items-center text-sm font-normal text-dark_200 cursor-pointer hover:text-primary_100"
              >
                <Image
                  src="/assets/icons/instagram.svg"
                  alt="Instagram icon"
                  width={24}
                  height={24}
                  className="object-contain"
                  sizes="(max-width: 768px) 100px, 155px"
                  priority
                />{" "}
                Instagram
              </li>
              <li
                onClick={() =>
                  openNewTabWithUrl(
                    "https://www.linkedin.com/company/eventcove-africa"
                  )
                }
                className="flex gap-2 items-center text-sm font-normal text-dark_200 cursor-pointer hover:text-primary_100"
              >
                <Image
                  src="/assets/icons/linkedin.svg"
                  alt="LinkedIn icon"
                  width={24}
                  height={24}
                  className="object-contain"
                  sizes="(max-width: 768px) 100px, 155px"
                  priority
                />{" "}
                LinkedIn
              </li>
            </ul>
          </div>
        </div>
      </div>

      <h4 className="font-normal text-sm text-dark_200 mt-10">
        Copyright ©{currentYear}. Eventcove Technology Inc. All rights reserved.
      </h4>
    </footer>
  );
}
