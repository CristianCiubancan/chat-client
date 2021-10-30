import { ChatIcon } from "@chakra-ui/icons";
import { Button, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import {
  NotificationPublish,
  UserNotificationsQuery,
} from "../../generated/graphql";

interface NotificationsProps {
  notificationsData:
    | {
        __typename?: "NotificationPublish" | undefined;
        chatId: number;
        messageId: number;
      }[]
    | null
    | undefined;
}

export const Notifications: React.FC<NotificationsProps> = ({
  notificationsData,
}) => {
  const router = useRouter();
  return (
    <Button
      mr={2}
      ml="auto"
      colorScheme={
        notificationsData && notificationsData.length > 0 ? "pink" : "teal"
      }
      onClick={() => {
        //go to login page
        router?.push(`/chat`);
      }}
      position="relative">
      {notificationsData && notificationsData.length > 0 ? (
        <Flex
          justifyContent="center"
          alignItems="center"
          borderRadius="full"
          boxSize="1.2em"
          lineHeight=".5em"
          backgroundColor="yellow"
          color="black"
          position="absolute"
          top="-2"
          right="-0.5">
          {notificationsData.length}
        </Flex>
      ) : null}
      <ChatIcon />
    </Button>
  );
};
