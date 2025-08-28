const STORAGE_KEY = "storage::teams";

const loadTeams = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : null;
};

const saveTeams = (teams) => {
  if (teams.length > 0)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(teams));
};

const clearTeams = () => {
  localStorage.removeItem(STORAGE_KEY);
};

const deleteTeam = (teams, teamId) => teams.filter((t) => t.id !== teamId);

const recalculateIds = (teams) =>
  teams.map((team, index) => ({ ...team, id: index }));

const addTeam = (teams, newTeam) => {
  const newId = teams.length > 0 ? teams[teams.length - 1].id + 1 : 0;
  return [...teams, { ...newTeam, id: newId }];
};

const search = (teams, key) => {
  if (key === "") return teams;
  else return searchFilter(teams, key);
};

const searchFilter = (teams, key) =>
  teams.filter((team) => searchInTeam(team.name, key));

const searchInTeam = (name, key) => {
  if (name === "" || name.length < key.length) return false;
  const lowerCaseName = name.toLowerCase();
  const lowerCaseKey = key.toLowerCase();
  const checkStr = lowerCaseName.slice(0, lowerCaseKey.length);
  return (
    checkStr === lowerCaseKey ||
    searchInTeam(lowerCaseName.slice(1), lowerCaseKey)
  );
};

const editTeam = (id, list, newValue) =>
  list.map((time) => (time.id === id ? newValue : time));

const uniqueLeagues = (arrayOfTeams) => {
  return arrayOfTeams.reduce((acc, n) => {
    const group = n.group;
    if (!acc.includes(group)) return [...acc, group];
    return acc;
  }, []);
};

const separateTeamsIntoLeagues = (teams) => {
  const unique = uniqueLeagues(teams);
  const teamsByLeague = unique.map((n, index) => {
    const out = {
      id: index,
      league: n,
      teams: teams.filter((team) => team.group === n),
    };
    return out;
  });
  return teamsByLeague;
};

export const Library = {
  search,
  editTeam,
  saveTeams,
  loadTeams,
  deleteTeam,
  addTeam,
  clearTeams,
  recalculateIds,
  separateTeamsIntoLeagues,
};
