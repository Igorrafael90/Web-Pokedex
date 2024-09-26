'use client'

import { useEffect, useState } from "react";

export default function Home() {

  const[Pokemons, setPokemons] = useState([])

  useEffect(() =>{
    fetch('https://pokeapi.co/api/v2/pokemon?limit=8&offset=0')
      .then(res => res.json())
      .then((resultado) => {
        setPokemons(resultado.results)
      })
  }, [])
  console.log(Pokemons)

  return (
    <main className="w-full h-full flex flex-col">
        <header className="flex w-full h-16 bg-black items-center justify-center">
          <h1 className="text-white">POKEAPI</h1>
        </header>
        <section className="w-3/4 h-full grid grid-cols-4 mx-auto mt-20 gap-10">
          {Pokemons.map((P)=> (
            <div className="bg-white w-52 h-56">
            <p>{P.name}</p>
            </div>
          ))}
        </section>
    </main>
  );
}
