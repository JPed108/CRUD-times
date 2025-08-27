import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { AnimatePresence, isPrimaryPointer, motion } from "motion/react";
import "./App.css";
import { Library } from "./lib";
import ListOfTeams from "./ListOfTeams";

function App() {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [soccerTeams, setSoccerTeams] = useState([]);

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

  const loadTeamsHandler = () => {
    const teams = Library.loadTeams();
    if (teams) {
      console.log("Team exists");
      setSoccerTeams(teams);
    } else {
      const key = prompt("Entre com a chave da API:");
      Library.getTeamsFromAPI(key, setSoccerTeams);
      console.log("Team doesn't exist");
    }
  };

  const clearTeamsHandler = () => {
    Library.clearTeams();
    setSoccerTeams([]);
  };

  const addTeamHandler = () => {
    setSelectedTeam("NewTeam");
  };

  const teams = findTeamsWithKey(soccerTeams, searchText);

  return (
    <div className="fixed left-0 top-0 flex flex-row w-full h-full">
      <div className="flex flex-col gap-4 items-start w-[25%] border-r-4 border-r-gray-600">
        <div className="flex flex-row gap-3 flex-wrap pt-2 pl-[5%] h-[15%]">
          <Link
            className="text-white bg-gray-800 hover:bg-gray-900 w-32 h-[40px] rounded-2xl"
            to={`/NewTeam`}
            onClick={() => setSelectedTeam(-1)}
          >
            <motion.div
              whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
              whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
              className="text-white bg-gray-800 hover:bg-gray-900 w-32 h-[40px] rounded-2xl flex items-center justify-center"
              onClick={loadTeamsHandler}
            >
              Adicionar Time
            </motion.div>
          </Link>

          <motion.button
            whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
            whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
            className="text-white bg-gray-800 hover:bg-gray-900 w-32 h-[40px] rounded-2xl"
            onClick={loadTeamsHandler}
          >
            Carregar Times
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
            whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
            className="text-white bg-gray-800 hover:bg-gray-900 w-32 h-[40px] rounded-2xl"
            onClick={clearTeamsHandler}
          >
            Limpar Times
          </motion.button>
          <button> </button>
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
