import React, { useState, useEffect } from 'react';
import styles from "../styles/Form.module.css";

function Form(props) {

    const [formfield, setFormfield] = useState({
        name: "",
        phone: "",
        email: "",
        url: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormfield(prevState => ({
            ...prevState,
            [name]: value,
        }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.label}>
                <span className={styles.labelText}>Name</span>
                <input className={styles.input} type="text" name="name" required value={formfield.name} placeholder="Hello World" onChange={handleChange} />
            </label>
            <label className={styles.label}>
                <span className={styles.labelText}>Phone</span>
                <input className={styles.input} type="tel" name="phone" value={formfield.phone} placeholder="+16789998212" onChange={handleChange} />
            </label>
            <label className={styles.label}>
                <span className={styles.labelText}>Email</span>
                <input className={styles.input} type="email" name="email" value={formfield.email} placeholder="hmu.world@gmail.com" onChange={handleChange} />
            </label>
            <label className={styles.label}>
                <span className={styles.labelText}>URL</span>
                <input className={styles.input} type="url" name="url" value={formfield.url} placeholder="https://hmu.world" onChange={handleChange} />
            </label>
            <input className={styles.submit} type="submit" value="Preview" onClick={handleSubmit} />
        </form >
    );
}

export default Form;