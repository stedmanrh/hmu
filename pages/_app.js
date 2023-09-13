import '../styles/reset.css';
import '../styles/globals.css';
import Analytics from '../components/Analytics';
import '../dist/main.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Analytics />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
