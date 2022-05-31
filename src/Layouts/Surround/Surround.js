import React from "react";

import PropTypes from "prop-types";

function Surround({ children }) {
  return (
    <>
      <header className="py-4 text-xl bg-black text-white px-5 justify-between flex">
        <div>fancy logo</div>
        <div>login</div>
      </header>
      {children}
      <footer className="bg-emerald-700 text-white h-24">footer</footer>
    </>
  );
}

Surround.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Surround;
