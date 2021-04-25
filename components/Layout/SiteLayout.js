import React from "react";
import classes from "./SiteLayout.module.css";
import { Fragment } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import NavBar from "./NavBar";

export default function SiteLayout(props) {
  return (
    <Fragment>
      <Head>
        <title>Random Pokemon Generator</title>
      </Head>
      <div className={classes.wrapper}>
        <div className={classes.header}>
          <div className={classes.headerImage}>
            <a href="http://jparham.herokuapp.com">
              <Image
                src="/jlogo.png"
                height={75}
                width={75}
                alt="JParham-Logo-Image"
              />
            </a>
          </div>
          <div className={classes.headerText}>Pokemon Finder</div>
        </div>
        <NavBar />
        <div className={classes.contentArea}>{props.children}</div>
        <div className={classes.footer}>
          <div>Hi im the footer</div>
        </div>
      </div>
    </Fragment>
  );
}
