import React, { useState } from 'react';

// FRANKIE TODO: use chatGPT to refactor
// and/or try to duplicate this in index.js and 
// yarn reload page thingie?
// can ask it to give an exmaple of refactoring a class component to a functional component in code here

    // refactor the following code as a functional component, example:
    // const [name, setName] = useState("");
    // const [phone, setPhone] = useState("");
    // const [email, setEmail] = useState("");
    // const [url, setUrl] = useState("");
    //
    // const handleChange = (event) => {
    //     const attr = event.target.name;
    //     const value = event.target.value;
    //     switch (attr) {
    //         case "name":
    //             setName(value);
    //             break;
    //         case "phone":
    //             setPhone(value);
    //             break;
    //         case "email":
    //             setEmail(value);
    //             break;
    //         case "url":
    //             setUrl(value);
    //             break;
    //         default:
    //             break;
    //     }
    // }
    //
    // const updateQuery = () => {
    //     let query = "https://chart.googleapis.com/chart?cht=qr&chs=168x168&chld=|1&chl=";
    //     let vCard =
    //         "BEGIN:VCARD\nVERSION:4.0" +
    //         "\nFN:" + name +
    //         "\nTEL:" + phone +
    //         "\nEMAIL:" + email +
    //         "\nURL:" + url +
    //         "\nEND:VCARD";
    //     vCard = encodeURIComponent(vCard);
    //     query += vCard;
    //     props.renderCode(query, name);
    // }
    //
    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     props.randomizeScheme();
    // }
    //
    // return (
    //     <form onSubmit={handleSubmit}>
    //         <label>
    //             Name:
    //             <input type="text" name="name" required value={name} onChange={handleChange} />
    //         </label>
    //         <label>
    //             Phone:
    //             <input type="tel" name="phone" value={phone} onChange={handleChange} />
    //         </label>
    //         <label>
    //             Email:
    //             <input type="email" name="email" value={email} onChange={handleChange} />
    //         </label>
    //         <label>
    //             URL:
    //             <input type="url" name="url" value={url} onChange={handleChange} />
    //         </label>
    //         <input type="submit" value="Refresh style" />
    //     </form>
    // );
class FormNew extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            phone: "",
            email: "",
            url: "",
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.updateQuery = this.updateQuery.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        let attr = event.target.name;
        this.setState({[`${attr}`]: event.target.value}, this.updateQuery);
    }
    
    updateQuery() {
        let query = "https://chart.googleapis.com/chart?cht=qr&chs=168x168&chld=|1&chl=";
        let vCard = 
        "BEGIN:VCARD\nVERSION:4.0" +
        "\nFN:" + this.state.name +
        "\nTEL:" + this.state.phone + 
        "\nEMAIL:" + this.state.email +
        "\nURL:" + this.state.url +
        "\nEND:VCARD";
        vCard = encodeURIComponent(vCard);
        query += vCard;
        this.props.renderCode(query, this.state.name); 
    }
    
    handleSubmit(event) {
        event.preventDefault();
        this.props.randomizeScheme();
    }
    
    render() {
        return (
            // <form onSubmit={this.handleSubmit}>
            <form>
                <label>
                Name:
                <input type="text" name="name" required value={this.state.name} onChange={this.handleChange} />
                </label>
                <label>
                Phone:
                <input type="tel" name="phone" value={this.state.phone} onChange={this.handleChange} />
                </label>
                <label>
                Email:
                <input type="email" name="email" value={this.state.email} onChange={this.handleChange} />
                </label>
                <label>
                URL:
                <input type="url" name="url" value={this.state.url} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Refresh style" onClick={this.handleSubmit} />
            </form>
        );
    }
}
    
export default FormNew;