import React from "react";
import Footer from "./Footer";
import Menu from "./Menu";

const Base = ({ children }) => {
  return (
    <div maxWidth="lg">
      {/* Menu */}
      <Menu />

      {/* Main Body Components Comes */}
      <div>{children}</div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Base;
