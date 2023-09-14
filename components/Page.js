import Header from "../components/Header.js";

export default function Page(props) {
    return (
        <div>
            <Header></Header>
            <main className={`box-border min-h-screen p-8 flex flex-col items-center ${props.className}`}>
                {props.children}
            </main>
        </div>
    );
}