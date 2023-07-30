import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { fireStoreDB } from "../../firebase";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const RegProfile = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);

  const schema = yup.object().shape({
    fullname: yup.string().required("Full name is required"),
    phoneNumber: yup
      .string()
      .min(7, "Number must have min. 7 digits")
      .max(15, "Number can't more than 15 digits")
      .required("Phone number is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const navigate = useNavigate();

  const onSubmit = (data) => {
    setIsLoading(true);
    axios
      .post(process.env.REACT_APP_USER, {
        fullname: data.fullname,
        phoneNumber: data.phoneNumber,
        username: user,
      })
      .then((result) => {
        setDoc(
          doc(fireStoreDB, "users", result?.data?.payload[0].id.toString()),
          {
            id: result?.data?.payload[0].id.toString(),
            fullname: data.fullname,
            phone_number: data.phoneNumber,
            profile_picture: result?.data?.payload[0].profile_picture,
            username: user,
          }
        )
          .then(() => {
            console.log("user created");
          })
          .catch((error) => {
            console.log(error);
          });

        setIsLoading(false);
        Swal.fire({
          title: "Register Success",
          text: "Register success. Please login to app.",
          icon: "success",
        }).then(() => {
          navigate("/login");
        });
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
              Let we know, who are you
            </p>
            <hr size="1" color="#F5F5F5" />
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="mb-3">
                <label className="form-label">Fullname*</label>
                <input
                  type="text"
                  className={`input-register form-control form-control-lg ${
                    errors.fullname ? "is-invalid" : ""
                  }`}
                  placeholder="Enter your fullname"
                  {...register("fullname")}
                />
                <div className="invalid-feedback">
                  {errors.fullname?.message}
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Phone Number*</label>
                <input
                  type="text"
                  className={`input-register form-control form-control-lg ${
                    errors.phoneNumber ? "is-invalid" : ""
                  }`}
                  placeholder="Enter your phone number"
                  {...register("phoneNumber")}
                />
                <div className="invalid-feedback">
                  {errors.phoneNumber?.message}
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
                    <>Register Profile</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegProfile;
