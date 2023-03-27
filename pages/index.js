import Head from "next/head";
import Image from "next/image";
import React from "react";
import { useState, useEffect } from "react";
import Form from "../components/Form.js";
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

    const shuffle = () => {
        const words = ["seamlessly.", "flexibly.", "Tactfully."];
        let i = -1;

        const animateWord = (word) => {
            const element = document.getElementById("shuffle");
            const text = element.textContent;
            const letters = word.split("");
            let count = 0;
            element.textContent = text;
            let delay = i == 2 ? 8000 : 3000;

            const interval = setInterval(() => {
                element.textContent += letters[count];
                count++;
                if (count >= letters.length) {
                    clearInterval(interval);
                    setTimeout(() => animateOut(word), delay);
                }
            }, 33);
        };

        const animateOut = (word) => {
            const element = document.getElementById("shuffle");
            const text = element.textContent;
            let count = text.length - 1;

            const interval = setInterval(() => {
                element.textContent = text.substring(0, count);
                count--;
                if (count < 0) {
                    clearInterval(interval);
                    setTimeout(() => {
                        i++;
                        if (i >= words.length) {
                            i = 0;
                        }
                        animateWord(words[i]);
                    }, 33);
                }
            }, 33);
        };

        const currentWord = document.getElementById("shuffle").textContent;
        animateOut(currentWord);
    };


    useEffect(() => {
        setTimeout(shuffle, 5000);
    }, []);

    return (
        <div>
            <Head>
                <title>HMU | Create a QR code for your contact info</title>
                <meta
                    name="description"
                    content="Create and save a QR code to easily share your contact info with new friends and acquaintances"
                />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.pageForm}>
                <div className={styles.siteCode}></div>
                <heading className={styles.siteHeader}>
                    <p>Share your contact info <span id="shuffle" className={styles.shuffle}>Tactfully.</span></p>
                </heading>
                <Form></Form>
            </main>
        </div>
    );
}

export default Home;
