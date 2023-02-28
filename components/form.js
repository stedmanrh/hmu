import React, { useState } from 'react';

// FRANKIE TODO: refactor from class components to functional components
// * set restrictions on what can be typed into phone, email, url fields? esp. phone?
// BUG?? or Frankie's phone is broken: websites don't appear (even on old QR codes that we know worked)
// F's phone seems to scan *part* of the QR code but doesn't sort itself out when corrected
// websites work fine on iphone QR code reader

function Form(props) {

    const [formfield, setFormfield] = useState({
        name: "",
        phone: "",
        email: "",
        url: "",
    });

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormfield(prevState => ({
            ...prevState,
            [name]: value,
        }));
        updateQuery();
    }
    const updateQuery = () => {
        let query = "https://chart.googleapis.com/chart?cht=qr&chs=168x168&chld=|1&chl=";
        let vCard = 
        "BEGIN:VCARD\nVERSION:4.0" +
        "\nFN:" + formfield.name +
        "\nTEL:" + formfield.phone + 
        "\nEMAIL:" + formfield.email +
        "\nURL:" + formfield.url +
        "\nEND:VCARD";
        vCard = encodeURIComponent(vCard);
        query += vCard;
        props.renderCode(query, formfield.name); 
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        props.randomizeScheme();
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <label>
            Name:
            <input type="text" name="name" required value={formfield.name} onChange={handleChange} />
            </label>
            <label>
            Phone:
            <input type="tel" name="phone" value={formfield.phone} onChange={handleChange} />
            </label>
            <label>
            Email:
            <input type="email" name="email" value={formfield.email} onChange={handleChange} />
            </label>
            <label>
            URL:
            <input type="url" name="url" value={formfield.url} onChange={handleChange} />
            </label>
            <input type="submit" value="Refresh style" onClick={handleSubmit} />
        </form>
    );
}
    
export default Form;