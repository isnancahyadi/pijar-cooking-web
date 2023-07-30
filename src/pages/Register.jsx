import React, { useEffect, useState } from "react";
import RegAccount from "../components/Register/RegAccount";
import RegProfile from "../components/Register/RegProfile";

const Register = () => {
  const [page, setPage] = useState("regAccount");
  const [username, setUsername] = useState(null);

  useEffect(() => {
    document.title = "Register";
  }, []);

  const handleSubmit = (page, username) => {
    setPage(page);
    setUsername(username);
  };

  return (
    <div className="Register">
      <section>
        <div id="register-section" className="row">
          {page === "regAccount" ? (
            <RegAccount submitAccount={handleSubmit} />
          ) : (
            <RegProfile user={username} />
          )}
          <div className="register-img col-md-6 order-1 p-0 animate__animated animate__fadeInLeft">
            <div
              className="img-register"
              style={{ backgroundImage: "url('/assets/img/login-img.jpg')" }}
            >
              <div
                className="img-register"
                style={{ backgroundColor: "rgba(215, 154, 255, 0.85)" }}
              >
                <div className="img-register row justify-content-center align-items-center">
                  <img
                    src="/assets/icon/logo-3.svg"
                    style={{ width: "30%", height: "auto" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
