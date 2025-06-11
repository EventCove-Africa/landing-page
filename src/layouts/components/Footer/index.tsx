/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { _handleThrowErrorMessage, openNewTabWithUrl } from "@/utils";
import { useContactSupport } from "@/hooks/useContactSupport";
import { URLS } from "@/constants";
import { api } from "@/services/apiClients";
import { appUrls } from "@/services/urls";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

const socialLinks = [
  { href: "https://x.com/eventcoveafrica", icon: "twitter.svg", label: "X" },
  {
    href: "https://www.facebook.com/share/14oyN4uSwpE/?mibextid=wwXIfr",
    icon: "facebook.svg",
    label: "Facebook",
  },
  {
    href: "https://www.instagram.com/eventcove.africa",
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
  { href: "/events", label: "Events" },
  { href: "/pricing", label: "Pricing" },
  { href: "#contact-us", label: "Contact Us" },
  { href: "#faq", label: "FAQ’s" },
];

const otherLinks = [
  {
    href: `${URLS.legalURL}/eventcove-privacy-policy`,
    label: "Privacy Policy",
  },
  {
    href: `${URLS.legalURL}/eventcove-terms-of-use`,
    label: "Terms & Conditions",
  },
  {
    href: `${URLS.webAllURL}/#/auth/signup`,
    label: "Create Event",
  },
  {
    href: `${URLS.webAllURL}/#/auth/login`,
    label: "Login",
  },
];

export default function Footer() {
  const { handleOpenClose, ModalComponent } = useContactSupport();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleLinkClick = (
    href: string,
    label: string,
    e: React.MouseEvent
  ) => {
    e.preventDefault();

    if (["contact us"].includes(label.toLocaleLowerCase())) {
      handleOpenClose();
    } else if (["pricing", "events"].includes(label.toLocaleLowerCase())) {
      router.push(href);
    } else if (["#about-us", "#faq"].includes(href.toLocaleLowerCase())) {
      if (router.pathname !== "/") {
        router.push("/").then(() => {
          setTimeout(() => {
            const element = document.querySelector(href);
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
            }
          }, 100); // Small delay to ensure the page has loaded
        });
      } else {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    } else {
      openNewTabWithUrl(href);
    }
  };

  const handleSubcribeNewsletter = async () => {
    const payload = {
      email,
    };
    setIsLoading(true);
    try {
      const res = await api.post(appUrls.SUBSCRIBE_NEWSLETTER_URL, payload);
      const status_code = [200, 201].includes(res?.status);
      if (status_code) {
        const message = res?.data?.data;
        toast.success(message);
        setEmail("");
      }
    } catch (error: any) {
      const message = error?.data?.message || error?.data?.email;
      const err_message = _handleThrowErrorMessage(message);
      toast.error(err_message);
    } finally {
      setIsLoading(false);
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
            <div className="flex lg:w-[70%] md:w-[50%] w-full md:p-2 p-1 bg-white border border-gray-300 rounded-md overflow-hidden">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 text-sm outline-none"
                aria-label="Email address"
              />
              <button
                className="bg-secondary_200 text-white md:text-sm text-xs font-medium p-2 disabled:opacity-50 rounded-md"
                aria-label="Subscribe to newsletter"
                onClick={handleSubcribeNewsletter}
                disabled={isLoading || !email}
              >
                Subscribe
              </button>
            </div>
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
