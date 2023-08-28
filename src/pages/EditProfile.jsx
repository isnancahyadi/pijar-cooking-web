import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { getUser } from "../store/reducers/authSlice";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const EditProfile = () => {
  const user = useSelector((state) => state.auth.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [profileImg, setProfileImg] = useState(null);
  const [profileImgView, setProfileImgView] = useState(null);
  const [profileImgName, setProfileImgName] = useState("");

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
    document.title = "Edit Profile";
  }, []);

  const onSubmit = async (data) => {
    setIsLoading(true);

    const payloadProfile = {
      fullname: data?.fullname,
      phoneNumber: data?.phoneNumber,
    };

    const postProfile = async () =>
      await axios.patch(process.env.REACT_APP_USER, payloadProfile);

    const postProfilePicture = async () =>
      profileImg === null
        ? null
        : await axios.patch(
            process.env.REACT_APP_USER_PICTURE,
            { photoProfile: profileImg },
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

    await Promise.all([postProfile(), postProfilePicture()])
      .then(() => {
        dispatch(getUser());
        Swal.fire({
          title: "Update Success",
          text: "Your profile has been successfully updated.",
          icon: "success",
        }).then(() => navigate("/profile"));
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
    <div className="EditProfile">
      <section id="content">
        <div className="container-fluid">
          <div className="d-flex justify-content-center align-items-center">
            <div className="card p-5 border border-3">
              <div className="card-body">
                <div className="row justify-content-between">
                  <div className="col-auto align-self-center">
                    <div className="container-profile-pict">
                      <button className="btn btn-edit-photo">
                        <FontAwesomeIcon
                          id="ic-pencil"
                          icon="pencil"
                          onClick={() =>
                            document
                              .querySelector(".profile-img-selector")
                              .click()
                          }
                        />
                      </button>
                      <input
                        type="file"
                        className="form-control profile-img-selector"
                        onChange={({ target: { files } }) => {
                          if (files[0]) {
                            setProfileImg(files[0]);
                          }
                          setProfileImgName(files[0].name);
                          setProfileImgView(URL.createObjectURL(files[0]));
                        }}
                        hidden
                      />
                      <img
                        id="profile-pict"
                        src={profileImgView ?? user?.profile_picture}
                        className="rounded-circle"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  </div>

                  <div className="col-md-8">
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                      <div className="mb-3">
                        <label className="form-label">Fullname*</label>
                        <input
                          type="text"
                          className={`input-register form-control form-control-lg ${
                            errors.fullname ? "is-invalid" : ""
                          }`}
                          placeholder="Enter your fullname"
                          defaultValue={user?.fullname}
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
                          defaultValue={user?.phone_number}
                          {...register("phoneNumber")}
                        />
                        <div className="invalid-feedback">
                          {errors.phoneNumber?.message}
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EditProfile;
