/* Funções do CRUD*/
//Chave do localStorage para armazenamento da lista de times
const STORAGE_KEY = "storage::teams";
const loadTeams = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : null;
};

//Funções de salvar, deletar, adicionar e editar times na lista e limpar a lista de times.

const saveTeams = (teams) => {
  if (teams.length > 0) localStorage.setItem(STORAGE_KEY, JSON.stringify(teams));
};

const deleteTeam = (teams, teamId) => teams.filter((t) => t.id !== teamId);

const addTeam = (teams, newTeam) => {
  const newId = teams.length > 0 ? teams[teams.length - 1].id + 1 : 0;
  return [...teams, { ...newTeam, id: newId }];
};

const addLeague = (currentTeams, teamsToAdd) => {
  const newTeams = [...currentTeams, ...teamsToAdd];
  const newTeamsCorrectId = recalculateIds(newTeams);
  return newTeamsCorrectId;
};

const removeLeague = (teams, league) => teams.filter((x) => x.group !== league);

const editTeam = (id, list, newValue) => list.map((time) => (time.id === id ? newValue : time));

const clearTeams = () => {
  localStorage.removeItem(STORAGE_KEY);
};

const sort = (teams, key) => {
  return teams.toSorted((a, b) => b[key] - a[key]);
};

//Função utilizada para recalcular os IDs dos times.
const recalculateIds = (teams) => teams.map((team, index) => ({ ...team, id: index }));

//Funções utilizadas para pesquisa de um time utilizando uma string
const search = (teams, str) => {
  if (str === "") return teams;
  else return searchFilter(teams, str);
};

const searchFilter = (teams, str) => {
  return teams.filter((team) => searchKeyInTeamName(team.name, str));
};

const searchKeyInTeamName = (name, str) => {
  if (name === "" || name.length < str.length) return false;
  const lowerCaseName = name.toLowerCase();
  const lowerCaseKey = str.toLowerCase();
  const checkStr = lowerCaseName.slice(0, lowerCaseKey.length);
  return checkStr === lowerCaseKey || searchKeyInTeamName(lowerCaseName.slice(1), lowerCaseKey);
};

//Funções utilizadas para separar os times em ligas.

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
  addLeague,
  removeLeague,
  clearTeams,
  sort,
  recalculateIds,
  separateTeamsIntoLeagues,
};
