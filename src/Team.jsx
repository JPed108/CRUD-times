import { useEffect, useState } from "react";
import { useOutletContext, useNavigate, useParams } from "react-router-dom";
import { Library } from "./lib";

function Team(){

  let {soccerTeams, selectedTeam, setSoccerTeams} = useOutletContext();
  const team = soccerTeams[selectedTeam]
  const navigate = useNavigate();

  const [isEditMode, setIsEditMode] = useState(false);
  const [draftTeam, setDraftTeam] = useState({...team})

  useEffect(()=>setIsEditMode(false), [selectedTeam])
  useEffect(() => setDraftTeam({...team}), [team])

  const editButtonHandler = () => {
    if(isEditMode){
      const newTeamList = Library.editTeam(draftTeam.id, soccerTeams, draftTeam);
      setSoccerTeams(newTeamList);
    }
    setIsEditMode(!isEditMode);
  }

  const inputHandler = (key, value) => {
    setDraftTeam({...draftTeam, [key]:value})
  }

  if (!team) return null;

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col text-left p-2 gap-8 items-start">
        <button onClick={() => navigate('/')} className="absolute top-2 right-2 text-2xl font-bold text-gray-600 hover:text-black">✕</button>
        
        <div className="flex flex-row items-center"><img src={draftTeam.imageUrl} alt={draftTeam.name} className="h-32 w-auto" /><textarea className="resize-none text-6xl font-semibold border-none outline-0 w-full pl-4 pt-16" readOnly={!isEditMode} onChange={(e)=>inputHandler("nome", e.target.value)} value={draftTeam.nome}/></div>
        <label className="flex items-start text-3xl w-full h-15">Cidade: <textarea className="resize-none text-3xl border-none outline-0 w-full pl-4" readOnly={!isEditMode} onChange={(e)=>inputHandler("cidade", e.target.value)} value={draftTeam.cidade}/></label>
        <label className="flex items-start text-3xl w-full h-15">Estádio: <textarea className="resize-none text-3xl border-none outline-0 w-full pl-4" readOnly={!isEditMode} onChange={(e)=>inputHandler("estadio", e.target.value)} value={draftTeam.estadio}/></label>
        <label className="flex items-start text-3xl w-full h-15">Títulos: <input type="number" className="resize-none text-3xl border-none outline-0 w-full pl-4" readOnly={!isEditMode} onChange={(e)=>inputHandler("titulosNacionais", e.target.value)} value={draftTeam.titulosNacionais}/></label>
        <label className="flex items-start text-3xl w-full h-15">Mascote: <textarea className="resize-none text-3xl border-none outline-0 w-full pl-4" readOnly={!isEditMode} onChange={(e)=>inputHandler("mascote", e.target.value)} value={draftTeam.mascote}/></label>
        <label className="flex items-start text-3xl w-full min-h-16 max-h-32">Curiosidade: <textarea className="resize-none text-3xl border-none outline-0 w-full pl-4 overflow-x-auto" readOnly={!isEditMode} onChange={(e)=>inputHandler("curiosidade", e.target.value)} value={draftTeam.curiosidade}/></label>
      
      </div>
      <div className="flex justify-evenly">
        <button className="text-white font-semibold bg-amber-400 hover:bg-amber-300 rounded-lg h-10 w-30" onClick={editButtonHandler}> {isEditMode?"Salvar":"Editar time"}</button>
        <button className="text-white font-semibold bg-red-400 hover:bg-red-300 rounded-lg h-10 w-30"> Deletar time</button>
      </div>
      
    </div>
)
}

export default Team;