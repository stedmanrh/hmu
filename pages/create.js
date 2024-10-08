import { StorageContext } from "./_app.js";
import Page from "../components/Page.js";
import Form from "../components/Form.js";

import { useContext, useEffect, useState } from "react";

export default function Create() {

    const { formValues, setFormValues, linkValues, setLinkValues } = useContext(StorageContext);

    const [emoji, setEmoji] = useState(null);

    const [stops, setStops] = useState({
        start: "",
        end: ""
    });

    const [angle, setAngle] = useState(180);

    // Increment gradient angle
    const updateGradientAngle = () => {
        setAngle((prevAngle) => (prevAngle + 1) % 360);
    };

    // Change vibe preview on selection
    const handleChange = (selectedVibe) => {
        const vibe = JSON.parse(selectedVibe);
        setEmoji(vibe.emoji);
        setStops({
            start: vibe.group[0],
            end: vibe.group[vibe.group.length - 1],
        });
    }

    useEffect(() => {
        if (formValues) {
            handleChange(formValues.vibe);
        }
        const interval = setInterval(updateGradientAngle, 15);
        return () => clearInterval(interval);
    }, [formValues])

    return (
        <Page className={stops.start != "" ? "justify-center z-0" : "justify-center bg-slate-100"}>
            <div className="-z-10 fixed top-0 right-0 bottom-0 left-0 opacity-20"
                style={{ "background": `linear-gradient(-${angle}deg, ${stops.start}, ${stops.end})` }}></div>
            <header className="flex flex-col items-center space-y-6 mb-6">
                <div className="w-20 h-20 rounded-full
                flex justify-center items-center shrink-0 
                bg-white shadow-md
                text-5xl">
                    <img src={emoji ? `/emoji/${emoji}.png` : "/emoji/👤.png"}
                        width={48} height={48}
                        alt={emoji || "👤"} />
                </div>
                <h1 className="text-center text-4xl leading-tight text-slate-600">
                    Enter your contact&nbsp;info
                </h1>
            </header>
            <Form handleChange={handleChange} />
        </Page>
    );
};
