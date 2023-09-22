import Button from './Button.js';
import Input from './Input.js';
import Modal from './Modal.js';
import TextButton from './TextButton.js';
import vibes from "../utils/vibes.json";

import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import secureLocalStorage from "react-secure-storage";

export default function LinkForm(props) {
    const router = useRouter();

    const [formfield, setFormfield] = useState({
        instagram: "",
        twitter: "",
        linkedin: ""
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

        const linkValues = JSON.stringify(formfield);
        secureLocalStorage.setItem("linkValues", linkValues);
        router.push("/preview");
        // TODO: analytics event
    }

    const cancel = () => {
        router.push("/preview");
    }

    useEffect(() => {
        const linkValues = JSON.parse(secureLocalStorage.getItem("linkValues"));
        if (linkValues != null) {
            setFormfield(prevState => ({
                ...prevState,
                instagram: linkValues.instagram,
                twitter: linkValues.twitter,
                linkedin: linkValues.linkedin
            }));
        }
    }, []);

    return (
        <form className="w-full max-w-md flex flex-col px-2"
            onSubmit={handleSubmit}>
            <Input name="instagram" label="Instagram username" type="text" value={formfield.instagram} placeholder="garyvee" onChange={handleChange} />
            <Input name="twitter" label="X (Twitter) username" type="text" value={formfield.twitter} placeholder="garyvee" onChange={handleChange} />
            <Input name="linkedin" label="LinkedIn username" type="text" value={formfield.linkedin} placeholder="garyvaynerchuk" onChange={handleChange} />
            <Button onClick={handleSubmit} className="self-center my-4 shadow-none">Save links</Button>
            <TextButton onClick={cancel} className="self-center">Cancel</TextButton>
        </form>
    );
}