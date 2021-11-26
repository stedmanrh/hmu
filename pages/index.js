import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import Form from '../components/form.js'
import styles from '../styles/Home.module.css'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            src: "https://chart.googleapis.com/chart?cht=qr&chs=200x200&chld=|1&chl="
        };
        
        this.renderCode = this.renderCode.bind(this);
    }
    
    renderCode(url) {
        this.setState({src: url});
    }
    
    render() {
        return(
            <div className={styles.container}>
            <Head>
            <title>HMU | Create a QR code for your contact info</title>
            <meta name="description" content="Create and save a QR code to easily share your contact info with new friends and acquaintances" />
            <link rel="icon" href="/favicon.ico" />
            </Head>
            
            <main>
            <p>HMU, world!</p>
            <Form renderCode={this.renderCode}></Form>
            <Image src={this.state.src} width="200" height="200" />
            </main>
            
            </div>
        );
    }
}
    
export default Home;
    