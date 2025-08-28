// netlify/functions/fetchSofa.js
export async function handler(event, context) {
  const res = await fetch(
    "http://www.sofascore.com/api/v1/unique-tournament/325/season/72034/standings/total",
    {
      headers: {
        "User-Agent": "HTTPie",
        host: "http://www.sofascore.com/",
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
