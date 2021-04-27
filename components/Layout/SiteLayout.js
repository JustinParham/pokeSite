import React from "react";
import classes from "./SiteLayout.module.css";
import { Fragment } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import NavBar from "./NavBar";

export default function SiteLayout(props) {
  const footerYear = () => new Date().getFullYear();
  return (
    <Fragment>
      <Head>
        <title>PokeApi Site</title>
      </Head>
      <div className={classes.wrapper}>
        <div className={classes.header}>
          <div className={classes.headerImage}>
            <a href="http://jparham.herokuapp.com">
              <Image
                src="/Jlogo.png"
                height={75}
                width={75}
                alt="JParham-Logo-Image"
              />
            </a>
          </div>
          <div className={classes.headerText}>PokeAPI Site</div>
        </div>
        <NavBar />
        <div className={classes.contentArea}>{props.children}</div>
        <div className={classes.footer}>
          <a href="mailto: justinjparham@gmail.com">Contact</a>
          <div>&#169; {footerYear()}</div>
        </div>
      </div>
    </Fragment>
  );
}
