import { useEffect, useState } from "react";
import { useOutletContext, useNavigate, useParams, useLocation } from "react-router-dom";
import { Library } from "./lib";
import { motion, AnimatePresence } from "motion/react";

//Componente que mostra o time e as estatísticas.
function Team() {
  let { soccerTeams, setSoccerTeams } = useOutletContext();
  // Desestrutura o objeto retornado por useParams para obter o time selecionado
  // Ex.: { team: "0" } => selectedTeam = "0"
  const { team: selectedTeam } = useParams();

  //Se o usuário for criar um novo time, isNewTeam é verdade.
  const isNewTeam = selectedTeam === "NewTeam";

  //Busca o time selecionado na lista de times.
  const team = soccerTeams[selectedTeam];
  //Função para navegar para outra página
  const navigate = useNavigate();

  const [isEditMode, setIsEditMode] = useState(false);
  const [draftTeam, setDraftTeam] = useState(team ? { ...team } : {});

  useEffect(() => {
    if (isNewTeam) {
      // Time vazio para ser preenchido
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
      // Sai do modo de edição e cria um novo objeto com o time selecionado.
      setIsEditMode(false);
      setDraftTeam({ ...team });
    }
  }, [isNewTeam, team]);

  // Handler do botão "Editar time":
  // Se for um novo time, adiciona à lista e navega para a página do time
  // Se estiver editando um time existente, atualiza o time na lista
  // Alterna o modo de edição ao final
  const editButtonHandler = () => {
    if (isNewTeam) {
      const newTeamList = Library.addTeam(soccerTeams, draftTeam);
      setSoccerTeams(newTeamList);
      navigate(`/team/${newTeamList.filter((team) => team.name === draftTeam.name)[0].id}`);
    } else if (isEditMode) {
      const newTeamList = Library.editTeam(draftTeam.id, soccerTeams, draftTeam);
      setSoccerTeams(newTeamList);
    }
    setIsEditMode(!isEditMode);
  };

  //Handler do botão "Deletar time"
  //Remove o time selecionado da lista de times.
  const deleteButtonHandler = () => {
    const unorderedTeamList = Library.deleteTeam(soccerTeams, draftTeam.id);
    const newTeamList = Library.recalculateIds(unorderedTeamList);
    setSoccerTeams(newTeamList);
  };

  //Modifica a propriedade do draftTeam com o valor informado.
  const inputHandler = (key, value) => {
    setDraftTeam({ ...draftTeam, [key]: value });
  };

  // Não renderiza nada se não for um novo time e nenhum time estiver selecionado
  if (!isNewTeam && !team) return null;

  return (
    <motion.div
      key={selectedTeam}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-10"
    >
      <div className="flex flex-col text-left p-2 gap-8 items-start w-full">
        <button
          onClick={() => navigate("/")}
          className="fixed top-2 right-2 text-2xl font-bold text-gray-600 hover:text-black"
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
            <img src={draftTeam.logo} alt={draftTeam.name} className="h-32 w-auto" />
          )}

          <textarea
            className={`resize-none text-6xl font-semibold border-none outline-0 w-full pl-4 pt-16 ${
              isEditMode ? `border-2` : ``
            }`}
            readOnly={!isEditMode}
            onChange={(e) => inputHandler("name", e.target.value ?? "")}
            value={draftTeam.name ?? ""}
          />
        </div>
        <label className="flex items-start text-3xl w-full h-14">
          Colocação:{" "}
          <input
            type="number"
            className="resize-none text-3xl border-none outline-0 w-full pl-4"
            readOnly={!isEditMode}
            onChange={(e) => inputHandler("rank", Number(e.target.value))}
            value={draftTeam.rank ?? 0}
          />
        </label>
        <label className="flex items-start text-3xl w-full h-14">
          Grupo:{" "}
          <textarea
            className="resize-none text-3xl border-none outline-0 w-full pl-4"
            readOnly={!isEditMode}
            onChange={(e) => inputHandler("group", e.target.value)}
            value={draftTeam.group ?? ""}
          />
        </label>
        <label className="flex items-start text-3xl w-full h-14">
          Vitórias:{" "}
          <input
            type="number"
            className="resize-none text-3xl border-none outline-0 w-full pl-4"
            readOnly={!isEditMode}
            onChange={(e) => inputHandler("wins", Number(e.target.value))}
            value={draftTeam.wins ?? 0}
          />
        </label>
        <label className="flex items-start text-3xl w-full h-14">
          Derrotas:{" "}
          <input
            type="number"
            className="resize-none text-3xl border-none outline-0 w-full pl-4"
            readOnly={!isEditMode}
            onChange={(e) => inputHandler("lose", Number(e.target.value))}
            value={draftTeam.lose ?? 0}
          />
        </label>
        <label className="flex items-start text-3xl w-full h-14">
          Pontos:{" "}
          <input
            type="number"
            className="resize-none text-3xl border-none outline-0 w-full pl-4"
            readOnly={!isEditMode}
            onChange={(e) => inputHandler("points", Number(e.target.value))}
            value={draftTeam.points ?? 0}
          />
        </label>
      </div>
      <div className="flex justify-evenly">
        <button
          className={`text-white font-semibold  ${
            isEditMode ? `bg-green-400 hover:bg-green-500` : `bg-amber-400 hover:bg-amber-300`
          } rounded-lg h-10 w-30`}
          onClick={editButtonHandler}
        >
          {" "}
          {isEditMode ? "Salvar" : "Editar time"}
        </button>
        <button
          onClick={deleteButtonHandler}
          className="text-white font-semibold bg-red-400 hover:bg-red-300 rounded-lg h-10 w-30"
        >
          {" "}
          Deletar time
        </button>
      </div>
    </motion.div>
  );
}

export default Team;
