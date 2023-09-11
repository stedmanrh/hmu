import Header from "../components/Header.js";

export default function Page(props) {
    return(
        <body>
            <Header></Header>
            <main>
                {props.children}
            </main>
        </body>
    );
}