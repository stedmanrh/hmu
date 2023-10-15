import Page from "../components/Page.js";
import Button from "../components/Button.js";
import Contacts from "../components/Contacts.js";
import InstallModal from "../components/InstallModal.js";
import Modal from "../components/Modal.js";
import TextButton from "../components/TextButton";
import styles from "../styles/Home.module.css";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Typed from "typed.js";
import secureLocalStorage from "react-secure-storage";

export default function Home() {
    const [isStandalone, setIsStandalone] = useState(false);
    const [os, setOs] = useState(null);
    const [isPromptable, setIsPromptable] = useState(false);
    const [installPrompt, setInstallPrompt] = useState(null);
    const [installModal, setInstallModal] = useState(false);
    const [privacyModal, setPrivacyModal] = useState(false);
    const [feedbackModal, setFeedbackModal] = useState(false);

    // Existing contact data
    const [contact, setContact] = useState({
        name: "",
        vibe: "",
    });

    // Create reference to store the DOM element containing the animation
    const el = useRef("#shuffle");

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
        }

        // Initialize headline shuffle
        const typed = new Typed(el.current, {
            strings: ["instantly.", "flexibly.", "tactfully."],
            startDelay: 5000,
            backDelay: 5000,
            typeSpeed: 20,
            backSpeed: 20,
            showCursor: false
        });

        // Check if app install prompt was shown
        window.addEventListener('beforeinstallprompt', (e) => {
            // Prevent the mini-infobar from appearing on mobile
            e.preventDefault();
            // Stash the event so it can be triggered later.
            setInstallPrompt(e);
        });

        window.addEventListener('appinstalled', () => {
            // Install analytics
            gtag("event", "android_install");
        });

        // Standalone mode media query
        if (window.matchMedia("(display-mode: standalone)").matches) {
            setIsStandalone(true);
        } else {
            const userAgentString = window.navigator.userAgent.toLowerCase();
            // iOS check
            if (/iphone|ipad|ipod/.test(userAgentString)) {
                setOs("ios");
                // Android check
            } else if (/android/.test(userAgentString)) {
                setOs("android");
                // Prompt flow check
                if (("onbeforeinstallprompt" in window)) {
                    setIsPromptable(true);
                }
            }
        }

        return () => {
            // Destroy Typed instance during cleanup to stop animation
            typed.destroy();
        };
    }, [])

    // App install prompt flow
    const showPrompt = async () => {
        // Show install prompt
        installPrompt.prompt();
        // Wait for the user to respond to the prompt ("accepted" | "dismissed")
        const { outcome } = await installPrompt.userChoice;
        // Prompt install analytics
        gtag("event", "android_install_prompt", {
            "outcome": outcome
        });
        // Discard used prompt
        setInstallPrompt(null);
    }

    // Initialize router
    const router = useRouter();

    // Navigate to contact form
    const create = () => {
        router.push("/create");
    }

    const pressInstallButton = () => {
        // Log install button press
        gtag("event", "install_button");
        isPromptable ? showPrompt() : toggleInstallModal();
    }

    const toggleInstallModal = () => { setInstallModal(!installModal) }
    const togglePrivacyModal = () => { setPrivacyModal(!privacyModal) }
    const toggleFeedbackModal = () => { setFeedbackModal(!feedbackModal) }

    return (
        <Page className="justify-center bg-slate-100">
            <div className={styles.siteCode}></div>
            <header className="text-center text-slate-600">
                <p className="mt-8 mb-6 text-4xl leading-tight">Share your contact&nbsp;info
                    <span id="shuffle" className="block h-10 text-purple-600 textGlow">tactfully.</span>
                </p>
                <p className="text-xl max-w-md leading-normal">Connect faster IRL with personal QR codes for what matters to you.</p>
            </header>
            {isStandalone ?
                contact.name ?
                    <Contacts name={contact.name} vibe={contact.vibe} />
                    : <Button className="mt-16" onClick={create}>+ New contact</Button>
                : <div className="mt-16 flex flex-col items-center">
                    <Button className="mb-4" onClick={pressInstallButton}>Install app</Button>
                    <TextButton onClick={togglePrivacyModal}>Privacy</TextButton>
                </div>
            }
            <a className="fixed w-6 h-6 bottom-6 right-6 flex items-center justify-center rounded-full
            bg-purple-200 text-purple-400 cursor-pointer"
                onClick={toggleFeedbackModal}>?</a>
            {installModal ? <InstallModal os={os} dismiss={toggleInstallModal} /> : null}
            {privacyModal ?
                <Modal title="Privacy" dismiss={togglePrivacyModal}>
                    <div className="text-base text-slate-600 space-y-3">
                        <p>{`hmu.world doesn't keep your personal information. Basic metrics are tracked with Google Analytics. Any personal data that the app uses is encrypted and stored locally on your mobile device.`}</p>
                        <p>{`If you'd like to delete your data:`}</p>
                        <ol className="ml-5 list-decimal space-y-3">
                            <li>Open the site settings for <span className="text-purple-600">hmu.world</span> on your mobile device.</li>
                            <li>Delete the site data.</li>
                            <li>Quit and reopen the app.</li>
                        </ol>
                    </div>
                </Modal>
                : null}
            {feedbackModal ?
                <Modal title="Feedback" dismiss={toggleFeedbackModal}>
                    <div className="text-base text-slate-600 space-y-3">
                        <p>Questions, comments, or bug reports?</p>
                        <ol>
                            <li>Email me: <a href="mailto:sup@hmu.world?subject=hmu.world%20Feedback" target="_blank" rel="noreferrer"
                                className="text-purple-600 transition-all duration-150
                            hover:text-purple-400 focus:text-purple-400 active:text-purple-400">sup@hmu.world</a></li>
                            <li>DM me on Twitter: <a href="https://x.com/hmudotworld" target="_blank" rel="noreferrer"
                                className="text-purple-600 transition-all duration-150
                            hover:text-purple-400 focus:text-purple-400 active:text-purple-400">@hmudotworld</a></li>
                        </ol>
                    </div>
                </Modal>
                : null}
        </Page>
    );
};
