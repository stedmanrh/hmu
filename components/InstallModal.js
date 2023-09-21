import TextButton from "./TextButton";
import styles from "../styles/Home.module.css";

import { useEffect, useRef } from "react";

function Instructions({ os }) {
    if (os == "ios") {
        return (
            <div className="text-base text-slate-600 space-y-3">
                <ol className="ml-5 list-decimal space-y-3">
                    <li>Open <span className="text-purple-600">hmu.world</span> in Safari.</li>
                    <li>Tap the <em className={`relative font-medium uppercase tracking-wide pl-5 ml-1 mr-0.5 ${styles.share}`}>share</em> button.</li>
                    <li>Tap <em className="font-medium uppercase tracking-wide">Add to home screen</em>.</li>
                </ol>
            </div>
        );
    } else if (os == "android") {
        return (
            <div className="text-base text-slate-600 space-y-3">
                <ol className="ml-5 list-decimal space-y-3">
                    <li>Open <span className="text-purple-600">hmu.world</span> in Chrome.</li>
                    <li>Tap the <em className="font-medium uppercase tracking-wide">install app</em> button.</li>
                </ol>
            </div>
        );
    } else return (
        <div className="text-base text-slate-600 space-y-3">
            <p>
                Tactful supports iOS and Android.
            </p>
            <ol className="ml-5 list-decimal space-y-3">
                <li>Open <span className="text-purple-600">hmu.world</span> on your mobile device <em className="font-medium uppercase tracking-wide">or</em> scan the QR code on the homepage with its camera.</li>
                <li>Tap the <em className="font-medium uppercase tracking-wide">install app</em> button.</li>
            </ol>
        </div>
    );
}

export default function InstallModal({ os, dismiss }) {

    const shim = useRef(0);
    const modal = useRef(1);

    useEffect(() => {

        const shimNode = shim.current;
        const modalNode = modal.current;

        shimNode.style.opacity = 1;
        modalNode.style.top = "50%";

        return () => {
            shimNode.style.opacity = 0;
            modalNode.style.top = "45%";
        }
    }, [])

    return (
        <div ref={shim} className="fixed w-full h-full bg-black/[.15] opacity-0 transition-all duration-300">
            <div ref={modal} className="fixed left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2
            w-full max-w-[23rem] px-8 pt-6 pb-4 rounded-xl flex flex-col
            bg-white shadow-2xl transition-all duration-300">
                <div className="pb-4 mb-5 border-b border-solid border-purple-200">
                    <p className={`relative left-8 text-xl font-normal uppercase tracking-wider text-purple-600 ${styles.install}`}>Install Tactful</p>
                </div>
                <Instructions os={os} />
                <div className="text-right">
                    <TextButton className="mt-4" onClick={dismiss}>Dismiss</TextButton>
                </div>
            </div>
        </div>
    )
}