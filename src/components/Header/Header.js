import React from "react";

import DialogLogin from "../DialogLogin";

function Header() {
  return (
    <header className="py-4 text-xl bg-black text-white px-5 justify-between flex">
      <div>fancy logo</div>
      <div>
        <DialogLogin />
      </div>
    </header>
  );
}

export default Header;
