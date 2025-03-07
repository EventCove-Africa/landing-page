import React from "react";
import Link from "next/link";
import Image from "next/image";
import { openNewTabWithUrl } from "@/utils";
import { useContactSupport } from "@/hooks/useContactSupport";

const socialLinks = [
  { href: "https://x.com/eventcoveafrica", icon: "twitter.svg", label: "X" },
  {
    href: "https://www.facebook.com/share/14oyN4uSwpE/?mibextid=wwXIfr",
    icon: "facebook.svg",
    label: "Facebook",
  },
  {
    href: "https://www.instagram.com/eventcoveafrica",
    icon: "instagram.svg",
    label: "Instagram",
  },
  {
    href: "https://www.linkedin.com/company/eventcove-africa",
    icon: "linkedin.svg",
    label: "LinkedIn",
  },
];

const quickLinks = [
  { href: "#about-us", label: "About us" },
  { href: "#event", label: "Events" },
  { href: "#contact-us", label: "Contact Us" },
  { href: "#faq", label: "FAQ’s" },
];

const otherLinks = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-and-conditions", label: "Terms & Conditions" },
];

export default function Footer() {
  const { handleOpenClose, ModalComponent } = useContactSupport();

  const handleLinkClick = (
    href: string,
    label: string,
    e: React.MouseEvent
  ) => {
    if (
      ["contact us", "privacy policy", "terms & conditions"].includes(
        label.toLocaleLowerCase()
      )
    ) {
      e.preventDefault(); // Optional: Prevent default if needed
      handleOpenClose();
      // Perform any action like opening a modal, scrolling, etc.
    } else {
      window.location.href = href; // Default navigation
    }
  };

  return (
    <>
      <footer className="container py-16 px-3">
        <div className="flex flex-col lg:flex-row gap-20">
          <div className="lg:w-2/5 flex flex-col gap-4">
            <Image
              src="/assets/icons/logo.svg"
              alt="Eventcove Technology Inc."
              width={155}
              height={38}
              priority
            />
            <p className="md:w-[60%] w-full text-sm text-dark_200">
              Stay updated on exclusive events and unforgettable moments. 🎉
              Sign up for our newsletter now!
            </p>
            <button
              className="md:w-[30%] w-full bg-secondary_200 text-white text-sm font-medium px-3 py-2 rounded-md"
              aria-label="Subscribe to newsletter"
              onClick={() =>
                openNewTabWithUrl("https://forms.gle/VD9cQuiUB46yLQRAA")
              }
            >
              Subscribe
            </button>
          </div>

          <div className="lg:w-3/5 flex flex-col md:flex-row gap-6 justify-between">
            {[
              { title: "Quick Links", links: quickLinks },
              { title: "Other Links", links: otherLinks },
            ].map((section) => (
              <div key={section.title} className="flex flex-col gap-5">
                <h3 className="text-base font-bold text-dark_200">
                  {section.title}
                </h3>
                <ul className="flex flex-col gap-4">
                  {section.links.map(({ href, label }) => (
                    <li
                      key={href}
                      className="text-sm text-dark_200 hover:text-primary_100"
                    >
                      <Link
                        href={href}
                        onClick={(e) => handleLinkClick(href, label, e)}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="flex flex-col gap-5">
              <h3 className="text-base font-bold text-dark_200">
                Connect with us
              </h3>
              <ul className="flex flex-col gap-4">
                {socialLinks.map(({ href, icon, label }) => (
                  <li
                    key={href}
                    onClick={() => openNewTabWithUrl(href)}
                    className="flex items-center gap-2 text-sm text-dark_200 hover:text-primary_100 cursor-pointer"
                  >
                    <Image
                      src={`/assets/icons/${icon}`}
                      alt={`${label} icon`}
                      width={24}
                      height={24}
                      priority
                    />
                    {label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <p className="text-sm text-dark_200 mt-10">
          &copy; {new Date().getFullYear()} Eventcove Technology Inc. All rights
          reserved.
        </p>
      </footer>
      {ModalComponent}
    </>
  );
}
