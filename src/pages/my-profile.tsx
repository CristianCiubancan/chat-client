import {
  AspectRatio,
  Box,
  Button,
  Flex,
  Heading,
  Spinner,
} from "@chakra-ui/react";
import React, { useCallback } from "react";
import { Image } from "@chakra-ui/react";
import Layout from "../components/Layout";
import { withApollo } from "../utils/withApollo";
import { isServer } from "../utils/isServer";
import { MdPhotoCamera } from "react-icons/md";
import { Icon } from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import {
  MeDocument,
  useChangeProfilePicMutation,
  useMeQuery,
} from "../generated/graphql";
import { useApolloClient } from "@apollo/client";

const MyProfile = () => {
  const server = isServer();
  const apolloClient = useApolloClient();

  const { data: user, loading } = useMeQuery({
    skip: isServer(),
  });

  const [
    changeProfilePic,
    { loading: picLoading },
  ] = useChangeProfilePicMutation({
    onCompleted: async (data) => {
      apolloClient.writeQuery({
        query: MeDocument,
        data: {
          __typename: "Query",
          me: {
            ...user?.me,
            profilePicUrl: data?.changeProfilePic,
          },
        },
      });
    },
  });

  const onDrop = useCallback(
    async ([file]) => {
      await changeProfilePic({
        variables: {
          picture: file,
        },
      });
    },
    [changeProfilePic]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png",
  });

  return (
    <Layout>
      {user?.me?.id ? (
        <Box maxW="50%">
          <Flex
            alignItems="center"
            flexDirection="column"
            my={10}
            p={2}
            maxW="sm"
            borderWidth="1px"
            boxShadow="lg"
            overflow="hidden"
          >
            <Box w="50%" my={2}>
              <Box role="group" maxW="sm" position="relative">
                {!picLoading && !loading ? (
                  <Box>
                    <AspectRatio ratio={1}>
                      <Image
                        src={user?.me?.profilePicUrl}
                        borderRadius="full"
                        alt=""
                        backgroundColor="blackAlpha.600"
                      />
                    </AspectRatio>
                  </Box>
                ) : (
                  <Box>
                    <AspectRatio ratio={1}>
                      <Spinner />
                    </AspectRatio>
                  </Box>
                )}
                <Box
                  position="absolute"
                  top="0"
                  left="0"
                  borderRadius="full"
                  h="100%"
                  w="100%"
                  display="none"
                  backgroundColor="blackAlpha.400"
                  _groupHover={{ display: "block" }}
                >
                  <Flex
                    h="100%"
                    justifyContent="center"
                    alignItems="center"
                    borderRadius="full"
                    {...getRootProps()}
                  >
                    <Button
                      borderRadius="full"
                      h="100%"
                      w="100%"
                      colorScheme="blackAlpha"
                    >
                      <input name="imageUrl" {...getInputProps()} />
                      <Icon boxSize="3em" as={MdPhotoCamera} />
                    </Button>
                  </Flex>
                </Box>
              </Box>
            </Box>
            <Heading mb={2}>{user?.me?.username}</Heading>
          </Flex>
        </Box>
      ) : (
        <Flex justifyContent="center">
          <Heading size="md" my={4} fontWeight="light">
            You're not logged in.
          </Heading>
        </Flex>
      )}
    </Layout>
  );
};

export default withApollo({ ssr: false })(MyProfile);
