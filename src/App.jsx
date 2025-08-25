import { useEffect, useState } from 'react'
import { Link, Outlet} from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Library } from './lib'

function App() {

  const [selectedTeam, setSelectedTeam] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [soccerTeams, setSoccerTeams] = useState([]);

  useEffect(() => {setSoccerTeams([
  {
    id: 0,
    nome: "Flamengo",
    cidade: "Rio de Janeiro",
    estadio: "Maracanã",
    titulosNacionais: 7,
    mascote: "Urubu",
    curiosidade: "É um dos clubes mais populares do Brasil, com milhões de torcedores espalhados pelo país.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Flamengo_braz_logo.svg"
  },
  {
    id: 1,
    nome: "Palmeiras",
    cidade: "São Paulo",
    estadio: "Allianz Parque",
    titulosNacionais: 11,
    mascote: "Periquito",
    curiosidade: "Conhecido como 'Verdão', tem uma das maiores torcidas organizadas do Brasil.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/10/Palmeiras_logo.svg"
  },
  {
    id: 2,
    nome: "Corinthians",
    cidade: "São Paulo",
    estadio: "Neo Química Arena",
    titulosNacionais: 7,
    mascote: "Mosqueteiro",
    curiosidade: "Venceu o Mundial de Clubes da FIFA em 2012.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/5/5a/Sport_Club_Corinthians_Paulista_crest.svg"
  },
  {
    id: 3,
    nome: "São Paulo",
    cidade: "São Paulo",
    estadio: "Morumbi",
    titulosNacionais: 6,
    mascote: "Soberano",
    curiosidade: "É tricampeão da Copa Libertadores e Mundial de Clubes da FIFA.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Brasao_do_Sao_Paulo_Futebol_Clube.svg"
  },
  {
    id: 4,
    nome: "Grêmio",
    cidade: "Porto Alegre",
    estadio: "Arena do Grêmio",
    titulosNacionais: 2,
    mascote: "Mosqueteiro",
    curiosidade: "Foi campeão da Copa Libertadores da América três vezes.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/08/Gremio_logo.svg"
  },
  {
    id: 5,
    nome: "Internacional",
    cidade: "Porto Alegre",
    estadio: "Beira-Rio",
    titulosNacionais: 3,
    mascote: "Saci",
    curiosidade: "É conhecido pelo apelido 'Colorado' e tem duas Libertadores no currículo.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Escudo_do_Sport_Club_Internacional.svg"
  },
  {
    id: 6,
    nome: "Atlético Mineiro",
    cidade: "Belo Horizonte",
    estadio: "Mineirão",
    titulosNacionais: 3,
    mascote: "Galo",
    curiosidade: "O 'Galo' venceu a Copa Libertadores em 2013.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Atletico_mineiro_galo.png"
  },
  {
    id: 7,
    nome: "Cruzeiro",
    cidade: "Belo Horizonte",
    estadio: "Mineirão",
    titulosNacionais: 4,
    mascote: "Raposa",
    curiosidade: "Foi campeão da Copa Libertadores em 1976 e 1997.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/90/Cruzeiro_Esporte_Clube_%28logo%29.svg"
  },
  {
    id: 8,
    nome: "Vasco da Gama",
    cidade: "Rio de Janeiro",
    estadio: "São Januário",
    titulosNacionais: 4,
    mascote: "Almirante",
    curiosidade: "Tem tradição em revelar grandes jogadores e vencer torneios internacionais.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/pt/a/ac/CRVascodaGama.png"

  },
  {
    id: 9,
    nome: "Botafogo",
    cidade: "Rio de Janeiro",
    estadio: "Nilton Santos",
    titulosNacionais: 2,
    mascote: "Estrela Solitária",
    curiosidade: "É famoso por revelar craques como Garrincha.",
    imageUrl: ""
  },
  {
    id: 10,
    nome: "Fluminense",
    cidade: "Rio de Janeiro",
    estadio: "Maracanã",
    titulosNacionais: 4,
    mascote: "Guerreiro",
    curiosidade: "O Fluminense tem uma das torcidas mais tradicionais do Rio e cores marcantes.",
    imageUrl: ""
  },
  {
    id: 11,
    nome: "Santos",
    cidade: "Santos",
    estadio: "Vila Belmiro",
    titulosNacionais: 8,
    mascote: "Peixe",
    curiosidade: "Foi o clube de Pelé e tem tradição ofensiva no futebol brasileiro.",
    imageUrl: ""
  },
  {
    id: 12,
    nome: "Athletico Paranaense",
    cidade: "Curitiba",
    estadio: "Arena da Baixada",
    titulosNacionais: 1,
    mascote: "Capiatá",
    curiosidade: "Conhecido pelo estádio moderno e inovação em treinos e gestão.",
    imageUrl: ""
  },
  {
    id: 13,
    nome: "Coritiba",
    cidade: "Curitiba",
    estadio: "Couto Pereira",
    titulosNacionais: 1,
    mascote: "Coxa-Branca",
    curiosidade: "É o clube mais tradicional do Paraná.",
    imageUrl: ""
  },
  {
    id: 14,
    nome: "Bahia",
    cidade: "Salvador",
    estadio: "Fonte Nova",
    titulosNacionais: 2,
    mascote: "Esquadrão",
    curiosidade: "É o maior clube do Nordeste em torcida e títulos.",
    imageUrl: ""
  },
  {
    id: 15,
    nome: "Vitória",
    cidade: "Salvador",
    estadio: "Barradão",
    titulosNacionais: 0,
    mascote: "Leão",
    curiosidade: "É conhecido como 'Leão da Barra' e tem rivalidade histórica com o Bahia.",
    imageUrl: ""
  },
  {
    id: 16,
    nome: "Ceará",
    cidade: "Fortaleza",
    estadio: "Castelão",
    titulosNacionais: 0,
    mascote: "Vozão",
    curiosidade: "Tem uma das torcidas mais apaixonadas do Nordeste.",
    imageUrl: ""
  },
  {
    id: 17,
    nome: "Fortaleza",
    cidade: "Fortaleza",
    estadio: "Castelão",
    titulosNacionais: 0,
    mascote: "Leão",
    curiosidade: "Tem crescido muito nos últimos anos, participando de competições internacionais.",
    imageUrl: ""
  },
  {
    id: 18,
    nome: "Sport",
    cidade: "Recife",
    estadio: "Ilha do Retiro",
    titulosNacionais: 1,
    mascote: "Leão",
    curiosidade: "É o maior clube de Pernambuco, com grande rivalidade local.",
    imageUrl: ""
  },
  {
    id: 19,
    nome: "Santa Cruz",
    cidade: "Recife",
    estadio: "Arruda",
    titulosNacionais: 0,
    mascote: "Cobra-Coral",
    curiosidade: "Clube tradicional de Pernambuco, conhecido por sua torcida apaixonada.",
    imageUrl: ""
  }
])}, [])  

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
    <Link key={index} className = "w-32 aspect-square rounded-2xl border-2 flex flex-col items-center justify-evenly bg-gray-800 text-white cursor-pointer hover:bg-gray-900" 
          to={`/${team.id}`} onClick={() => setSelectedTeam(team.id)}>
        <img src={team.imageUrl == "" ? null : team.imageUrl} alt={team.name} className='w-16 h-auto pt-2'/>
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
