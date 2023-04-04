import React from "react";
import { useState, useEffect } from "react";
import Header from "../components/Header.js";
import Form from "../components/Form.js";
import styles from "../styles/Home.module.css";
import schemes from "../utils/schemes.json";

// TODO:
// - form validation for phone, email, url fields

export default function Home() {

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
            if (!element) {
                return;
            }
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
            <Header></Header>
            <main className={styles.pageForm}>
                <div className={styles.siteCode}></div>
                <heading className={styles.siteHeader}>
                    <p>Share your contact info <span id="shuffle" className={styles.shuffle}>Tactfully.</span></p>
                </heading>
                <Form></Form>
            </main>
        </div>
    );
};
