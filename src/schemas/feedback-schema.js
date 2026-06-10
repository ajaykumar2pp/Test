import * as Yup from "yup";

export const feedbackSchema = Yup.object({
  rating: Yup.number()
    .required("Rating is required")
    .min(1, "Please select a rating"),
  message: Yup.string()
    .required("Feedback message is required")
    .min(20, "Feedback must be at least 20 characters")
    .max(500, "Feedback cannot exceed 500 characters"),
});