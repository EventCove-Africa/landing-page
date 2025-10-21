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
  description,
  slug,
  image,
}) => {
  const titleName = title ? `${title}` : "EventCove";
  const descriptionName = description ?? "Event details and tickets.";
  const favicon = image ?? "/favicon.svg";
  const url = `https://www.eventcove.africa/events/${slug ?? ""}`;
  return (
    <Head>
      <title>{titleName}</title>
      <link rel="icon" href={icon} />
      <meta name="description" content={descriptionName} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={titleName ?? "EventCove"} />
      <meta property="og:description" content={descriptionName} />
      <meta property="og:image" content={favicon} />
      <meta name="twitter:title" content={titleName ?? "EventCove"} />
      <meta name="twitter:description" content={descriptionName} />
      <meta name="twitter:image" content={favicon} />
    </Head>
  );
};

export default CustomHead;
