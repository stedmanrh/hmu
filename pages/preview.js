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
    src: "https://chart.googleapis.com/chart?cht=qr&chs=168x168&chld=|1&chl=hmu.world",
    name: "",
    scheme: schemes[0],
  });

  const buildQuery = (formValues) => {
    let query = "https://chart.googleapis.com/chart?cht=qr&chs=168x168&chld=|1&chl=";
    let vCard = 
    "BEGIN:VCARD\nVERSION:4.0" +
    "\nFN:" + formValues.name +
    "\nTEL:" + formValues.phone + 
    "\nEMAIL:" + formValues.email +
    "\nURL:" + formValues.url +
    "\nEND:VCARD";
    vCard = encodeURIComponent(vCard);
    query += vCard;
    return query;
}

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
    const formValues = JSON.parse(window.sessionStorage.getItem("formValues"));
    const name = formValues.name;
    const url = buildQuery(formValues);
    renderCode(url, name);
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
