import { useRouter } from 'next/router';
import React from "react";
import { useState, useEffect } from "react";
import Page from "../components/Page";
import Contact from '../components/Contact';
import secureLocalStorage from "react-secure-storage";

import QRCode from 'qrcode';
// TODO:
// - Emoji rendering (Android)
// - Canvas scaling

export default function Preview() {
    const router = useRouter();

    const [contact, setContact] = useState({
        src: "",
        name: "",
        vibe: "",
    });

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

    const home = () => {
        // location vs. router.push to fire beforeinstallprompt event
        window.location = "/";
    }

    const edit = () => {
        router.push("/create?editing=true");
    }

    useEffect(() => {
        const formValues = JSON.parse(secureLocalStorage.getItem("formValues"));
        if (formValues) {
            const name = formValues.name;
            const vibe = JSON.parse(formValues.vibe);
            QRCode.toDataURL(vCardValues(formValues),
                {
                    width: 168,
                    errorCorrectionLevel: 'L',
                }).then((url) => {
                    setContact({
                        src: url,
                        name: name,
                        vibe: vibe,
                    })
                });
        } else home();
    }, []);

    return (
        <Page className="pt-24">
            <nav>
                <button className="button-home" onClick={home}>Home</button>
                <button className="button-edit" onClick={edit}>Edit</button>
            </nav>
            <Contact src={contact.src} name={contact.name} vibe={contact.vibe} />
        </Page>
    );
};
