import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

export default function Header() {
  const router = useRouter()
  return (
    <header className="container padding-spacing w-full flex lg:gap-20 md:gap-10 gap-5 items-center">
      {/* Logo */}
      <Image
        src="/assets/icons/logo.svg"
        alt="Company Logo"
        width={155}
        height={38}
        className="object-contain cursor-pointer"
        sizes="(max-width: 768px) 100px, 155px"
        priority
        onClick={() => router.push('/')}
      />

      {/* Navigation Links */}
      <nav
        className="pl-2 lg:pl-0 sm:hidden lg:gap-10 gap-5 hidden md:flex"
        aria-label="Main Navigation"
      >
        <ul className="flex gap-5 lg:gap-10">
          <li>
            {/* <Link href="/about-us" legacyBehavior> */}
              <a className="font-normal text-sm text-grey_100 hover:text-primary_100 transition-colors cursor-pointer">
                About us
              </a>
            {/* </Link> */}
          </li>
          <li>
            <Link href="/events" legacyBehavior>
              <a className="font-normal text-sm text-grey_100 hover:text-primary_100 transition-colors cursor-pointer">
                Event
              </a>
            </Link>
          </li>
          <li>
            {/* <Link href="/faqs" legacyBehavior> */}
              <a className="font-normal text-sm text-grey_100 hover:text-primary_100 transition-colors cursor-pointer">
                FAQs
              </a>
            {/* </Link> */}
          </li>
          <li>
            {/* <Link href="/contact-us" legacyBehavior> */}
              <a className="font-normal text-sm text-grey_100 hover:text-primary_100 transition-colors cursor-pointer">
                Contact Us
              </a>
            {/* </Link> */}
          </li>
        </ul>
      </nav>

      {/* Call-to-Action Button */}
      <div className="ml-auto flex md:gap-5 gap-3 items-center">
        <button
          type="button"
          className="py-3 px-4 bg-primary_100 text-white rounded-xl text-sm font-medium transition-colors"
          onClick={() => {
            toast.success("COMING SOON...", { duration: 3000 });
          }}
        >
          Sign up
        </button>
      </div>
    </header>
  );
}
