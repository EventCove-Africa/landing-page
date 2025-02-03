/* eslint-disable @typescript-eslint/no-explicit-any */
import dynamic from "next/dynamic";
import { useState, useRef, useEffect } from "react";
import { CiCalendar } from "react-icons/ci";

// Correctly typing DatePicker component to avoid type errors
const DatePicker = dynamic(
  () => import("react-datepicker").then((mod) => mod.default),
  {
    ssr: false,
  }
) as React.ComponentType<any>;

const DatePickerComponent = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const datePickerRef = useRef<HTMLDivElement | null>(null);

  // Close the DatePicker if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={datePickerRef}
      className="relative w-full pl-2 border-r border-grey_100"
    >
      {/* Trigger to open DatePicker */}
      <div
        className="w-full flex items-center gap-1 text-grey_100 text-sm cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <CiCalendar className="text-grey_100 w-[16px] h-[16px]" />
        {selectedDate ? selectedDate.toLocaleDateString() : "Date"}
      </div>
      {/* DatePicker */}
      {isOpen && (
        <div className="absolute top-10 left-0 z-50">
          <DatePicker
            selected={selectedDate}
            onChange={(date: Date | null) => {
              setSelectedDate(date);
              setIsOpen(false);
            }}
            inline
          />
        </div>
      )}
    </div>
  );
};

export default DatePickerComponent;
