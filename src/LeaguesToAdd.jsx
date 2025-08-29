import { useEffect, useMemo, useState } from "react";
import { GetApiData } from "./getApiData";
import { motion } from "motion/react";
import { Library } from "./lib";

function Modal({ onClose, soccerTeams, setSoccerTeams }) {
  const [leagues, setLeagues] = useState([]);
  const [selectedLeagues, setSelectedLeagues] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const storedLeagues = localStorage.getItem("STORAGE::LEAGUES");
    if (!storedLeagues) {
      GetApiData.getLeaguesFromApi(setLeagues);
      console.log("Fetching leagues...");
    } else {
      console.log("Leagues found in storage.");
      setLeagues(JSON.parse(storedLeagues));
    }
  }, []);

  const leagueClickHandler = (n) => {
    setSelectedLeagues((last) =>
      last.includes(n) ? last.filter((x) => x !== n) : [...last, n]
    );
  };

  const addLeaguesHandler = () => {
    GetApiData.getTeamsFromAPI(soccerTeams, setSoccerTeams, selectedLeagues);
    onClose();
  };

  const inputHandler = (e) => {
    const text = e.target.value;
    setSearchText(text);
  };

  const findLeagueWithKey = (leagues, key) => {
    if (key === "") return leagues;
    return Library.search(leagues, key);
  };

  const displayLeagues = findLeagueWithKey(leagues, searchText);

  const list = () => (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center bg-black/50 z-50"
      onClick={onClose}
    >
      <div
        className="relative w-[50%] h-[6%] rounded-t-2xl bg-gray-800 flex items-center justify-start"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          type="text"
          id="search_bar"
          className="bg-gray-300 border border-gray-300 text-gray-900 rounded-lg ml-[5%] w-[20%] pl-2 h-8"
          placeholder="Pesquisar campeonato..."
          onChange={inputHandler}
        />
        <button
          onClick={onClose}
          className="absolute top-1 right-3 text-gray-500 hover:text-gray-700"
        >
          ✖
        </button>
      </div>
      <div
        className="max-h-1/2 w-[50%] overflow-y-auto overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gray-800 p-6 relative flex flex-col gap-4">
          {displayLeagues.map((league) => (
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className={`flex flex-row w-full items-center gap-4 text-2xl rounded-2xl bg-gray-700 hover:bg-gray-600 overflow-hidden shadow-lg ${
                selectedLeagues.includes(league.id)
                  ? `border-4 border-emerald-600`
                  : ""
              }`}
              key={league.id}
              onClick={() => leagueClickHandler(league.id)}
            >
              <img src={league.logo} alt={league.league} className="h-15" />
              <div>{league.name}</div>
            </motion.div>
          ))}
        </div>
      </div>
      <div
        className="w-[50%] h-[10%] rounded-b-2xl bg-gray-800 flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <motion.div
          className="rounded-lg h-10 w-30 bg-green-500 hover:bg-green-400 flex items-center justify-center font-extrabold text-white"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.1 }}
          onClick={addLeaguesHandler}
        >
          Adicionar
        </motion.div>
      </div>
    </div>
  );

  return list();
}

export default Modal;
