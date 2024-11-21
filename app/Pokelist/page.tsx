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
    const [Pokemons, setPokemons] = useState<Pokemon[]>([]);//Aqui passo a interface da pasta utils 
    const [error, setError] = useState<string | null>(null);
    const [loading, setloading] = useState(true);
    const filteredPokemons = Pokemons.filter((filter) =>
        filter.name.toLowerCase().includes(search.toLowerCase()),
    );//Filtra os pokemons não importando como coloque

    useEffect(() => {
        const fetchPokemons = async () => {
            try {
                const response = await fetch(
                    "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0",//Pega a api
                );
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);//verifica se ela possui algum erro
                }
                const resultado = await response.json();//Transforma em um json a colocando na variavel resultado
                const promises = resultado.results.map(//mapear a variavel resultado
                    (pokemon: { url: string }) =>
                        fetch(pokemon.url).then((res) => {//pega a url do pokemon e novamente faz a verificação de erro e retorna em json
                            if (!res.ok) {
                                throw new Error("Failed to fetch pokemon data");
                            }
                            return res.json();
                        }),
                );
                const data: Pokemon[] = await Promise.all(promises);//Espera todos os pokemons serem devidamente carregados
                setPokemons(data);//seta em Pokemons todos os pokemons carregados
                setloading(false); //Se os pokemons estiverem carregados o carregamento vai sumir
            } catch (err) {
                console.error("Error fetching data:", err);
                setError(err instanceof Error ? err.message : "Unknown error");
                //setloading(false) se der erro o carregamento vai sumir
            }
        };

        fetchPokemons();//chama a função
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
            {loading ? (//Verifica se o carregamento é verdadeiro ou falso e enquanto for verdadeiro vai continuar mostrando a tela de loading
                <div className="mt-10 flex items-center justify-center">
                    <img className="w-40" src="/dflt/loading.gif" />
                </div>
            ) : (
                <section className="w-2/3 h-2/3 grid grid-cols-5 mt-10 overflow-x-hidden sm:w-2/3 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 Android:grid-cols-2 Iphone:grid-cols-2 Android:w-full Iphone:w-full">
                    {filteredPokemons.map((P) => (
                            <div
                                key={P.name}
                                className="flex flex-col w-40 h-40 overflow-hidden bg-cyan-200 rounded-sm border border-black mb-5 ml-7 items-center sm:w-40 sm:h-40 Android:w-32 Android:h-28 Iphone:w-28 Iphone:h-28"
                            >
                                <img
                                    className="w-28 hover:scale-110 hover:-translate-y-1 sm:w-28 Android:w-16 Iphone:w-16"
                                    src={
                                        P.sprites.front_default ||
                                        "/dflt/default.png"
                                    }
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
            )}
            <footer className=" absolute bottom-0 w-full bg-redpalet h-8 shadow-Sh shadow-black"></footer>
        </main>
    );
}
