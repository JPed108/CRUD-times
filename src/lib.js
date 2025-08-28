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

const takeN = (str, n) => {
  if (str === "") return "";
  if (n > 0) return str.slice(0, 1) + takeN(str.slice(1), n - 1);
  return "";
};

const searchFilter = (teams, key) =>
  teams.filter((team) => searchInTeam(team.name, key));

const searchInTeam = (name, key) => {
  if (name === "" || name.length < key.length) return false;
  const lowerCaseName = name.toLowerCase();
  const lowerCaseKey = key.toLowerCase();
  const checkStr = takeN(lowerCaseName, lowerCaseKey.length);
  return (
    checkStr === lowerCaseKey ||
    searchInTeam(lowerCaseName.slice(1), lowerCaseKey)
  );
};

const editTeam = (id, list, newValue) =>
  list.map((time) => (time.id === id ? newValue : time));

const hasOnList = ([x, ...xs], n) => {
  if (x === undefined) return false;
  return x === n || hasOnList(xs, n);
};

const uniqueLeagues = (arrayOfTeams) => {
  return arrayOfTeams.reduce((acc, n) => {
    const group = n.group;
    if (!hasOnList(acc, group)) return [...acc, group];
    return acc;
  }, []);
};

const getTeamsFromAPI = async (key, setSoccerTeams) => {
  try {
    const endpoint = (n) =>
      `https://v3.football.api-sports.io/standings?league=${n}&season=2023`;
    const leagues = [71, 72];

    const res = await Promise.all(
      leagues.map(async (n) => {
        const response = await fetch(endpoint(n), {
          method: "GET",
          headers: { "x-apisports-key": key },
        });

        if (!response.ok) throw new Error(`Error: ${response.status}`);

        const data = await response.json();
        return data;
      })
    );

    const flattenedTeams = res.reduce((acc, x) => {
      const list = x.response[0].league.standings[0];
      return [...acc, ...list];
    }, []);

    const listOfTeams = flattenedTeams.map((team, index) => {
      const out = {
        id: index,
        rank: team.rank,
        name: team.team.name,
        logo: team.team.logo,
        points: team.points,
        group: team.group,
        wins: team.all.win,
        draws: team.all.draw,
        lose: team.all.lose,
        goalsFor: team.all.goals.for,
        goalsAgainst: team.all.goals.against,
      };

      return out;
    });

    setSoccerTeams(listOfTeams);
    saveTeams(listOfTeams);
  } catch (err) {
    console.error("Fetch error:", err);
  }
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

async function testFn() {
  try {
    console.log("Entering");
    const res1 = await fetch(
      "https://www.sofascore.com/api/v1/unique-tournament/325/season/72034/standings/total",
      {
        method: "GET",
        headers: {
          Host: "www.sofascore.com",
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "same-origin",
        },
      }
    );
    const response = await res1.json();

    console.log("response:", response);
  } catch (err) {
    console.error("Error fetching data:", err);
  }
}

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
  getTeamsFromAPI,
  testFn,
};
