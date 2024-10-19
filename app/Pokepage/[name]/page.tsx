"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Link from "next/link";

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
      <h1>{pokemon.name}</h1>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <footer className=" absolute bottom-0 w-full bg-redpalet h-8 shadow-Sh shadow-black"></footer>
    </main>
  );
}
