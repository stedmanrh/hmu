import { useRouter } from 'next/router';
import React from "react";
import { useState, useEffect } from "react";
import Header from "../components/Header.js";
import Canvas from "../components/Canvas.js";
import secureLocalStorage from "react-secure-storage";

import QRCode from 'qrcode';
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
    const [dataUrl, setDataUrl] = useState("");

    const vCardValues = (formValues) => {
        let vCard =
            "BEGIN:VCARD\nVERSION:4.0" +
            "\nFN:" + formValues.name +
            "\nTEL:" + formValues.phone +
            "\nEMAIL:" + formValues.email +
            "\nURL:" + formValues.url +
            "\nEND:VCARD";
        return vCard;

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

    const home = () => {
        // location vs. router.push to fire beforeinstallprompt event
        // do we need ?source=pwa query string to load android secure storage?
        window.location = "/";
    }

    const edit = () => {
        router.push("/create?editing=true");
    }

    useEffect(() => {
        const formValues = JSON.parse(secureLocalStorage.getItem("formValues"));
        const name = formValues.name;
        const vibe = JSON.parse(formValues.vibe);
        QRCode.toDataURL(vCardValues(formValues),
            {
                width: 168,
                errorCorrectionLevel: 'L',
            }).then((url) => {
                setDataUrl(url)
            });
        renderCode(dataUrl, name, vibe);
        window.addEventListener('resize', () => {
            renderCode(url, name, vibe);
        });
    }, [dataUrl, setDataUrl]);

    return (
        <div>
            <Header></Header>
            <main className="flex">
                <button className="button-home" onClick={home}>Home</button>
                <button className="button-edit" onClick={edit}>Edit</button>
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
