import Head from "next/head";
import dynamic from "next/dynamic";

const Header = dynamic(() => import("../layouts/components/Header"), {
  ssr: false,
});
const Hero = dynamic(() => import("./components/Hero"), { ssr: false });
const Offer = dynamic(() => import("./components/Offer"), { ssr: false });

export default function Home() {
  return (
    <>
      <Head>
        <title>EVENTCOVE</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <div className="scroll-smooth">
        <div className="sticky top-0 w-full max-w-full flex items-center h-[75px] z-50 bg-white">
          <Header />
        </div>
        <div className="w-full min-h-screen-minus-75 h-full">
          <Hero />
        </div>
        <div className="w-full min-h-screen h-full">
          <Offer />
        </div>
      </div>
    </>
  );
}
