import {
  Box,
  Button,
  Flex,
  Heading,
  Spinner,
  Stack,
  Image,
  AspectRatio,
} from "@chakra-ui/react";
import React from "react";
import Layout from "../components/Layout";
import { ChatIcon } from "@chakra-ui/icons";
import { useCreateChatMutation, useGetUsersQuery } from "../generated/graphql";
import { withApollo } from "../utils/withApollo";
import { useRouter } from "next/router";
import { isServer } from "../utils/isServer";

const Index = () => {
  const server = isServer();
  const router = useRouter();

  const { data, loading } = useGetUsersQuery();
  if (!data && !loading) {
    return <div>posts couldn't be retrieved from the server</div>;
  }
  const [startChat] = useCreateChatMutation({
    onCompleted: (data) => {
      router?.push(`/chat/${data?.createChat.id}`);
    },
  });

  let currentUser = !server
    ? JSON.parse(localStorage.getItem("CurrentUser")!)
    : undefined;

  return (
    <Layout>
      {!data && loading ? (
        <Flex
          flex={1}
          height={"80vh"}
          justifyContent="center"
          alignItems="center"
        >
          <Spinner color="teal.800" />
        </Flex>
      ) : (
        <Stack spacing={8}>
          {data?.getUsers.map((p) =>
            !p ? null : (
              <Flex
                flex={1}
                key={p.id}
                mt={8}
                p={5}
                shadow="md"
                borderWidth="1px"
              >
                <Box flex={1} overflow="hidden">
                  <Flex>
                    <Box boxSize="2.5em" mr={2}>
                      <AspectRatio ratio={1}>
                        <Image
                          borderRadius="full"
                          backgroundColor="blackAlpha.600"
                          src={p.profilePicUrl}
                        />
                      </AspectRatio>
                    </Box>
                    <Heading
                      fontSize="large"
                      mt={2}
                      color="pink.300"
                      display="inline"
                    >
                      {p.username.length > 20
                        ? ` ${p.username.slice(0, 20)}...`
                        : ` ${p.username}`}
                    </Heading>
                  </Flex>
                </Box>
                {currentUser ? (
                  p.id === currentUser.id ? null : (
                    <Button
                      colorScheme="teal"
                      ml="auto"
                      onClick={async () => {
                        startChat({
                          variables: {
                            initiatorId: currentUser.id,
                            otherMemberId: p.id,
                          },
                        });
                      }}
                    >
                      <ChatIcon />
                    </Button>
                  )
                ) : (
                  <Button
                    colorScheme="teal"
                    ml="auto"
                    onClick={() => {
                      //go to login page
                      router?.push(`/register`);
                    }}
                  >
                    <ChatIcon />
                  </Button>
                )}
              </Flex>
            )
          )}
        </Stack>
      )}
    </Layout>
  );
};

export default withApollo({ ssr: false })(Index);
