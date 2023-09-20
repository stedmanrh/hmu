import Button from "./Button";
import styles from "../styles/Preview.module.css";

import * as convert from 'color-convert';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";

export default function Contacts() {

    // Existing contact data
    const [contact, setContact] = useState({
        name: "",
        vibe: "",
    });

    const [stops, setStops] = useState({
        start: "",
        startRGBA: "",
        end: "",
        endRGBA: ""
    });

    const [angle, setAngle] = useState(180);

    // Increment gradient angle
    const updateGradientAngle = () => {
        setAngle((prevAngle) => (prevAngle + 1) % 360);
    };

    // Convert hex to rgba
    const rgbaColor = (hexColor, alpha) => {
        const stop = convert.hex.rgb(hexColor);
        const rgbaColor = "rgba(" + stop.join(",") + "," + alpha + ")";
        return rgbaColor;
    }

    // Initialize router
    const router = useRouter();

    // Navigate to contact form
    const create = () => {
        router.push("/create");
    }

    // Navigate to QR code
    const preview = () => {
        router.push("/preview");
    }

    useEffect(() => {
        // Check if "formValues" exists in secureLocalStorage
        const formValues = JSON.parse(secureLocalStorage.getItem("formValues"));
        if (formValues) {
            const name = formValues.name;
            const vibe = JSON.parse(formValues.vibe);
            setContact({
                name: name,
                vibe: vibe,
            });
            setStops({
                start: vibe.group[0],
                end: vibe.group[vibe.group.length - 1],
                startRGBA: rgbaColor(vibe.group[0], 0.5),
                endRGBA: rgbaColor(vibe.group[vibe.group.length - 1], 0.5)
            });
            const interval = setInterval(updateGradientAngle, 15);
            return () => clearInterval(interval);
        }
    }, []);

    if (!contact.name != "") {
        return (
            <div className={`${styles.miniCard} relative mt-16 rounded-xl
            cursor-pointer active:scale-[.98] p-0.5`}
                style={{
                    "background": `linear-gradient(${angle}deg, ${stops.start}, ${stops.end})`,
                    "boxShadow": `0 -2px 8px 0 ${stops.startRGBA}, 0 2px 8px 0 ${stops.endRGBA}`
                }}
                onClick={preview}>
                <div className="w-80 pl-6 pr-10 py-4 flex items-center rounded-xl
            bg-white shadow-md">
                    <span className="mr-3 text-2xl">
                        {contact.vibe.emoji}
                    </span>
                    <p className="text-lg truncate text-slate-800">{contact.name}</p>
                </div>
            </div>
        )
    } else return (
        <Button className="mt-16" onClick={create}>+ New contact</Button>
    );
}