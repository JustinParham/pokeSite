import React, { useState } from "react";
import classes from "./InnerGame.module.css";
import Image from "next/image";

export default function InnerGame(props) {
  function capFirstLetter(str) {
    return `${str.slice(0, 1).toUpperCase()}${str.slice(1)}`;
  }

  return (
    <div className={classes.innerGameArea}>
      <div className={classes.imageArea}>
        <Image
          src={props.pokearray[props.numSelection].sprites.front_default}
          height={150}
          width={150}
          alt="pokemon image"
        />
      </div>
      <form onSubmit={props.onFormSubmit}>
        <label htmlFor="option1">
          {capFirstLetter(props.pokearray[0].species.name)}
        </label>
        <input
          onClick={props.handleSelection}
          id="option1"
          name="pokeOption"
          type="radio"
        />
        <label htmlFor="option2">
          {capFirstLetter(props.pokearray[1].species.name)}
        </label>
        <input
          onClick={props.handleSelection}
          id="option2"
          name="pokeOption"
          type="radio"
        />
        <label htmlFor="option3">
          {capFirstLetter(props.pokearray[2].species.name)}
        </label>
        <input
          onClick={props.handleSelection}
          id="option3"
          name="pokeOption"
          type="radio"
        />
        <br />
        <button>Submit</button>
      </form>
    </div>
  );
}
