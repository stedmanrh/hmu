import Page from "../components/Page.js";
import LinkForm from "../components/LinkForm.js";

import Image from "next/image.js";

export default function Links() {

    return (
        <Page className="justify-center bg-slate-100">
            <header className="flex flex-col items-center space-y-6 mb-6">
                <div className="w-20 h-20 rounded-full
                flex justify-center items-center shrink-0 
                bg-white shadow-md
                text-5xl">
                    <Image src={"/emoji/🔗.png"}
                        width={48} height={48} priority={true}
                        alt={"🔗"} />
                </div>
                <h1 className="text-center text-4xl leading-tight text-slate-600">
                    Edit your social&nbsp;links
                </h1>
            </header>
            <LinkForm />
        </Page>
    );
};
