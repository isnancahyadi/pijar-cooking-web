import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import MyRecipe from "../components/Tab/Profile/MyRecipe";
import TabProfile from "../components/Tab/Profile/TabProfile";
import { Link, useNavigate } from "react-router-dom";

const tabContent = [
  {
    title: "My Recipes",
    content: <MyRecipe />,
  },
];

const Profile = () => {
  const user = useSelector((state) => state.auth.auth);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Profile";
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/login");
  }, []);

  return (
    <div className="Profile">
      {/* <!-- Start of profile section --> */}
      <section id="content">
        <div className="container-fluid animate__animated animate__zoomIn">
          <div className="d-flex align-items-center justify-content-center">
            <img
              id="profile-pict"
              src={user?.profile_picture}
              className="rounded-circle"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="container mt-5">
            <h1 className="h1-profile text-center">{user?.fullname}</h1>
          </div>
          <div className="container mt-3">
            <div className="row align-items-center justify-content-center">
              <div className="col-auto">
                <Link to={"/profile/edit"}>
                  <button className="btn btn-primary" type="button">
                    Edit Profile
                  </button>
                </Link>
              </div>
              <div className="col-auto">
                <Link to={"/profile/edit-account"}>
                  <button className="btn btn-secondary" type="button">
                    Edit Account
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- End of profile section --> */}

      {/* <!-- Start of recipe profile section --> */}
      <section id="content-2">
        <TabProfile>
          {tabContent.map((tab, index) => (
            <TabProfile.TabPane key={`Tab-${index}`} tab={tab.title}>
              {tab.content}
            </TabProfile.TabPane>
          ))}
        </TabProfile>
      </section>
      {/* <!-- End of recipe profile section --> */}
    </div>
  );
};

export default Profile;
