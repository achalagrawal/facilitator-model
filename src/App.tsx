import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

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

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

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
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Facilitator Model Simulator</h2>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <Label htmlFor="averageOrderValue">Average Order Value (Rs)</Label>
          <Input
            id="averageOrderValue"
            type="number"
            value={averageOrderValue}
            onChange={(e) => setAverageOrderValue(Number(e.target.value))}
          />
        </div>
        <div>
          <Label htmlFor="margin">Margin (%)</Label>
          <Input
            id="margin"
            type="number"
            value={margin}
            onChange={(e) => setMargin(Number(e.target.value))}
          />
        </div>
        <div>
          <Label htmlFor="deliveryCost">Delivery Cost (Rs)</Label>
          <Input
            id="deliveryCost"
            type="number"
            value={deliveryCost}
            onChange={(e) => setDeliveryCost(Number(e.target.value))}
          />
        </div>
        <div>
          <Label htmlFor="deliverySalary">Delivery Salary (Rs)</Label>
          <Input
            id="deliverySalary"
            type="number"
            value={deliverySalary}
            onChange={(e) => setDeliverySalary(Number(e.target.value))}
          />
        </div>
        <div>
          <Label htmlFor="acquisitionCost">
            Customer Acquisition Cost (Rs)
          </Label>
          <Input
            id="acquisitionCost"
            type="number"
            value={acquisitionCost}
            onChange={(e) => setAcquisitionCost(Number(e.target.value))}
          />
        </div>
        <div>
          <Label htmlFor="ordersPerMonth">Orders per Customer per Month</Label>
          <Input
            id="ordersPerMonth"
            type="number"
            value={ordersPerMonth}
            onChange={(e) => setOrdersPerMonth(Number(e.target.value))}
          />
        </div>
        <div>
          <Label htmlFor="numCustomers">Number of Customers</Label>
          <Input
            id="numCustomers"
            type="number"
            value={numCustomers}
            onChange={(e) => setNumCustomers(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">
          Financial Results (Monthly)
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p>Revenue: Rs {financials.revenue.toFixed(2)}</p>
            <p>Cost of Goods Sold: Rs {financials.cogs.toFixed(2)}</p>
            <p>Gross Profit: Rs {financials.grossProfit.toFixed(2)}</p>
            <p>Delivery Costs: Rs {financials.deliveryCosts.toFixed(2)}</p>
            <p>Salary Costs: Rs {financials.salaryCosts.toFixed(2)}</p>
            <p>
              Acquisition Costs: Rs {financials.acquisitionCosts.toFixed(2)}
            </p>
            <p>Total Expenses: Rs {financials.totalExpenses.toFixed(2)}</p>
            <p>Net Profit: Rs {financials.netProfit.toFixed(2)}</p>
            <p>Break-even Point: {financials.breakEven.toFixed(2)} orders</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">Revenue vs Profit</h4>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={financialBarChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="mt-6">
          <h4 className="text-lg font-semibold mb-2">Expense Breakdown</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={expensePieChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {expensePieChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default BusinessModelSimulator;
