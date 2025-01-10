import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Head>
        <title>EVENTCOVE</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <div
        className={`grid items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
      >
        <Image
          src="/assets/icons/logo.svg"
          alt="logo"
          width={0}
          height={0}
          unoptimized
          className="w-full h-full rounded-3xl"
          style={{ height: "38px", width: "155px" }}
          priority
        />
      </div>
    </>
  );
}
