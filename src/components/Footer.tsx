import React from "react";

const Footer: React.FC = () => {
  return (
    <div className="mt-8 text-sm text-gray-600">
      <h4 className="font-semibold mb-2">Assumptions:</h4>
      <ul className="list-disc pl-5">
        <li>Customer acquisition cost is spread over a year</li>
        <li>Delivery salary is a fixed monthly cost</li>
        <li>All calculations are based on monthly figures</li>
        <li>Break-even point is calculated using the contribution margin</li>
      </ul>
    </div>
  );
};

export default Footer;
