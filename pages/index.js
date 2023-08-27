import { useRouter } from 'next/router';
import React from "react";
import { useState, useEffect } from "react";
import Header from "../components/Header.js";
import styles from "../styles/Home.module.css";
import secureLocalStorage from "react-secure-storage";

export default function Home() {
    const router = useRouter();

    const [contact, setContact] = useState({
        contactExists: false
    }, []);

    useEffect(() => {
        const formValues = JSON.parse(secureLocalStorage.getItem("formValues"));
        if (formValues != null) {
            setContact({
                contactExists: true
            })
        }
    }, [])

    const create = () => {
        router.push("/create");
    }

    const preview = () => {
        router.push("/preview");
    }

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
        const shuffleTimeout = setTimeout(shuffle, 5000);
        return () => {
            clearTimeout(shuffleTimeout);
        }
    }, []);

    return (
        <div>
            <Header></Header>
            <main className={styles.pageForm}>
                <div className={styles.siteCode}></div>
                <header className={styles.siteHeader}>
                    <p>Share your contact&nbsp;info <span id="shuffle" className={styles.shuffle}>Tactfully.</span></p>
                </header>
                {contact.contactExists ?
                    (<button className="button" onClick={preview}>Share contact</button>) :
                    (<button className="button" onClick={create}>+ New contact</button>)
                }
            </main>
        </div>
    );
};
