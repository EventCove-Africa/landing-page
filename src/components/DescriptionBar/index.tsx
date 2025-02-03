import { useRouter } from "next/router";
import { FaArrowLeft } from "react-icons/fa6";

interface DescriptionBarProps {
  text: string;
}

export default function DescriptionBar({ text }: DescriptionBarProps) {
  const router = useRouter();
  return (
    <>
      <h3 className="text-dark_200 md:text-base text-sm font-normal flex gap-1 md:items-center items-start mb-2">
        <FaArrowLeft
          onClick={() => router.back()}
          className="cursor-pointer text-dark_200 w-[16px] h-[16px]"
        />
        {text}
      </h3>
    </>
  );
}
