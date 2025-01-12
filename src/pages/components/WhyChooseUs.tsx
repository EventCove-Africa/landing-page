import Image from "next/image";
import React from "react";

export default function WhyChooseUs() {
  return (
    <section className="container mx-auto px-4 py-16 flex flex-col gap-8">
      {/* Section Title */}
      <h1 className="text-dark_100 text-3xl font-extrabold text-center">
        Why Choose Us?
      </h1>

      <div className="flex flex-col lg:flex-row lg:justify-between items-center gap-16">
        {/* Left Image Section */}
        <div className="relative w-full lg:w-1/2 flex justify-center">
          {/* Background Image */}
          <Image
            src="/assets/images/whyChooseUs.svg"
            alt="Illustration showing an offer"
            width={593}
            height={402}
            className="object-contain w-full max-w-[593px] h-auto"
            priority
            sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 50vw"
          />

          {/* Floating Card: Ticket Sold */}
          <div className="absolute left-0 -top-10 bg-white shadow-lg rounded-lg flex gap-3 items-center p-3 animate-zoomInOut">
            <div className="bg-pink_100 text-primary_100 w-16 h-10 flex items-center justify-center text-sm font-medium rounded-lg">
              60%
            </div>
            <div>
              <h4 className="text-xs text-grey_100 font-normal">Ticket Sold</h4>
              <h4 className="text-sm text-dark_200 font-semibold">100/170</h4>
            </div>
          </div>

          {/* Floating Card: Ticket Price */}
          <div className="absolute left-0 -bottom-10 bg-white shadow-lg rounded-lg flex gap-3 items-center p-3 animate-zoomInOut">
            <Image
              src="/assets/icons/ticket_price.svg"
              alt="Ticket Price Icon"
              width={50}
              height={50}
              className="rounded-full"
              priority
              sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 50vw"
            />
            <div>
              <h4 className="text-xs text-grey_100 font-normal">Ticket Price</h4>
              <h4 className="text-sm text-dark_200 font-semibold">₦ 100,000</h4>
            </div>
          </div>

          {/* Floating Card: Event Host */}
          <div className="absolute lg:-right-8 right-0 bottom-10 bg-white shadow-lg rounded-lg flex gap-3 items-center p-3 animate-zoomInOut">
            <Image
              src="/assets/icons/event_host.svg"
              alt="Event Host Icon"
              width={50}
              height={50}
              className="rounded-full"
              priority
              sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 50vw"
            />
            <div>
              <h4 className="text-xs text-grey_100 font-normal">Event Host</h4>
              <h4 className="text-sm text-dark_200 font-semibold">Wale Dion</h4>
            </div>
          </div>
        </div>

        {/* Right Features Section */}
        <div className="w-full lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Feature 1 */}
          <div className="bg-white rounded-lg p-4 flex flex-col items-start gap-3">
            <Image
              src="/assets/icons/ticket.svg"
              alt="Effortless Ticketing Icon"
              width={30}
              height={30}
              className="rounded-full"
              priority
              sizes="(max-width: 1024px) 100vw, 30px"
            />
            <h3 className="text-sm font-semibold text-dark_100">
              Effortless Ticketing
            </h3>
            <p className="text-sm text-grey_100">
              Set up your event in minutes and start selling tickets with an
              intuitive platform that handles it all.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-lg p-4 flex flex-col items-start gap-3">
            <Image
              src="/assets/icons/briefcase.svg"
              alt="Smart Event Management Icon"
              width={30}
              height={30}
              className="rounded-full"
              priority
              sizes="(max-width: 1024px) 100vw, 30px"
            />
            <h3 className="text-sm font-semibold text-dark_100">
              Smart Event Management
            </h3>
            <p className="text-sm text-grey_100">
              From registrations to real-time analytics, manage your event like
              a pro with powerful tools.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-lg p-4 flex flex-col items-start gap-3">
            <Image
              src="/assets/icons/money-2.svg"
              alt="Secure Payments Icon"
              width={30}
              height={30}
              className="rounded-full"
              priority
              sizes="(max-width: 1024px) 100vw, 30px"
            />
            <h3 className="text-sm font-semibold text-dark_100">
              Secure Payments
            </h3>
            <p className="text-sm text-grey_100">
              Enjoy safe, seamless transactions with multiple payment options
              for attendees.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white rounded-lg p-4 flex flex-col items-start gap-3">
            <Image
              src="/assets/icons/brush.svg"
              alt="Customizable Branding Icon"
              width={30}
              height={30}
              className="rounded-full"
              priority
              sizes="(max-width: 1024px) 100vw, 30px"
            />
            <h3 className="text-sm font-semibold text-dark_100">
              Customizable Branding
            </h3>
            <p className="text-sm text-grey_100">
              Make your event truly yours with personalized themes, ticket
              designs, and marketing tools.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
