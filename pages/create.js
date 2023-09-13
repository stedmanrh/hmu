import React from "react";
import Page from "../components/Page.js";
import Form from "../components/Form.js";

export default function Create() {
    return (
        <Page>
            <header className="text-center text-slate-600">
                <p className="mt-8 mb-6 text-4xl leading-tight">Enter your contact&nbsp;info</p>
            </header>
            <Form></Form>
        </Page>
    );
};
