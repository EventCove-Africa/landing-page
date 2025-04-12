import { useState } from "react";
import ModalPopup from "@/components/ModalPopup";
import Image from "next/image";
import { IoMdCloseCircle } from "react-icons/io";

export const useContactSupport = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenClose = () => setIsOpen((prev) => !prev);

  return {
    handleOpenClose,
    ModalComponent: isOpen && (
      <ModalPopup isOpen={isOpen} closeModal={handleOpenClose}>
        <div className="bg-white h-auto md:w-[458px] w-full rounded-xl p-3">
          <div className="flex justify-end">
            <IoMdCloseCircle
              className="cursor-pointer w-[20px] h-[20px]"
              onClick={handleOpenClose}
            />
          </div>
          <div className="flex justify-center">
            <Image
              src="/assets/icons/info.svg"
              alt="info"
              width={70}
              height={70}
              // className="w-[70px] h-[70px]"
              priority
            />
          </div>
          <h4 className="text-dark_200 text-base font-semibold text-center my-4">
            Please contact our support team on support@eventcove.africa
          </h4>
        </div>
      </ModalPopup>
    ),
  };
};
