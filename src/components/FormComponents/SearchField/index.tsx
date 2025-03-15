/* eslint-disable @typescript-eslint/no-explicit-any */
import { EventsPageSearchQueryProps } from "@/pages/events";
import { useState } from "react";
import { IoIosSearch } from "react-icons/io";

const SearchField = ({ setQueryParams }: EventsPageSearchQueryProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setQueryParams((prev: any) => ({ ...prev, eventName: e.target.value }));
  };

  return (
    <div className="pl-2 w-full flex items-center gap-1 text-grey_100 text-sm">
      <IoIosSearch className="text-grey_100 w-[16px] h-[16px]" />
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search by event name"
        className="w-full text-grey_100 placeholder-grey_100 focus:outline-none"
      />
    </div>
  );
};

export default SearchField;
