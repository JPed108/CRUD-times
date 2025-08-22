import { useState } from 'react'
import { Link, Outlet} from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Library } from './lib'

function App() {
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [selectedTeam, setSelectedTeam] = useState({});
  const [searchText, setSearchText] = useState("");

  const soccerTeams = [
  {
    nome: "Flamengo",
    cidade: "Rio de Janeiro",
    estadio: "Maracanã",
    titulosNacionais: 7,
    mascote: "Urubu",
    curiosidade: "É um dos clubes mais populares do Brasil, com milhões de torcedores espalhados pelo país."
  },
  {
    nome: "Palmeiras",
    cidade: "São Paulo",
    estadio: "Allianz Parque",
    titulosNacionais: 11,
    mascote: "Periquito",
    curiosidade: "Conhecido como 'Verdão', tem uma das maiores torcidas organizadas do Brasil."
  },
  {
    nome: "Corinthians",
    cidade: "São Paulo",
    estadio: "Neo Química Arena",
    titulosNacionais: 7,
    mascote: "Mosqueteiro",
    curiosidade: "Venceu o Mundial de Clubes da FIFA em 2012."
  },
  {
    nome: "São Paulo",
    cidade: "São Paulo",
    estadio: "Morumbi",
    titulosNacionais: 6,
    mascote: "Soberano",
    curiosidade: "É tricampeão da Copa Libertadores e Mundial de Clubes da FIFA."
  },
  {
    nome: "Grêmio",
    cidade: "Porto Alegre",
    estadio: "Arena do Grêmio",
    titulosNacionais: 2,
    mascote: "Mosqueteiro",
    curiosidade: "Foi campeão da Copa Libertadores da América três vezes."
  },
  {
    nome: "Internacional",
    cidade: "Porto Alegre",
    estadio: "Beira-Rio",
    titulosNacionais: 3,
    mascote: "Saci",
    curiosidade: "É conhecido pelo apelido 'Colorado' e tem duas Libertadores no currículo."
  },
  {
    nome: "Atlético Mineiro",
    cidade: "Belo Horizonte",
    estadio: "Mineirão",
    titulosNacionais: 3,
    mascote: "Galo",
    curiosidade: "O 'Galo' venceu a Copa Libertadores em 2013."
  },
  {
    nome: "Cruzeiro",
    cidade: "Belo Horizonte",
    estadio: "Mineirão",
    titulosNacionais: 4,
    mascote: "Raposa",
    curiosidade: "Foi campeão da Copa Libertadores em 1976 e 1997."
  },
  {
    nome: "Vasco da Gama",
    cidade: "Rio de Janeiro",
    estadio: "São Januário",
    titulosNacionais: 4,
    mascote: "Almirante",
    curiosidade: "Tem tradição em revelar grandes jogadores e vencer torneios internacionais."
  },
  {
    nome: "Botafogo",
    cidade: "Rio de Janeiro",
    estadio: "Nilton Santos",
    titulosNacionais: 2,
    mascote: "Estrela Solitária",
    curiosidade: "É famoso por revelar craques como Garrincha."
  },
  {
    nome: "Fluminense",
    cidade: "Rio de Janeiro",
    estadio: "Maracanã",
    titulosNacionais: 4,
    mascote: "Guerreiro",
    curiosidade: "O Fluminense tem uma das torcidas mais tradicionais do Rio e cores marcantes."
  },
  {
    nome: "Santos",
    cidade: "Santos",
    estadio: "Vila Belmiro",
    titulosNacionais: 8,
    mascote: "Peixe",
    curiosidade: "Foi o clube de Pelé e tem tradição ofensiva no futebol brasileiro."
  },
  {
    nome: "Athletico Paranaense",
    cidade: "Curitiba",
    estadio: "Arena da Baixada",
    titulosNacionais: 1,
    mascote: "Capiatá",
    curiosidade: "Conhecido pelo estádio moderno e inovação em treinos e gestão."
  },
  {
    nome: "Coritiba",
    cidade: "Curitiba",
    estadio: "Couto Pereira",
    titulosNacionais: 1,
    mascote: "Coxa-Branca",
    curiosidade: "É o clube mais tradicional do Paraná."
  },
  {
    nome: "Bahia",
    cidade: "Salvador",
    estadio: "Fonte Nova",
    titulosNacionais: 2,
    mascote: "Esquadrão",
    curiosidade: "É o maior clube do Nordeste em torcida e títulos."
  },
  {
    nome: "Vitória",
    cidade: "Salvador",
    estadio: "Barradão",
    titulosNacionais: 0,
    mascote: "Leão",
    curiosidade: "É conhecido como 'Leão da Barra' e tem rivalidade histórica com o Bahia."
  },
  {
    nome: "Ceará",
    cidade: "Fortaleza",
    estadio: "Castelão",
    titulosNacionais: 0,
    mascote: "Vozão",
    curiosidade: "Tem uma das torcidas mais apaixonadas do Nordeste."
  },
  {
    nome: "Fortaleza",
    cidade: "Fortaleza",
    estadio: "Castelão",
    titulosNacionais: 0,
    mascote: "Leão",
    curiosidade: "Tem crescido muito nos últimos anos, participando de competições internacionais."
  },
  {
    nome: "Sport",
    cidade: "Recife",
    estadio: "Ilha do Retiro",
    titulosNacionais: 1,
    mascote: "Leão",
    curiosidade: "É o maior clube de Pernambuco, com grande rivalidade local."
  },
  {
    nome: "Santa Cruz",
    cidade: "Recife",
    estadio: "Arruda",
    titulosNacionais: 0,
    mascote: "Cobra-Coral",
    curiosidade: "Clube tradicional de Pernambuco, conhecido por sua torcida apaixonada."
  }
  ];

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
    <Link key={index} className = "w-36 aspect-square border-2 flex items-end justify-center bg-gray-800 text-white cursor-pointer hover:bg-gray-900" 
          to={`/${team.nome}`} onClick={() => setSelectedTeam(team)}>
        {team.nome} 
    </Link>
    )

  return (
    <>
      <div className='fixed left-0 top-0 grid grid-cols-[1fr_1fr_1fr_1fr]'>
        <div className="pl-2 pr-2 grid grid-rows-[1fr_1fr_10fr] h-screen">
          <div className="grid grid-cols-3 pt-2 pb-2"> 
            <button className="text-white bg-gray-800 hover:bg-gray-900 w-32 h-[40px] rounded">Adicionar Time</button>
          </div>
          <input 
          type="text" 
          id="first_name" 
          onChange={inputHandler}
          className="bg-gray-300 border border-gray-300 text-gray-900 rounded-lg w-1/2 h-[40px] " 
          placeholder="Pesquisar..."/>
          <div className="overflow-y-auto grid grid-cols-3 gap-y-4 gap-x-4 mb-auto"> 
            {list}
          </div>
        </div >
        <div className='grid col-span-3 border border-white'>
           <Outlet context={selectedTeam}/>
        </div>
      </div>
    </>
  )
}

export default App
