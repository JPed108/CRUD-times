// Função assíncrona que chama uma serverless function (proxy) responsável por acessar a API do API-Sports.
// A resposta é então processada e os dados tratados são retornados.

import { Library } from "./lib";

const getTeamsFromAPI = async (soccerTeams, setSoccerTeams, leagues) => {
  console.log(leagues);
  try {
    const res = await Promise.all(
      leagues.map(async (n) => {
        // Map para buscar ambas as ligas
        const response = await fetch(
          `/.netlify/functions/fetchApiData?endpoint=standings&league=${n}&season=2023` // fetch da serverless function.
        );

        if (!response.ok) throw new Error(`Error: ${response.status}`);

        const data = await response.json();
        console.log(data);
        return data;
      })
    );

    //Torna a lista com as respostas da API em uma lista de times
    const flattenedTeams = res.reduce((acc, x, index) => {
      const list = x.response[0].league.standings[0];
      return [...acc, ...list];
    }, []);

    //Trata a resposta da API para obter as informações mais importantes
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

    // Atualiza o estado soccerTeams com a lista de times recebida da API
    const fullListOfTeams = Library.addLeague(soccerTeams, listOfTeams);
    setSoccerTeams(fullListOfTeams);
  } catch (err) {
    console.error("Fetch error:", err);
  }
};

const getLeaguesFromApi = async (setLeagues) => {
  try {
    const response = await fetch(
      `/.netlify/functions/fetchApiData?endpoint=leagues?code=br`
    );

    if (!response.ok) {
      console.error("HTTP error:", response.status);
      return;
    }

    const { response: data } = await response.json();
    const leagues = data.map((league) => {
      const out = {
        id: league.league.id,
        name: league.league.name,
        logo: league.league.logo,
      };
      return out;
    });
    setLeagues(leagues);
    localStorage.setItem("STORAGE::LEAGUES", JSON.stringify(leagues));
  } catch (err) {
    console.error("Fetch error:", err);
  }
};

export const GetApiData = {
  getTeamsFromAPI,
  getLeaguesFromApi,
};
