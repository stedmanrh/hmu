import styles from "../styles/Home.module.css";
import Page from "../components/Page.js";
import Button from "../components/Button.js";

import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import secureLocalStorage from "react-secure-storage";
import Typed from "typed.js";

export default function Home() {
    // Initialize router
    const router = useRouter();

    // Initialize app state
    const [contactExists, setContactExists] = useState(false);

    // Create reference to store the DOM element containing the animation
    const el = useRef("#shuffle");

    // Check if contact data is stored
    const checkData = async () => {
        return secureLocalStorage.getItem("formValues");
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

        window.onload = (e) => {
            checkData().then(data => {
                if (data)
                    setContactExists(true);
            });
        }

        return () => {
            // Destroy Typed instance during cleanup to stop animation
            typed.destroy();
        };
    }, [])

    // Navigate to contact form
    const create = () => {
        router.push("/create");
    }

    // Navigate to QR code
    const preview = () => {
        router.push("/preview");
    }


    return (
        <Page className="justify-center bg-slate-100">
            <div className={styles.siteCode}></div>
            <header className="mb-32 text-center text-slate-600">
                <p className="mt-8 mb-6 text-4xl leading-tight">Share your contact&nbsp;info
                    <span id="shuffle" className="block h-10 text-purple-600 textGlow">Tactfully.</span>
                </p>
                <p className="text-xl max-w-md leading-normal">Connect faster IRL with personal QR codes for whatever matters to you.</p>
            </header>
            <Button className="mb-6" onClick={contactExists ? preview : create}>
                {contactExists ? "Share contact" : "+ New contact"}</Button>
        </Page>
    );
};
