export async function handler(event, context) {
  const apiKey = process.env.API_KEY;

  const { endpoint, league, season, code } = event.queryStringParameters;

  const params = new URLSearchParams();
  if (league) params.append("league", league);
  if (season) params.append("season", season);
  if (code) params.append("code", code);

  let url = `https://v3.football.api-sports.io/${endpoint}`;

  if (params.toString()) {
    url += `?${params.toString()}`;
  }

  const response = await fetch(url, {
    method: "GET",
    headers: { "x-apisports-key": apiKey },
  });
  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
}
