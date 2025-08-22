
import { useParams, useOutletContext, useNavigate } from "react-router-dom";

function Team(){
  const team = useOutletContext();
  const navigate = useNavigate();


  if (!team) return null;

  return (
  <div className="flex flex-col text-left p-2 gap-8 items-start">
     <button
        onClick={() => navigate('/')}
        className="absolute top-2 right-2 text-2xl font-bold text-gray-600 hover:text-black"
      >
        ✕
      </button>
    <div className="text-6xl">{team.nome}</div>
    <div className="text-3xl">Cidade: {team.cidade}</div>
    <div className="text-3xl">Estádio: {team.estadio}</div>
    <div className="text-3xl">Títulos nacionais: {team.titulosNacionais}</div>
    <div className="text-3xl">Mascote: {team.mascote}</div>
    <div className="text-3xl">Curiosidade: {team.curiosidade}</div>
  </div>
)
}

export default Team;