"use client";

import Link from "next/link";
import { Pokemon } from "@/utils/type";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { getTypeImage } from "@/utils/styles";
import { useEffect, useState } from "react";

export default function Pokelist() {
    const [search, setsearch] = useState("");
    const [Pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [error, setError] = useState<string | null>(null);
    const filteredPokemons = Pokemons.filter((filter) =>
        filter.name.toLowerCase().includes(search.toLowerCase()),
    );

    useEffect(() => {
        const fetchPokemons = async () => {
            try {
                const response = await fetch(
                    "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0",
                );
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                const resultado = await response.json();
                const promises = resultado.results.map(
                    (pokemon: { url: string }) =>
                        fetch(pokemon.url).then((res) => {
                            if (!res.ok) {
                                throw new Error("Failed to fetch pokemon data");
                            }
                            return res.json();
                        }),
                );
                const data: Pokemon[] = await Promise.all(promises);
                setPokemons(data);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError(err instanceof Error ? err.message : "Unknown error");
            }
        };

        fetchPokemons();
    }, []);

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
            <input
                className="mt-10 rounded-sm border-redpalet border"
                type="search"
                value={search}
                onChange={(e) => setsearch(e.target.value)}
            />
            <section className="w-2/3 h-2/3 grid grid-cols-5 mt-10 overflow-x-hidden xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 Android:grid-cols-1">
                {filteredPokemons.map((P) => (
                    <div
                        key={P.name}
                        className="flex flex-col w-40 h-40 bg-cyan-200 rounded-sm border border-black mb-5 ml-7 items-center"
                    >
                        <img
                            className="w-28 hover:scale-110 hover:-translate-y-1"
                            src={P.sprites.front_default || "/dflt/default.png"}
                        />
                        <div className="flex">
                            {P.types.map((t) => (
                                <img
                                    key={t.type.name}
                                    className="w-4"
                                    src={`${getTypeImage(t.type.name)}`}
                                ></img>
                            ))}
                        </div>
                        <p className="uppercase text-xs">{P.name}</p>
                    </div>
                ))}
            </section>
            <p className="text-white text-1xl w-96 text-center">
                Aviso alguns pokemons que estão sem imagem é pela falta de
                sprites nesse modelo, como sprite do miraidon-aquatic-mode
            </p>
            <footer className="w-full bg-redpalet h-8 shadow-2xl shadow-black"></footer>
        </main>
    );
}
