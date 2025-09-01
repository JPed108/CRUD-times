import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { motion } from "motion/react";
import { Library } from "./lib";
import "./getApiData";
import { GetApiData } from "./getApiData";
import { useState } from "react";
import Modal from "./LeaguesToAdd";

function ControlButtons({
  setSoccerTeams,
  soccerTeams,
  setIsModalOpen,
  isRemovingLeague,
  setIsRemovingLeague,
  isLeagueOpen,
  setIsLeagueOpen,
  isChartMode,
  setIsChartMode,
}) {
  // useNavigate é usado para navegar entre páginas.
  const navigate = useNavigate();
  const selectedTeam = useLocation().pathname;

  const [lastTeamPath, setLastTeamPath] = useState("");

  //Handler do botão Carregar times.
  //Carrega os times do localStorage, se existirem.
  const loadTeamsHandler = () => {
    const teams = Library.loadTeams();
    if (teams) {
      setSoccerTeams(teams);
    } else {
      alert("Armazenamento vazio!");
    }
  };

  //Handler do botão Limpar times.
  //Redefine a lista de times para uma lista vazia.
  const clearTeamsHandler = () => {
    setSoccerTeams([]);
  };

  //Handler do botão Salvar alterações.
  //Salva as alterações no localStorage.
  const applyChangesHandler = (teams) => {
    if (teams.length === 0) Library.clearTeams();
    else Library.saveTeams(teams);
  };

  const chartHandler = () => {
    console.log(soccerTeams);
    if (isChartMode) {
      setLastTeamPath(lastTeamPath);
    } else {
      setLastTeamPath(selectedTeam);
      navigate("/chart");
    }

    setIsChartMode(!isChartMode);
  };

  const removeLeagueHandler = () => {
    setIsLeagueOpen(isLeagueOpen.map(() => false));
    setIsRemovingLeague(!isRemovingLeague);
  };

  //Handler do botão Adicionar campeonatos pela API.
  //Abre o modal de seleção de campeonatos.
  const addLeagueHandler = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      {/*Botão adicionar time*/}
      <motion.div
        whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
        whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
        className="text-white bg-gray-800 hover:bg-gray-900 w-32 h-[40px] rounded-2xl flex items-center justify-center cursor-pointer"
        onClick={() => {
          navigate(`/team/NewTeam`);
        }}
      >
        Adicionar Time
      </motion.div>

      {/*Botão carregar times */}
      <motion.button
        whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
        whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
        className="text-white bg-gray-800 hover:bg-gray-900 w-32 h-[40px] rounded-2xl cursor-pointer"
        onClick={loadTeamsHandler}
      >
        Carregar Times
      </motion.button>

      {/*Botão limpar times */}
      <motion.button
        whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
        whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
        className="text-white bg-gray-800 hover:bg-gray-900 w-32 h-[40px] rounded-2xl cursor-pointer"
        onClick={clearTeamsHandler}
      >
        Limpar Times
      </motion.button>

      {/*Botão salvar alterações */}
      <motion.button
        whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
        whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
        className="text-white bg-gray-800 hover:bg-gray-900 w-32 h-[40px] rounded-2xl cursor-pointer"
        onClick={() => applyChangesHandler(soccerTeams)}
      >
        Salvar alterações
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
        whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
        className={`text-white ${
          isChartMode ? "bg-amber-400 hover:bg-amber-300" : "bg-gray-800 hover:bg-gray-900"
        } w-32 h-[40px] rounded-2xl  cursor-pointer`}
        onClick={chartHandler}
      >
        {isChartMode ? "Sair" : "Gráfico"}
      </motion.button>

      {/*Botão remover campeonatos*/}
      <motion.button
        whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
        whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
        className={`text-white ${
          isRemovingLeague ? "bg-amber-400 hover:bg-amber-300" : "bg-gray-800 hover:bg-gray-900"
        } w-48 p-4 h-[40px] rounded-2xl flex items-center justify-center cursor-pointer`}
        onClick={removeLeagueHandler}
      >
        {isRemovingLeague ? "Cancelar" : "Remover campeonato"}
      </motion.button>

      {/*Botão adicionar campeonatos*/}
      <motion.div
        whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
        whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
        className="text-white bg-gray-800 hover:bg-gray-900 min-w-32 p-4 h-[40px] rounded-2xl flex items-center justify-center cursor-pointer"
        onClick={addLeagueHandler}
      >
        Adicionar campeonato pela API
      </motion.div>
    </>
  );
}

export default ControlButtons;
