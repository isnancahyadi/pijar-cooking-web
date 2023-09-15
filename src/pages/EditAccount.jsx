import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import axios from "axios";
import { resetAuth } from "../store/reducers/authSlice";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { doc, updateDoc } from "firebase/firestore";
import { fireStoreDB } from "../firebase";
import jwt_decode from "jwt-decode";

const EditAccount = () => {
  const token = localStorage.getItem("token");
  const decodedToken = jwt_decode(token);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Edit Account";
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/login");
  }, []);

  const schema = yup.object().shape({
    username: yup.string().required("Username is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    newPass: yup
      .string()
      .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$%^&]).{8,32}/, {
        message:
          "Password must include number, lowercase, upercase, special character (@$%^&), min. 8 character, max. 32 character",
        excludeEmptyString: true,
      }),
    confNewPass: yup
      .string()
      .oneOf([yup.ref("newPass"), null], "Password don't match"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    setIsLoading(true);

    const accountPayload = {
      ...(data?.username !== decodedToken?.username && {
        user: data?.username,
      }),
      ...(data?.email !== decodedToken?.email && { email: data?.email }),
    };

    const passPayload = {
      ...(data?.newPass && {
        password: data?.newPass,
      }),
    };

    const postAccount = async () => {
      return Object.keys(accountPayload).length === 0
        ? null
        : await axios.patch(process.env.REACT_APP_EDIT_ACCOUNT, accountPayload);
    };

    const postPassword = async () => {
      return Object.keys(passPayload).length === 0
        ? null
        : await axios.patch(process.env.REACT_APP_EDIT_PASSWORD, passPayload);
    };

    await Promise.all([postAccount(), postPassword()])
      .then(() => {
        // if (Object.keys(accountPayload).length !== 0) {
        //   updateDoc(
        //     doc(fireStoreDB, "accounts", decodedToken?.username),
        //     accountPayload
        //   )
        //     .then(() => {
        //       console.log("account updated");
        //     })
        //     .catch((error) => {
        //       console.log(error);
        //     });
        // }
        setIsLoading(false);
        Swal.fire({
          title: "Update Success",
          text: "Your profile has been successfully updated. Please re-login.",
          icon: "success",
        }).then(() => {
          localStorage.clear();
          dispatch(resetAuth);
          window.location.href = "/login";
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
          title: "Update Failed",
          text:
            msgProperty.toString().split(".,").join(", ") ??
            "Something wrong with app",
          icon: "error",
        });
      });
  };

  return (
    <div className="EditAccount">
      <section id="content">
        <div className="container-fluid">
          <div className="d-flex justify-content-center align-items-center">
            <div className="card p-5 border border-3">
              <div className="card-body">
                {/* <div className="row justify-content-between">
                  <div className="col-md-8"> */}
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <div className="mb-3">
                    <label className="form-label">Username*</label>
                    <input
                      type="text"
                      className={`input-register form-control form-control-lg ${
                        errors.username ? "is-invalid" : ""
                      }`}
                      placeholder="Enter new username"
                      defaultValue={decodedToken?.username}
                      {...register("username")}
                    />
                    <div className="invalid-feedback">
                      {errors?.username?.message}
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email*</label>
                    <input
                      type="text"
                      className={`input-register form-control form-control-lg ${
                        errors.email ? "is-invalid" : ""
                      }`}
                      placeholder="Enter new email"
                      defaultValue={decodedToken?.email}
                      {...register("email")}
                    />
                    <div className="invalid-feedback">
                      {errors?.email?.message}
                    </div>
                  </div>
                  <div className="mb-3 mt-5">
                    <h4>Change password</h4>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">New Password</label>
                    <input
                      type="password"
                      className={`input-register form-control form-control-lg ${
                        errors.newPass ? "is-invalid" : ""
                      }`}
                      placeholder="Enter new password"
                      defaultValue={null}
                      {...register("newPass")}
                    />
                    <div className="invalid-feedback">
                      {errors.newPass?.message}
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Confirm New Password</label>
                    <input
                      type="password"
                      className={`input-register form-control form-control-lg ${
                        errors.confNewPass ? "is-invalid" : ""
                      }`}
                      placeholder="Enter confirm new password"
                      defaultValue={null}
                      {...register("confNewPass")}
                    />
                    <div className="invalid-feedback">
                      {errors.confNewPass?.message}
                    </div>
                  </div>
                  <div className="d-grid">
                    <button
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
                        <>Save</>
                      )}
                    </button>
                  </div>
                </form>
                <Link to={"/profile"}>
                  <button
                    type="button"
                    className="btn btn-secondary btn-lg mt-2"
                    style={{ width: "100%" }}
                  >
                    Cancel
                  </button>
                </Link>
                {/* </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EditAccount;
