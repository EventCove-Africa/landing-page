import { openNewTabWithUrl } from "@/utils";
import Image from "next/image";

const vendorImages = [
  {
    id: 1,

    alt: "DJ performing",
  },
  {
    id: 2,
    alt: "Catering service",
  },
  {
    id: 3,
    alt: "Event host",
  },
  {
    id: 4,
    alt: "Singer performing",
  },
];

const steps = [
  {
    title: "Fill the form",
    description:
      "Takes about 5 minutes. Tell us about your services and coverage area.",
  },
  {
    title: "Get reviewed",
    description: "Our team reviews your application within 48 hours.",
  },
  {
    title: "Go live",
    description:
      "Your profile goes live and organisers can start finding and booking you.",
  },
];

export default function VendorCTASection() {
  return (
    <section className="w-full container padding-spacing">
      <div className="flex flex-col gap-6 px-2 lg:flex-row lg:items-center">
        {/* LEFT SECTION */}
        <div className="w-full lg:w-1/2">
          {/* MOBILE CAROUSEL */}
          <div className="scrollbar-hide flex gap-4 overflow-x-auto pb-2 lg:hidden">
            {vendorImages.map((item) => (
              <div
                key={item.id}
                className="relative h-[320px] min-w-[260px] overflow-hidden rounded-[28px]"
              >
                <Image
                  src={`/assets/images/vendor_${item.id}.png`}
                  alt={item.alt}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          {/* DESKTOP GRID */}
          <div className="hidden grid-cols-2 gap-4 lg:grid">
            {vendorImages.map((item) => (
              <div
                key={item.id}
                className="relative h-[280px] overflow-hidden rounded-[28px]"
              >
                <Image
                  src={`/assets/images/vendor_${item.id}.png`}
                  alt={item.alt}
                  fill
                  className="object-cover transition duration-300 hover:scale-150"
                />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="w-full lg:w-1/2">
          <span className="inline-flex rounded-full border border-[#F3EBF0] bg-[#FAF5F8] px-4 py-2 text-sm font-medium text-primary_100">
            Call for vendors
          </span>

          <h2 className="mt-5 text-3xl font-medium leading-tight text-dark_200 md:text-4xl">
            Get Found. Get Booked.
            <br />
            Grow Your <span className="text-primary_100">Business.</span>
          </h2>

          <p className="mt-5 max-w-xl text-base leading-7 text-grey_100 md:text-base">
            Your work is too good to be a secret. EventCove puts you in the room
            with people actively searching for vendors like you.
          </p>

          <div className="mt-4">
            <h3 className="text-base font-semibold text-[#b10f6f]">
              How it works
            </h3>

            <div className="mt-5 grid gap-2 md:grid-cols-3">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-[#F3EBF0] bg-white p-3"
                >
                  <h4 className="text-base font-semibold text-dark_200">
                    {step.title}
                  </h4>

                  <p className="mt-3 text-sm leading-5 text-grey_100">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() =>
              openNewTabWithUrl(
                "https://docs.google.com/forms/d/e/1FAIpQLScNQvjxZW6VFguGzT-_iWGMf_-Jbl4HtVhsn7sm3OF3RO9Z1Q/viewform?usp=publish-editor",
              )
            }
            className="mt-4 rounded-2xl bg-primary_100 px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Join As A Vendor
          </button>
        </div>
      </div>
    </section>
  );
}
