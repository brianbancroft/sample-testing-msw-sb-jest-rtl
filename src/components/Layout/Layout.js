import React from "react";

import PropTypes from "prop-types";

function Layout({ children }) {
  return (
    <>
      <header>header</header>
      {children}
      <footer>footer</footer>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
