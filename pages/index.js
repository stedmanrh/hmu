import { useRouter } from 'next/router';
import React from "react";
import { useState, useEffect } from "react";
import Header from "../components/Header.js";
import styles from "../styles/Base.module.css";
import secureLocalStorage from "react-secure-storage";

export default function Home() {
    // Initialize router
    const router = useRouter();

    // Initialize app state
    const [contactExists, setContactExists] = useState(false);
    const [showInstallPrompt, setShowInstallPrompt] = useState(false);
    const [installPrompt, setInstallPrompt] = useState(null);

    // Run on page load
    useEffect(() => {
        // Shuffle text on loop
        const shuffleTimeout = setTimeout(shuffle, 5000);

        // Check if contact exists
        const formValues = JSON.parse(secureLocalStorage.getItem("formValues"));
        if (formValues != null) {
            setContactExists(true);
        }

        // Check if app install prompt was shown
        window.addEventListener('beforeinstallprompt', (e) => {
            // Prevent the mini-infobar from appearing on mobile
            e.preventDefault();
            // Stash the event so it can be triggered later.
            setInstallPrompt(e);
            setShowInstallPrompt(true);
        });

        // Verify app installation
        window.addEventListener('appinstalled', () => {
            // Hide install promotion, discard prompt
            setShowInstallPrompt(false);
            setInstallPrompt(null);
            // TODO: log install analytics
            console.log('PWA was installed');
        });

        // stop shuffling on unmount
        return () => {
            clearTimeout(shuffleTimeout);
        }
    }, [])

    // App install prompt flow
    const prompt = async () => {
        // Hide install promotion
        setShowInstallPrompt(false);
        // Show install prompt
        installPrompt.prompt();
        // Wait for the user to respond to the prompt ("accepted" | "dismissed")
        const { outcome } = await installPrompt.userChoice;
        // TODO: log promo to prompt install analytics
        console.log(`User ${outcome} install prompt`);
        // Discard used prompt
        setInstallPrompt(null);
    }

    // Navigate to contact form
    const create = () => {
        router.push("/create");
    }

    // Navigate to QR code
    const preview = () => {
        router.push("/preview");
    }

    // Shuffle intro text
    // TODO: long-running app causes incorrect strings
    const shuffle = () => {
        const words = ["instantly.", "flexibly.", "Tactfully."];
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

    return (
        <div>
            <Header></Header>
            <main className={`${styles.page} ${styles.home}`}>
                <div className={styles.siteCode}></div>
                <header className={styles.siteHeader}>
                    <p>Share your contact&nbsp;info <span id="shuffle" className={styles.shuffle}>Tactfully.</span></p>
                    <p className={styles.subheading}>Connect faster IRL with personalized QR codes for whatever matters to you.</p>
                </header>
                {contactExists ?
                    <button className="button" onClick={preview}>Share contact</button>
                    : <button className="button" onClick={create}>+ New contact</button>
                }
                {showInstallPrompt ?
                    <button style={{ marginTop: 24 }} className="button-txt" onClick={prompt}>⬇️ Add to home screen</button>
                    : <button style={{ visibility: "hidden", marginTop: 24 }} className="button-txt" onClick={prompt}>⬇️ Add to home screen</button>
                }
            </main>
        </div>
    );
};
