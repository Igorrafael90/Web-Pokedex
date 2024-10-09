'use client'

import Link from "next/link"
import { Pokemon } from "@/utils/type"
import { useEffect, useState } from "react"

export default function Pokelist() {
    const [Pokemons, setPokemons] = useState<Pokemon[]>([])

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon')
          .then(res => res.json())
          .then((resultado) => {
            const promises = resultado.results.map((pokemon: { url: string }) =>
              fetch(pokemon.url).then((res) => res.json())
            )
            Promise.all(promises).then((data: Pokemon[]) => setPokemons(data))
          })
      }, [])

    return (
        <main className="w-full h-full flex flex-col items-center">
            <section className="w-full h-12 bg-white flex justify-around items-center">
                <Link href={`/`}>
                    <p>home</p>
                </Link>
                <p>Pokedex</p>
                <Link href={`/Pokelist/`}>
                    <p>oi</p>
                </Link>
            </section>
            <section className="w-2/3 h-auto grid grid-cols-5 mt-10 overflow-x-hidden xl:grid-cols-4 md:grid-cols-3 ">
                {Pokemons.map((P) =>(
                    <div className="flex flex-col w-40 h-40 bg-white mb-5 ml-7">
                        <img src={P.sprites.front_default} />
                    </div>
                ))

                }
            </section>
        </main>
    )
}