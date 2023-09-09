import Script from "next/script";

export default function Analytics(props) {
    return (
        <div>
            <Script async src="https://www.googletagmanager.com/gtag/js?id=G-0JWKW8VHW8"></Script>
            <Script>
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());
                gtag('config', 'G-0JWKW8VHW8');
            </Script>
        </div>
    );
}