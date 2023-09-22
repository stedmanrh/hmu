import * as convert from 'color-convert';
import Image from 'next/image';
import { useState, useEffect } from "react";

export default function Contact(props) {
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

    useEffect(() => {
        if (props.vibe.group) {
            setStops({
                start: props.vibe.group[0],
                end: props.vibe.group[props.vibe.group.length - 1],
                startRGBA: rgbaColor(props.vibe.group[0], 0.5),
                endRGBA: rgbaColor(props.vibe.group[props.vibe.group.length - 1], 0.5)
            });
        }
        const interval = setInterval(updateGradientAngle, 15);
        return () => clearInterval(interval);
    }, [props.vibe, props.displayName, props.label, props.src]);

    return (
        <div className="flex flex-col items-center justify-center z-0">
            <div className="-z-10 fixed top-0 right-0 bottom-0 left-0 opacity-20"
                style={{ "background": `linear-gradient(-${angle}deg, ${stops.start}, ${stops.end})` }}>
            </div>
            <header className="flex flex-col items-center space-y-6
            transition-opacity duration-300"
                style={props.style}>
                <div className="w-20 h-20 rounded-full
                flex justify-center items-center shrink-0
                bg-white shadow-md text-5xl"
                onClick={props.onClick}>
                    {props.vibe.emoji &&
                        <Image src={`/emoji/${props.vibe.emoji}.png`} alt={props.vibe.emoji}
                            width={48} height={48} priority={true} />
                    }
                </div>
                <div className="text-center">
                    <h1 className="text-3xl leading-tight max-w-sm text-slate-800">{props.displayName}</h1>
                    <p className="mt-2 text-xl text-slate-600">{props.label}</p>
                </div>
            </header>
            <div className="p-3 flex items-center justify-center mt-8 rounded-[24px]
            transition-opacity duration-300"
                style={{
                    ...props.style,
                    "background": `linear-gradient(${angle}deg, ${stops.start}, ${stops.end})`,
                    "boxShadow": `0 -4px 16px 0 ${stops.startRGBA}, 0 4px 16px 0 ${stops.endRGBA}`
                }}>
                <div className="flex p-1.5 rounded-[16px]
                bg-white">
                    {props.src &&
                        <Image src={props.src} width={168} height={168} priority={true}
                            alt={`${props.label} QR code for ${props.displayName}`} />
                    }
                </div>
            </div>
        </div>
    )
}