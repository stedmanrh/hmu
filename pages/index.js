import styles from "../styles/Home.module.css";
import Page from "../components/Page.js";
import Button from "../components/Button.js";
import Contacts from "../components/Contacts";

import { useEffect, useRef, useState } from "react";
import Typed from "typed.js";

export default function Home() {
    // Create reference to store the DOM element containing the animation
    const el = useRef("#shuffle");

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
            <Contacts />
            {/* <Button className="mt-16" onClick={null}>Install app</Button> */}
        </Page>
    );
};
