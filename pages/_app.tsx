import { useEffect } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import Router from "next/router";

import { NhostClient, NhostNextProvider, NhostSession } from "@nhost/nextjs";
import { NhostApolloProvider } from "@nhost/react-apollo";
import NProgress from "nprogress";

import "@fontsource/inter/variable.css";
import "nprogress/nprogress.css";
import "../styles/globals.css";

import Layout from "@/components/Layout";

const nhost = new NhostClient({
  subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN || "",
  region: process.env.NEXT_PUBLIC_NHOST_REGION || "",
});

function MyApp({
  Component,
  pageProps,
}: AppProps<{ nhostSession: NhostSession }>) {
  useEffect(() => {
    NProgress.configure({ showSpinner: false });
    const handleRouteStart = () => NProgress.start();
    const handleRouteDone = () => NProgress.done();

    Router.events.on("routeChangeStart", handleRouteStart);
    Router.events.on("routeChangeComplete", handleRouteDone);
    Router.events.on("routeChangeError", handleRouteDone);

    return () => {
      Router.events.off("routeChangeStart", handleRouteStart);
      Router.events.off("routeChangeComplete", handleRouteDone);
      Router.events.off("routeChangeError", handleRouteDone);
    };
  }, []);
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Learning with youtube made excited" />
        <meta name="keywords" content="learning" />
        <meta name="theme-color" content="#181818" />
        <meta property="og:title" content="Classroom" />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://learnwithclassroom.vercel.app/"
        />
        <meta
          property="og:description"
          content="Learning with youtube made excited"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:image"
          content="https://learnwithclassroom.vercel.app/cover.png"
        />
        <meta name="twitter:title" content="Classroom" />
        <meta
          name="twitter:description"
          content="Learning with youtube made excited"
        />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" href="/favicon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <title>Classroom</title>
      </Head>
      <NhostNextProvider nhost={nhost} initial={pageProps.nhostSession}>
        <NhostApolloProvider nhost={nhost}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </NhostApolloProvider>
      </NhostNextProvider>
    </>
  );
}

export default MyApp;
