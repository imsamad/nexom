import * as Yup from "yup";
export const logSchema = {
  formId: "signInForm",
  identifier: {
    name: "identifier",
    label: "Username or Email*",
    requiredErrorMsg: "Username Or Email is Required.",
  },
  password: {
    name: "password",
    label: "Password *",
    requiredErrorMsg: "Password is required",
  },
  email: {
    name: "email",
    label: "Email *",
    requiredErrorMsg: "Email is required",
  },
  username: {
    name: "username",
    label: "Username *",
    requiredErrorMsg: "Username is required",
  },
};

export const logInitialValues = [
  {
    [logSchema.identifier.name]: "",
    [logSchema.password.name]: "",
  },
  {
    [logSchema.username.name]: "",
    [logSchema.email.name]: "",
    [logSchema.password.name]: "",
  },
];
export const validationSchema = [
  Yup.object().shape({
    [logSchema.identifier.name]: Yup.string().required(
      `${logSchema.identifier.requiredErrorMsg}`
    ),
    [logSchema.password.name]: Yup.string().required(
      `${logSchema.password.requiredErrorMsg}`
    ),
  }),
  Yup.object().shape({
    [logSchema.username.name]: Yup.string().required(
      `${logSchema.username.requiredErrorMsg}`
    ),
    [logSchema.email.name]: Yup.string()
      .email("Invalid Email Format")
      .required(`${logSchema.email.requiredErrorMsg}`),
    [logSchema.password.name]: Yup.string().required(
      `${logSchema.password.requiredErrorMsg}`
    ),
  }),
];
