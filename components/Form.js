import Button from "./Button.js";
import Input from "./Input.js";
import Modal from "./Modal.js";
import TextButton from "./TextButton.js";
import vibes from "../utils/vibes.json";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import secureLocalStorage from "react-secure-storage";

export default function Form(props) {
    const router = useRouter();

    const [formfield, setFormfield] = useState({
        name: "",
        phone: "",
        email: "",
        url: "",
        vibe: "",
    });

    const [modal, setModal] = useState(null);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormfield(prevState => ({
            ...prevState,
            [name]: value,
        }));
        if (event.target.name == "vibe") {
            props.handleChange(event.target.value);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        // Check for name
        if (formfield.name == "") {
            setModal(
                <Modal title="No name" dismiss={dismiss}>
                    Please enter your name.
                </Modal>
            );
            return;
        }

        //Check for contact info
        if (formfield.phone == "" && formfield.email == "" && formfield.url == "") {
            setModal(
                <Modal title="No contact info" dismiss={dismiss}>
                    Please enter your contact info.
                </Modal>
            );
            return;
        }

        // Anon vibe if not set
        if (formfield.vibe == "") {
            formfield.vibe = JSON.stringify(vibes.filter(vibe => vibe.label === "Anon")[0]);
        }
        const formValues = JSON.stringify(formfield);
        secureLocalStorage.setItem("formValues", formValues);

        // Log first time code creation
        if (!secureLocalStorage.getItem("converted")) {
            secureLocalStorage.setItem("converted", true);
            gtag("event", "first_form_submit");
        }

        // Log form submission
        gtag("event", "form_submit", {
            "form_id": "contactForm",
            "form_name": "Contact form",
            "destination": "/create"
        });

        router.push("/preview");
    }

    const dismiss = () => {
        setModal(null);
    }

    const cancel = () => {
        router.query.editing ?
            router.push("/preview") : router.push("/");
    }

    useEffect(() => {
        const formValues = JSON.parse(secureLocalStorage.getItem("formValues"));
        if (formValues != null) {
            setFormfield(prevState => ({
                ...prevState,
                name: formValues.name,
                phone: formValues.phone,
                email: formValues.email,
                url: formValues.url,
                vibe: formValues.vibe
            }));
        }
    }, []);

    return (
        <form id="contactForm" className="w-full max-w-md flex flex-col px-2"
            onSubmit={handleSubmit}>
            <Input name="name" label="Name" type="text" required={true} value={formfield.name} placeholder="Soulja Boy" onChange={handleChange} />
            <Input name="phone" label="Phone" type="tel" value={formfield.phone} placeholder="+16789998212" onChange={handleChange} />
            <Input name="email" label="Email" type="email" value={formfield.email} placeholder="swag@hmu.world" onChange={handleChange} />
            <Input name="url" label="URL" type="url" value={formfield.url} placeholder="https://hmu.world" onChange={handleChange} />
            <label className="mb-4">
                <div className="mb-1 text-slate-600">Vibe</div>
                <select className="select" value={formfield.vibe} onChange={handleChange} name="vibe">
                    <option value="" disabled>Choose a vibe</option>
                    {vibes.sort((a, b) => (
                        a.label.localeCompare(b.label)
                    )).map((option) => (
                        <option key={option.label} value={JSON.stringify(option)}>{option.emoji + " " + option.label}</option>
                    ))}
                </select>
            </label>
            <Button type="submit" className="self-center my-4 shadow-none">Save contact</Button>
            <TextButton onClick={cancel} className="self-center">Cancel</TextButton>
            {modal}
        </form>
    );
}