/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FiMinus } from "react-icons/fi";
import { formatToNaira, isObjectEmpty, setDataINCookies } from "@/utils";
import { FaPlus } from "react-icons/fa6";
import Button from "@/components/FormComponents/Button";
import SkeletonLoader from "@/components/SkeletonLoader";
import { ticketDetailsProps } from "@/hooks/useEventsHook";
import Image from "next/image";

type TicketsDetailsProps = {
  eventId: string;
  loadingEventDetails: any;
  allEventTickets: any;
  eventDetails: any;
  isSlug?: boolean;
};

export default function TicketsDetails({
  // eventId,
  allEventTickets,
  loadingEventDetails,
  eventDetails,
}: // isSlug = false,
TicketsDetailsProps) {
  const router = useRouter();
  const [count, setCount] = useState(1);
  const [maxCapacity, setMaxCapacity] = useState(5);
  const [selectedTicket, setSelectedTicket] = useState<any>({});
  const [expandedPerks, setExpandedPerks] = useState<Record<string, boolean>>(
    {}
  );
  const togglePerks = (ticketId: string) =>
    setExpandedPerks((p) => ({ ...p, [ticketId]: !p[ticketId] }));
  const isNotGroup = selectedTicket?.classification?.toLowerCase() !== "group";
  const isSelectedTicketEmpty = !isObjectEmpty(selectedTicket);
  const selectedTicketPrice = selectedTicket?.price;
  const charges = selectedTicket?.charges;
  const transferTransactionFeeToBuyer =
    selectedTicket?.transferTransactionFeeToBuyer;
  const ticketType = selectedTicket?.ticketType;

  const increment = () => setCount((prev) => Math.min(maxCapacity, prev + 1));
  const decrement = () => setCount((prev) => Math.max(1, prev - 1));

  const handleSelectedTicketAction = ({
    perks,
    price,
    ticketId,
    ticketType,
    validatedCount,
    soldCount,
    capacity,
    salesEndDate,
    charges,
    chargeAmount,
    transferTransactionFeeToBuyer,
    colour,
    classification,
    notAllowedToSelect,
  }: any) => {
    if (notAllowedToSelect) return null;
    if (capacity < 5) {
      setMaxCapacity(capacity);
    }
    setSelectedTicket({
      perks,
      price,
      ticketId,
      ticketType,
      validatedCount,
      soldCount,
      charges,
      transferTransactionFeeToBuyer,
      capacity,
      chargeAmount,
      salesEndDate,
      colour,
      classification,
    });
  };

  useEffect(() => {
    let mounted = false;
    (async () => {
      mounted = true;
      if (mounted && !isNotGroup) {
        setCount(1);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [isNotGroup]);

  return (
    <>
      <div className="bg-white w-full rounded-xl h-fit p-3">
        <h3 className="text-sm font-bold text-dark_200">Select a Ticket</h3>
        <div className="grid md:grid-cols-2 grid-cols-1 md:gap-3 gap-6 mt-4">
          {loadingEventDetails?.tickets && (
            <SkeletonLoader count={2} className="h-[100px]" />
          )}
          {!loadingEventDetails?.tickets && Array.isArray(allEventTickets)
            ? allEventTickets?.map(
                ({
                  ticketType,
                  colour,
                  classification,
                  ticketId,
                  perks,
                  price,
                  charges,
                  transferTransactionFeeToBuyer,
                  validatedCount,
                  soldCount,
                  capacity,
                  chargeAmount,
                  salesEndDate,
                }: ticketDetailsProps) => {
                  const notAllowedToSelect = soldCount >= capacity;
                  return (
                    <div
                      key={ticketId}
                      onClick={() =>
                        handleSelectedTicketAction({
                          perks,
                          price,
                          ticketId,
                          ticketType,
                          validatedCount,
                          soldCount,
                          capacity,
                          chargeAmount,
                          charges,
                          transferTransactionFeeToBuyer,
                          salesEndDate,
                          colour,
                          classification,
                          notAllowedToSelect,
                        })
                      }
                      className={`bg-grey_300 h-fit ${
                        selectedTicket?.ticketId === ticketId
                          ? "border border-primary_100"
                          : "border border-grey_1100"
                      } ${
                        notAllowedToSelect
                          ? "cursor-not-allowed"
                          : "cursor-pointer border hover:border-primary_400"
                      } rounded-md p-2 flex flex-col justify-between`}
                    >
                      {classification.toLowerCase() === "group" && (
                        <span className="text-white w-fit mb-5 bg-green_500 text-xs font-semibold p-1 rounded">
                          Group ticket
                        </span>
                      )}
                      <div className="flex gap-2 items-center">
                        <div className="rounded-full bg-[#EEEEFF] p-3 flex justify-center items-center">
                          <FaChalkboardTeacher className="lg:w-[20px] lg:h-[20px] w-[10px] h-[10px] text-blue_400" />
                        </div>
                        <div className="flex flex-col gap-1">
                          <h3 className="text-dark_200 text-sm font-semibold">
                            {ticketType}
                            <span className="text-grey_100 text-xs text-inherit font-normal">
                              {!price
                                ? null
                                : `: includes (${formatToNaira(
                                    chargeAmount
                                  )}) fee`}
                            </span>
                          </h3>
                          <h5 className="text-dark_200 font-normal lg:text-base text-sm">
                            {price
                              ? formatToNaira(price + chargeAmount)
                              : "Free"}
                          </h5>
                        </div>
                      </div>
                      {perks ? (
                        <div className="bg-white flex gap-1 items-start rounded-md h-fit text-dark_200 text-xs font-normal p-4 mt-5">
                          <Image
                            src="/assets/icons/perks-info.svg"
                            alt="Info icon"
                            width={16}
                            height={16}
                            priority
                          />
                          <div className="mb-1">
                            {formatToNaira(price)} -{" "}
                            {(() => {
                              const text =
                                (typeof perks === "string" && perks?.trim()) ||
                                "";
                              const isLong = text?.length > 80;
                              const isExpanded = !!expandedPerks[ticketId];
                              if (!isLong) return text;
                              return (
                                <>
                                  {isExpanded
                                    ? text
                                    : `${text?.slice(0, 80)}...`}
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      togglePerks(ticketId);
                                    }}
                                    aria-expanded={isExpanded}
                                    className="ml-2 text-primary_100 text-[10px] font-semibold"
                                  >
                                    {isExpanded ? "See less" : "See more"}
                                  </button>
                                </>
                              );
                            })()}
                          </div>
                        </div>
                      ) : null}
                      {notAllowedToSelect && (
                        <div className="w-full flex justify-end items-center mt-5">
                          <span className="text-grey_1200 bg-grey_1100 p-1 rounded text-xs self-end font-bold">
                            Sold Out
                          </span>
                        </div>
                      )}
                    </div>
                  );
                }
              )
            : null}
        </div>
        <div className="flex flex-col gap-3 mt-5">
          {isSelectedTicketEmpty && isNotGroup && (
            <>
              <h4 className="text-grey_100 text-sm font-normal">Quantity</h4>
              <div className="flex items-center gap-3">
                <div
                  onClick={decrement}
                  className="bg-grey_1000 rounded-full cursor-pointer p-3"
                >
                  <FiMinus className="text-grey_100 text-xs font-semibold" />
                </div>
                <span className="text-dark_200 font-semibold text-sm">
                  {count}
                </span>
                <div
                  onClick={increment}
                  className="bg-grey_1000 rounded-full cursor-pointer p-3"
                >
                  <FaPlus className="text-grey_100 text-xs font-semibold" />
                </div>
              </div>
            </>
          )}
          {isSelectedTicketEmpty && (
            <Button
              onClick={() => {
                setDataINCookies({
                  selectedTicketPrice,
                  count,
                  ticketType,
                  charges,
                  transferTransactionFeeToBuyer,
                });
                router.push(
                  `/events/${eventDetails?.eventName.replaceAll(" ", "-")}/${
                    eventDetails?.eventId
                  }/${selectedTicket?.ticketId}`
                );
              }}
              title="Get Ticket"
              type="button"
              className="md:w-fit w-full px-6 py-2"
            />
          )}
        </div>
      </div>
    </>
  );
}
