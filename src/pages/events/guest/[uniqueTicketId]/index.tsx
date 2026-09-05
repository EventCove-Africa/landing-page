/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useRouter } from "next/router";
import { Form, Formik, FormikHelpers } from "formik";
import CustomHead from "@/components/CustomHead";
import Button from "@/components/FormComponents/Button";
import TextInputField from "@/components/FormComponents/TextInputField";
import toast from "react-hot-toast";
import { _handleThrowErrorMessage } from "@/utils";
import { appUrls } from "@/services/urls";
import { api } from "@/services/apiClients";
import * as Yup from "yup";
import ModalPopup from "@/components/ModalPopup";
import InfoModal from "@/pages/components/InfoModal";

type uniqueGuestProps = {
  email: string;
  name: string;
  ticketNumber: string;
};

const registerTicketSchema = Yup.object().shape({
  firstName: Yup.mixed().required("Firstname is required"),
  lastName: Yup.mixed().required("Lastname is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

export default function UniqueTicketId() {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState("");
  const { uniqueTicketId } = router.query as { uniqueTicketId: string };

  const handleSubmitGuestList = async (
    reservePayloadTicket: uniqueGuestProps,
    actions: FormikHelpers<any>,
  ) => {
    try {
      const res = await api.post(
        appUrls.ADD_UNIQUE_GUEST_FOR_EVENT_URL,
        reservePayloadTicket,
      );
      const status_code = [200, 201].includes(res?.status);
      if (status_code) {
        const message = res?.data?.data;
        setSuccessMessage(message);
        setIsOpen((prev) => !prev);
        actions.resetForm();
      }
    } catch (error: any) {
      const err_message = _handleThrowErrorMessage(error?.data?.message);
      toast.error(err_message);
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <>
      <CustomHead title={`Event-guest-${uniqueTicketId}`} />
      <div className="container padding-spacing w-full h-full">
        <div className="mx-auto bg-white shadow-md rounded-lg p-6 w-full max-w-md">
          <Formik
            validationSchema={registerTicketSchema}
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
            }}
            enableReinitialize
            onSubmit={(values, actions) => {
              const reservePayloadTicket = {
                email: values.email,
                ticketNumber: uniqueTicketId,
                name: `${values.firstName} ${values.lastName}`,
              };
              handleSubmitGuestList(reservePayloadTicket, actions);
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
                  className="w-full flex flex-col gap-2"
                >
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
                      labelName="Last name"
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
                  <Button
                    title="Proceed"
                    className="h-[40px] text-center my-6 border border-dark_200"
                    type="submit"
                    isLoading={isSubmitting}
                  />
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
      <ModalPopup isOpen={isOpen} closeModal={() => setIsOpen(!isOpen)}>
        <InfoModal
          info={successMessage}
          onClick={() => router.push("/")}
          title="PROCEED"
        />
      </ModalPopup>
    </>
  );
}
