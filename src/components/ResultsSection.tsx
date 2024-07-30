import React from "react";

interface ResultsSectionProps {
  financials: {
    revenue: number;
    cogs: number;
    grossProfit: number;
    deliveryCosts: number;
    salaryCosts: number;
    acquisitionCosts: number;
    totalExpenses: number;
    netProfit: number;
    breakEven: number;
  };
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ financials }) => {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4">
        Financial Results (Monthly)
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ResultItem label="Revenue" value={financials.revenue} />
        <ResultItem label="Cost of Goods Sold" value={financials.cogs} />
        <ResultItem label="Gross Profit" value={financials.grossProfit} />
        <ResultItem label="Delivery Costs" value={financials.deliveryCosts} />
        <ResultItem label="Salary Costs" value={financials.salaryCosts} />
        <ResultItem
          label="Acquisition Costs"
          value={financials.acquisitionCosts}
        />
        <ResultItem label="Total Expenses" value={financials.totalExpenses} />
        <ResultItem label="Net Profit" value={financials.netProfit} />
        <ResultItem
          label="Break-even Point"
          value={financials.breakEven}
          unit="orders"
        />
      </div>
    </div>
  );
};

interface ResultItemProps {
  label: string;
  value: number;
  unit?: string;
}

const ResultItem: React.FC<ResultItemProps> = ({
  label,
  value,
  unit = "Rs",
}) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <p className="text-sm text-gray-600">{label}</p>
      <p className="text-lg font-semibold">
        {unit === "Rs" ? "Rs " : ""}
        {value.toFixed(2)} {unit !== "Rs" ? unit : ""}
      </p>
    </div>
  );
};

export default ResultsSection;
