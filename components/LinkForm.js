import { StorageContext } from "../pages/_app.js";
import Button from './Button.js';
import Input from './Input.js';
import TextButton from './TextButton.js';

import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

export default function LinkForm() {
    const router = useRouter();

    const { formValues, setFormValues, linkValues, setLinkValues } = useContext(StorageContext);

    const [formfield, setFormfield] = useState({
        instagram: "",
        twitter: "",
        linkedin: "",
        venmo: "",
        custom: ""
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormfield(prevState => ({
            ...prevState,
            [name]: value,
        }));
    }

    // get usernames from links
    const processDisplayName = (inputString) => {
        // Using match method
        const matchResult = inputString.match(/\/([^/?]+)(?:\?.*)?$/);
        if (matchResult) {
            const textAfterLastSlash = matchResult[1];
            // Remove query strings
            const textBeforeQuery = textAfterLastSlash.split('?')[0];
            return (textBeforeQuery);
        } else {
            // No match found, output the input string without "@" if present
            return inputString.replace(/^@/, '');
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        // Process form values to yield display names
        const processedLinks = Object.fromEntries(
            Object.entries(formfield).map(([key, value]) => {
                if (key == "custom") {
                    return [key, value];
                } else {
                    return [key, processDisplayName(value)];
                }
            })
        );

        setLinkValues(processedLinks);

        // Log form submission
        gtag("event", "form_submit", {
            "form_id": "linkForm",
            "form_name": "Link form",
            "destination": "/links"
        });

        router.push("/preview");
    }

    const cancel = () => {
        router.push("/preview");
    }

    useEffect(() => {
        if (linkValues) {
            setFormfield(prevState => ({
                ...prevState,
                instagram: linkValues.instagram,
                twitter: linkValues.twitter,
                linkedin: linkValues.linkedin,
                venmo: linkValues.venmo,
                custom: linkValues.custom
            }));
        }
    }, [linkValues]);

    return (
        <form id="linkForm" name="Link form" className="w-full max-w-md flex flex-col px-2"
            onSubmit={handleSubmit}>
            <Input name="instagram" label="Instagram" type="text" value={formfield.instagram} placeholder="snoopdogg" onChange={handleChange} />
            <Input name="twitter" label="X (Twitter)" type="text" value={formfield.twitter} placeholder="snoopdogg" onChange={handleChange} />
            <Input name="linkedin" label="LinkedIn" type="text" value={formfield.linkedin} placeholder="snoopdogg" onChange={handleChange} />
            <Input name="venmo" label="Venmo" type="text" value={formfield.venmo} placeholder="snoopdogg" onChange={handleChange} />
            <Input name="custom" label="Link" type="text" value={formfield.custom} placeholder="https://hmu.world" onChange={handleChange} />
            <Button type="submit" className="self-center my-4 shadow-none">Save links</Button>
            <TextButton onClick={cancel} className="self-center">Cancel</TextButton>
        </form>
    );
}