import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

function Chart() {
  const { soccerTeams } = useOutletContext();

  const teams = soccerTeams.map((team) => {
    return {
      name: team.name,
      points: team.points,
    };
  });

  return (
    <div className="w-[75%] h-[500px] border-2 rounded-2xl shadow-md p-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart layout="vertical" data={teams} margin={{ top: 20, right: 30, left: 40, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" />
          <Tooltip />
          <Bar dataKey="points" fill="#4F46E5" radius={[0, 6, 6, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chart;
