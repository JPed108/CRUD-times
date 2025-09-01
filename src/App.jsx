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
  //states utilizados no app
  const [soccerTeams, setSoccerTeams] = useState([]);
  const [isChartMode, setIsChartMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRemovingLeague, setIsRemovingLeague] = useState(false);
  const [isLeagueOpen, setIsLeagueOpen] = useState([]);
  const [teamsForChart, setTeamsForChart] = useState([]);

  //Carregar times do armazenamento local quando o elemento for carregado pela primeira vez.
  useEffect(() => {
    const teams = Library.loadTeams();
    if (teams) setSoccerTeams(teams);
  }, []);

  return (
    <div className="fixed left-0 top-0 flex flex-row w-full h-full">
      {/*animatePresence utilizado para animar a abertura e o fechamento do modal*/}
      {isModalOpen && (
        <motion.div
          key={isModalOpen}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          {/*Modal utilizado para selecionar os campeonatos que devem ser chamadas pela API e inseridos na lista de times*/}
          <Modal
            className="flex flex-col items-center justify-center bg-black/50 h-[50%] overflow-clip"
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            soccerTeams={soccerTeams}
            setSoccerTeams={setSoccerTeams}
          ></Modal>
        </motion.div>
      )}
      {/*Botões de controle*/}
      <div className=" flex flex-col gap-4 items-start w-[26%] border-r-4 border-r-gray-600">
        <div className="flex flex-row gap-3 flex-wrap pt-2 pl-[5%] pb-2">
          <ControlButtons
            setSoccerTeams={setSoccerTeams}
            soccerTeams={soccerTeams}
            setIsChartMode={setIsChartMode}
            isChartMode={isChartMode}
            setIsModalOpen={setIsModalOpen}
            isRemovingLeague={isRemovingLeague}
            setIsRemovingLeague={setIsRemovingLeague}
            isLeagueOpen={isLeagueOpen}
            setIsLeagueOpen={setIsLeagueOpen}
          />
        </div>
        {/*Lista de times*/}
        <div className="flex flex-col justify-items-center gap-4 overflow-y-auto [scrollbar-gutter:stable] pl-[5%] w-[95%] h-full">
          <ListOfTeams
            soccerTeams={soccerTeams}
            setSoccerTeams={setSoccerTeams}
            isRemovingLeague={isRemovingLeague}
            isLeagueOpen={isLeagueOpen}
            setIsLeagueOpen={setIsLeagueOpen}
            isChartMode={isChartMode}
            teamsForChart={teamsForChart}
            setTeamsForChart={setTeamsForChart}
          />
        </div>
      </div>
      {/*Outlet. Componente responsável por renderizar as páginas dos times e a página do gráfico.*/}
      <div className="flex-1 h-full p-4 items-center justify-center">
        <Outlet context={{ soccerTeams, setSoccerTeams, teamsForChart, setTeamsForChart }} />
      </div>
    </div>
  );
}

export default App;
