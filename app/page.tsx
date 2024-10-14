"use client";
import { Pokemon } from "@/utils/type";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { getTypeImage } from "@/utils/styles";
import Link from "next/link";

import { useState } from "react";

export default function Home() {
  const [response, setresponse] = useState("");
  const [Pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [VarietySprites, setVarietySprites] = useState<{
    front: string;
    back: string;
  } | null>(null);

  const fetchPokemon = () => {
    if (!response) return;

    // Chama a API para obter informações de espécies
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${response.toLowerCase()}`)
      .then((res) => {
        if (!res.ok) throw new Error("Pokemon não encontrado");
        return res.json();
      })
      .then((speciesData: any) => {
        // use `any` ou crie um tipo específico se necessário
        // Obtemos a primeira variedade do Pokémon
        if (speciesData.varieties.length > 0) {
          const varietyUrl = speciesData.varieties[0].pokemon.url;
          // Agora chamamos a API do Pokémon para obter informações detalhadas, incluindo tipos e sprites
          fetch(varietyUrl)
            .then((res) => res.json())
            .then((pokemonData) => {
              setPokemon(pokemonData); // Defina o Pokémon
              setVarietySprites({
                front: pokemonData.sprites.front_default,
                back: pokemonData.sprites.back_default,
              });
            });
        }
      })
      .catch(() => {
        setPokemon(null);
        alert("Pokemon não encontrado");
      });
  };

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
      <section className="w-1/6 min-w-72 h-3/5 min-h-96 max-h-144 bg-red-500 border-r-4 border-red-900 rounded-sm shadow-black shadow-md my-auto">
        <div className="flex h-20 border-b-2 shadow-md shadow-black border-white">
          <div className="mt-2 ml-1 border-gray-100 border-8 rounded-full w-16 h-16 bg-blue-500 shadow-black shadow-md" />
          <div className="mt-2 rounded-full bg-red-400 w-4 h-4 border-gray-900 border-2" />
          <div className="mt-2 rounded-full bg-yellow-400 w-4 h-4 border-gray-900 border-2" />
          <div className="mt-2 rounded-full bg-green-400 w-4 h-4 border-gray-900 border-2" />
        </div>
        <div className="mt-5 ml-8 w-4/5 h-1/2 bg-gradient-to-r from-blue-500 via-blue-300 to-blue-500 border-gray-50 border-4">
          {Pokemon && (
            <div className="flex flex-col">
              <div className="flex justify-center">
                {VarietySprites && (
                  <img
                    className="w-36 hover:scale-105 hover:-translate-y-1"
                    src={VarietySprites.front}
                    alt={Pokemon.name}
                  ></img>
                )}
              </div>
              <div className="flex justify-center ">
                {Pokemon.types &&
                  Pokemon.types.map((t) => (
                    <img
                      key={t.type.name}
                      className="w-8 ml-2"
                      src={`${getTypeImage(t.type.name)}`}
                    ></img>
                  ))}
              </div>
            </div>
          )}
        </div>
        <div className="grid grid-cols-2">
          <div>
            <div className="flex mt-1 ml-5">
              <div className="w-10 h-9 bg-blue-500 rounded-full border-black border-2" />
              <div className="w-10 h-3 bg-green-500 rounded-full mt-3 ml-2 border-black border-2" />
              <div className="w-10 h-3 bg-orange-500 rounded-full mt-3 ml-2 border-black border-2" />
            </div>
            <div className="bg-yellow-400 w-32 h-7 mt-1 ml-5 rounded-md shadow-black shadow-sm" />
          </div>
          <div>
            <input
              value={response}
              onChange={(e) => setresponse(e.target.value)}
              className="mx-5 mt-3 w-4/5 h-7 text-xl border-white border-2 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 text-white font-semibold rounded-sm"
              type="text"
            />
            <button
              onClick={fetchPokemon}
              className="w-20 h-7 bg-gray-500 mt-1 ml-5 rounded-md shadow-black shadow-sm"
            />
          </div>
        </div>
      </section>
      <footer className="w-full bg-redpalet h-8 shadow-2xl shadow-black"></footer>
    </main>
  );
}
