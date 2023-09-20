import Button from "./Button";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";

export default function Contacts() {

    // Existing contact data
    const [contactExists, setContactExists] = useState(false);

    // Initialize router
    const router = useRouter();

    // Navigate to contact form
    const create = () => {
        router.push("/create");
    }

    // Navigate to QR code
    const preview = () => {
        router.push("/preview");
    }

    useEffect(() => {
        // Check if "formValues" exists in secureLocalStorage
        const formValues = secureLocalStorage.getItem("formValues");
        if (formValues) {
            setContactExists(true);
        }
    }, []);

    return (
        <div>
            {contactExists ? null :
                <Button onClick={create}>+ New contact</Button>
            }
        </div>
    );
}