// netlify/functions/fetchSofa.js
export async function handler(event, context) {
  const res = await fetch(
    "https://www.betano.bet.br/api/league/phaseStandings?sportId=1&leagueId=10016&gLeagueIds=10016&phaseId=2197105&req=la,s,stnf,c,mb",
    {
      headers: {
        "User-Agent": "HTTPie",
        host: "https://www.betano.bet.br",
      },
    }
  );

  const data = await res.json();

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*", // allows frontend to fetch it
    },
    body: JSON.stringify({
      data,
    }),
  };
}
