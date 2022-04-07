import React from 'react';

class Form extends React.Component {
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
    
export default Form;