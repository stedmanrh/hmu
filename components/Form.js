import styles from "../styles/Form.module.css";
import vibes from "../utils/vibes.json";
import Button from './Button';
import Input from './Input';
import TextButton from './TextButton';

import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import secureLocalStorage from "react-secure-storage";

export default function Form() {
    const router = useRouter();

    const [formfield, setFormfield] = useState({
        name: "",
        phone: "",
        email: "",
        url: "",
        vibe: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormfield(prevState => ({
            ...prevState,
            [name]: value,
        }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        
        // Check for name
        if (formfield.name == "") {
            alert("Please enter your name.")
            return;
        }

        //Check for contact info
        if (formfield.phone == "" && formfield.email == "" && formfield.url == "") {
            alert("Please enter your contact info.")
            return;
        }

        // Randomize vibe if not set
        if (formfield.vibe == "") {
            formfield.vibe = JSON.stringify(vibes[Math.floor(Math.random()*(vibes.length-1))]);
        }
        const formValues = JSON.stringify(formfield);
        secureLocalStorage.setItem("formValues", formValues);
        router.push("/preview");
        // TODO: analytics event
    }

    const home = () => {
        // location vs. router.push to fire beforeinstallprompt event
        console.log(router.query.editing);
        router.query.editing ?
            router.push("/preview") : window.location = "/";
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
        <form className="w-full max-w-md flex flex-col px-2"
            onSubmit={handleSubmit}>
            <Input name="name" label="Name" type="text" required={true} value={formfield.name} placeholder="Soulja Boy" onChange={handleChange} />
            <Input name="phone" label="Phone" type="tel" value={formfield.phone} placeholder="6789998212" onChange={handleChange} />
            <Input name="email" label="Email" type="email" value={formfield.email} placeholder="swag@hmu.world" onChange={handleChange} />
            <Input name="url" label="URL" type="url" value={formfield.url} placeholder="https://hmu.world" onChange={handleChange} />
            <label className="mb-4">
                <span className="mb-1 text-slate-600">Vibe</span>
                <select className={`${styles.input} + ${styles.select}`} value={formfield.vibe} onChange={handleChange} name="vibe">
                    <option value="" disabled>Choose a vibe</option>
                    {vibes.sort((a, b) => (
                        a.label.localeCompare(b.label)
                    )).map((option) => (
                        <option key={option.label} value={JSON.stringify(option)}>{option.emoji + " " + option.label}</option>
                    ))}
                </select>
            </label>
            <Button onClick={handleSubmit} className="self-center my-4">Save contact</Button>
            <TextButton onClick={home} className="self-center">Cancel</TextButton>
        </form>
    );
}