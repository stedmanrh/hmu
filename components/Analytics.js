import Script from "next/script";
import { useEffect, useState} from "react";

export default function Analytics(props) {

    const [isPWA, setIsPWA] = useState(false);

    useEffect(() => {
    const isIos = () => {
        const userAgent = window.navigator.userAgent.toLowerCase();
        return /iphone|ipad|ipod/.test(userAgent);
    }

    const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);

    // testing: remove !isIos() && to test on desktop
    if(!isIos() && !isInStandaloneMode()) {
        alert("Add to Home Screen for the best experience.");
    }
    }, []);

    // Google Analytics tag: G-0JWKW8VHW8
    return (
        <div className="container">
            <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=GA_G-0JWKW8VHW8" />
            <Script strategy="afterInteractive" id="gtag-init"
                dangerouslySetInnerHTML={{__html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
            
                    gtag('config', 'G-0JWKW8VHW8');
                `}}
            />
        </div>
    );
}