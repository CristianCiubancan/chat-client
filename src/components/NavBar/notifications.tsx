import { ChatIcon } from "@chakra-ui/icons";
import { Button, Flex } from "@chakra-ui/react";
import router from "next/router";
import React from "react";
import { UserNotificationsQuery } from "../../generated/graphql";

interface NotificationsProps {
  notificationsData: UserNotificationsQuery | undefined;
}

export const Notifications: React.FC<NotificationsProps> = ({
  notificationsData,
}) => {
  return (
    <Button
      mr={2}
      ml="auto"
      colorScheme={
        notificationsData?.userNotifications &&
        notificationsData.userNotifications.length > 0
          ? "pink"
          : "teal"
      }
      onClick={() => {
        //go to login page
        router?.push(`/chat`);
      }}
      position="relative"
    >
      {notificationsData?.userNotifications &&
      notificationsData.userNotifications.length > 0 ? (
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
          right="-0.5"
        >
          {notificationsData.userNotifications.length}
        </Flex>
      ) : null}
      <ChatIcon />
    </Button>
  );
};
