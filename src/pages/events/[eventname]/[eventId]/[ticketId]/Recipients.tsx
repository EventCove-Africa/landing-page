import TextInputField from "@/components/FormComponents/TextInputField";
import { FieldArray, Formik, FormikErrors, FormikTouched } from "formik";
import * as Yup from "yup";

import { IoIosClose } from "react-icons/io";

type Recipient = {
  name: string;
  email: string;
  phoneNumber: string;
};

type RecipientsProps = {
  maxRecipientCount: number;
  onClose: () => void;
  setRecipients: React.Dispatch<React.SetStateAction<Recipient[]>>;
};

type FormValues = {
  recipients: Recipient[];
};

const emptyRecipient: Recipient = {
  name: "",
  email: "",
  phoneNumber: "",
};

const recipientSchema = Yup.object({
  name: Yup.string().trim().required("Name is required"),

  email: Yup.string()
    .transform((value) =>
      typeof value === "string" ? value.trim().toLowerCase() : value,
    )
    .email("Invalid email address")
    .required("Email is required"),

  phoneNumber: Yup.string()
    .matches(/^\d+$/, "Phone number must contain only digits")
    .min(11, "Phone number must be at least 11 digits")
    .max(15, "Phone number cannot exceed 15 digits")
    .required("Phone number is required"),
});

const recipientsSchema = Yup.object({
  recipients: Yup.array()
    .of(recipientSchema)
    .min(1, "Add at least one recipient")
    .required("Recipients are required"),
});

export default function Recipients({
  maxRecipientCount,
  onClose,
  setRecipients,
}: RecipientsProps) {
  const maxCount = Math.max(0, Math.floor(maxRecipientCount));

  const initialValues: FormValues = {
    recipients: maxCount > 0 ? [{ ...emptyRecipient }] : [],
  };

  return (
    <div className="w-full md:w-[450px] rounded-xl bg-white p-3 max-h-[85vh] overflow-auto shadow">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-base font-semibold">Add info</h2>
        <IoIosClose className="cursor-pointer w-10 h-10" onClick={onClose} />
      </div>

      <Formik<FormValues>
        initialValues={initialValues}
        validationSchema={recipientsSchema}
        onSubmit={(values) => {
          setRecipients(values.recipients);
          onClose()
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          isSubmitting,
        }) => {
          const isAtMaximum = values.recipients.length >= maxCount;

          const getFieldError = (
            field: keyof Recipient,
            index: number,
          ): string | undefined => {
            const recipientErrors = errors.recipients as
              | FormikErrors<Recipient>[]
              | undefined;

            const recipientTouched = touched.recipients as
              | FormikTouched<Recipient>[]
              | undefined;

            const error = recipientErrors?.[index]?.[field];
            const wasTouched = recipientTouched?.[index]?.[field];

            return wasTouched && typeof error === "string" ? error : undefined;
          };

          return (
            <form onSubmit={handleSubmit} noValidate>
              <FieldArray name="recipients">
                {({ push, remove }) => (
                  <div className="space-y-2">
                    {values.recipients.map((recipient, index) => (
                      <div
                        key={index}
                        className="space-y-2 border-b border-gray-200 pb-2 last:border-b-0"
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">Recipient {index + 1}</h3>

                          {values.recipients.length > 1 && (
                            <button
                              type="button"
                              onClick={() => remove(index)}
                              className="text-sm text-red-600 hover:text-red-800"
                              aria-label={`Remove recipient ${index + 1}`}
                            >
                              Remove
                            </button>
                          )}
                        </div>

                        <TextInputField
                          labelName="Name"
                          name={`recipients[${index}].name`}
                          id={`recipient-${index}-name`}
                          handleChange={handleChange}
                          onBlur={handleBlur}
                          type="text"
                          placeholder=""
                          value={recipient.name}
                          errors={getFieldError("name", index)}
                          touched={Boolean(
                            (
                              touched.recipients as
                                | FormikTouched<Recipient>[]
                                | undefined
                            )?.[index]?.name,
                          )}
                        />

                        <TextInputField
                          labelName="Email"
                          name={`recipients[${index}].email`}
                          id={`recipient-${index}-email`}
                          handleChange={(
                            event: React.ChangeEvent<HTMLInputElement>,
                          ) => {
                            const normalizedValue = event.target.value
                              .trimStart()
                              .toLowerCase();
                            setFieldValue(
                              `recipients[${index}].email`,
                              normalizedValue,
                            );
                          }}
                          onBlur={handleBlur}
                          type="email"
                          placeholder=""
                          value={recipient.email}
                          errors={getFieldError("email", index)}
                          touched={Boolean(
                            (
                              touched.recipients as
                                | FormikTouched<Recipient>[]
                                | undefined
                            )?.[index]?.email,
                          )}
                        />

                        <TextInputField
                          labelName="Phone Number"
                          name={`recipients[${index}].phoneNumber`}
                          id={`recipient-${index}-phone`}
                          handleChange={handleChange}
                          onBlur={handleBlur}
                          type="tel"
                          placeholder=""
                          value={recipient.phoneNumber}
                          errors={getFieldError("phoneNumber", index)}
                          touched={Boolean(
                            (
                              touched.recipients as
                                | FormikTouched<Recipient>[]
                                | undefined
                            )?.[index]?.phoneNumber,
                          )}
                        />
                      </div>
                    ))}

                    <div className="flex justify-between flex-row-reverse">
                      {!isAtMaximum && maxCount > 0 && (
                        <button
                          type="button"
                          onClick={() => push({ ...emptyRecipient })}
                          className="rounded border text-xs border-pink-600 px-2 py-2 text-pink-600 hover:bg-pink-50"
                        >
                          + Add More
                        </button>
                      )}
                      <button
                        type="submit"
                        disabled={isSubmitting || maxCount === 0}
                        className="rounded bg-primary_100 px-4 py-2 text-xs primary_200 text-white disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Proceed
                      </button>
                    </div>
                  </div>
                )}
              </FieldArray>
            </form>
          );
        }}
      </Formik>
    </div>
  );
}
