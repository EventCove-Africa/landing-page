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
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 mt-4">
          {loadingEventDetails?.tickets && (
            <SkeletonLoader count={3} className="h-[100px]" />
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
                          charges,
                          transferTransactionFeeToBuyer,
                          salesEndDate,
                          colour,
                          classification,
                          notAllowedToSelect,
                        })
                      }
                      className={`bg-grey_500 ${
                        selectedTicket?.ticketId === ticketId
                          ? "border border-primary_100"
                          : "border border-grey_700"
                      } ${
                        notAllowedToSelect
                          ? "cursor-not-allowed"
                          : "cursor-pointer border hover:border-primary_100"
                      } rounded-md p-2 flex flex-col justify-between`}
                    >
                      <div className="flex gap-2 items-center">
                        <div className="rounded-full bg-[#EEEEFF] p-3 flex justify-center items-center">
                          <FaChalkboardTeacher className="lg:w-[20px] lg:h-[20px] w-[10px] h-[10px] text-blue_400" />
                        </div>
                        <div className="flex flex-col gap-1">
                          <h3 className="text-grey_100 lg:text-xs text-sm font-normal">
                            {ticketType}
                          </h3>
                          <h5 className="text-dark_200 font-normal lg:text-base text-sm">
                            {price ? formatToNaira(price) : "Free"}
                          </h5>
                        </div>
                      </div>
                      {notAllowedToSelect && (
                        <span className="w-full flex justify-end self-end text-primary_100 text-xs font-semibold">
                          Sold Out
                        </span>
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
