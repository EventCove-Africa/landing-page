import React, { useState } from "react";

const faqs = [
  {
    id: "faq1",
    question: "How do I create my first event?",
    answer:
      "To create an event, click the Create Event button and provide the requested details.",
  },
  {
    id: "faq2",
    question: "What payment options are available?",
    answer:
      "Available payment options include card, transfer, USSD, and other convenient methods.",
  },
  {
    id: "faq3",
    question: "Can I customize my ticket designs?",
    answer:
      "At the moment, you cannot customize the design for email. However, your event details will be displayed in the ticket email sent to attendees.",
  },
  {
    id: "faq4",
    question: "Can I make money with EventCove?",
    answer:
      "Yes! Share your referral link. When they sign up and create their first paid event, you will get a commission off the profits from the event",
  },
];

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      className="container md:py-16 py-8 w-full flex flex-col lg:flex-row lg:justify-between gap-10 px-3"
      aria-labelledby="faq-section-title"
      id="faqs"
    >
      <div className="lg:w-[40%] w-full">
        <h1
          id="faq-section-title"
          className="text-dark_200 font-medium text-2xl md:text-5xl"
        >
          Got Questions? We&apos;ve Got Answers
        </h1>
      </div>
      <div className="lg:w-[60%] w-full flex flex-col gap-6">
        {faqs.map(({ id, question, answer }, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={id} className="w-full border-b border-grey_100 pb-4">
              <button
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center w-full text-left text-dark_200 font-medium text-xl"
                aria-expanded={isOpen}
                aria-controls={`${id}-content`}
              >
                <span className="text-dark_100 font-medium md:text-2xl text-xl">
                  {index + 1}. {question}
                </span>
                <span
                  className={`transform transition-transform duration-300 ${
                    isOpen ? "rotate-180" : "rotate-0"
                  }`}
                >
                  ▼
                </span>
              </button>
              <div
                id={`${id}-content`}
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-grey_100 text-base mt-3">{answer}</p>
              </div>
            </div>
          );
        })}
      </div>
      {/* SEO Optimization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map(({ question, answer }) => ({
              "@type": "Question",
              name: question,
              acceptedAnswer: { "@type": "Answer", text: answer },
            })),
          }),
        }}
      />
    </section>
  );
}
