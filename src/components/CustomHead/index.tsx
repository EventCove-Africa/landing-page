// components/CustomHead.tsx
import Head from "next/head";

interface CustomHeadProps {
  title?: string;
  icon?: string;
}

const CustomHead: React.FC<CustomHeadProps> = ({
  title = "EVENTCOVE",
  icon = "/favicon.svg",
}) => {
  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href={icon} />
    </Head>
  );
};

export default CustomHead;
