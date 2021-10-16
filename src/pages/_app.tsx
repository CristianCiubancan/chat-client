import { Box, ChakraProvider } from "@chakra-ui/react";
import React from "react";
import theme from "../theme";
import Head from "next/head";
import { ReloadOnIdle } from "../utils/reloadOnIdle";

function MyApp({ Component, pageProps }: any) {
  ReloadOnIdle();
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Head>
        <title>ChatApp - Happy Octopus</title>
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
      </Head>
      <Box>
        <Component {...pageProps} />
      </Box>
    </ChakraProvider>
  );
}

export default MyApp;
