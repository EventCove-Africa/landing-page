import Head from "next/head";
import dynamic from "next/dynamic";

const Header = dynamic(() => import("../layouts/components/Header"), {
  ssr: false,
});
const Footer = dynamic(() => import("../layouts/components/Footer"), {
  ssr: false,
});
const Hero = dynamic(() => import("./components/Hero"), { ssr: false });
const Offer = dynamic(() => import("./components/Offer"), { ssr: false });
const WhyChooseUs = dynamic(() => import("./components/WhyChooseUs"), { ssr: false });
const Testimonial = dynamic(() => import("./components/Testimonial"), { ssr: false });
const FAQs = dynamic(() => import("./components/FAQs"), { ssr: false });

export default function Home() {
  return (
    <>
      <Head>
        <title>EVENTCOVE</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <div className="scroll-smooth">
        <div className="sticky top-0 w-full flex items-center h-[75px] z-50 bg-white">
          <Header />
        </div>
        <div className="w-full h-auto">
          <Hero />
        </div> 
        <div className="w-full h-full">
          <Offer />
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
        <div className="w-full h-full bg-white">
          <Footer />
        </div>
      </div>
    </>
  );
}
