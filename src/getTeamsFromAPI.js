const getTeamsFromAPI = async (setSoccerTeams) => {
  try {
    const leagues = [71, 72];
    const res = await Promise.all(
      leagues.map(async (n) => {
        const response = await fetch(
          `/.netlify/functions/fetchApiData?league=${n}&season=2023`
        );

        if (!response.ok) throw new Error(`Error: ${response.status}`);

        const data = await response.json();
        return data;
      })
    );

    const flattenedTeams = res.reduce((acc, x) => {
      const list = x.response[0].league.standings[0];
      return [...acc, ...list];
    }, []);

    console.log(flattenedTeams);

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
  } catch (err) {
    console.error("Fetch error:", err);
  }
};

export default getTeamsFromAPI;
