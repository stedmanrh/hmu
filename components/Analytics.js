import Script from "next/script";

export default function Analytics(props) {
    // Google Analytics tag: G-0JWKW8VHW8
    return (
        <div className="container">
            <Script strategy="lazyOnload" src="https://www.googletagmanager.com/gtag/js?id=GA_G-0JWKW8VHW8" />
            <Script strategy="lazyOnload" id="google-analytics">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
            
                    gtag('config', 'G-0JWKW8VHW8');
                `}
            </Script>
        </div>
    );
}