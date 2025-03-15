import dynamic from "next/dynamic";
import CustomHead from "@/components/CustomHead";
import { _handleClearCookiesAndSession } from "@/utils";
import { useEffect } from "react";

const Hero = dynamic(() => import("./components/Hero"), { ssr: false });
const Offer = dynamic(() => import("./components/Offer"), { ssr: false });
const LandingPageEvents = dynamic(
  () => import("./components/LandingPageEvents"),
  { ssr: false }
);
const WhyChooseUs = dynamic(() => import("./components/WhyChooseUs"), {
  ssr: false,
});
const Testimonial = dynamic(() => import("./components/Testimonial"), {
  ssr: false,
});
const FAQs = dynamic(() => import("./components/FAQs"), { ssr: false });

export default function Home() {

  
  useEffect(() => {
    let mounted = false;
    (async () => {
      mounted = true;
      if (mounted) {
        _handleClearCookiesAndSession("selectedTicketPrice", "count", 'ticketType' );
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <CustomHead />
      <div className="scroll-smooth">
        <div className="w-full h-auto">
          <Hero />
        </div>
        <div className="w-full h-full">
          <Offer />
        </div>
        <div className="w-full h-full">
          <LandingPageEvents
            title="Upcoming  Events"
            status="upcoming"
            showViewAll
            endingIndex={4}
          />
        </div>
        <div className="w-full h-full">
          <WhyChooseUs />
        </div>
        <div className="w-full h-full">
          <Testimonial />
        </div>
        <div className="w-full h-full">
          <FAQs />
        </div>
      </div>
    </>
  );
}
