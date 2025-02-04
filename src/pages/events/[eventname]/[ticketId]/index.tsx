import CustomHead from "@/components/CustomHead";
import DescriptionBar from "@/components/DescriptionBar";
import Button from "@/components/FormComponents/Button";
import TextInputField from "@/components/FormComponents/TextInputField";
import { formatToNaira } from "@/utils";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { CiLocationOn, CiUser } from "react-icons/ci";
import { IoTimeOutline } from "react-icons/io5";
import { LuCalendarDays } from "react-icons/lu";
import ModalPopup from "@/components/ModalPopup";
import InfoModal from "@/pages/components/InfoModal";

export default function TicketId() {
  const router = useRouter();
  const { eventname, ticketId } = router.query;
  const [isOpen, setIsOpen] = useState(false);

  const registerTicketSchema = Yup.object().shape({
    name: Yup.mixed().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    confirm_email: Yup.string()
      .email("Invalid email address")
      .oneOf([Yup.ref("email")], "Email must match")
      .required("Confirm email is required...."),
    location: Yup.mixed().required("Location is required"),
    phone_number: Yup.string().required("Phone number is required"),
    agreement: Yup.boolean()
      .oneOf([true], "You must accept the terms and conditions")
      .required("Required"),
  });

  return (
    <>
      <CustomHead title={`EVENTCOVE - ${eventname} - ${ticketId}`} />
      <div className="container padding-spacing w-full h-full">
        <DescriptionBar text="Get the full picture of your event 🌟" />
        <Formik
          validationSchema={registerTicketSchema}
          initialValues={{
            name: "",
            email: "",
            location: "",
            phone_number: "",
            confirm_email: "",
            agreement: false,
          }}
          enableReinitialize
          onSubmit={(values, actions) => {
            console.log(values);
            actions.setSubmitting(false);
            actions.resetForm();
            setIsOpen(!isOpen);
          }}
        >
          {({
            handleSubmit,
            handleChange,
            // setFieldValue,
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
                      labelName="Full name"
                      name="name"
                      handleChange={handleChange}
                      type="text"
                      placeholder=""
                      value={values.name}
                      errors={errors?.name}
                      touched={touched?.name}
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
                      name="phone_number"
                      handleChange={handleChange}
                      type="tel"
                      placeholder=""
                      value={values.phone_number}
                      errors={errors?.phone_number}
                      touched={touched?.phone_number}
                    />
                  </div>
                </div>
                <div className="bg-white lg:w-[60%] w-full h-full rounded-xl px-4 py-6">
                  <div className="w-full relative">
                    <Image
                      src="/assets/images/upcoming_event_bg2.png"
                      alt="event banner"
                      height={191}
                      width={100}
                      className="object-cover rounded-xl w-full"
                      priority
                    />
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      <span
                        className={`px-3 py-2 text-xs font-normal rounded-md capitalize ${
                          true
                            ? "bg-grey_300 text-grey_100"
                            : "bg-green_400 text-green_200"
                        }`}
                      >
                        {true ? "Free" : "Paid"}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 w-full mt-4">
                    <h3 className="text-dark_200 font-medium md:text-base text-sm">
                      🎉 Get Ready for an Unforgettable House Party! 🎉
                    </h3>
                    <p className="flex items-center gap-1 text-sm font-normal text-grey_100">
                      <CiLocationOn className="w-4 h-4" /> Eko hotel,Lagos,
                      Nigeria
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-4 mt-4">
                    <div className="bg-grey_500 rounded-md w-fit p-2 flex gap-2 items-center">
                      <LuCalendarDays className="w-[20px] h-[20px] text-blue_200" />
                      <div className="flex flex-col gap-1">
                        <h3 className="text-grey_100 text-xs font-normal">
                          Start Date
                        </h3>
                        <h5 className="text-dark_200 font-normal md:text-base text-sm">
                          Sun 12 Jun 2023
                        </h5>
                      </div>
                    </div>
                    <div className="bg-grey_500 rounded-md w-fit p-2 flex gap-2 items-center">
                      <IoTimeOutline className="text-secondary_500 w-[20px] h-[20px]" />
                      <div className="flex flex-col gap-1">
                        <h3 className="text-grey_100 text-xs font-normal">
                          End Time
                        </h3>
                        <h5 className="text-dark_200 font-normal md:text-base text-sm">
                          12:AM
                        </h5>
                      </div>
                    </div>
                    <div className="bg-grey_500 rounded-md w-fit p-2 flex gap-2 items-center">
                      <CiUser className="text-secondary_500 w-[20px] h-[20px]" />
                      <div className="flex flex-col gap-1">
                        <h3 className="text-grey_100 text-xs font-normal">
                          Organizer Email
                        </h3>
                        <h5 className="text-dark_200 font-normal md:text-base text-sm">
                          eventcove@gmal.com
                        </h5>
                      </div>
                    </div>
                  </div>
                  <div className="w-full mt-4 flex flex-col gap-4">
                    <div className="border-b border-grey_100 pb-2 flex justify-between items-center">
                      <h3 className="text-grey_100 text-sm font-normal">
                        Total Ticket
                      </h3>
                      <h5 className="text-dark_200 text-sm font-normal">
                        {" "}
                        3 X {formatToNaira(0)} (Early Bird)
                      </h5>
                    </div>
                    <div className="border-b border-grey_100 pb-2 flex justify-between items-center">
                      <h3 className="text-grey_100 text-sm font-normal">
                        Total Amount
                      </h3>
                      <h5 className="text-dark_200 text-sm font-normal">
                        {formatToNaira(0)}
                      </h5>
                    </div>
                    <div className="border-b border-grey_100 pb-2 flex justify-between items-center">
                      <h3 className="text-grey_100 text-sm font-normal">VAT</h3>
                      <h5 className="text-dark_200 text-sm font-normal">
                        {formatToNaira(0)}
                      </h5>
                    </div>
                    <div className="border-b border-grey_100 pb-2 flex justify-between items-center">
                      <h3 className="text-grey_100 text-sm font-normal">
                        Total Payment
                      </h3>
                      <h5 className="text-dark_200 text-sm font-normal">
                        {formatToNaira(0)}
                      </h5>
                    </div>
                  </div>
                  <div className="w-full flex lg:items-center items-start md:gap-3 gap-2 mt-4">
                    <input
                      type="checkbox"
                      name="agreement"
                      onChange={handleChange}
                      checked={values.agreement}
                      className="h-[16px] w-[16px] accent-primary_100"
                    />
                    <h4 className="text-dark_200 text-sm font-normal">
                      By checking this box, you agree that the information you
                      provided is correct and valid
                    </h4>
                  </div>
                  <div>
                    <Button
                      title="Proceed to Payment"
                      className="h-[40px] text-center my-6 border border-dark_200"
                      type="submit"
                      isLoading={isSubmitting}
                    />
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
      <ModalPopup isOpen={isOpen} closeModal={() => setIsOpen(!isOpen)}>
        <InfoModal closeModal={() => setIsOpen(!isOpen)} />
      </ModalPopup>
    </>
  );
}
