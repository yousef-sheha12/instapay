// import React, { useRef } from "react";

import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
const LoginPage = () => {
  //   const emailInput = useRef();
  //   const passInput = useRef();

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     let data = {
  //       email: emailInput.current.value,
  //       pass: passInput.current.value,
  //     };
  //     console.log(data);
  //   };

  const navigate = useNavigate();

  const handleSubmit = (values) => {
    let dataVerfication = true;
    if (dataVerfication) {
      toast.success("login success");
      navigate("/insta");

      if (values.rememberIndex == true) {
        localStorage.setItem("hasLogged", true);
      } else {
        sessionStorage.setItem("hasLogged", true);
      }
      // console.log(values);
    } else {
      toast.error("wrong userName or pass");
    }
    // console.log(values);
  };

  const validationSchema = Yup.object({
    userEmail: Yup.string().required().email(),
    userPass: Yup.string().required().min(4),
  });

  useEffect(() => {
    let hasLogged =
      localStorage.getItem("hasLogged") || sessionStorage.getItem("hasLogged");
    if (hasLogged == "true") {
      navigate("/insta");
    }
  }, [navigate]);

  return (
    <div className="w-full h-dvh overflow-auto flex justify-center items-center">
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          userEmail: "",
          userPass: "",
          rememberIndex: false,
        }}
        onSubmit={handleSubmit}
      >
        <Form className="w-[400px] border shadow flex flex-col gap-4 justify-center bg-gray-800 p-4">
          <h1>welcome back, please login</h1>
          <Field
            //   ref={emailInput}
            name="userEmail"
            className="input w-full"
            type="text"
            placeholder="Enter your email"
          />
          <ErrorMessage
            name="userEmail"
            className="text-red-500"
            component={"p"}
          />
          <Field
            // ref={passInput}
            name="userPass"
            className="input w-full"
            type="number"
            placeholder="Enter your pass"
          />
          <ErrorMessage
            name="userPass"
            className="text-red-500"
            component={"p"}
          />
          <label className="flex gap-2">
            <Field
              name="rememberIndex"
              className="checkbox checkbox-primary"
              type="checkbox"
            />
            Remember Me
          </label>
          <button type="submit" className="btn btn-primary w-full">
            Login
          </button>
        </Form>
      </Formik>

      {/* <form></form> */}
    </div>
  );
};

export default LoginPage;
