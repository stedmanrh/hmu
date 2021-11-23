import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>HMU | Create a QR code for your contact info</title>
        <meta name="description" content="Create and save a QR code to easily share your contact info with new friends and acquaintances" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <p>HMU, world!</p>
      </div>
      
    </div>
  )
}
