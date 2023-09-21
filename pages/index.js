import styles from "../styles/Home.module.css";
import Page from "../components/Page.js";
import Button from "../components/Button.js";
import Contacts from "../components/Contacts";

import { useEffect, useRef, useState } from "react";
import Typed from "typed.js";

export default function Home() {
    const [isStandalone, setIsStandalone] = useState(false);
    const [os, setOs] = useState(null);
    const [isPromptable, setIsPromptable] = useState(false);
    const [prompt, setPrompt] = useState(null);

    // Create reference to store the DOM element containing the animation
    const el = useRef("#shuffle");

    // App install prompt flow
    const showPrompt = async () => {
        // Show install prompt
        prompt.prompt();
        // Wait for the user to respond to the prompt ("accepted" | "dismissed")
        const { outcome } = await prompt.userChoice;
        // TODO: log promo to prompt install analytics
        console.log(`User ${outcome} install prompt`);
        // Discard used prompt
        setPrompt(null);
    }

    useEffect(() => {
        // Initialize headline shuffle
        const typed = new Typed(el.current, {
            strings: ["instantly.", "flexibly.", "Tactfully."],
            startDelay: 5000,
            backDelay: 5000,
            typeSpeed: 20,
            backSpeed: 20,
            showCursor: false
        });

        // Standalone mode media query
        if (window.matchMedia("(display-mode: standalone)").matches) {
            setIsStandalone(true);
        } else {
            const userAgentString = window.navigator.userAgent.toLowerCase();
            // iOS check
            if (/iphone|ipad|ipod/.test(userAgentString)) {
                setOs("ios");
                // Android check
            } else if (/android/.test(userAgentString)) {
                setOs("android");
                // Prompt flow check
                if (("onbeforeinstallprompt" in window)) {
                    setIsPromptable(true);
                    // Check if app install prompt was shown
                    window.addEventListener('beforeinstallprompt', (e) => {
                        // Prevent the mini-infobar from appearing on mobile
                        e.preventDefault();
                        // Stash the event so it can be triggered later.
                        setInstallPrompt(e);
                    });
                }
            }
        }

        return () => {
            // Destroy Typed instance during cleanup to stop animation
            typed.destroy();
        };
    }, [])

    return (
        <Page className="justify-center bg-slate-100">
            <div className={styles.siteCode}></div>
            <header className="text-center text-slate-600">
                <p className="mt-8 mb-6 text-4xl leading-tight">Share your contact&nbsp;info
                    <span id="shuffle" className="block h-10 text-purple-600 textGlow">Tactfully.</span>
                </p>
                <p className="text-xl max-w-md leading-normal">Connect faster IRL with personal QR codes for whatever matters to you.</p>
            </header>
            {isStandalone ?
                <Contacts />
                : <Button className="mt-16" onClick={isPromptable ? showPrompt : null}>Install app</Button>
            }
        </Page>
    );
};
