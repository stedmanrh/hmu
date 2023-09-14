import '../styles/reset.css';
import '../styles/globals.css';
import Analytics from '../components/Analytics';
import '../dist/main.css';

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Analytics />
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
