import { useRouter } from 'next/router';
import React from "react";
import { useState, useEffect } from "react";
import Header from "../components/Header.js";
import Canvas from "../components/Canvas.js";
import styles from "../styles/Home.module.css";
import secureLocalStorage from "react-secure-storage";

// TODO:
// - Emoji rendering (Android)
// - Canvas scaling

export default function Preview() {
    const router = useRouter();

    const [state, setState] = useState({
        src: "",
        name: "",
        vibe: "",
        width: "",
        height: "",
    });

    const buildQuery = (formValues) => {
        let query = "https://chart.googleapis.com/chart?cht=qr&chs=168x168&chld=|1&chl=";
        let vCard =
            "BEGIN:VCARD\nVERSION:4.0" +
            "\nFN:" + formValues.name +
            "\nTEL:" + formValues.phone +
            "\nEMAIL:" + formValues.email +
            "\nURL:" + formValues.url +
            "\nEND:VCARD";
        vCard = encodeURIComponent(vCard);
        query += vCard;
        return query;
    }

    const renderCode = (url, name, vibe) => {
        setState({
            src: url,
            name: name,
            vibe: vibe,
            width: window.innerWidth,
            height: window.innerHeight,
        });
    }

    const create = () => {
        router.push("/create");
    }

    useEffect(() => {
        const formValues = JSON.parse(secureLocalStorage.getItem("formValues"));
        const name = formValues.name;
        const vibe = JSON.parse(formValues.vibe);
        const url = buildQuery(formValues);
        renderCode(url, name, vibe);
        window.addEventListener('resize', () => {
            renderCode(url, name, vibe);
        });
    }, []);

    return (
        <div className={styles.container}>
            <Header></Header>
            <main className="flex">
                <button className="button-back" onClick={create}>Back</button>
                <Canvas
                    src={state.src}
                    name={state.name}
                    vibe={state.vibe}
                    width={state.width}
                    height={state.height}
                ></Canvas>
            </main>
        </div>
    );
};
