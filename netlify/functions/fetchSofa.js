// netlify/functions/fetchSofa.js
export async function handler(event, context) {
  try {
    const res = await fetch(
      "https://www.sofascore.com/api/v1/unique-tournament/325/season/72034/standings/total"
    );

    const data = await res.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // lets frontend read it
      },
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}
