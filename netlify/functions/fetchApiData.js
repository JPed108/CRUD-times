export async function handler(event, context) {
  const apiKey = process.env.API_KEY;

  const { league, season } = event.queryStringParameters;

  const response = await fetch(
    `https://v3.football.api-sports.io/standings?league=${league}&season=${season}`,
    {
      method: "GET",
      headers: { "x-apisports-key": apiKey },
    }
  );
  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
}
