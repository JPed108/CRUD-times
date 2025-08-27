import { useEffect, useState } from "react";
import { useOutletContext, useNavigate, useParams } from "react-router-dom";
import { Library } from "./lib";

function Team() {
  let { soccerTeams, setSoccerTeams } = useOutletContext();
  const { team: selectedTeam } = useParams();
  const isNewTeam = selectedTeam === "NewTeam";

  const team = soccerTeams[selectedTeam];
  const navigate = useNavigate();

  const [isEditMode, setIsEditMode] = useState(false);
  const [draftTeam, setDraftTeam] = useState(team ? { ...team } : {});

  useEffect(() => setIsEditMode(false), [selectedTeam]);

  useEffect(() => {
    if (isNewTeam) {
      setIsEditMode(true);
      setDraftTeam({
        id: 0,
        rank: 0,
        name: "Nome",
        logo: null,
        points: 0,
        group: "Grupo",
        wins: 0,
        draws: 0,
        lose: 0,
        goalsFor: 0,
        goalsAgainst: 0,
      });
    } else if (team) {
      setIsEditMode(false);
      setDraftTeam({ ...team });
    }
  }, [isNewTeam, team]);

  const editButtonHandler = () => {
    if (isNewTeam) {
      const newTeamList = Library.addTeam(soccerTeams, draftTeam);
      setSoccerTeams(newTeamList);
      navigate(
        `/${newTeamList.filter((team) => team.name === draftTeam.name)[0].id}`
      );
    } else if (isEditMode) {
      const newTeamList = Library.editTeam(
        draftTeam.id,
        soccerTeams,
        draftTeam
      );
      setSoccerTeams(newTeamList);
    }
    setIsEditMode(!isEditMode);
  };

  const inputHandler = (key, value) => {
    setDraftTeam({ ...draftTeam, [key]: value });
  };

  if (!isNewTeam && !team) return null;

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col text-left p-2 gap-8 items-start">
        <button
          onClick={() => navigate("/")}
          className="absolute top-2 right-2 text-2xl font-bold text-gray-600 hover:text-black"
        >
          ✕
        </button>

        <div className="flex flex-row items-center">
          {!draftTeam.logo ? (
            <div
              onClick={() => {
                const url = prompt("Entre com o url da imagem:");
                inputHandler("logo", url);
              }}
              className="h-32 w-32 flex flex-wrap items-center justify-center border-gray-400 bg-gray-500"
            >
              Imagem...
            </div>
          ) : (
            <img
              src={draftTeam.logo}
              alt={draftTeam.name}
              className="h-32 w-auto"
            />
          )}

          <textarea
            className={`resize-none text-6xl font-semibold border-none outline-0 w-full pl-4 pt-16 ${
              isEditMode ? `border-2` : ``
            }`}
            readOnly={!isEditMode}
            onChange={(e) => inputHandler("name", e.target.value ?? "")}
            value={draftTeam.name ?? undefined}
          />
        </div>
        <label className="flex items-start text-3xl w-full h-14">
          Colocação:{" "}
          <input
            type="number"
            className="resize-none text-3xl border-none outline-0 w-full pl-4"
            readOnly={!isEditMode}
            onChange={(e) => inputHandler("rank", Number(e.target.value))}
            value={draftTeam.rank ?? undefined}
          />
        </label>
        <label className="flex items-start text-3xl w-full h-14">
          Grupo:{" "}
          <textarea
            className="resize-none text-3xl border-none outline-0 w-full pl-4"
            readOnly={!isEditMode}
            onChange={(e) => inputHandler("group", e.target.value)}
            value={draftTeam.group ?? undefined}
          />
        </label>
        <label className="flex items-start text-3xl w-full h-14">
          Vitórias:{" "}
          <input
            type="number"
            className="resize-none text-3xl border-none outline-0 w-full pl-4"
            readOnly={!isEditMode}
            onChange={(e) => inputHandler("wins", Number(e.target.value))}
            value={draftTeam.wins ?? undefined}
          />
        </label>
        <label className="flex items-start text-3xl w-full h-14">
          Derrotas:{" "}
          <input
            type="number"
            className="resize-none text-3xl border-none outline-0 w-full pl-4"
            readOnly={!isEditMode}
            onChange={(e) => inputHandler("lose", Number(e.target.value))}
            value={draftTeam.lose ?? undefined}
          />
        </label>
        <label className="flex items-start text-3xl w-full h-14">
          Pontos:{" "}
          <input
            type="number"
            className="resize-none text-3xl border-none outline-0 w-full pl-4"
            readOnly={!isEditMode}
            onChange={(e) => inputHandler("points", Number(e.target.value))}
            value={draftTeam.points ?? undefined}
          />
        </label>
      </div>
      <div className="flex justify-evenly">
        <button
          className={`text-white font-semibold  ${
            isEditMode
              ? `bg-green-400 hover:bg-green-500`
              : `bg-amber-400 hover:bg-amber-300`
          } rounded-lg h-10 w-30`}
          onClick={editButtonHandler}
        >
          {" "}
          {isEditMode ? "Salvar" : "Editar time"}
        </button>
        <button className="text-white font-semibold bg-red-400 hover:bg-red-300 rounded-lg h-10 w-30">
          {" "}
          Deletar time
        </button>
      </div>
    </div>
  );
}

export default Team;
