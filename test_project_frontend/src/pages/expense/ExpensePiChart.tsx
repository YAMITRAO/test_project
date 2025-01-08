import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

// Example data
// const data1 = [
//   { name: "Category 1", value: 30 },
//   { name: "Category 2", value: 20 },
//   { name: "Category 3", value: 25 },
//   { name: "Category 4", value: 15 },
//   { name: "Category 5", value: 10 },
//   { name: "Category 5", value: 20 },
// ];

// Define colors for the pie segments
const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#f85468",
];
interface ExpnesePiChartProps_int {
  data: {}[];
}
const ExpensePiChart: React.FC<ExpnesePiChartProps_int> = ({ data }) => {
  console.log("Data is at pi ", data);
  return (
    data?.length > 0 && (
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={100}
            innerRadius={0}
            label
          >
            {data?.map((entry, index) => (
              <Cell
                key={`cell-${index}${entry}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    )
  );
};

export default ExpensePiChart;
