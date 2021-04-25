import React from "react";
import classes from "./SignIn.module.css";

export default function SignIn() {
  return (
    <form className={classes.signIn}>
      <label htmlFor="userName">UserName:</label>
      <input id="userName" type="text"></input>
      <label htmlFor="password">Password:</label>
      <input id="password" type="password"></input>
      <br />
      <button type="submit">Sign In</button>
    </form>
  );
}
