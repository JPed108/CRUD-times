import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import "./App.css";
import { Library } from "./lib";
import ListOfTeams from "./ListOfTeams";
import ControlButtons from "./ControlButtons";
import Modal from "./LeaguesToAdd";
import { animate } from "motion";

function App() {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [soccerTeams, setSoccerTeams] = useState([]);
  const [isChartMode, setIsChartMode] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const teams = Library.loadTeams();
    if (teams) setSoccerTeams(teams);
  }, []);

  const inputHandler = (e) => {
    const text = e.target.value;
    setSearchText(text);
    setIsSearching(text.length > 0);
  };

  const findTeamsWithKey = (teams, key) => {
    if (key === "") return teams;
    return Library.search(teams, key);
  };

  const displayTeams = findTeamsWithKey(soccerTeams, searchText);

  return (
    <>
      <div className="fixed left-0 top-0 flex flex-row w-full h-full">
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              key={isModalOpen}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Modal
                className="flex flex-col items-center justify-center bg-black/50 h-[50%] overflow-clip"
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                soccerTeams={soccerTeams}
                setSoccerTeams={setSoccerTeams}
              ></Modal>
            </motion.div>
          )}
        </AnimatePresence>

        <div className=" flex flex-col gap-4 items-start w-[26%] border-r-4 border-r-gray-600">
          <div className="border-2 flex flex-row gap-3 flex-wrap pt-2 pl-[5%] pb-2">
            <ControlButtons
              setSelectedTeam={setSelectedTeam}
              setSoccerTeams={setSoccerTeams}
              soccerTeams={soccerTeams}
              setIsChartMode={setIsChartMode}
              setIsModalOpen={setIsModalOpen}
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
            <ListOfTeams
              teams={displayTeams}
              setSelectedTeam={setSelectedTeam}
              isSearching={isSearching}
            />
          </div>
        </div>

        <Outlet context={{ soccerTeams, setSoccerTeams }} />
      </div>
    </>
  );
}

export default App;
