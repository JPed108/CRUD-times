import { useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Chart({ teams }) {
  useEffect(() => {
    console.log("Chart");
  }, []);

  const data = [
    { name: "Team A", points: 400 },
    { name: "Team B", points: 300 },
    { name: "Team C", points: 500 },
    { name: "Team D", points: 200 },
  ];

  return (
    <div className="w-[75%] border-8">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical" // 🔑 this makes it horizontal
          data={data}
          margin={{ top: 20, right: 30, left: 40, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" /> {/* horizontal axis shows numbers */}
          <YAxis dataKey="name" type="category" />{" "}
          {/* vertical axis shows labels */}
          <Tooltip />
          <Bar dataKey="points" fill="#4F46E5" radius={[0, 6, 6, 0]} />{" "}
          {/* nice rounded bars */}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chart;
