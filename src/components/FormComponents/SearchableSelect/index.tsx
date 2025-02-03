import React, { useState, useRef, useEffect } from "react";
import { CiLocationArrow1 } from "react-icons/ci"; // Assuming you have this icon installed

const SearchableSelect = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  // Ref to handle clicks outside of the dropdown
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Sample list of cities
  const cities = [
    "Abuja",
    "Lagos",
    "Kano",
    "Port Harcourt",
    "Ibadan",
    "Benin City",
    "Maiduguri",
    "Kaduna",
    "Zaria",
    "Aba",
    "Jos",
    "Ilorin",
    "Oyo",
    "Enugu",
    "Onitsha",
    "Warri",
    "Uyo",
    "Asaba",
    "Sokoto",
    "Abeokuta",
    "Yola",
    "Abakaliki",
    "Makurdi",
    "Katsina",
    "Calabar",
    "Lafia",
    "Gombe",
    "Minna",
    "Damaturu",
    "Keffi",
    "Ekiti",
    "Ilesa",
    "Akure",
    "Ogun",
    "Nsukka",
    "Nnewi",
    "Owerri",
    "Shagamu",
    "Orlu",
    "Kano",
    "Suleja",
    "Ogun State",
    "Kogi",
    "Ekiti State",
    "Mubi",
    "Bauchi",
    "Bida",
    "Uromi",
    "Kabba",
    "Jalingo",
    "Lagos Island",
    "Lekki",
    "Festac Town",
    "Victoria Island",
    "Surulere",
    "Ikeja",
    "Apapa",
    "Mushin",
    "Ikorodu",
    "Badagry",
  ];

  // Filter cities based on search query
  const filteredCities = cities.filter((city) =>
    city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Hide dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDivClick = () => {
    setIsDropdownVisible(!isDropdownVisible); // Toggle dropdown visibility
  };

  return (
    <div className="relative w-full">
      <div
        className="border-r border-grey_100 w-full flex items-center gap-1 text-grey_100 text-sm cursor-pointer"
        onClick={handleDivClick}
      >
        <CiLocationArrow1 className="text-grey_100 w-[16px] h-[16px]" />
        {selectedCity ? selectedCity : "City"}
      </div>

      {/* Only show the input and dropdown when the user clicks the div */}
      {isDropdownVisible && (
        <div className="absolute left-0 w-full bg-white shadow mt-1 max-h-60 overflow-y-auto z-10 px-4 py-2">
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="rounded-lg p-2 w-full border outline-none"
          />

          <div ref={dropdownRef} className="max-h-60 overflow-y-auto">
            {searchQuery && (
              <ul className="max-h-60 overflow-y-auto">
                {filteredCities.map((city) => (
                  <li
                    key={city}
                    className="p-2 cursor-pointer hover:bg-primary_100 hover:text-white"
                    onClick={() => {
                      setSelectedCity(city);
                      setIsDropdownVisible(false); // Close dropdown after selection
                    }}
                  >
                    {city}
                  </li>
                ))}
                {filteredCities.length === 0 && (
                  <li className="p-2 text-gray-500">No cities found</li>
                )}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchableSelect;
