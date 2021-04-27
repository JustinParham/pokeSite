import React, { Fragment } from "react";
import classes from "./InnerGame.module.css";
import Image from "next/image";

export default function InnerGame(props) {
  function capFirstLetter(str) {
    return `${str.slice(0, 1).toUpperCase()}${str.slice(1)}`;
  }

  return (
    <Fragment>
      {props.gameStatus && (
        <div className={classes.innerGameArea}>
          <div className={classes.imageArea}>
            <Image
              src={props.pokearray[props.numSelection].sprites.front_default}
              height={150}
              width={150}
              alt="pokemon image"
            />
          </div>
          <div className={classes.formArea}>
            <form
              onSubmit={props.onFormSubmit}
              id="userInputForm"
              className={classes.radioForm}
            >
              <div className="radioOption">
                <input
                  onClick={props.onSelect}
                  id="option1"
                  name="pokeOption"
                  type="radio"
                  option={0}
                />
                <label htmlFor="option1">
                  {capFirstLetter(props.pokearray[0].species.name)}
                </label>
              </div>
              <div className="radioOption">
                <input
                  onClick={props.onSelect}
                  id="option2"
                  name="pokeOption"
                  type="radio"
                  option={1}
                />
                <label htmlFor="option2">
                  {capFirstLetter(props.pokearray[1].species.name)}
                </label>
              </div>
              <div className="radioOption">
                <input
                  onClick={props.onSelect}
                  id="option3"
                  name="pokeOption"
                  type="radio"
                  option={2}
                />
                <label htmlFor="option3">
                  {capFirstLetter(props.pokearray[2].species.name)}
                </label>
              </div>

              <br />
              <button className={classes.submitButton}>Submit</button>
            </form>
          </div>
        </div>
      )}
    </Fragment>
  );
}
