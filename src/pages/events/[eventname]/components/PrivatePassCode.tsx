import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Button from "@/components/FormComponents/Button";
import TextInputField from "@/components/FormComponents/TextInputField";

type InfoModalProps = {
  closeModal: () => void;
};

export default function PrivatePassCode({ closeModal }: InfoModalProps) {
  const privateEventPassCodeSchema = Yup.object().shape({
    passcode: Yup.string().required("Passcode is required"),
  });
  return (
    <div className="md:w-[458px] w-full h-auto bg-white rounded-xl px-3 py-4">
      <Formik
        validationSchema={privateEventPassCodeSchema}
        initialValues={{
          passcode: "",
        }}
        enableReinitialize
        onSubmit={(values, actions) => {
          console.log(values);
          actions.setSubmitting(false);
          actions.resetForm();
          closeModal();
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
