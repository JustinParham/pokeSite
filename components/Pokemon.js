import React from "react";
import fetch from "node-fetch";
import Image from "next/image";
import Loading from "../components/Loading/Loading";
import Link from "next/link";

import classes from "./Pokemon.module.css";

export default function pokemonAPI() {
  const [pokemon, setPokemon] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [pokeNumber, setPokeNumber] = React.useState(null);
  const [value, setValue] = React.useState("");

  function getRanNumber() {
    return Math.floor(Math.random() * 898);
  }
  function handleRandom() {
    setPokeNumber(getRanNumber());
    setValue("");
  }

  React.useEffect(() => {
    if (pokeNumber !== null) {
      setIsLoading(true);
    }

    if (pokeNumber) {
      setPokemon(null);
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNumber}`)
        .then((res) => res.json())
        .then((data) => {
          setPokemon(data);
          setIsLoading(false);
        });
    }
  }, [pokeNumber]);

  function handleSubmit(event) {
    event.preventDefault();
    if (value === "") {
      return null;
    }
    setPokeNumber(value);
    setValue("");
  }
  function handleClear() {
    setPokeNumber(null);
    setPokemon(null);
    setIsLoading(false);
    setValue("");
  }

  function capName(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function handleChange(e) {
    setValue(e.target.value);
  }
  return (
    <div className={classes.pokemonArea}>
      <h4>
        Enter a Pokemon National Dex number
        <br /> or select Random.
      </h4>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          id="pokeNumber"
          type="number"
          min="1"
          max="898"
          value={value}
        ></input>
        <button type="submit">Enter</button>
      </form>
      <button onClick={handleRandom}>Random</button>
      <div className={classes.pokemonDisplayArea}>
        {isLoading ? (
          <div className="loadingCircle">
            <Loading />
          </div>
        ) : pokemon ? (
          <div className={classes.innerPokemonArea}>
            <h2>{capName(pokemon.species.name)}</h2>
            <h4>
              <b>{pokemon.id}</b>
            </h4>
            <Image
              src={pokemon.sprites.front_default}
              height={125}
              width={125}
            />
            <Link
              href={`https://bulbapedia.bulbagarden.net/wiki/${pokemon.species.name}_(Pok%C3%A9mon)`}
            >
              <a>Bulbapedia</a>
            </Link>
          </div>
        ) : null}
      </div>
      <button onClick={handleClear}>Clear</button>
    </div>
  );
}
