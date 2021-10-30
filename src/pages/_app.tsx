import { Box, ChakraProvider, Flex, Spinner } from "@chakra-ui/react";
import React from "react";
import theme from "../theme";
import Head from "next/head";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../utils/withApollo";

function MyApp({ Component, pageProps }: any) {
  const { client } = useApollo(pageProps);

  if (!client) {
    return (
      <Flex
        flex={1}
        height={"100vh"}
        justifyContent="center"
        alignItems="center">
        <Spinner color="teal.800" />
      </Flex>
    );
  }

  return (
    <ApolloProvider client={client}>
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
    </ApolloProvider>
  );
}

export default MyApp;
