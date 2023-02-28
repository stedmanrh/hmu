import React, { useState } from 'react';

// FRANKIE TODO: use chatGPT to refactor
// and/or try to duplicate this in index.js and 
// yarn reload page thingie?
// can ask it to give an exmaple of refactoring a class component to a functional component in code here

function FormNew(props) {

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
        // updateQuery();
    }
    
    // updateQuery() {
    //     let query = "https://chart.googleapis.com/chart?cht=qr&chs=168x168&chld=|1&chl=";
    //     let vCard = 
    //     "BEGIN:VCARD\nVERSION:4.0" +
    //     "\nFN:" + this.state.name +
    //     "\nTEL:" + this.state.phone + 
    //     "\nEMAIL:" + this.state.email +
    //     "\nURL:" + this.state.url +
    //     "\nEND:VCARD";
    //     vCard = encodeURIComponent(vCard);
    //     query += vCard;
    //     this.props.renderCode(query, this.state.name); 
    // }
    
    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     props.randomizeScheme();
    // }
    
    return (
        // <form onSubmit={this.handleSubmit}>
        <form>
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
            {/* <input type="submit" value="Refresh style" onClick={this.handleSubmit} /> */}
        </form>
    );
}
    
export default FormNew;