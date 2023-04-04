import React from "react";
import { useState, useEffect } from "react";
import Header from "../components/Header.js";
import Canvas from "../components/Canvas.js";
import styles from "../styles/Home.module.css";
import schemes from "../utils/schemes.json";

// TODO:
// - Emoji rendering (Android)
// - Canvas scaling

export default function Preview() {

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
      <Header></Header>
      <main>  
        <Canvas
          src={state.src}
          name={state.name}
          scheme={state.scheme}
        ></Canvas>
      </main>
    </div>
  );
};
