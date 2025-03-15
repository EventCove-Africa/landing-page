/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import Button from "@/components/FormComponents/Button";
import TextInputField from "@/components/FormComponents/TextInputField";
import toast from "react-hot-toast";
import { _handleThrowErrorMessage } from "@/utils";
import { api } from "@/services/apiClients";
import { appUrls } from "@/services/urls";

type InfoModalProps = {
  closeModal: () => void;
  eventId: string | undefined;
  handleFetchEventsDetails: (eventId: any) => void;
  handleFetchEventTicketsDetails: (eventId: any) => void;
};

export type PrivatePassCodeApiProp = {
  passcode: string;
  eventId?: string | undefined;
};

export default function PrivatePassCode({
  closeModal,
  eventId,
  handleFetchEventsDetails,
  handleFetchEventTicketsDetails,
}: InfoModalProps) {
  const privateEventPassCodeSchema = Yup.object().shape({
    passcode: Yup.string().required("Passcode is required"),
  });

  const handleValidatePasscode = async (
    payload: PrivatePassCodeApiProp,
    actions: FormikHelpers<PrivatePassCodeApiProp>
  ) => {
    try {
      const res = await api.post(
        appUrls.EVENT_URL + "/guest/validate/passcode",
        payload
      );
      const status_code = [200, 201].includes(res?.status);
      if (status_code) {
        closeModal();
        actions.resetForm();
        handleFetchEventsDetails(eventId);
        handleFetchEventTicketsDetails(eventId);
      }
    } catch (error: any) {
      const err_message = _handleThrowErrorMessage(error?.data?.message);
      toast.error(err_message);
    } finally{
      actions.setSubmitting(false);
    }
  };
  return (
    <div className="md:w-[458px] w-full h-auto bg-white rounded-xl px-3 py-4">
      <Formik
        validationSchema={privateEventPassCodeSchema}
        initialValues={{
          passcode: "",
        }}
        enableReinitialize
        onSubmit={(values, actions) => {
          const { passcode } = values;
          const payload = {
            passcode,
            eventId,
          };
          handleValidatePasscode(payload, actions);
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
            <Form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="mb-2 w-full">
                <TextInputField
                  labelName="Passcode"
                  name="passcode"
                  handleChange={handleChange}
                  type="text"
                  placeholder=""
                  value={values.passcode}
                  errors={errors?.passcode}
                  touched={touched?.passcode}
                />
              </div>
              <Button
                title="Submit"
                className="w-full h-[40px] text-center border border-dark_200"
                type="submit"
                isLoading={isSubmitting}
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
