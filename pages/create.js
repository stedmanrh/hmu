import React from "react";
import { useEffect } from "react";
import Header from "../components/Header.js";
import Form from "../components/Form.js";
import styles from "../styles/Base.module.css";

// TODO:
// - form validation for phone, email, url fields

export default function Create() {
    return (
        <div>
            <Header></Header>
            <main className={styles.page}>
                <div className={styles.siteCode}></div>
                <header className={styles.siteHeader}>
                    <p>Enter your contact&nbsp;info</p>
                </header>
                <Form></Form>
            </main>
        </div>
    );
};
