import React from "react";
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

interface ChartsSectionProps {
  financialBarChartData: { name: string; value: number }[];
  expensePieChartData: { name: string; value: number }[];
}

const ChartsSection: React.FC<ChartsSectionProps> = ({
  financialBarChartData,
  expensePieChartData,
}) => {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  return (
    <div className="mb-8">
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4">Revenue vs Profit</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={financialBarChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8">
              {financialBarChartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.value < 0 ? "#FF0000" : "#8884d8"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div>
        <h4 className="text-lg font-semibold mb-4">Expense Breakdown</h4>
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
              {expensePieChartData.map((_, index) => (
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
  );
};

export default ChartsSection;
