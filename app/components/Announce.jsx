"use client";
import { Close } from "@material-ui/icons";
import React, { useState } from "react";

const Announce = () => {
  const [announceStyle, setAnnounceStyle] = useState(
    "bg-[#8a4af3] font-bold text-white flex items-center justify-center"
  );

  const handleClose = () => {
    setAnnounceStyle(announceStyle + " hidden");
  };

  return (
    <div className={announceStyle}>
      <h2>Hurry up! Its 40% off.</h2>
      <Close className="cursor-pointer ml-4" onClick={handleClose} />
    </div>
  );
};

export default Announce;
