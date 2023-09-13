import Head from "next/head";
import Analytics from "./Analytics";

export default function Header(props) {
    return (
        <Head>
            <title>Tactful | Personal QR codes for whatever matters to you</title>
            <meta
                name="description"
                content="Share your contact info with a QR code"
            />
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
            <link rel="icon" href="/favicon.ico" />
            <link rel="manifest" href="/manifest.json" />
            <link rel="apple-touch-icon" href="/icons/apple_icon_x192.png" />
            <Analytics></Analytics>
        </Head>
    )
};