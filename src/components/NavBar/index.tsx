import { Box, Flex, Heading, Link } from "@chakra-ui/layout";
import React, { useEffect } from "react";
import NextLink from "next/link";
import { getScreenSize } from "../../utils/getScreenSize";
import {
  NewNotificationReceivedDocument,
  useLogoutMutation,
  useMeQuery,
  useNewMessagesSentToChatSubscription,
  useUserNotificationsQuery,
} from "../../generated/graphql";
import { DesktopNavBar } from "./desktopNavBar";
import { MobileNavBar } from "./mobileNavBar";
import { useApolloClient } from "@apollo/client";
import { Notifications } from "./notifications";
import { useRouter } from "next/router";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const apolloClient = useApolloClient();
  const width = getScreenSize().width;
  const router = useRouter();

  const [logout, { loading: logoutLoading }] = useLogoutMutation();
  const { data, loading } = useMeQuery();
  const { data: notificationsData, subscribeToMore } =
    useUserNotificationsQuery();

  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: NewNotificationReceivedDocument,
      updateQuery(prev, { subscriptionData }: any): any {
        const newFeedItem = {
          __typename: "Notification",
          messageId: subscriptionData.data.newNotificationReceived.messageId,
          chatId: subscriptionData.data.newNotificationReceived.chatId,
        };

        if (subscriptionData.data.newNotificationReceived.add === true) {
          if (!subscriptionData.data) return prev;

          if (parseInt(router?.query.id as string) === newFeedItem.chatId) {
            return prev;
          }
          if (!prev.userNotifications)
            return Object.assign({}, prev, {
              userNotifications: [newFeedItem],
            });

          let newArray = [];

          for (let obj in prev.userNotifications) {
            if (prev.userNotifications[obj].chatId === newFeedItem.chatId) {
            } else {
              newArray.push(prev.userNotifications[obj]);
            }
          }

          return Object.assign({}, prev, {
            userNotifications: [...newArray, newFeedItem],
          });
        }

        if (subscriptionData.data.newNotificationReceived.add === false) {
          let newArray = [];
          for (let obj in prev.userNotifications) {
            if (
              prev.userNotifications[obj as any].chatId === newFeedItem.chatId
            ) {
            } else {
              newArray.push(prev.userNotifications[obj as any]);
            }
          }
          if (newArray.length === 0) {
            return Object.assign({}, prev, {
              userNotifications: null,
            });
          }
          return Object.assign({}, prev, {
            userNotifications: [...newArray],
          });
        }
      },
    });
    return () => unsubscribe();
  }, [router.query.id ? router.query.id : null]);

  useNewMessagesSentToChatSubscription();

  return (
    <Flex
      justifyContent="center"
      zIndex={1}
      position="sticky"
      top={0}
      bg="teal"
      p={4}
    >
      <Flex flex={1} alignItems="center" maxW={800}>
        <Box mr={"auto"} color="white">
          <NextLink href="/">
            <Link>
              <Heading lineHeight="40px" fontSize="xl">
                ChatApp
              </Heading>
            </Link>
          </NextLink>
        </Box>
        {loading ? null : (
          <Box ml={"auto"}>
            {width > 600 ? (
              <Flex alignItems="center">
                {!data?.me?.id ? null : (
                  <Notifications notificationsData={notificationsData} />
                )}
                <DesktopNavBar
                  me={data}
                  width={width}
                  apolloClient={apolloClient}
                  logoutLoading={logoutLoading}
                  logout={logout}
                />
              </Flex>
            ) : (
              <Flex alignItems="center">
                {!data?.me?.id ? null : (
                  <Notifications notificationsData={notificationsData} />
                )}
                <MobileNavBar
                  me={data}
                  width={width}
                  apolloClient={apolloClient}
                  logoutLoading={logoutLoading}
                  logout={logout}
                />
              </Flex>
            )}
          </Box>
        )}
      </Flex>
    </Flex>
  );
};
