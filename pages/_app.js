import '../styles/reset.css';
import '../dist/main.css';
import Analytics from '../components/Analytics';

import { createContext, useEffect, useState, useCallback } from 'react';


const loadLocalStorageData = (item) => {
    try {
        if (typeof window !== 'undefined') {
            const localStorageData = localStorage.getItem(item);
            const parsedData = JSON.parse(localStorageData);
            console.log(item, parsedData);
            return parsedData || "";
        }
    } catch (e) {
        console.log(e);
    }
}

export const StorageContext = createContext(null);

function MyApp({ Component, pageProps }) {

    const [loading, setLoading] = useState(true);
    const [formValues, _setFormValues] = useState(null);
    const [linkValues, _setLinkValues] = useState(null);

    // Custom setters remain unchanged
    const setFormValues = (value) => {
        localStorage.setItem("formValues", JSON.stringify(value));
        _setFormValues(value);
    }

    const setLinkValues = (value) => {
        localStorage.setItem("linkValues", JSON.stringify(value));
        _setLinkValues(value);
    }

    const loadData = useCallback(() => {
        const formData = loadLocalStorageData("formValues");
        const linkData = loadLocalStorageData("linkValues");
        
        _setFormValues(formData);
        _setLinkValues(linkData);

        if (formData !== null && linkData !== null) {
            setLoading(false);
        } else {
            // Retry after a short delay if data is not loaded
            setTimeout(loadData, 500);
        }
    }, []);

    // Load storage and set state on mount
    useEffect(() => {
        loadData();
    }, [loadData]);

    return (
        loading ? <div>Loading...</div> :
            <StorageContext.Provider value={{ formValues, setFormValues, linkValues, setLinkValues }} >
                <Analytics />
                <Component {...pageProps} />
            </StorageContext.Provider>
    )
}

export default MyApp;
