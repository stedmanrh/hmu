import React from "react";
import Page from "../components/Page.js";
import Form from "../components/Form.js";

export default function Create() {
    return (
        <Page>
            <h1 className="mt-8 mb-6 text-center text-4xl leading-tight text-slate-600">
                Enter your contact&nbsp;info
            </h1>
            <Form></Form>
        </Page>
    );
};
