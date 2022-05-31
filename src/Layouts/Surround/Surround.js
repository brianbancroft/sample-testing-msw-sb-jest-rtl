import React from "react";

import PropTypes from "prop-types";
import Header from "../../components/Header";

function Surround({ children }) {
  return (
    <>
      <Header />
      {children}
      <footer className="bg-emerald-700 text-white h-24">footer</footer>
    </>
  );
}

Surround.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Surround;
