import { useState, useEffect, useMemo } from "react";
import { AnimatePresence, isPrimaryPointer, motion } from "motion/react";
import { Link } from "react-router-dom";
import { Library } from "./lib";

function ListOfTeams({ teams, setSelectedTeam }) {
  const teamsByLeague = useMemo(
    () => Library.separateTeamsIntoLeagues(teams),
    [teams]
  );

  const [nLeagues, setNLeagues] = useState(teamsByLeague.length);
  const [isOpen, setIsOpen] = useState([]);

  useEffect(() => {
    if (teamsByLeague.length !== nLeagues || isOpen.length === 0) {
      setIsOpen(new Array(teamsByLeague.length).fill(false));
      setNLeagues(teamsByLeague.length);
    }
  }, [teamsByLeague]);

  const clickHandler = (id) => {
    console.log("CLICK");
    const toggle = isOpen.map((value, index) => {
      if (index === id) return !value;
      return value;
    });
    console.log(toggle);
    setIsOpen(toggle);
  };

  const list = teamsByLeague.map((league, index) => (
    <div key={league.id}>
      <motion.div key={league.id} whileHover={{ scale: 1.05 }}>
        <div
          className="border-4 rounded-2xl cursor-pointer bg-gray-800 hover:bg-gray-900 font-semibold text-2xl mb-5"
          onClick={() => clickHandler(index)}
        >
          {league.league}
        </div>
      </motion.div>

      <div className="flex flex-row flex-wrap gap-5 items-start">
        <AnimatePresence>
          {isOpen[index] &&
            league.teams.map((team) => (
              <Link
                key={team.name}
                className="h-30 aspect-square rounded-2xl border-2 flex flex-col items-center justify-evenly bg-gray-800 text-white cursor-pointer hover:bg-gray-900"
                to={`/${team.id}`}
                onClick={() => setSelectedTeam(team.id)}
              >
                <img
                  src={team.logo}
                  alt={team.name}
                  className="w-14 h-auto pt-2"
                />
                {team.name}
              </Link>
            ))}
        </AnimatePresence>
      </div>
    </div>
  ));
  return list;
}

export default ListOfTeams;
