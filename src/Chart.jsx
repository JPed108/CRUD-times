import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

function Chart() {
  const { soccerTeams, setSoccerTeams, teamsForChart } = useOutletContext();

  const teams = soccerTeams.filter((t) => teamsForChart.includes(t.id));

  // estados para guardadar os 2 times escolhidos
  const [team1, setTeam1] = useState("");
  const [team2, setTeam2] = useState("");

  // filtra só os dois escolhidos
  const selectedTeams = teams.filter((t) => t.name === team1 || t.name === team2);

  return (
    <div className="flex flex-col gap-6 flex-start">
      {/* Gráfico principal */}
      <div className="w-[100%] h-[500px]  rounded-2x1 shadow-md p-4">
        <ResponsiveContainer width="200%" height="100%">
          <BarChart layout="vertical" data={teams} margin={{ top: 60, right: 50, left: 60, bottom: 20 }}>
            <CartesianGrid strokeDasharray="5 1" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" />
            <Tooltip />
            <Bar dataKey="points" fill="#4F46E5" radius={[0, 6, 6, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Interface para comparar 2 times */}
      <div className="w-[100%] p-6 border-2 rounded-4xl shadow-md ">
        <h2 className="text-lg font-bold mb-4">Comparar dois times</h2>

        <div className="flex gap-4 mb-4">
          <select value={team1} onChange={(e) => setTeam1(e.target.value)} className="border rounded p-2">
            <option value="">Selecione o 1º time</option>
            {teams.map((t) => (
              <option key={t.name} value={t.name}>
                {t.name}
              </option>
            ))}
          </select>

          <select value={team2} onChange={(e) => setTeam2(e.target.value)} className="border rounded p-2">
            <option value="">Selecione o 2º time</option>
            {teams.map((t) => (
              <option key={t.name} value={t.name}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default Chart;
