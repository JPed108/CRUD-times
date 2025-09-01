import { useState, useEffect, useMemo } from "react";
import { AnimatePresence, isPrimaryPointer, motion } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import { Library } from "./lib";

function ListOfTeams({
  soccerTeams,
  setSoccerTeams,
  isRemovingLeague,
  isLeagueOpen,
  setIsLeagueOpen,
  isChartMode,
  teamsForChart,
  setTeamsForChart,
}) {
  const [searchText, setSearchText] = useState("");

  const [backupIsOpen, setBackupIsOpen] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  //Função responsável por filtrar os times pelo nome
  const displayTeams = searchText === "" ? soccerTeams : Library.search(soccerTeams, searchText);

  // Separa os times por liga usando a função separateTeamsIntoLeagues.
  // O useMemo garante que a separação só seja recalculada quando displayTeams mudar,
  // evitando chamadas desnecessárias a cada re-renderização.
  const teamsByLeague = useMemo(() => Library.separateTeamsIntoLeagues(displayTeams), [displayTeams]);

  //Efeito executado quando isSearching muda.
  //Ao iniciar uma pesquisa, o estado das janelas dos campeonatos é salvo e em seguida são abertas.
  //Ao encerrar a pesquisa, o estado anterior é restaurado.
  useEffect(() => {
    if (isSearching) {
      setBackupIsOpen(isLeagueOpen);
      setIsLeagueOpen(isLeagueOpen.map(() => true));
    } else {
      setIsLeagueOpen([...backupIsOpen]);
    }
  }, [isSearching]);

  const navigate = useNavigate();

  // Handler dos botões de cada campeonato.
  // - Caso o modo de remoção não esteja ativo, alterna o estado do campeonato clicado.
  // - Caso o modo de remoção esteja ativo, remove o campeonato correspondente da lista de times.
  const clickHandler = (id, leagueName) => {
    if (!isRemovingLeague) {
      const toggle = isLeagueOpen.map((value, index) => {
        if (index === id) return !value;
        return value;
      });
      setIsLeagueOpen(toggle);
    } else {
      const filteredTeams = Library.removeLeague(soccerTeams, leagueName);
      setSoccerTeams(filteredTeams);
      console.log(filteredTeams);
    }
  };

  //Handler da caixa de pesquisa
  const inputHandler = (e) => {
    const text = e.target.value;
    setSearchText(text);
    setIsSearching(text.length > 0);
  };

  //Controla o clique em cada botão dos times.
  // Se não estiver em modo de gráfico, navega para a página do time.
  // Em modo de gráfico, seleciona os times que serão inseridos no gráfico

  const teamClickHandler = (team) => {
    if (!isChartMode) {
      navigate(`/team/${team.id}`);
    } else {
      const id = team.id;
      const listOfTeamsForChart = teamsForChart.includes(id)
        ? teamsForChart.filter((t) => t !== id)
        : [...teamsForChart, id];
      setTeamsForChart(listOfTeamsForChart);
      console.log(teamsForChart);
    }
  };

  //Número de campeonatos.
  //Usado para definir o tamanho da lista isOpen.
  const [nLeagues, setNLeagues] = useState(teamsByLeague.length);
  useEffect(() => {
    if ((teamsByLeague.length !== nLeagues || isLeagueOpen.length === 0) && !isSearching) {
      setIsLeagueOpen(new Array(teamsByLeague.length).fill(false));
      setNLeagues(teamsByLeague.length);
    }
  }, [teamsByLeague]);

  return (
    <div className="flex flex-col gap-4">
      {/*Barra de pesquisa de times*/}
      <input
        type="text"
        id="search_bar"
        onChange={inputHandler}
        className="bg-gray-300 border border-gray-300 text-gray-900 rounded-lg w-[50%] h-8 pl-2 mb-4"
        placeholder="Pesquisar time..."
      />
      {/*Botões dos campeonatos*/}
      {teamsByLeague.map((league, index) => (
        <div key={league.id}>
          <motion.div
            key={league.id}
            whileHover={{ scale: 1.05 }}
            className={`rounded-2xl cursor-pointer font-semibold text-2xl mb-5  ${
              isRemovingLeague ? "bg-red-600 hover:bg-red-500" : "bg-gray-800 hover:bg-gray-900"
            } `}
            onClick={() => clickHandler(index, league.league)}
          >
            {league.league}
          </motion.div>

          {/*Container dos times. Inicia com altura 0 e, quando o isOpen correspontende torna verdade, o motion.div anima a expansão*/}
          <div className="flex flex-row flex-wrap gap-5 items-start">
            {
              <motion.div
                key="expand"
                layout
                initial={{
                  height: 0,
                  transition: { duration: 0.2, ease: "easeInOut" },
                }}
                animate={{ height: isLeagueOpen[index] ? "auto" : 0, opacity: 1 }}
                exit={{ height: 0, opacity: 1 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="overflow-hidden w-full"
              >
                {/*Link de cada time, que leva para a página correspondente*/}
                <div className="  gap-4 flex flex-wrap justify-start">
                  {league.teams.map((team) => (
                    <motion.div
                      key={team.id}
                      layout
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.1, ease: "easeInOut" }}
                      className={`bg-gray-800 text-white rounded-3xl overflow-hidden  ${
                        isChartMode && teamsForChart.includes(team.id) ? "ring-2 ring-green-400" : ""
                      }`}
                    >
                      <div
                        key={team.name}
                        className="h-32 aspect-square flex flex-col items-center justify-evenly  text-white cursor-pointer bg-gray-800 hover:bg-gray-900"
                        onClick={() => teamClickHandler(team)}
                      >
                        <img src={team.logo} alt={team.name} loading="lazy" className="w-14 h-auto pt-2" />
                        {team.name}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            }
          </div>
        </div>
      ))}
    </div>
  );
}

export default ListOfTeams;
