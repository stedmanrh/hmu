import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import styles from "../styles/Form.module.css";
import vibes from "../utils/vibes.json";
import secureLocalStorage from "react-secure-storage";

export default function Form() {
    const router = useRouter();

    const [formfield, setFormfield] = useState({
        name: "",
        phone: "",
        email: "",
        url: "",
        vibe: JSON.stringify(vibes[0]),
    });

    const [vibeOptions, setVibeOptions] = useState([]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormfield(prevState => ({
            ...prevState,
            [name]: value,
        }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const formValues = JSON.stringify(formfield);
        secureLocalStorage.setItem("formValues", formValues);
        router.push("/preview");
    }

    const home = () => {
        // location vs. router.push to fire beforeinstallprompt event
        console.log(router.query.editing);
        router.query.editing ?
            router.push("/preview") : window.location = "/";
    }

    useEffect(() => {
        setVibeOptions(vibes);
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
        <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.label}>
                <span className={styles.labelText}>Name</span>
                <input className={styles.input} type="text" name="name" required value={formfield.name} placeholder="Hello World" onChange={handleChange} />
            </label>
            <label className={styles.label}>
                <span className={styles.labelText}>Phone</span>
                <input className={styles.input} type="tel" name="phone" value={formfield.phone} placeholder="+16789998212" onChange={handleChange} />
            </label>
            <label className={styles.label}>
                <span className={styles.labelText}>Email</span>
                <input className={styles.input} type="email" name="email" value={formfield.email} placeholder="hello@hmu.world" onChange={handleChange} />
            </label>
            <label className={styles.label}>
                <span className={styles.labelText}>URL</span>
                <input className={styles.input} type="url" name="url" value={formfield.url} placeholder="https://hmu.world" onChange={handleChange} />
            </label>
            <label className={styles.label}>
                <span className={styles.labelText}>Vibe</span>
                <select className={`${styles.input} + ${styles.select}`} value={formfield.vibe} onChange={handleChange} name="vibe">
                    {vibeOptions.map((option) => (
                        <option key={option.label} value={JSON.stringify(option)}>{option.emoji + " " + option.label}</option>
                    ))}
                </select>
            </label>
            <input className="button" type="submit" value="Save" onClick={handleSubmit} />
            <button className="button-txt" onClick={home}>Cancel</button>
        </form>
    );
}