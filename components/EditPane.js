import TextButton from "./TextButton";

import { useEffect, useRef } from "react";

export default function EditPane(props) {

    const pane = useRef(0);

    useEffect(() => {
        const paneNode = pane.current;
        paneNode.style.opacity = 1;

        return () => { 
            paneNode.style.opacity = 0;
        }
    }, [])

    return (
        <div ref={pane} className="fixed top-16 right-8 bottom-16 left-8
        flex flex-col divide-y-2 divide-solid divide-white/75 opacity-0
        transition-opacity duration-300 delay-300">
            <div className={`relative z-10 grow flex items-center justify-center animate-pulse editContact`}>
                <TextButton className="px-8 py-5 rounded-full bg-black/10
                active:bg-black/[.15] transition-all duration-100
                text-xl !border-none"
                    onClick={props.editContact}>Edit contact</TextButton>
            </div>
            <div className={`relative z-10 grow flex items-center justify-center animate-pulse editLinks`}>
                <TextButton className="px-8 py-5 rounded-full bg-black/10
                active:bg-black/[.15] transition-all duration-100
                text-xl !border-none"
                    onClick={props.editLinks}>Edit links</TextButton>
            </div>
        </div>
    )
}