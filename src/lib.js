const search = (teams,key) => {
  if (key === "") return teams;
  else return searchFilter(teams, key);
}

const takeN = (str, n) => {
if (str === "") return "";
if (n > 0) return str.slice(0,1)+ takeN(str.slice(1), n-1);
return "";
}

const searchFilter = (teams, key) => teams.filter(team => searchInTeam(team.nome, key));

const searchInTeam = (name, key) => {
  if (name === "" || name.length < key.length) return false;
  const lowerCaseName = name.toLowerCase();
  const lowerCaseKey = key.toLowerCase();
  const checkStr = takeN(lowerCaseName, lowerCaseKey.length);
  return checkStr === lowerCaseKey || searchInTeam(lowerCaseName.slice(1), lowerCaseKey);
}



export const Library = {
  search,
};