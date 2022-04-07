import Head from "next/head";
import Image from "next/image";
import React from "react";
import Form from "../components/Form.js";
import Canvas from "../components/Canvas.js";
import styles from "../styles/Home.module.css";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      src: "https://chart.googleapis.com/chart?cht=qr&chs=168x168&chld=|1&chl=",
      name: "",
      scheme: {
        emoji: "🍑",
        startSwatch: "#F09819",
        endSwatch: "#FF5858",
      },
    };

    this.renderCode = this.renderCode.bind(this);
  }

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
          <Form renderCode={this.renderCode}></Form>
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
