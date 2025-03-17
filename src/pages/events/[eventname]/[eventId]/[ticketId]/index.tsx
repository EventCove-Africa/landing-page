/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use-client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";
import CustomHead from "@/components/CustomHead";
import DescriptionBar from "@/components/DescriptionBar";
import Button from "@/components/FormComponents/Button";
import TextInputField from "@/components/FormComponents/TextInputField";
import {
  _handleThrowErrorMessage,
  calculateTotalAmountForBuyers,
  formatToNaira,
  isObjectEmpty,
  toBoolean,
} from "@/utils";
import ModalPopup from "@/components/ModalPopup";
import InfoModal from "@/pages/components/InfoModal";
import useEventsHook from "@/hooks/useEventsHook";
import EventsDetails from "../components/EventsDetails";
import SkeletonLoaderEventDetails from "@/pages/components/SkeletonLoaderEventDetails";
import { api } from "@/services/apiClients";
import { appUrls } from "@/services/urls";
import toast from "react-hot-toast";

type ReserveTransactionProps = {
  email: string;
  numberOfTickets: number;
  ticketType: string;
  eventId: string;
  ticketTypeId: string;
};

type IntiateTransactionProps = {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  numberOfTickets: number;
  city: string;
  totalAmount: number;
  ticketType: string;
  eventId: string;
  ticketTypeId: string;
  emailValidated: boolean;
  termsAndConditionsAccepted: boolean;
};

export default function TicketId() {
  const router = useRouter();
  const { eventDetails, loadingEventDetails, handleFetchEventsDetails } =
    useEventsHook();
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const { eventId, ticketId } = router.query as any;
  const price = Number(Cookies.get("selectedTicketPrice")) || 0;
  const QTY = Number(Cookies.get("count")) || 0;
  const ticketType = Cookies.get("ticketType") || "";
  const charges: any = Number(Cookies.get("charges") || 0);
  const transferTransactionFeeToBuyer =
    toBoolean(Cookies.get("transferTransactionFeeToBuyer")) || false;
  const calculateTotalAmountForBuyer = calculateTotalAmountForBuyers(
    price,
    QTY,
    charges
  );

  const registerTicketSchema = Yup.object().shape({
    firstName: Yup.mixed().required("Firstname is required"),
    lastName: Yup.mixed().required("Lastname is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    confirm_email: Yup.string()
      .email("Invalid email address")
      .oneOf([Yup.ref("email")], "Email must match")
      .required("Confirm email is required...."),
    location: Yup.mixed().required("Location is required"),
    phoneNumber: Yup.string().required("Phone number is required"),
    termsAndConditionsAccepted: Yup.boolean()
      .oneOf([true], "You must accept the terms and conditions")
      .required("Required"),
  });

  const handleReserveTransaction = async (
    reservePayloadTicket: ReserveTransactionProps,
    initiatePayloadTicket: IntiateTransactionProps,
    actions: FormikHelpers<any>
  ) => {
    try {
      const res = await api.post(
        appUrls.RESERVE_TICKET_URL,
        reservePayloadTicket
      );
      const status_code = [200, 201].includes(res?.status);
      if (status_code) {
        handleInitiateTransaction(initiatePayloadTicket, actions);
      }
    } catch (error: any) {
      const err_message = _handleThrowErrorMessage(error?.data?.message);
      toast.error(err_message);
      actions.setSubmitting(false);
    }
  };

  const handleInitiateTransaction = async (
    payload: ReserveTransactionProps,
    actions: FormikHelpers<any>
  ) => {
    try {
      const res = await api.post(appUrls.INITIATE_TICKET_URL, payload);
      const status_code = [200, 201].includes(res?.status);
      if (status_code) {
        const result = res?.data?.data;
        const url = result?.url;
        if (!url) {
          actions.resetForm();
          setIsOpen(!isOpen);
          setSuccessMessage(result?.message);
        } else {
          window.location.href = url;
        }
      }
    } catch (error: any) {
      const err_message = _handleThrowErrorMessage(error?.data?.message);
      toast.error(err_message);
    } finally {
      actions.setSubmitting(false);
    }
  };

  useEffect(() => {
    let mounted = false;
    (async () => {
      mounted = true;
      if (mounted && eventId) {
        handleFetchEventsDetails(eventId);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [eventId]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <CustomHead title={`EVENTCOVE - ${eventId} - ${ticketId}`} />
      <div className="container padding-spacing w-full h-full">
        <DescriptionBar text="Ticket purchase 🌟" />
        <Formik
          validationSchema={registerTicketSchema}
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            location: "",
            phoneNumber: "",
            confirm_email: "",
            termsAndConditionsAccepted: false,
          }}
          enableReinitialize
          onSubmit={(values, actions) => {
            const totalAmount = transferTransactionFeeToBuyer
              ? calculateTotalAmountForBuyer
              : price * QTY;
            const {
              email,
              firstName,
              lastName,
              phoneNumber,
              location,
              termsAndConditionsAccepted,
            } = values;

            const reservePayloadTicket = {
              email,
              numberOfTickets: QTY,
              ticketType,
              eventId,
              ticketTypeId: ticketId,
            };
            const initiatePayloadTicket = {
              email,
              firstName,
              lastName,
              phoneNumber,
              numberOfTickets: QTY,
              city: location,
              totalAmount,
              ticketType,
              eventId,
              ticketTypeId: ticketId,
              emailValidated: true,
              termsAndConditionsAccepted: termsAndConditionsAccepted,
            };

            handleReserveTransaction(
              reservePayloadTicket,
              initiatePayloadTicket,
              actions
            );
          }}
        >
          {({
            handleSubmit,
            handleChange,
            values,
            touched,
            errors,
            isSubmitting,
          }) => {
            return (
              <Form
                onSubmit={handleSubmit}
                className="w-full flex lg:flex-row flex-col gap-6"
              >
                <div className="bg-white rounded-xl lg:w-[40%] w-full p-4 h-fit">
                  <div className="mb-2">
                    <TextInputField
                      labelName="Firstname"
                      name="firstName"
                      handleChange={handleChange}
                      type="text"
                      placeholder=""
                      value={values.firstName}
                      errors={errors?.firstName}
                      touched={touched?.firstName}
                    />
                  </div>
                  <div className="mb-2">
                    <TextInputField
                      labelName="Lastname"
                      name="lastName"
                      handleChange={handleChange}
                      type="text"
                      placeholder=""
                      value={values.lastName}
                      errors={errors?.lastName}
                      touched={touched?.lastName}
                    />
                  </div>
                  <div className="mb-2">
                    <TextInputField
                      labelName="Email"
                      name="email"
                      handleChange={handleChange}
                      type="text"
                      placeholder=""
                      value={values.email}
                      errors={errors?.email}
                      touched={touched?.email}
                    />
                  </div>
                  <div className="mb-2">
                    <TextInputField
                      labelName="Confirm email"
                      name="confirm_email"
                      handleChange={handleChange}
                      type="email"
                      placeholder=""
                      value={values.confirm_email}
                      errors={errors?.confirm_email}
                      touched={touched?.confirm_email}
                    />
                  </div>
                  <div className="mb-2">
                    <TextInputField
                      labelName="Location"
                      name="location"
                      handleChange={handleChange}
                      type="text"
                      placeholder=""
                      value={values.location}
                      errors={errors?.location}
                      touched={touched?.location}
                    />
                  </div>
                  <div className="mb-2">
                    <TextInputField
                      labelName="Phone number"
                      name="phoneNumber"
                      handleChange={handleChange}
                      type="tel"
                      placeholder=""
                      value={values.phoneNumber}
                      errors={errors?.phoneNumber}
                      touched={touched?.phoneNumber}
                    />
                  </div>
                </div>
                <div className="bg-white lg:w-[60%] w-full h-full rounded-xl px-4 py-6">
                  <SkeletonLoaderEventDetails
                    isLoading={loadingEventDetails?.details}
                  />
                  {!loadingEventDetails?.details &&
                    !isObjectEmpty(eventDetails) && (
                      <EventsDetails
                        eventDetails={eventDetails}
                        showDescription={false}
                      />
                    )}
                  <div className="w-full mt-4 flex flex-col gap-4">
                    <div className="border-b border-grey_100 pb-2 flex justify-between items-center">
                      <h3 className="text-grey_100 md:text-sm text-xs font-semibold">
                        Total Ticket
                      </h3>
                      {isClient && (
                        <h5 className="text-dark_200 md:text-sm text-xs font-semibold">
                          {" "}
                          {QTY} X {formatToNaira(price || 0)} ({ticketType})
                        </h5>
                      )}
                    </div>
                    <div className="border-b border-grey_100 pb-2 flex justify-between items-center">
                      <h3 className="text-grey_100 md:text-sm text-xs font-semibold">
                        Total Amount
                      </h3>
                      {isClient && (
                        <h5 className="text-dark_200 md:text-sm text-xs font-semibold">
                          {formatToNaira(price * QTY)}
                        </h5>
                      )}
                    </div>
                    {isClient && transferTransactionFeeToBuyer && (
                      <div className="border-b border-grey_100 pb-2 flex justify-between items-center">
                        <h3 className="text-grey_100 md:text-sm text-xs font-semibold">
                          Total Charge
                        </h3>
                        {isClient && (
                          <h5 className="text-dark_200 md:text-sm text-xs font-semibold">
                            {formatToNaira(price * charges + 100)} X {QTY}
                          </h5>
                        )}
                      </div>
                    )}

                    <div className="border-b border-grey_100 pb-2 flex justify-between items-center">
                      <h3 className="text-grey_100 md:text-sm text-xs font-semibold">
                        Total Payment
                      </h3>
                      {isClient && (
                        <h5 className="text-dark_200 md:text-sm text-xs font-semibold">
                          {!transferTransactionFeeToBuyer ? (
                            <>{formatToNaira(price * QTY)}</>
                          ) : (
                            <>{formatToNaira(calculateTotalAmountForBuyer)}</>
                          )}
                        </h5>
                      )}
                    </div>
                  </div>
                  <div className="w-full flex lg:items-center items-start md:gap-3 gap-2 mt-4">
                    <input
                      type="checkbox"
                      name="termsAndConditionsAccepted"
                      onChange={handleChange}
                      checked={values.termsAndConditionsAccepted}
                      className="h-[16px] w-[16px] accent-primary_100"
                    />
                    <h4 className="text-dark_200 md:text-sm text-xs font-normal">
                      By checking this box, you agree that the information you
                      provided is correct and valid
                    </h4>
                  </div>
                  <div>
                    {isClient && (
                      <Button
                        title={`${price ? "Proceed to Payment" : "Proceed"}`}
                        className="h-[40px] text-center my-6 border border-dark_200"
                        type="submit"
                        isLoading={isSubmitting}
                      />
                    )}
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
      <ModalPopup isOpen={isOpen} closeModal={() => setIsOpen(!isOpen)}>
        <InfoModal
          info={successMessage}
          closeModal={() => setIsOpen(!isOpen)}
        />
      </ModalPopup>
    </>
  );
}
