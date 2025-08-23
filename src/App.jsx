import { useState } from 'react'
import { Link, Outlet} from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Library } from './lib'

function App() {

const initialTeams = [
  {
    id: 0,
    nome: "Flamengo",
    cidade: "Rio de Janeiro",
    estadio: "Maracanã",
    titulosNacionais: 7,
    mascote: "Urubu",
    curiosidade: "É um dos clubes mais populares do Brasil, com milhões de torcedores espalhados pelo país."
  },
  {
    id: 1,
    nome: "Palmeiras",
    cidade: "São Paulo",
    estadio: "Allianz Parque",
    titulosNacionais: 11,
    mascote: "Periquito",
    curiosidade: "Conhecido como 'Verdão', tem uma das maiores torcidas organizadas do Brasil."
  },
  {
    id: 2,
    nome: "Corinthians",
    cidade: "São Paulo",
    estadio: "Neo Química Arena",
    titulosNacionais: 7,
    mascote: "Mosqueteiro",
    curiosidade: "Venceu o Mundial de Clubes da FIFA em 2012."
  },
  {
    id: 3,
    nome: "São Paulo",
    cidade: "São Paulo",
    estadio: "Morumbi",
    titulosNacionais: 6,
    mascote: "Soberano",
    curiosidade: "É tricampeão da Copa Libertadores e Mundial de Clubes da FIFA."
  },
  {
    id: 4,
    nome: "Grêmio",
    cidade: "Porto Alegre",
    estadio: "Arena do Grêmio",
    titulosNacionais: 2,
    mascote: "Mosqueteiro",
    curiosidade: "Foi campeão da Copa Libertadores da América três vezes."
  },
  {
    id: 5,
    nome: "Internacional",
    cidade: "Porto Alegre",
    estadio: "Beira-Rio",
    titulosNacionais: 3,
    mascote: "Saci",
    curiosidade: "É conhecido pelo apelido 'Colorado' e tem duas Libertadores no currículo."
  },
  {
    id: 6,
    nome: "Atlético Mineiro",
    cidade: "Belo Horizonte",
    estadio: "Mineirão",
    titulosNacionais: 3,
    mascote: "Galo",
    curiosidade: "O 'Galo' venceu a Copa Libertadores em 2013."
  },
  {
    id: 7,
    nome: "Cruzeiro",
    cidade: "Belo Horizonte",
    estadio: "Mineirão",
    titulosNacionais: 4,
    mascote: "Raposa",
    curiosidade: "Foi campeão da Copa Libertadores em 1976 e 1997."
  },
  {
    id: 8,
    nome: "Vasco da Gama",
    cidade: "Rio de Janeiro",
    estadio: "São Januário",
    titulosNacionais: 4,
    mascote: "Almirante",
    curiosidade: "Tem tradição em revelar grandes jogadores e vencer torneios internacionais."
  },
  {
    id: 9,
    nome: "Botafogo",
    cidade: "Rio de Janeiro",
    estadio: "Nilton Santos",
    titulosNacionais: 2,
    mascote: "Estrela Solitária",
    curiosidade: "É famoso por revelar craques como Garrincha."
  },
  {
    id: 10,
    nome: "Fluminense",
    cidade: "Rio de Janeiro",
    estadio: "Maracanã",
    titulosNacionais: 4,
    mascote: "Guerreiro",
    curiosidade: "O Fluminense tem uma das torcidas mais tradicionais do Rio e cores marcantes."
  },
  {
    id: 11,
    nome: "Santos",
    cidade: "Santos",
    estadio: "Vila Belmiro",
    titulosNacionais: 8,
    mascote: "Peixe",
    curiosidade: "Foi o clube de Pelé e tem tradição ofensiva no futebol brasileiro."
  },
  {
    id: 12,
    nome: "Athletico Paranaense",
    cidade: "Curitiba",
    estadio: "Arena da Baixada",
    titulosNacionais: 1,
    mascote: "Capiatá",
    curiosidade: "Conhecido pelo estádio moderno e inovação em treinos e gestão."
  },
  {
    id: 13,
    nome: "Coritiba",
    cidade: "Curitiba",
    estadio: "Couto Pereira",
    titulosNacionais: 1,
    mascote: "Coxa-Branca",
    curiosidade: "É o clube mais tradicional do Paraná."
  },
  {
    id: 14,
    nome: "Bahia",
    cidade: "Salvador",
    estadio: "Fonte Nova",
    titulosNacionais: 2,
    mascote: "Esquadrão",
    curiosidade: "É o maior clube do Nordeste em torcida e títulos."
  },
  {
    id: 15,
    nome: "Vitória",
    cidade: "Salvador",
    estadio: "Barradão",
    titulosNacionais: 0,
    mascote: "Leão",
    curiosidade: "É conhecido como 'Leão da Barra' e tem rivalidade histórica com o Bahia."
  },
  {
    id: 16,
    nome: "Ceará",
    cidade: "Fortaleza",
    estadio: "Castelão",
    titulosNacionais: 0,
    mascote: "Vozão",
    curiosidade: "Tem uma das torcidas mais apaixonadas do Nordeste."
  },
  {
    id: 17,
    nome: "Fortaleza",
    cidade: "Fortaleza",
    estadio: "Castelão",
    titulosNacionais: 0,
    mascote: "Leão",
    curiosidade: "Tem crescido muito nos últimos anos, participando de competições internacionais."
  },
  {
    id: 18,
    nome: "Sport",
    cidade: "Recife",
    estadio: "Ilha do Retiro",
    titulosNacionais: 1,
    mascote: "Leão",
    curiosidade: "É o maior clube de Pernambuco, com grande rivalidade local."
  },
  {
    id: 19,
    nome: "Santa Cruz",
    cidade: "Recife",
    estadio: "Arruda",
    titulosNacionais: 0,
    mascote: "Cobra-Coral",
    curiosidade: "Clube tradicional de Pernambuco, conhecido por sua torcida apaixonada."
  }
];

  const [selectedTeam, setSelectedTeam] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [soccerTeams, setSoccerTeams] = useState(initialTeams);

  const inputHandler = (e) => {
    console.log(e.target.value)
    setSearchText(e.target.value);
  }

  const findTeamsWithKey = (teams, key) => {
    if (key === "") return teams;
    return Library.search(teams, key);
  }

  const teams = findTeamsWithKey(soccerTeams, searchText);

  const list = teams.map((team, index) => 
    <Link key={index} className = "w-32 h-32 aspect-square rounded-2xl  border-2 flex items-end justify-center bg-gray-800 text-white cursor-pointer hover:bg-gray-900" 
          to={`/${team.id}`} onClick={() => setSelectedTeam(team.id)}>
        {team.nome} 
    </Link>
    )

  return (
    <>
      <div className='fixed left-0 top-0 grid grid-cols-[1fr_3fr] w-full'>
        <div className="pl-2 pr-2 grid grid-rows-[1fr_1fr_10fr] h-screen border-r-4 border-r-gray-600">
          <div className="grid grid-cols-3 pt-2 pb-2"> 
            <button className="text-white bg-gray-800 hover:bg-gray-900 w-32 h-[40px] rounded">Adicionar Time</button>
          </div>
          <input 
          type="text" 
          id="search_bar" 
          onChange={inputHandler}
          className="bg-gray-300 border border-gray-300 text-gray-900 rounded-lg w-1/2 h-[40px] " 
          placeholder="Pesquisar..."/>
          <div className="overflow-y-auto [scrollbar-gutter:stable]  flex flex-wrap content-start gap-2 pl-4"> 
            {list}
          </div>
        </div >
        <div className=''>
           <Outlet context={{soccerTeams, selectedTeam, setSoccerTeams}}/>
        </div>
      </div>
    </>
  )
}

export default App
