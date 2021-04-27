import React, { Fragment, useState, useEffect } from "react";
import classes from "./MatchingGame.module.css";

import Loading from "../Loading/Loading";
import InnerGame from "./InnerGame";
import { green } from "@material-ui/core/colors";
import fetch from "node-fetch";

export default function MatchingGame() {
  const [gameInProgress, setGameInProgress] = useState(false);
  const [score, setScore] = useState(0);
  const [turn, setTurn] = useState(0);
  const [pokeDataArray, setPokeDataArray] = useState([]);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(false);
  const [userAnswer, setUserAnswer] = useState(null);

  useEffect(() => {
    function oneOfThree() {
      return Math.floor(Math.random() * 3);
    }
    if (turn > 0) {
      setCorrectAnswer(oneOfThree());
    }
    if (turn > 10) {
      setGameInProgress(false);
      setGameCompleted(true);
    }
  }, [turn]);

  function handleStart() {
    setGameInProgress(true);
    setTurn(1);
    setScore(0);
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

        const preparedPokeData = () => {
          return Promise.all(
            randomPokeSetArray.map(item => {
              return Promise.all(item.map(thing => getPokeDataObject(thing)));
            })
          );
        };

        preparedPokeData().then(data => setPokeDataArray(data));
      }
    }
    retrievePokeData();
  }, [gameInProgress]);

  useEffect(() => {
    if (pokeDataArray.length > 0) {
      setIsLoading(false);
    }
  }, [pokeDataArray]);

  // sets the UserAnswer state
  // so that when handleSubmit runs it can evalute that state value
  // and decide to update the score or not
  function handleSelection(e) {
    const userInput = parseInt(e.target.attributes.option.value);
    console.log(userInput);
    setUserAnswer(userInput);
  }

  // check the value of the selection and update the score
  // accordingly, and then move to the next turn
  function handleSubmit(event) {
    event.preventDefault();
    if (userAnswer === correctAnswer) {
      console.log("Correct");
      setScore(prevValue => prevValue + 1);
    } else if (userAnswer !== correctAnswer) {
      console.log("Incorrect");
    }
    document.getElementById("userInputForm").reset();
    setUserAnswer(null);
    setTurn(prevValue => prevValue + 1);
  }

  return (
    <Fragment>
      <div className={classes.gameInfoArea}>
        <h1>Name that pokemon!</h1>
        {gameInProgress ? null : (
          <button className={classes.startButton} onClick={handleStart}>
            Start
          </button>
        )}
      </div>
      <div className={classes.mainGameArea}>
        <div className={classes.scorekeepingArea}>
          {turn && gameInProgress ? (
            <Fragment>
              <span>Score: {score}</span>
              <br></br>
              <span>Turn {turn}/10</span>
            </Fragment>
          ) : null}
        </div>

        {gameInProgress && isLoading ? (
          <div className={classes.loadingDiv}>
            <Loading />
            <h4>Loading...</h4>
          </div>
        ) : gameInProgress && pokeDataArray.length > 0 && turn < 11 ? (
          <InnerGame
            onFormSubmit={handleSubmit}
            onSelect={handleSelection}
            pokearray={pokeDataArray[turn - 1]}
            currentTurn={turn}
            numSelection={correctAnswer}
            value={userAnswer}
            gameStatus={gameInProgress}
          />
        ) : !gameInProgress && gameCompleted ? (
          <div className={classes.gameOverScreen}>
            <p className={classes.gameOver}>Game Over!</p>
            <p>You scored: {score}</p>
          </div>
        ) : (
          <div className={classes.pressStartText}>Press start to begin</div>
        )}
      </div>
    </Fragment>
  );
}
