import React from "react";
import classes from "./NavBar.module.css";
import Link from "next/link";
import SignIn from "./SignIn";

export default function NavBar() {
  return (
    <div className={classes.navBar}>
      <div className={classes.linkArea}>
        <Link href="/">
          <a className={classes.leftLink}>Home</a>
        </Link>
        <Link href="/matching">
          <a>Matching</a>
        </Link>
      </div>
      <div className={classes.signInArea}></div>
    </div>
  );
}
