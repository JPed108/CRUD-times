import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import "./App.css";
import { Library } from "./lib";
import ListOfTeams from "./ListOfTeams";
import ControlButtons from "./ControlButtons";

function App() {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [soccerTeams, setSoccerTeams] = useState([]);
  const [isChartMode, setIsChartMode] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const teams = Library.loadTeams();
    if (teams) setSoccerTeams(teams);
  }, []);

  const inputHandler = (e) => {
    console.log(e.target.value);
    setSearchText(e.target.value);
  };

  const findTeamsWithKey = (teams, key) => {
    if (key === "") return teams;
    return Library.search(teams, key);
  };

  const teams = findTeamsWithKey(soccerTeams, searchText);

  return (
    <div className="fixed left-0 top-0 flex flex-row w-full h-full">
      <div className="flex flex-col gap-4 items-start w-[25%] border-r-4 border-r-gray-600">
        <div className="flex flex-row gap-3 flex-wrap pt-2 pl-[5%] h-[15%]">
          <ControlButtons
            setSelectedTeam={setSelectedTeam}
            setSoccerTeams={setSoccerTeams}
            soccerTeams={soccerTeams}
            setIsChartMode={setIsChartMode}
          />
        </div>
        <input
          type="text"
          id="search_bar"
          onChange={inputHandler}
          className="bg-gray-300 border border-gray-300 text-gray-900 rounded-lg ml-[5%] w-[50%] pl-2"
          placeholder="Pesquisar time..."
        />
        <div className="flex flex-col justify-items-center gap-4 overflow-y-auto [scrollbar-gutter:stable] pl-[5%] w-[95%] h-full">
          <ListOfTeams teams={teams} setSelectedTeam={setSelectedTeam} />
        </div>
      </div>

      <Outlet context={{ soccerTeams, setSoccerTeams }} />
    </div>
  );
}

export default App;
