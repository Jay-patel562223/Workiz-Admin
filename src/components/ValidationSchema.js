import * as Yup from "yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
let EmailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;

export const ValidationSchema = Yup.object().shape({
  email: Yup.string()
    .required("This field is required. Please enter your email address.")
    .matches(EmailRegex, "Please enter a valid email address."),
  phone: Yup.string()
    .required("Please provide a phone number. This field cannot be left blank.")
    .matches(phoneRegExp, "Please enter a valid phone number.")
    .min(10, "too short")
    .max(10, "too long"),
  address: Yup.string()
    .trim()
    .required(
      "The address field is required. Please enter your complete address."
    ),
});

export const ValidationPrivacy = Yup.object().shape({
  title: Yup.string().required().trim(),
  details: Yup.string().required().trim(),
});

export const ValidationResetPassword = Yup.object({
  password: Yup.string()
    .required("Please enter your password.")
    .min(8, "Your password is too short."),
    confirmPassword: Yup.string()
    .required("Please retype your password.")
    .oneOf([Yup.ref("password")], "Your passwords do not match."),
});

export const ValidationFaqSchema = Yup.object({
  answer: Yup.string()
    .trim()
    .required("This field is required. Please enter your Answer."),
  question: Yup.string()
    .trim()
    .required("This field is required. Please enter your question."),
});

export const ValidationCategory = Yup.object().shape({
  category: Yup.string().required().trim(),
});

export const ValidationReason = Yup.object().shape({
  reason: Yup.string().required("Reason is a required field").trim(),
  type:Yup.string().required("Type is a required field").trim(),

});

export const ValidationForgotEmail = Yup.object().shape({
  email: Yup.string()
    .required("This field is required. Please enter your email address.")
    .matches(EmailRegex, "Please enter a valid email address."),
});

export const ValidationAdminResetPassword = Yup.object({
  password: Yup.string()
    .required("Please enter your password.")
    .min(8, "Your password is too short."),
  confirmPassword: Yup.string()
    .required("Please retype your password.")
    .oneOf([Yup.ref("password")], "Your passwords do not match."),
});


export const ValidationAdminProfile = Yup.object().shape({
  email: Yup.string()
    .required("This field is required. Please enter your email address.")
    .matches(EmailRegex, "Please enter a valid email address."),
  name: Yup.string().required("This field is required. Please enter your Name.").trim(),
});