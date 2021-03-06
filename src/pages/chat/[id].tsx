import { Box, Flex, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import ChatList from "../../components/ChatsList";
import CurrentChat from "../../components/CurrentChat";
import Layout from "../../components/Layout";
import { useMeQuery } from "../../generated/graphql";
import { delay } from "../../utils/delay";
import { getScreenSize } from "../../utils/getScreenSize";
import { isServer } from "../../utils/isServer";
import { withApollo } from "../../utils/withApollo";

const Chat = ({}) => {
  const server = isServer();
  const router = useRouter();
  const windowSize = getScreenSize();

  const { data, loading } = useMeQuery();

  if (!server && !data?.me?.id && !loading) {
    delay(200).then((_) => {
      if (!server && !data?.me?.id && !loading) {
        router.push("/login");
      }
    });
    return null;
  }

  if (!router.query.id) {
    return (
      <Flex
        flex={1}
        height={"80vh"}
        justifyContent="center"
        alignItems="center"
      >
        <Spinner color="teal.800" />
      </Flex>
    );
  }

  return (
    <Layout>
      {!data?.me?.id && !loading ? (
        <Box textAlign="center">You need to be logged in in order to</Box>
      ) : (
        <Box width="100%">
          {windowSize.width > 600 ? (
            <Flex>
              <ChatList singleItemOnPage={false} userId={data?.me?.id} />
              <CurrentChat userId={data?.me?.id} />
            </Flex>
          ) : (
            <Flex>
              <CurrentChat singleItemOnPage={true} userId={data?.me?.id} />
            </Flex>
          )}
        </Box>
      )}
    </Layout>
  );
};

export default withApollo({ ssr: false })(Chat);
