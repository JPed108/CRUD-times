import { useState, useEffect, useMemo } from "react";
import { AnimatePresence, isPrimaryPointer, motion } from "motion/react";
import { Link } from "react-router-dom";
import { Library } from "./lib";

function ListOfTeams({ teams, setSelectedTeam, isSearching }) {
  const teamsByLeague = useMemo(
    () => Library.separateTeamsIntoLeagues(teams),
    [teams]
  );

  const [nLeagues, setNLeagues] = useState(teamsByLeague.length);
  const [isOpen, setIsOpen] = useState([]);
  const [backupIsOpen, setBackupIsOpen] = useState([]);

  useEffect(() => {
    if (
      (teamsByLeague.length !== nLeagues || isOpen.length === 0) &&
      !isSearching
    ) {
      setIsOpen(new Array(teamsByLeague.length).fill(false));
      setNLeagues(teamsByLeague.length);
    }
  }, [teamsByLeague]);

  useEffect(() => {
    if (isSearching) {
      setBackupIsOpen(isOpen);
      setIsOpen(isOpen.map(() => true));
    } else {
      setIsOpen([...backupIsOpen]);
    }
  }, [isSearching]);

  const clickHandler = (id) => {
    const toggle = isOpen.map((value, index) => {
      if (index === id) return !value;
      return value;
    });
    setIsOpen(toggle);
  };

  /*Lista de times por liga*/
  const list = teamsByLeague.map((league, index) => (
    <div key={league.id}>
      <motion.div
        key={league.id}
        whileHover={{ scale: 1.05 }}
        className="rounded-2xl cursor-pointer bg-gray-800 hover:bg-gray-900 font-semibold text-2xl mb-5"
        onClick={() => clickHandler(index)}
      >
        {/*Nome da liga*/}
        {league.league}
      </motion.div>

      {/*Container dos times*/}
      <div className="flex flex-row flex-wrap gap-5 items-start">
        {
          <motion.div
            key="expand"
            layout
            initial={{
              height: 0,
              transition: { duration: 0.2, ease: "easeInOut" },
            }}
            animate={{ height: isOpen[index] ? "auto" : 0, opacity: 1 }}
            exit={{ height: 0, opacity: 1 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden w-full"
          >
            {/*Link de cada time*/}
            <div className="  gap-4 flex flex-wrap justify-start">
              {league.teams.map((team) => (
                <motion.div
                  key={team.id}
                  layout
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="bg-gray-800 text-white rounded-3xl overflow-hidden"
                >
                  <Link
                    key={team.name}
                    className="h-32 aspect-square flex flex-col items-center justify-evenly bg-gray-800 text-white cursor-pointer hover:bg-gray-900"
                    to={`/team/${team.id}`}
                    onClick={() => setSelectedTeam(team.id)}
                  >
                    <img
                      src={team.logo}
                      alt={team.name}
                      className="w-14 h-auto pt-2"
                    />
                    {team.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        }
      </div>
    </div>
  ));
  return list;
}

export default ListOfTeams;
