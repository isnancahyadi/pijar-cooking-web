import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { fireStoreDB } from "../firebase";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { resetAuth } from "../store/reducers/authSlice";

const ReRegistration = ({ closeModal, username }) => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

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

  useEffect(() => {
    document.querySelector("#idmodal").click();
  }, []);

  const onSubmit = (data) => {
    setIsLoading(true);
    axios
      .post(process.env.REACT_APP_USER, {
        fullname: data.fullname,
        phoneNumber: data.phoneNumber,
        username: username,
      })
      .then((result) => {
        setDoc(
          doc(fireStoreDB, "users", result?.data?.payload[0].id.toString()),
          {
            id: result?.data?.payload[0].id.toString(),
            fullname: data.fullname,
            phoneNumber: data.phoneNumber,
            profile_picture: result?.data?.payload[0].profile_picture,
            username: username,
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
          dispatch(resetAuth());
          window.location.reload(false);
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
    <>
      <div id="idmodal" data-bs-toggle="modal" data-bs-target="#exampleModal" />
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Register Profile
              </h1>
              <button
                id="close-modal"
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => closeModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              <div className="row row-gap-4 align-items-center justify-content-center">
                <form onSubmit={handleSubmit(onSubmit)} novalidate>
                  <div className="mb-3">
                    <label className="form-label">Username*</label>
                    <input
                      type="text"
                      className="input-login form-control form-control-lg"
                      placeholder="Enter your username"
                      value={username}
                      disabled
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Fullname*</label>
                    <input
                      type="text"
                      className={`input-login form-control form-control-lg ${
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
                      className={`input-login form-control form-control-lg ${
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
                      id="btn-login"
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
      </div>
    </>
  );
};

export default ReRegistration;
