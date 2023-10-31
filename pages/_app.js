import '../styles/reset.css';
import '../dist/main.css';
import Analytics from '../components/Analytics';

import { createContext, useState } from 'react';
import secureLocalStorage from "react-secure-storage";

const loadLocalStorageData = (item) => {
    try {
        const localStorageData = secureLocalStorage.getItem(item);
        console.count("localStorageData", localStorageData);
        const parsedData = JSON.parse(localStorageData);
        console.count("parsedData", parsedData);
        console.log(parsedData);
        return parsedData;
    } catch (e) {
        console.log(e);
    }
}

export const StorageContext = createContext(null);

function MyApp({ Component, pageProps }) {

    const [formValues, _setFormValues] = useState(loadLocalStorageData("formValues"));
    // Custom setter: storage and state
    const setFormValues = (value) => {
        secureLocalStorage.setItem("formValues", value);
        _setFormValues(value);
    }

    const [linkValues, _setLinkValues] = useState(loadLocalStorageData("linkValues"));
    // Custom setter: storage and state
    const setLinkValues = (value) => {
        secureLocalStorage.setItem("linkValues", value);
        _setLinkValues(value);
    }

    return (
        <StorageContext.Provider value={{formValues, setFormValues, linkValues, setLinkValues}} >
            <Analytics />
            <Component {...pageProps} />
        </StorageContext.Provider>
    )
}

export default MyApp
