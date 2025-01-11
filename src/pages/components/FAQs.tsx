import React from "react";

export default function FAQs() {
  return (
    <section
      className="container padding-spacing w-full flex lg:flex-row flex-col lg:justify-between justify-around lg:gap-20 md:gap-10 gap-6 h-full py-16"
      aria-labelledby="faq-section-title"
    >
      <div className="w-full">
        <h1
          id="faq-section-title"
          className="text-dark_200 font-medium lg:text-6xl md:text-4xl text-2xl"
        >
          Got Questions? We{"'"}ve Got Answers
        </h1>
      </div>
      <div className="w-full flex flex-col gap-3">
        <div
          className="w-full flex gap-3 border-b border-grey_100 pb-8"
          role="region"
          aria-labelledby="faq1-title"
        >
          <h2
            id="faq1-title"
            className="text-dark_100 font-medium md:text-4xl text-xl"
          >
            1.
          </h2>
          <div className="flex flex-col gap-3">
            <h3 className="text-dark_200 font-medium text-xl">
              How do I create my first event?
            </h3>
            <p className="text-grey_100 text-base font-normal">
              To create an event, click the Create Event button and provide the
              requested details.
            </p>
          </div>
        </div>
        <div
          className="w-full flex gap-3 border-b border-grey_100 pb-8"
          role="region"
          aria-labelledby="faq2-title"
        >
          <h2
            id="faq2-title"
            className="text-dark_100 font-medium md:text-4xl text-xl"
          >
            2.
          </h2>
          <div className="flex flex-col gap-3">
            <h3 className="text-dark_200 font-medium text-xl">
              What payment options are available?
            </h3>
            <p className="text-grey_100 text-base font-normal">
              Available payment options include card, transfer, USSD, and other
              convenient methods.
            </p>
          </div>
        </div>
        <div
          className="w-full flex gap-3 border-b border-grey_100 pb-8"
          role="region"
          aria-labelledby="faq3-title"
        >
          <h2
            id="faq3-title"
            className="text-dark_100 font-medium md:text-4xl text-xl"
          >
            3.
          </h2>
          <div className="flex flex-col gap-3">
            <h3 className="text-dark_200 font-medium text-xl">
              Can I customize my ticket designs?
            </h3>
            <p className="text-grey_100 text-base font-normal">
              At the moment, you cannot customize the design for email. However,
              your event details will be displayed in the ticket email sent to
              attendees
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
