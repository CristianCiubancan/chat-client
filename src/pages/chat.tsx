import { Flex, Heading } from "@chakra-ui/react";
import React from "react";
import ChatList from "../components/ChatsList";
import Layout from "../components/Layout";
import { useMeQuery } from "../generated/graphql";
import { getScreenSize } from "../utils/getScreenSize";
import { withApollo } from "../utils/withApollo";

const Chat = () => {
  const windowSize = getScreenSize();
  const { data, loading } = useMeQuery();

  return (
    <Layout>
      {!data?.me?.id && !loading ? (
        <Flex justifyContent="center">
          <Heading size="md" my={4} fontWeight="light">
            You're not logged in.
          </Heading>
        </Flex>
      ) : (
        <Flex>
          <ChatList singleItemOnPage userId={data?.me?.id!} />
          {windowSize.width > 800 ? (
            <Flex
              flex={1}
              h={(windowSize.height - 88) as number}
              borderWidth="1px"
              m="2"
              flexDirection="column"
              alignItems="center"
            >
              <Heading>Welcome to ChatApp</Heading>
            </Flex>
          ) : null}
        </Flex>
      )}
    </Layout>
  );
};

export default withApollo({ ssr: false })(Chat);
