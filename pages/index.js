// @ts-check
import Head from 'next/head';
// @ts-ignore
import HomeCss from '../styles/Home.module.css';
import Link from 'next/link';
import { useState } from 'react';
export default function Home({ minimimosDatos }) {
    const [favorite, setfavorite] = useState([]);

  return (
    <>
      <Head>
        <title>Pokedex</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <img src="https://img.icons8.com/ios/50/000000/favorites.png" alt="..." className={HomeCss.favoriteIcon} />
      <div className={HomeCss.container}>
        <div className={HomeCss.titulo}>
          <h1>Pokemones</h1>
        </div>
        <div className={HomeCss.titulo}>
        </div>
        <div className={HomeCss.columnas}>
          <ul>
            {minimimosDatos.map((pokemon) => (
              <li key={pokemon.id}>
                <Link
                  scroll={false}
                  href={{
                    pathname: '/pokemon/[name]',
                    query: { name: pokemon.name },
                  }}
                >
                  <a>
                    <div className={`${HomeCss.card} ${pokemon.types[0].type.name}`}>
                      <div className={HomeCss.nombreTipos}>
                        <h3>{pokemon.name}</h3>

                        <div className={HomeCss.tipos}>
                          {pokemon.types.map((/** @type {{ type: { name: boolean | import("react").ReactChild | import("react").ReactFragment | import("react").ReactPortal; }; }} */ tipos, /** @type {import("react").Key} */ index) => {
                            return (
                              <div key={index} className={HomeCss.tipo}>
                                {tipos.type.name}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <img
                        src={pokemon.sprites}
                        alt={pokemon.name}
                        width={100}
                        height={100}
                        className={HomeCss.imagen}
                      />
                    </div>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(_context) {
  const traemosPokemones = async (/** @type {number} */ porPokemon) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${porPokemon}/`);
    const data = await response.json();
    return data;
  };

  let pokemones = [];
  for (let i = 1; i <= 20; i++) {
    let data = await traemosPokemones(i);
    pokemones.push(data);

  }
  let minimimosDatos = pokemones.map((pokemon) => {
    return {
      id: pokemon.id,
      name: pokemon.name,
      sprites: pokemon.sprites.other.dream_world.front_default,
      types: pokemon.types,
      abilities: pokemon.abilities,
    };
  });

  return {
    props: 
       JSON.parse(JSON.stringify({minimimosDatos}))
    };
}
