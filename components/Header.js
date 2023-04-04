import Head from "next/head"

export default function Header(props) {
    return (
        <Head>
            <title>Tactful | Create a QR code for your contact info</title>
            <meta
                name="description"
                content="Create and save a QR code to easily share your contact info with new friends and acquaintances"
            />
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    )
};