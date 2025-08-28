// netlify/functions/fetchSofa.js
export async function handler(event, context) {
  const res = await fetch(
    "http://www.sofascore.com/api/v1/unique-tournament/325/season/72034/standings/total",
    {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36",
        Accept: "application/json, text/plain, */*",
        "Accept-Language": "en-US,en;q=0.9",
        host: "https://www.sofascore.com/",
        "X-Requested-With": "XMLHttpRequest",
      },
    }
  );

  const data = await res.json();

  return {
    statusCode: 200,
    body: JSON.stringify({
      data,
    }),
  };
}
