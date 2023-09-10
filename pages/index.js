import { useRouter } from 'next/router';
import { useRef } from "react";
import { useState, useEffect } from "react";
import Header from "../components/Header.js";
import styles from "../styles/Base.module.css";
import secureLocalStorage from "react-secure-storage";

import Typed from 'typed.js';

export default function Home() {
    // Initialize router
    const router = useRouter();

    // Initialize app state
    const [contactExists, setContactExists] = useState(false);
    const [showInstallPrompt, setShowInstallPrompt] = useState(false);
    const [installPrompt, setInstallPrompt] = useState(null);

    // Create reference to store the DOM element containing the animation
    const el = useRef("#shuffle");

    // Run on page load
    useEffect(() => {

        const typed = new Typed(el.current, {
            strings: ["instantly.", "flexibly.", "Tactfully."],
            startDelay: 5000,
            backDelay: 5000,
            typeSpeed: 20,
            backSpeed: 20,
            showCursor: false
        });

        // Load local storage
        let formValues;
        // const formValues = JSON.parse(secureLocalStorage.getItem("formValues"));
        if (!secureLocalStorage.getItem("formValues")) {
            formValues = null;
        } else {
            formValues = JSON.parse(secureLocalStorage.getItem("formValues"));
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

        return () => {
            // Destroy Typed instance during cleanup to stop animation
            typed.destroy();
        };
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
