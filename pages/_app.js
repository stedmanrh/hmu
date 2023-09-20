import '../styles/reset.css';
import '../dist/main.css';
import Analytics from '../components/Analytics';

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Analytics />
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
