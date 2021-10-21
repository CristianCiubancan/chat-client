import { Box, Text } from "@chakra-ui/layout";
import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Flex,
  useDisclosure,
  DrawerFooter,
} from "@chakra-ui/react";
import router from "next/router";
import React, { LegacyRef, useRef } from "react";
import { LogoutMutationFn, MeQuery } from "../../generated/graphql";
import NextLink from "next/link";
import { ApolloClient } from "@apollo/client";

interface MobileNavBarProps {
  me: MeQuery | undefined;
  width: number;
  apolloClient: ApolloClient<object>;
  logoutLoading: boolean;
  logout: LogoutMutationFn;
}

export const MobileNavBar: React.FC<MobileNavBarProps> = ({
  me,
  width,
  apolloClient,
  logoutLoading,
  logout,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const btnRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  return (
    <Box>
      {!me?.me ? (
        <Box>
          <Button
            ref={btnRef as LegacyRef<HTMLButtonElement>}
            colorScheme="teal"
            onClick={onOpen}
          >
            Menu
          </Button>
          <Drawer
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            finalFocusRef={btnRef}
          >
            <DrawerOverlay>
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader></DrawerHeader>
                <DrawerBody>
                  <Flex flexDirection="column">
                    <NextLink href="/login">
                      <Button colorScheme="pink" mt={2}>
                        login
                      </Button>
                    </NextLink>
                    <NextLink href="/register">
                      <Button colorScheme="teal" mt={2}>
                        register
                      </Button>
                    </NextLink>
                  </Flex>
                </DrawerBody>
              </DrawerContent>
            </DrawerOverlay>
          </Drawer>
        </Box>
      ) : (
        <Box>
          <Flex alignItems="center">
            <Button
              ref={btnRef as LegacyRef<HTMLButtonElement>}
              colorScheme="teal"
              onClick={onOpen}
            >
              Menu
            </Button>
            <Drawer
              isOpen={isOpen}
              placement="right"
              onClose={onClose}
              finalFocusRef={btnRef}
            >
              <DrawerOverlay>
                <DrawerContent>
                  <DrawerCloseButton />
                  <DrawerHeader color="black" fontSize="xl">
                    <Flex>
                      {`Hi, `}
                      <Text mx={2} color="teal" fontSize="xl">
                        {me?.me?.username}
                      </Text>
                    </Flex>
                  </DrawerHeader>

                  <DrawerBody>
                    <Flex flexDirection="column" alignItems="start">
                      <NextLink href="/my-profile">
                        <Button mt={4} variant="link" color="black">
                          <Text fontSize="lg">My Profile</Text>
                        </Button>
                      </NextLink>
                      <Button
                        mt={4}
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
                        <Text fontSize="lg">Logout</Text>
                      </Button>
                    </Flex>
                  </DrawerBody>

                  <DrawerFooter mr="auto"></DrawerFooter>
                </DrawerContent>
              </DrawerOverlay>
            </Drawer>
          </Flex>
        </Box>
      )}
    </Box>
  );
};
