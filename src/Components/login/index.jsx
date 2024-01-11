import React from "react";
import styles from "../../style";
import { useFormik } from "formik";
import { Loginschema } from "../../schemas";
import { Link } from "react-router-dom";
import { socialMedia } from "../Footers/constant";

const initialValues = {
  name: "",
  email: "",
  password: "",
};

const Login = () => {
  const { values, errors, handleBlur, touched, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: Loginschema,
      onSubmit: (values) => {
        console.log(values);
      },
    });

  return (
    <div className="Container w-[350px] my-10 items-center m-auto bg-primary-5 bg-opacity-40">
      <h1 className={`${styles.heading2} text-white pt-8`}>Login</h1>
      <form
        action="POST"
        onSubmit={handleSubmit}
        className="bg-transparent shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.name && touched.name && (
            <p className="text-red-600">{errors.name}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            placeholder="Email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.email && touched.email && (
            <p className="text-red-600">{errors.email}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="text"
            placeholder="Password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.password && touched.password && (
            <p className="text-red-600">{errors.password}</p>
          )}
        </div>

        <div className="flex items-center  justify-center mb-5">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            LogIn
          </button>
        </div>
        <div>
          <p className={`${styles.paragraph} text-center`}>or LogIn with</p>
          <div className=" flex flex-row mt-5  justify-center ">
            {socialMedia.map((social, index) => (
              <img
                key={social.id}
                src={social.icon}
                alt={social.id}
                className={`w-[21px] h-[21] object-contain cursor-pointer ${
                  index !== socialMedia.length - 1 ? "mr-6" : "mr-0"
                }`}
              />
            ))}
          </div>
        </div>
        <Link to="/login">
          <p className={`${styles.paragraph} mt-5 text-center`}>
            Forget Password??{" "}
            <span className={`${styles.paragraph} text-blue-700`}>
              Click here
            </span>{" "}
          </p>
        </Link>
      </form>
    </div>
  );
};

export default Login;
