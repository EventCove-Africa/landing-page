// components/CustomHead.tsx
import Head from "next/head";

interface CustomHeadProps {
  title?: string;
  icon?: string;
  description?: string;
  slug?: string;
  image?: string;
}

const CustomHead: React.FC<CustomHeadProps> = ({
  title = "EVENTCOVE",
  icon = "/favicon.svg",
  description = "Discover and book tickets for top events in Nigeria. From concerts in Lagos to conferences in Abuja, Eventcove makes event ticketing fast, easy, and secure.",
  slug,
  image,
}) => {
  const favicon = image ?? "/favicon.svg";
  const url = `https://www.eventcove.africa/events/${slug ?? ""}`;
  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href={icon} />
      <meta name="description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={favicon} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={favicon} />
    </Head>
  );
};

export default CustomHead;
