import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Library } from "./lib";

function ControlButtons({ setSelectedTeam, setSoccerTeams, soccerTeams }) {
  const navigate = useNavigate();

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
    setSoccerTeams([]);
  };

  const saveTeamsHandler = (teams) => {
    if (teams.length === 0) Library.clearTeams();
    else Library.saveTeams(teams);
  };

  const chartHandler = async () => {
    const res = await fetch("/.netlify/functions/fetchSofa");
    const data = await res.text();
    console.log(data);
  };

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
        whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
        className="text-white bg-gray-800 hover:bg-gray-900 w-32 h-[40px] rounded-2xl flex items-center justify-center"
        onClick={() => {
          navigate(`/team/NewTeam`);
        }}
      >
        Adicionar Time
      </motion.div>

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

      <motion.button
        whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
        whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
        className="text-white bg-gray-800 hover:bg-gray-900 w-32 h-[40px] rounded-2xl"
        onClick={() => saveTeamsHandler(soccerTeams)}
      >
        Salvar alterações
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
        whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
        className="text-white bg-gray-800 hover:bg-gray-900 w-32 h-[40px] rounded-2xl"
        onClick={chartHandler}
      >
        Gráfico
      </motion.button>
    </>
  );
}

export default ControlButtons;
