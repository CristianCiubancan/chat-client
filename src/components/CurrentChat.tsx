import {
  Box,
  Button,
  Flex,
  Spinner,
  Text,
  Image,
  AspectRatio,
} from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import {
  useGetChatQuery,
  useGetMessagesQuery,
  useNewChatMessageSubscription,
  useNewReadMessageSubscription,
  useReadChatMessageMutation,
} from "../generated/graphql";
import { useRouter } from "next/router";
import MessageInput from "./MessageInput";
import { getScreenSize } from "../utils/getScreenSize";

interface CurrentChatProps {
  singleItemOnPage?: Boolean;
  userId: number | undefined;
}
const CurrentChat: React.FC<CurrentChatProps> = ({
  singleItemOnPage,
  userId,
}) => {
  const router = useRouter();

  const windowSize = getScreenSize();

  const chatId = parseInt(router.query.id as string);

  const [chatName, setChatName] = useState<String>();
  const [profilePic, setProfilePic] = useState<String>();

  const [readChat] = useReadChatMessageMutation();

  const { loading } = useGetChatQuery({
    variables: {
      id: chatId,
    },
    onCompleted: (data) => {
      data?.getChat?.members.map((member) => {
        if (member.id !== userId) {
          setChatName(member.username);
          setProfilePic(member.profilePicUrl);
        }
      });
    },
  });

  const {
    data: messagesData,
    loading: messagesLoading,
    fetchMore,
  } = useGetMessagesQuery({
    variables: {
      chatId,
      limit: 15,
      cursor: null,
    },
    onCompleted: (data) => {
      if (data.getMessages?.messages[0]) {
        let isChatRead = false;
        for (let reader of data.getMessages?.messages[0].readers) {
          if (reader.reader.id === userId) {
            isChatRead = true;
          }
        }
        if (isChatRead === false) {
          readChat({
            variables: {
              messageId: parseInt(data.getMessages.messages[0].id),
            },
          });
        }
      }
    },
    // took this out because i cant recall why i used in the first place
    // fetchPolicy: `${
    //   singleItemOnPage ? "network-only" : "cache-and-network"
    // }` as any,
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });

  useNewChatMessageSubscription({
    variables: { chatId },
    onSubscriptionData: (data) => {
      if (
        data.subscriptionData.data?.newChatMessage.id &&
        data.subscriptionData.data.newChatMessage.senderId !== userId
      )
        readChat({
          variables: {
            messageId: parseInt(data.subscriptionData.data?.newChatMessage.id),
          },
        });
    },
  });

  useNewReadMessageSubscription({
    onSubscriptionData: (data) => {},
  });

  return (
    <Flex
      w="100%"
      flex={1}
      h={(windowSize.height - 88) as number}
      flexDirection="column"
    >
      {loading ? (
        <Flex
          flex={1}
          height={"80vh"}
          justifyContent="center"
          alignItems="center"
        >
          <Spinner color="teal.800" />
        </Flex>
      ) : (
        <Flex
          flex={1}
          h={(windowSize.height - 88) as number}
          m="2"
          flexDirection="column"
        >
          <Flex
            justifyContent="center"
            alignItems="center"
            height="88px"
            width="100%"
            backgroundColor="teal"
            color="white"
            borderBottomWidth="1px"
            position="relative"
          >
            <Box
              fontSize={
                windowSize.width > 900
                  ? "3rem"
                  : windowSize.width < 600
                  ? "1.5rem"
                  : "2rem"
              }
            >
              {chatName?.length! > 15
                ? `${chatName?.substring(0, 15)}...`
                : chatName}
            </Box>
            <Box position="absolute" boxSize="3em" right="0" mr={5}>
              <AspectRatio ratio={1}>
                <Image
                  borderRadius="full"
                  backgroundColor="blackAlpha.600"
                  src={profilePic as any}
                />
              </AspectRatio>
            </Box>
            {windowSize.width > 600 ? null : (
              <Button
                position="absolute"
                boxSize="3em"
                left="0"
                ml={5}
                colorScheme="teal"
                onClick={() => {
                  //go to login page
                  router?.push(`/chat`);
                }}
              >
                <ChevronLeftIcon fontSize="2em" />
              </Button>
            )}
          </Flex>
          {!messagesLoading ? (
            <Flex
              flex={1}
              flexDirection="column-reverse"
              overflowX="hidden"
              overflowY="scroll"
              height="100%"
              width="100%"
            >
              {messagesData?.getMessages?.messages.map((message) => {
                return (
                  <Flex key={message.id}>
                    {message.senderId === userId ? (
                      <Text
                        m={1}
                        ml="auto"
                        maxW="90%"
                        borderWidth="1px"
                        paddingY="3"
                        paddingX="7"
                        borderRadius={10}
                        key={message.id}
                        color="white"
                        backgroundColor="teal.500"
                        wordBreak="break-word"
                      >
                        {message.text}
                      </Text>
                    ) : (
                      <Text
                        m={1}
                        mr="auto"
                        maxW="60%"
                        borderWidth="1px"
                        paddingY="3"
                        paddingX="7"
                        borderRadius={10}
                        key={message.id}
                        wordBreak="break-word"
                      >
                        {message.text}
                      </Text>
                    )}
                  </Flex>
                );
              })}
              {messagesData?.getMessages?.hasMore ? (
                <Button
                  margin="auto"
                  p="2"
                  onClick={() => {
                    fetchMore({
                      variables: {
                        limit: 15,
                        cursor:
                          messagesData?.getMessages?.messages[
                            messagesData.getMessages.messages.length - 1
                          ].createdAt,
                      },
                    });
                  }}
                  isLoading={loading}
                  colorScheme="teal"
                  my={8}
                >
                  load more
                </Button>
              ) : null}
            </Flex>
          ) : (
            <Flex flex={1} justifyContent="center" alignItems="center">
              <Spinner color="teal.800" />
            </Flex>
          )}
          <MessageInput chatId={chatId} />
        </Flex>
      )}
    </Flex>
  );
};

export default CurrentChat;
