import * as Yup from "yup";
export const signupSchema = Yup.object({
  name: Yup.string().min(2).max(40).required("Please enter your name"),
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().min(6).required("Please enter your password"),
  conform_password: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null], "Password must match"),
});

export const Loginschema = Yup.object({
  name: Yup.string().min(2).max(40).required("Please enter your name"),
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().min(6).required("Please enter your password"),
});
