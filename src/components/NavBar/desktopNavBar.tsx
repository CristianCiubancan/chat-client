import { ApolloClient } from "@apollo/client";
import { AspectRatio, Box, Flex, Link, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import NextLink from "next/link";
import router from "next/router";
import React from "react";
import { LogoutMutationFn, MeQuery } from "../../generated/graphql";

interface DesktopNavBarProps {
  me: MeQuery | undefined;
  width: number;
  apolloClient: ApolloClient<object>;
  logoutLoading: boolean;
  logout: LogoutMutationFn;
}

export const DesktopNavBar: React.FC<DesktopNavBarProps> = ({
  me,
  width,
  apolloClient,
  logoutLoading,
  logout,
}) => {
  return (
    <Box>
      {!me?.me ? (
        <Box>
          <NextLink href="/login">
            <Link color="white" mr={2}>
              login
            </Link>
          </NextLink>
          <NextLink href="/register">
            <Link color="white">register</Link>
          </NextLink>
        </Box>
      ) : (
        <Box>
          <Flex>
            <NextLink href="/my-profile">
              <Button color="white" variant="link">
                <Text mr={1} fontSize="xl" my="auto">
                  {me?.me?.username}
                </Text>

                <Box boxSize="2em" mr={2}>
                  <AspectRatio ratio={1}>
                    <Image
                      borderRadius="full"
                      boxSize="2em"
                      src={me?.me?.profilePicUrl}
                    />
                  </AspectRatio>
                </Box>
              </Button>
            </NextLink>
            <Button
              onClick={async () => {
                localStorage.removeItem("CurrentUser");
                await logout();
                router.reload();
                await apolloClient.resetStore();
              }}
              isLoading={logoutLoading}
              variant="link"
              color="pink.300"
            >
              <Text fontSize="xl">logout</Text>
            </Button>
          </Flex>
        </Box>
      )}
    </Box>
  );
};
