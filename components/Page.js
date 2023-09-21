import Header from "../components/Header.js";

export default function Page({className, children}) {
    return (
        <div>
            <Header></Header>
            <main className={`box-border min-h-screen p-8 flex flex-col items-center ${className}`}>
                {children}
            </main>
        </div>
    );
}