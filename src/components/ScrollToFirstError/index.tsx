/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useFormikContext } from "formik";

const ScrollToFirstError = () => {
  const { errors, submitCount, isValidating } = useFormikContext();

  useEffect(() => {
    if (submitCount === 0 || isValidating) return;

    const firstErrorField = Object.keys(errors)[0];

    if (!firstErrorField) return;

    const field = document.querySelector(
      `[name="${firstErrorField}"]`
    ) as any;

    if (field) {
      field.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      field.focus({ preventScroll: true });
    }
  }, [submitCount, errors, isValidating]);

  return null;
};

export default ScrollToFirstError;