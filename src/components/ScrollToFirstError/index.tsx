import { useEffect, useRef } from "react";
import { useFormikContext } from "formik";

const ScrollToFirstError = () => {
  const { errors, submitCount, isSubmitting } = useFormikContext();
  const lastHandledSubmit = useRef(0);
  useEffect(() => {
    // Only handle each submission once.
    if (
      submitCount === 0 ||
      submitCount === lastHandledSubmit.current ||
      isSubmitting
    ) {
      return;
    }
    const firstErrorField = Object.keys(errors)[0];
    if (!firstErrorField) {
      lastHandledSubmit.current = submitCount;
      return;
    }
    const field = document.getElementById(firstErrorField);
    if (!(field instanceof HTMLElement)) return;
    lastHandledSubmit.current = submitCount;
    field.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    field.focus({ preventScroll: true });
  }, [submitCount, errors, isSubmitting]);
  return null;
};

export default ScrollToFirstError;
