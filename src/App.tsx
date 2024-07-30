import { useState, useEffect } from "react";
import Header from "@/components/Header";
import InputSection from "@/components/InputSection";
import ResultsSection from "@/components/ResultsSection";
import ChartsSection from "@/components/ChartsSection";
import Footer from "@/components/Footer";

const BusinessModelSimulator = () => {
  const [averageOrderValue, setAverageOrderValue] = useState(650);
  const [margin, setMargin] = useState(15);
  const [deliveryCost, setDeliveryCost] = useState(30);
  const [deliverySalary, setDeliverySalary] = useState(12000);
  const [acquisitionCost, setAcquisitionCost] = useState(200);
  const [ordersPerMonth, setOrdersPerMonth] = useState(1);
  const [numCustomers, setNumCustomers] = useState(100);

  const [financials, setFinancials] = useState({
    revenue: 0,
    cogs: 0,
    grossProfit: 0,
    deliveryCosts: 0,
    salaryCosts: 0,
    acquisitionCosts: 0,
    totalExpenses: 0,
    netProfit: 0,
    breakEven: 0,
  });

  useEffect(() => {
    const calculateMetrics = () => {
      const monthlyRevenue = averageOrderValue * ordersPerMonth * numCustomers;
      const monthlyCOGS = monthlyRevenue * (1 - margin / 100);
      const monthlyGrossProfit = monthlyRevenue - monthlyCOGS;
      const monthlyDeliveryCost = deliveryCost * ordersPerMonth * numCustomers;
      const monthlyAcquisitionCost = (acquisitionCost * numCustomers) / 12; // Assuming customer stays for a year
      const totalExpenses =
        monthlyDeliveryCost + deliverySalary + monthlyAcquisitionCost;
      const monthlyNetProfit = monthlyGrossProfit - totalExpenses;

      // Calculate break-even point
      const fixedCosts = deliverySalary + monthlyAcquisitionCost;
      const contributionMargin =
        averageOrderValue * (margin / 100) - deliveryCost;
      const breakEvenOrders = fixedCosts / contributionMargin;

      setFinancials({
        revenue: monthlyRevenue,
        cogs: monthlyCOGS,
        grossProfit: monthlyGrossProfit,
        deliveryCosts: monthlyDeliveryCost,
        salaryCosts: deliverySalary,
        acquisitionCosts: monthlyAcquisitionCost,
        totalExpenses: totalExpenses,
        netProfit: monthlyNetProfit,
        breakEven: breakEvenOrders,
      });
    };

    calculateMetrics();
  }, [
    averageOrderValue,
    margin,
    deliveryCost,
    deliverySalary,
    acquisitionCost,
    ordersPerMonth,
    numCustomers,
  ]);

  const financialBarChartData = [
    { name: "Revenue", value: financials.revenue },
    { name: "Gross Profit", value: financials.grossProfit },
    { name: "Net Profit", value: financials.netProfit },
  ];

  const expensePieChartData = [
    { name: "COGS", value: financials.cogs },
    { name: "Delivery Costs", value: financials.deliveryCosts },
    { name: "Salary Costs", value: financials.salaryCosts },
    { name: "Acquisition Costs", value: financials.acquisitionCosts },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <Header />
          <InputSection
            averageOrderValue={averageOrderValue}
            setAverageOrderValue={setAverageOrderValue}
            margin={margin}
            setMargin={setMargin}
            deliveryCost={deliveryCost}
            setDeliveryCost={setDeliveryCost}
            deliverySalary={deliverySalary}
            setDeliverySalary={setDeliverySalary}
            acquisitionCost={acquisitionCost}
            setAcquisitionCost={setAcquisitionCost}
            ordersPerMonth={ordersPerMonth}
            setOrdersPerMonth={setOrdersPerMonth}
            numCustomers={numCustomers}
            setNumCustomers={setNumCustomers}
          />
          <ResultsSection financials={financials} />
          <ChartsSection
            financialBarChartData={financialBarChartData}
            expensePieChartData={expensePieChartData}
          />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default BusinessModelSimulator;
