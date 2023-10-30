import Page from "../components/Page.js";
import Contact from "../components/Contact.js";
import EditPane from "../components/EditPane.js";
import SocialLink from "../components/SocialLink.js";
import TextButton from "../components/TextButton.js";
import styles from "../styles/Preview.module.css";

import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";
import QRCode from "qrcode";

export default function Preview() {
    const router = useRouter();

    const loadLocalStorageData = (item) => {
        try {
            const localStorageData = secureLocalStorage.getItem(item);
            console.count("localStorageData", localStorageData);
            const parsedData = JSON.parse(localStorageData);
            console.count("parsedData", parsedData);
            return parsedData;
        } catch (e) {
            console.log(e);
        }
    }

    const [formValues, setFormValues] = useState(loadLocalStorageData("formValues"));
    const [linkValues, setLinkValues] = useState(loadLocalStorageData("linkValues"));

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
            label: "Instagram",
            displayName: "",
            displayNamePrepend: "@",
            url: "",
            urlPrepend: "https://instagram.com/"
        },
        twitter: {
            label: "X (Twitter)",
            displayName: "",
            displayNamePrepend: "@",
            url: "",
            urlPrepend: "https://twitter.com/"
        },
        linkedin: {
            label: "LinkedIn",
            displayName: "",
            displayNamePrepend: "@",
            url: "",
            urlPrepend: "https://linkedin.com/in/"
        },
        venmo: {
            label: "Venmo",
            displayName: "",
            displayNamePrepend: "@",
            url: "",
            urlPrepend: "https://venmo.com/"
        },
        custom: {
            label: "Link",
            displayName: "",
            url: ""
        }
    });

    const [activeLink, setActiveLink] = useState("");

    const [editing, setEditing] = useState(false);

    const vCardValues = (formValues) => {
        let vCard =
            "BEGIN:VCARD\nVERSION:4.0" +
            "\nFN:" + formValues.name +
            "\nTEL:" + formValues.phone +
            "\nEMAIL:" + formValues.email +
            "\nURL:" + formValues.url +
            "\nNOTE:https://hmu.world" +
            "\nEND:VCARD";
        return vCard;
    }

    // Show the edit pane
    const edit = () => {
        setEditing(!editing);
    }

    // Show default contact
    const showContact = () => {
        setActiveLink("");
        setData((prevData) => ({
            ...prevData,
            displayName: contact.name,
            src: contact.src,
            label: "Contact"
        }));
    }

    const home = () => {
        router.push("/");
    }

    const editContact = () => {
        router.push("/create?editing=true");
    }

    const editLinks = () => {
        router.push("/links");
    }

    const toggleActiveLink = (e) => {
        const type = e.target.getAttribute("data-type");
        const displayName = e.target.getAttribute("data-displayName");
        const label = e.target.getAttribute("data-label");
        const url = e.target.getAttribute("data-url");

        if (activeLink == type) {
            setActiveLink("");
            showContact()
        } else {
            setActiveLink(type);
            QRCode.toDataURL(url,
                {
                    width: 168,
                    errorCorrectionLevel: 'L',
                }).then((dataUrl) => {
                    setData((prevData) => ({
                        ...prevData,
                        src: dataUrl,
                        displayName: displayName,
                        label: label,
                    }));
                });
        }
    }

    // get usernames from links
    const processDisplayName = (inputString) => {
        // Using match method
        const matchResult = inputString.match(/\/([^/?]+)(?:\?.*)?$/);
        if (matchResult) {
            const textAfterLastSlash = matchResult[0];
            return (textAfterLastSlash);
        } else {
            // No match found, output the input string as is
            return inputString;
        }
    }

    // get domain from URL
    function processURL(url) {
        // Use a regex pattern to match the domain
        const domainRegex = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:/\n?]+)(?:[^/\n]*)(?:\/.*)?$/i;
        const matches = url.match(domainRegex);

        if (matches && matches.length >= 2) {
            // The domain is captured in the second group (index 1) of the matches array
            return matches[1];
        } else {
            return null;
        }
    }

    useEffect(() => {
        // not initially false
        if (secureLocalStorage.getItem("converted") === false) {
            home();
            return;
        }
        if (formValues && secureLocalStorage.getItem("converted") === true) {
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
        }
        if (linkValues && secureLocalStorage.getItem("linkValues")) {
            setLinks(prevLinks => {
                const updatedLinks = { ...prevLinks };
                for (const key in linkValues) {
                    if (key == "custom") {
                        updatedLinks[key].displayName = processURL(linkValues[key]);
                        updatedLinks[key].url = linkValues[key];
                    }
                    else if (linkValues[key]) {
                        updatedLinks[key].displayName = links[key].displayNamePrepend + processDisplayName(linkValues[key]);
                        updatedLinks[key].url = links[key].urlPrepend + linkValues[key];
                    }
                }
                return updatedLinks;
            });
        }
        console.log("formValues state", formValues, "formValues storage", secureLocalStorage.getItem("formValues"));
        if (formValues != secureLocalStorage.getItem("formValues")) {
            console.error("Inconsistent state and storage values");
        }
    }, [formValues, linkValues]);

    const filteredLinks =
        <div className="flex flex-wrap justify-center">
            <SocialLink
                className={!activeLink ?
                    "transition-opacity duration-100 socialLink contactLink"
                    : "opacity-30 transition-opacity duration-100 socialLink contactLink"}
                onClick={showContact}
            />
            {Object.entries(links)
                .filter(([key, value]) => value.url !== "")
                .map(([key, value]) => (
                    <SocialLink key={key}
                        className={activeLink == key ?
                            `transition-opacity duration-100 socialLink ${key}`
                            : `opacity-30 transition-opacity duration-100 socialLink ${key}`}
                        type={key}
                        displayName={value.displayName}
                        label={value.label}
                        url={value.url}
                        onClick={toggleActiveLink} />
                ))}
        </div>;

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
                style={editing ? { "opacity": 0 } : null}
                activeLink={activeLink} />
            <div className="z-10 mt-12 flex justify-center max-w-20
            opacity-75 transition-all duration-300"
                style={editing ? { "opacity": 0 } : null}>
                {Object.values(links).every(value => value.url === "") ?
                    <TextButton className="mt-8 px-8 py-5 rounded-full bg-black/10
                active:bg-black/[.15] !border-none"
                        onClick={editLinks}>Add links</TextButton> : filteredLinks}
            </div>
            {editing ? <EditPane editContact={editContact} editLinks={editLinks} /> : null}
            <p className="absolute bottom-6 text-lg tracking-wide text-slate-600/50">hmu.world</p>
        </Page>
    );
};
