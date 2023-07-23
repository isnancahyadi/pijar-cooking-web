import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="main-footer" style={{ position: "relative" }}>
        <div>
          <h2 className="h2-home text-primary-emphasis text-center">
            Eat, Cook, Repeat
          </h2>
          <p className="footer-slogan text-muted text-center">
            Share your best recipe by uploading here !
          </p>
        </div>
        <p className="footer-copyright text-center">
          Copyright &copy; 2023 <br />
          Dev By{" "}
          <a href="https://github.com/isnancahyadi">Isnan Arif Cahyadi</a>
        </p>
      </footer>
    </>
  );
};

export default Footer;
