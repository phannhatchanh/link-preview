import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Preview Links</title>
        <meta
          name="description"
          content="A app preview from an URL, grabbing all the information such as title, relevant texts and images."
        />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Preview Links" />
        <meta
          property="og:description"
          content="A app preview from an URL, grabbing all the information such as title, relevant texts and images."
        />
        <meta property="og:image" content="/logo.png" />
        <meta property="og:url" content="" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
