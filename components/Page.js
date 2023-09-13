import Header from "../components/Header.js";

export default function Page(props) {
    return (
        <body>
            <Header></Header>
            <main className="box-border min-h-screen p-8 flex flex-col items-center justify-center bg-slate-100">
                {props.children}
            </main>
        </body>
    );
}