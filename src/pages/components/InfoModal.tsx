import Button from "@/components/FormComponents/Button";
import { useRouter } from "next/router";
import React from "react";
// import { IoIosCloseCircle } from "react-icons/io";
import { LuBadgeCheck } from "react-icons/lu";

type InfoModalProps = {
  closeModal: () => void;
};

export default function InfoModal({ closeModal }: InfoModalProps) {
  const router = useRouter();
  return (
    <div className="md:w-[458px] w-full h-auto bg-white rounded-xl px-3 py-4">
      {/* <div className="w-full flex justify-end">
        <IoIosCloseCircle className="w-[24px] h-[24px] cursor-pointer" />
      </div> */}
      <div className="w-full flex justify-center">
        <LuBadgeCheck className="w-[87px] h-[87px] text-green_200" />
      </div>
      <div className="w-full flex justify-center">
        <p className="text-dark_200 md:text-base text-sm font-normal text-center">
          Congratulations! Your purchase was successful. Check your email for
          your receipt.
        </p>
      </div>
      <Button
        title="View more Events"
        className="w-full h-[40px] text-center mt-3 border border-dark_200"
        type="button"
        onClick={() => {
          closeModal();
          router.push("/events");
        }}
      />
    </div>
  );
}
