"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getTypeImage } from "@/utils/styles";

interface Pageprops {//Como precisa pegar o nome de cada pokemon separadamente, aqui vai pegar pelo que vai ser passado na pokelist pelo nome
  params: {
    name: string;
  };
}

interface Pokemon {//Refaz a interface para pegar do pokemon especifico que foi passado
  id: number;
  name: string;
  sprites: {
    front_default: string;
    versions:{
      'generation-v': {
        'black-white':{
          animated: {
            front_default: string;
            back_default: string;
          }
        }
      }
    }
  };
  types: {
    type: {
      name: string;
    };
  }[];
}

export default function Pokepage({ params }: Pageprops) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.name}`);//Vai passar o pokemon de acordo com o nome
        if (!response.ok) {//Vai verificar se está certo
          throw new Error(`Erro ao buscar Pokémon: ${response.statusText}`);
        }
        const data = await response.json();//Tranformar em um json
        setPokemon(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : "Erro desconhecido");
      }
    };

    fetchPokemon();
  }, [params.name]);//Aplica a dependencia do nome para a passagem do pokemon

  if (loading) {
    return <main className="w-full h-full flex flex-col items-center"><div className="mt-10 flex items-center justify-center"><img className="w-40" src="/dflt/loading.gif" /></div><footer className=" absolute bottom-0 w-full bg-redpalet h-8 shadow-Sh shadow-black"></footer></main>
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  if (!pokemon) {
    return <div>Pokémon não encontrado</div>;
  }

  return (
    <main className="w-full h-full flex flex-col items-center">
      <section className="w-full h-12 bg-redpalet shadow-md shadow-black flex justify-around items-center">
        <Link href={`/`}>
          <FontAwesomeIcon className="text-white" icon={faHouse} />
        </Link>
        <p className="text-yellowpalet font-extrabold uppercase">
          Pokedex Next
        </p>
        <Link href={`/Pokelist/`}>
          <FontAwesomeIcon
            className="bg-white w-5 h-5 rounded-full"
            icon={faQuestion}
          />
        </Link>
      </section>
      <section className="flex justify-center items-center gap-1 w-full h-4/5">
          <div className="flex flex-col bg-black w-2/5 h-3/4 mt-10">
            <h1 className="text-white text-3xl uppercase border-b-2 w-52 h-9 border-white">{pokemon.name}</h1>
            <p className="text-white">Descrição pokemon</p>
          </div>
          <div className="flex flex-col bg-black w-2/5 h-3/4 mt-10">
            <div className="flex justify-center">
              <img className="w-32" src={pokemon.sprites.versions["generation-v"]["black-white"].animated.front_default} alt="" />
              <img className="w-36" src={pokemon.sprites.versions["generation-v"]["black-white"].animated.back_default} alt="" />
            </div>
            <div className="flex justify-center gap-1">
              {pokemon.types.map((t) =>(
                <img className="w-9" src={`${getTypeImage(t.type.name)}`}></img>
              ))}
            </div>
          </div>
      </section>
      <footer className=" absolute bottom-0 w-full bg-redpalet h-8 shadow-Sh shadow-black"></footer>
    </main>
  );
}
