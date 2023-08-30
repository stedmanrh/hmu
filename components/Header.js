import Head from "next/head"

export default function Header(props) {
    return (
        <Head>
            <title>Tactful | Share your contact info with a QR code</title>
            <meta
                name="description"
                content="Share your contact info with a QR code"
            />
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
            <link rel="icon" href="/favicon.ico" />
            <link rel="manifest" href="/manifest.json" />
        </Head>
    )
};