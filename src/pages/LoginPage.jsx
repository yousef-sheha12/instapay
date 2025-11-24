import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const LoginPage = () => {
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
    } else {
      toast.error("wrong userName or pass");
    }
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
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-900 p-4">
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          userEmail: "",
          userPass: "",
          rememberIndex: false,
        }}
        onSubmit={handleSubmit}
      >
        <Form className="w-full max-w-md border rounded-lg shadow-lg flex flex-col gap-6 justify-center bg-gray-800 p-6">
          <h1 className="text-2xl font-bold text-center text-white">
            Welcome back, please login
          </h1>
          <Field
            name="userEmail"
            className="input input-bordered w-full"
            type="text"
            placeholder="Enter your email"
          />
          <ErrorMessage
            name="userEmail"
            className="text-red-500 text-sm"
            component={"p"}
          />
          <Field
            name="userPass"
            className="input input-bordered w-full"
            type="password"
            placeholder="Enter your password"
          />
          <ErrorMessage
            name="userPass"
            className="text-red-500 text-sm"
            component={"p"}
          />
          <label className="flex items-center gap-2 text-white">
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
    </div>
  );
};

export default LoginPage;
