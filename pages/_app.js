import Router, { useRouter } from "next/router";
import Head from "next/head";
import NProgress from "nprogress";
import { ChakraProvider } from "@chakra-ui/react";
import { dark } from '@clerk/themes';

import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";

import Layout from "../components/Layout";
import { blackAlpha } from "@clerk/themes/dist/clerk-js/src/ui/foundations";



const publicPages = ["/sign-in/[[...index]]", "/sign-up/[[...index]]"];

const clerkPublishableKey = "pk_test_c2FmZS1jaGlwbXVuay01MC5jbGVyay5hY2NvdW50cy5kZXYk";
 function App({ Component, pageProps }) {
  ;
  const router = useRouter();
  NProgress.configure({ showSpinner: false });

  Router.events.on("routeChangeStart", () => {
    NProgress.start();
  });

  Router.events.on("routeChangeComplete", () => {
    NProgress.done();
  });

  return (
    <ClerkProvider
      publishableKey= {clerkPublishableKey}
      navigate={(to) => router.push(to)}
      appearance={{
        baseTheme: blackAlpha
      }}
    >
      {publicPages.includes(router.pathname) ? (
        <>
          <Head>
            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
              integrity="sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ=="
              crossOrigin="anonymous"
              referrerPolicy="no-referrer"
            />
          </Head>
          <ChakraProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ChakraProvider>
        </>
      ) : (
        <>
          <SignedIn>
            <Head>
              <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
                integrity="sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ=="
                crossOrigin="anonymous"
                referrerPolicy="no-referrer"
              />
            </Head>
            <ChakraProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </ChakraProvider>
          </SignedIn>

          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>
        </>
      )}
    </ClerkProvider>
  );
}

export default App;