import Head from "next/head";
// not in use, but can be used to import images and improve performance
import Image from "next/image";
import React from "react";
import Form from "../components/Form.js";
import Canvas from "../components/Canvas.js";
import styles from "../styles/Home.module.css";
import schemes from "../utils/schemes.json";

// 1 change extends to one of these
// const Home = () => {
// function Home(props) {
class Home extends React.Component {

  // 5A remove constructor
  // change it to useState
  constructor(props) {
    super(props);
    this.state = {
      src: "https://chart.googleapis.com/chart?cht=qr&chs=168x168&chld=|1&chl=",
      name: "",
      scheme: schemes[0],
    };

    // 5B remove event handler bindings
    this.renderCode = this.renderCode.bind(this);
    this.randomizeScheme = this.randomizeScheme.bind(this);
  }

  // 3 convert all methods (like this) to functions
  // 4 remove references to "this"
  // lets the text persist when you type into the form
  renderCode(url, name) {
    this.setState((prevState) => {
      if (prevState.src !== url || prevState.name !== name) {
        return {
          src: url,
          name: name,
        };
      }
    });
  }

  randomizeScheme() {
    // 6 replace this.setState with the relevant state setter variable
    this.setState((prevState) => {
      let randomScheme = "";
      while (randomScheme === "" || prevState.scheme === randomScheme) {
        randomScheme = schemes[Math.floor(Math.random() * schemes.length)];
      }
      return ({scheme: randomScheme});
    });
  }

  componentDidMount() {
    this.randomizeScheme();
  }

  // 2 remove this render method (keep what it's wrapped, the return)
  render() {
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
            renderCode={this.renderCode}
            randomizeScheme={this.randomizeScheme}
          ></Form>          
          <Canvas
            src={this.state.src}
            name={this.state.name}
            scheme={this.state.scheme}
          ></Canvas>
        </main>
      </div>
    );
  }
}

export default Home;
