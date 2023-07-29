import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { fireStoreDB } from "../../firebase";
import Swal from "sweetalert2";

const RegAccount = ({ submitAccount }) => {
  const [isLoading, setIsLoading] = useState(false);

  const schema = yup.object().shape({
    username: yup.string().required("Username is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .matches(
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$%^&]).{8,32}/,
        "Password must include number, lowercase, upercase, special character (@$%^&), min. 8 character, max. 32 character"
      )
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Password don't match")
      .required("Confirm password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    setIsLoading(true);
    axios
      .post(process.env.REACT_APP_REGISTER, {
        username: data.username,
        email: data.email,
        password: data.password,
        rePassword: data.confirmPassword,
      })
      .then((result) => {
        setDoc(
          doc(fireStoreDB, "accounts", result?.data?.payload[0].username),
          {
            username: result?.data?.payload[0].username,
            email: data.email,
          }
        )
          .then((result) => {
            console.log("account created");
          })
          .catch((error) => {
            console.log(error);
          });
        submitAccount("regProfile", result?.data?.payload[0].username);
        setIsLoading(false);
      })
      .catch(({ response }) => {
        setIsLoading(false);

        const getRes = Object.keys(response?.data?.message);

        let msgProperty = [];

        getRes.map((item, key) => {
          const {
            [item]: { message },
          } = response?.data?.message;

          msgProperty[key] = message;
        });

        Swal.fire({
          title: "Register Failed",
          text:
            msgProperty.toString().split(".,").join(", ") ??
            "Something wrong with our app",
          icon: "error",
        });
      });
  };

  return (
    <div className="col-md-6 order-2 p-0 animate__animated animate__fadeIn">
      <div className="container">
        <div className="row cont-form-register justify-content-center align-items-center">
          <div className="col-md-8">
            <h1 className="h1-register text-center mb-3">Let's Get Started!</h1>
            <p className="txt-register text-center text-muted mb-4">
              Create new account to access all features
            </p>
            <hr size="1" color="#F5F5F5" />
            <form onSubmit={handleSubmit(onSubmit)} novalidate>
              <div className="mb-3">
                <label className="form-label">Username*</label>
                <input
                  type="text"
                  className={`input-register form-control form-control-lg ${
                    errors.username ? "is-invalid" : ""
                  }`}
                  placeholder="Enter a username you want"
                  {...register("username")}
                />
                <div className="invalid-feedback">
                  {errors.username?.message}
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">E-mail address*</label>
                <input
                  type="text"
                  className={`input-register form-control form-control-lg ${
                    errors.email ? "is-invalid" : ""
                  }`}
                  placeholder="Enter e-mail address"
                  {...register("email")}
                />
                <div className="invalid-feedback">{errors.email?.message}</div>
              </div>
              <div className="mb-3">
                <label className="form-label">Create Password*</label>
                <input
                  type="password"
                  className={`input-register form-control form-control-lg ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  placeholder="Create Password"
                  {...register("password")}
                />
                <div className="invalid-feedback">
                  {errors.password?.message}
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Re-enter Password*</label>
                <input
                  type="password"
                  className={`input-register form-control form-control-lg ${
                    errors.confirmPassword ? "is-invalid" : ""
                  }`}
                  placeholder="Re-enter Password"
                  {...register("confirmPassword")}
                />
                <div className="invalid-feedback">
                  {errors.confirmPassword?.message}
                </div>
              </div>
              {/* <div className="txt-register form-check d-flex justify-content-start mb-2">
                  <input className="form-check-input" type="checkbox" />
                  <label className="txt-register form-check-label ms-2">
                    I agree to terms & conditions
                  </label>
                </div> */}
              <div className="d-grid">
                <button
                  id="btn-register"
                  type="submit"
                  className="btn btn-primary btn-lg mt-4"
                >
                  {isLoading ? (
                    <>
                      <span
                        className="spinner-border"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    </>
                  ) : (
                    <>Register Account</>
                  )}
                </button>
              </div>
              <small className="txt-register d-block text-center text-muted mt-2">
                Already have account?
                <Link
                  id="a-register"
                  className="text-decoration-none"
                  to={"/login"}
                >
                  {" "}
                  Log in Here
                </Link>
              </small>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegAccount;
