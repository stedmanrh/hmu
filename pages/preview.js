import Page from "../components/Page.js";
import Contact from "../components/Contact.js";
import TextButton from "../components/TextButton.js";
import styles from "../styles/Preview.module.css";

import { useRouter } from 'next/router';
import { useState, useEffect } from "react";
import secureLocalStorage from "react-secure-storage";
import QRCode from "qrcode";

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
        router.push("/");
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
    }, [home]);

    return (
        <Page className="pt-24">
            <nav className="fixed z-10 top-0 w-full p-6 flex justify-between">
                <TextButton className={styles.home} onClick={home}>Home</TextButton>
                <TextButton className={styles.edit} onClick={edit}>Edit</TextButton>
            </nav>
            <Contact src={contact.src} name={contact.name} vibe={contact.vibe} />
        </Page>
    );
};
