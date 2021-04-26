import React, { Fragment, useState, useEffect } from "react";
import classes from "./MatchingGame.module.css";

import Loading from "../Loading/Loading";
import InnerGame from "./innerGame";
import { green } from "@material-ui/core/colors";
import fetch from "node-fetch";

export default function MatchingGame() {
  const [gameInProgress, setGameInProgress] = useState(false);
  const [score, setScore] = useState(0);
  const [turn, setTurn] = useState(0);
  const [pokeDataArray, setPokeDataArray] = useState([]);
  const [innerPokeDataArray, setInnerPokeDataArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [answer, setAnswer] = useState(null);

  useEffect(() => {
    function oneOfThree() {
      return Math.floor(Math.random() * 3);
    }
    if (turn > 0) {
      setAnswer(oneOfThree());
    }
  }, [turn]);

  function handleStart() {
    setGameInProgress(true);
    setTurn(1);
    if (gameInProgress) {
      setScore(0);
    }
  }

  // get 3 random numbers
  //
  // [[{pokeDataObject1},{pokeDataObject2},{pokeDataObject3}],
  // [{pokeDataObject4},{pokeDataObject5},{pokeDataObject6}]]
  //

  // currently working, but the array of objects is not being
  // fetched correctly. sets are being created correctly
  // but it is not being fetched and organized into a
  // pokeData array correctly, only getting 6-7 instead of 10;
  useEffect(() => {
    console.log("effect ran");
    function getRanNums() {
      let xArr = [
        Math.floor(1 + Math.random() * 898),
        Math.floor(1 + Math.random() * 898),
      ];

      let set = new Set(xArr);
      do {
        set.add(Math.floor(1 + Math.random() * 898));
      } while (set.size < 3);

      return Array.from(set);
    }
    function getSetArray() {
      let newArray = [];
      do {
        newArray.push(getRanNums());
      } while (newArray.length < 10);

      return newArray;
    }

    function getPokeDataObject(num) {
      return fetch(`https://pokeapi.co/api/v2/pokemon/${num}`)
        .then(res => res.json())
        .then(data => data)
        .catch(err => console.log(err));
    }

    // This forEach loop inside a forEach loop, or the useEffect
    // hook that relies upoun it seem to be the problem
    // need to come up with a solution
    function retrievePokeData() {
      if (gameInProgress) {
        setIsLoading(true);
        let randomPokeSetArray = getSetArray();
        console.log(randomPokeSetArray);

        let preparedPokeData = randomPokeSetArray.map(item => {
          return item.map(thing => {
            return getPokeDataObject(thing);
          });
        });

        setPokeDataArray(preparedPokeData);
      }
    }
    retrievePokeData();
  }, [gameInProgress]);

  useEffect(() => {
    console.log(pokeDataArray);

    if (pokeDataArray.length > 0) {
      setIsLoading(false);
    }
  }),
    [pokeDataArray];

  // check the value of the selection against ran 1-3 num that was
  // generated and change the state to correct or incorrect
  // so that when handleSubmit runs it can evalute that state value
  // and decide to update the score or not
  function handleSelection(e) {}

  // check the value of the selection and update the score
  // accordingly, and then move to the next turn
  function handleSubmit(e) {
    e.preventDefault();
    console.log(e.target.children);
    setTurn(prevValue => prevValue + 1);
  }

  return (
    <Fragment>
      <div className={classes.gameInfoArea}>
        <h1>Name that pokemon!</h1>
        <button onClick={handleStart}>
          {gameInProgress ? "Restart" : "Start"}
        </button>
      </div>
      <div className={classes.mainGameArea}>
        <div className={classes.scorekeepingArea}>
          <p>Score: {score}</p>
          <p>{pokeDataArray.length}</p>
          {turn ? <p>turn {turn}/10</p> : null}
        </div>
        <div className={classes.gameCardArea}>
          {gameInProgress && isLoading ? (
            <Loading />
          ) : gameInProgress &&
            pokeDataArray.length > 0 &&
            pokeDataArray[turn - 1].length > 2 ? (
            <InnerGame
              onFormSubmit={handleSubmit}
              onSelect={handleSelection}
              pokearray={pokeDataArray[turn - 1]}
              currentTurn={turn}
              numSelection={answer}
            />
          ) : (
            <span>Press start to begin</span>
          )}
        </div>
        <div>{JSON.stringify(pokeDataArray)}</div>
      </div>
    </Fragment>
  );
}
