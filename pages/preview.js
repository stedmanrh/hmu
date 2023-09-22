import Page from "../components/Page.js";
import Contact from "../components/Contact.js";
import EditPane from "../components/EditPane.js";
import TextButton from "../components/TextButton.js";
import styles from "../styles/Preview.module.css";

import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";
import QRCode from "qrcode";

export default function Preview() {
    const router = useRouter();

    const [data, setData] = useState({
        src: "",
        displayName: "",
        label: "",
        vibe: "",
    });

    const [contact, setContact] = useState({
        name: "",
        src: ""
    });

    const [links, setLinks] = useState({
        instagram: {
            iconSrc: "/assets/instagram.svg",
            label: "Instagram",
            displayName: "",
            url: ""
        }
    });

    const [editing, setEditing] = useState(false);

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

    // Show the edit pane
    const edit = () => {
        setEditing(!editing);
    }

    // Show default contact
    const displayContact = () => {
        setData((prevData) => ({
            ...prevData,
            displayName: contact.name,
            src: contact.src,
            label: "Contact"
        }));
    }

    const home = () => {
        // location vs. router.push to fire beforeinstallprompt event
        router.push("/");
    }

    const editContact = () => {
        router.push("/create?editing=true");
    }

    const editLinks = () => {
        // router.push("/links");
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
                    setData({
                        src: url,
                        displayName: name,
                        label: "Contact",
                        vibe: vibe,
                    });
                    setContact({
                        name: name,
                        src: url
                    });
                });
        } else home();
    }, []);

    return (
        <Page className="pt-24">
            <nav className="fixed z-10 top-0 w-full p-6 flex justify-between">
                <TextButton className={styles.home} onClick={home}>Home</TextButton>
                <TextButton className={editing ? `${styles.edit} ${styles.editing}` : styles.edit}
                    onClick={edit}>
                    {editing ? "Cancel" : "Edit"}
                </TextButton>
            </nav>
            <Contact src={data.src} displayName={data.displayName} vibe={data.vibe} label={data.label}
                style={editing ? { "opacity": 0 } : null} />
            {Object.entries(links).filter(([key, value]) => value.url != "").length < 1 ?
                <TextButton className="z-10 mt-24 px-8 py-5 rounded-full bg-black/10
                active:bg-black/[.15] transition-all duration-100
                text-xl font-medium !border-none"
                    style={editing ? { "opacity": 0 } : null}
                    onClick={editLinks}>Add links</TextButton> : null}
            {editing ? <EditPane editContact={editContact} editLinks={null} /> : null}
        </Page>
    );
};
