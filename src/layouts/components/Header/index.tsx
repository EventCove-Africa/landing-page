import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

import { useContactSupport } from "@/hooks/useContactSupport";
import { openNewTabWithUrl } from "@/utils";
import { URLS } from "@/constants";
import MobileMenu from "./components/MobileMenu";

export default function Header() {
  const router = useRouter();

  const { handleOpenClose, ModalComponent } = useContactSupport();

  // Scroll to section if there's a hash in the URL
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    }
  }, [router.asPath]);

  const navLinks = [
    { id: "about-us", label: "About Us" },
    { id: "event", label: "Events", action: () => router.push("/events") },
    { id: "pricing", label: "Pricing", action: () => router.push("/pricing") },
    { id: "faqs", label: "FAQs" },
    { id: "contact-us", label: "Contact Us", action: handleOpenClose },
  ];

  return (
    <>
      <header className="container padding-spacing flex w-full items-center lg:gap-10 gap-5">
        {/* Logo */}
        <Image
          src="/assets/icons/logo.svg"
          alt="Company Logo"
          width={155}
          height={38}
          className="object-contain cursor-pointer"
          sizes="(max-width: 768px) 100px, 155px"
          priority
          onClick={() => router.push("/")}
        />

        {/* Navigation Links */}
        <nav
          className="hidden md:flex pl-2 lg:pl-0"
          aria-label="Main Navigation"
        >
          <ul className="flex gap-5 lg:gap-10">
            {navLinks.map(({ id, label, action }) => (
              <li key={id}>
                {action ? (
                  <button
                    onClick={action}
                    className="text-sm font-normal text-grey_100 hover:text-primary_100 transition-colors cursor-pointer"
                    aria-label={label}
                  >
                    {label}
                  </button>
                ) : (
                  <Link
                    href={router.pathname === "/" ? `#${id}` : `/#${id}`}
                    scroll={router.pathname === "/"}
                    className="text-sm font-normal text-grey_100 hover:text-primary_100 transition-colors cursor-pointer"
                    aria-label={label}
                  >
                    {label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        {/* Call-to-Action Button */}
        <div className="ml-auto flex items-center gap-3 md:gap-5">
          <button
            type="button"
            className="px-4 py-3 text-sm font-medium text-primary_100 border border-primary_100 rounded-xl transition-colors md:block hidden"
            onClick={() => openNewTabWithUrl(`${URLS.webAllURL}/#/auth/login`)}
            aria-label="Login"
          >
            Login
          </button>
          <button
            type="button"
            className="px-4 py-3 text-sm font-medium text-white bg-primary_100 rounded-xl transition-colors md:block hidden"
            onClick={() => openNewTabWithUrl(`${URLS.webAllURL}/#/auth/signup`)}
            aria-label="Sign Up"
          >
            Sign Up
          </button>
        </div>
        {/* Mobile Menu */}
        <MobileMenu router={router} navLinks={navLinks} />
      </header>
      {ModalComponent}
    </>
  );
}
