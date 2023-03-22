import Head from "next/head";
import Image from "next/image";
import React from "react";
import { useState, useEffect } from "react";
import Form from "../components/form.js";
import Canvas from "../components/Canvas.js";
import styles from "../styles/Home.module.css";
import schemes from "../utils/schemes.json";

// TODO:
// * FIX:
// - emoji doesn't appear on android
// - scaling (how do to this without quality loss or cutting things off?)
// - form styling (wait on Sodi for this)
// * EXTRA:
// - set restrictions on what can be typed into phone, email, url fields? esp. phone?

function Home() {

  const [state, setState] = useState({
    src: "https://chart.googleapis.com/chart?cht=qr&chs=168x168&chld=|1&chl=",
    name: "",
    scheme: schemes[0],
  });

  const renderCode = (url, name) => {
    setState((prevState) => {
      if (prevState.src !== url || prevState.name !== name) {
        return {
          ...prevState,
          src: url,
          name: name,
        };
      }
    });
  }

  const randomizeScheme = () => {
    setState((prevState) => {
      let randomScheme = "";
      while (randomScheme === "" || prevState.scheme === randomScheme) {
        randomScheme = schemes[Math.floor(Math.random() * schemes.length)];
      }
      return ({
        ...prevState,
        scheme: randomScheme
      });
    });
  }

  useEffect(() => {
    randomizeScheme();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>HMU | Create a QR code for your contact info</title>
        <meta
          name="description"
          content="Create and save a QR code to easily share your contact info with new friends and acquaintances"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <p>HMU, world!</p>
        <Form
          renderCode={renderCode}
          randomizeScheme={randomizeScheme}
        ></Form>          
        <Canvas
          src={state.src}
          name={state.name}
          scheme={state.scheme}
        ></Canvas>
      </main>
    </div>
  );
}

export default Home;
