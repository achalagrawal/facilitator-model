import React from "react";
import utsavLogo from "@/assets/utsav-logo.png";

const Header: React.FC = () => {
  return (
    <div className="text-center mb-10 flex flex-col items-center">
      <img src={utsavLogo} alt="Utsav.Earth Logo" className="h-16 mb-4" />
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Home Delivery Business Model Simulator for Facilitators
      </h1>
      <p className="text-gray-600">
        Analyze and optimize your home delivery business model for facilitators
        with this interactive simulator.
      </p>
    </div>
  );
};

export default Header;
