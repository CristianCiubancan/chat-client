import {
  Box,
  Flex,
  Heading,
  Spinner,
  Stack,
  Image,
  AspectRatio,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useGetUserChatsQuery } from "../generated/graphql";
import NextLink from "next/link";
import hasUserReadTheChat from "../utils/hasUserReadTheChat";
import { getScreenSize } from "../utils/getScreenSize";
import { addDefaultSrc } from "../utils/defaultImage";

interface ChatListProps {
  singleItemOnPage?: Boolean;
  userId: number | undefined;
}
const ChatList: React.FC<ChatListProps> = ({ singleItemOnPage, userId }) => {
  const router = useRouter();
  const windowSize = getScreenSize();

  const getMessageDate = (messageDate: any) => {
    const date = new Date(parseInt(messageDate));
    const day = parseInt(date.toISOString().split("-")[2]);
    const month = date.toLocaleString("default", { month: "short" });
    const dateNow = new Date();
    const elapsedTime = dateNow.getTime() - date.getTime();
    const result =
      elapsedTime > 86400000
        ? `${day} ${month}`
        : `${date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()}:${
            date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
          }`;
    return result;
  };

  const getChatWithName = (chat: any) => {
    const otherMember = chat.members.filter(
      (member: any) => member.id !== userId
    );

    const ChatWithName = {
      chatId: chat.id,
      name: otherMember[0].username,
      profilePic: otherMember[0].profilePicUrl,
    };
    return {
      name: ChatWithName.name,
      profilePic: ChatWithName.profilePic,
      ...chat,
    };
  };

  const { data } = useGetUserChatsQuery({
    fetchPolicy: "cache-and-network",
    // fetchPolicy: `${
    //   windowSize.width < 800 && singleItemOnPage
    //     ? // ? "network-only"
    //       "cache-and-network"
    //     : "cache-and-network"
    // }` as any,
    // nextFetchPolicy: "cache-first",
  });

  return (
    <Box
      minW={
        windowSize.width > 800
          ? "300"
          : singleItemOnPage === true
          ? "100%"
          : "120"
      }>
      {!data ? (
        <Flex
          flex={1}
          height={"80vh"}
          justifyContent="center"
          alignItems="center">
          <Spinner color="teal.800" />
        </Flex>
      ) : (
        <Flex p="2" w={"100%"} h={(windowSize.height - 88) as number}>
          <Stack spacing={2} w={"100%"} overflowY="scroll">
            {data?.getUserChats.map((chat) => {
              return !chat ? null : (
                <NextLink key={chat.id} href={`/chat/${chat.id}`}>
                  <Box key={chat.id}>
                    {chat.lastMessage ? (
                      <Flex
                        flex={1}
                        borderColor={
                          !hasUserReadTheChat(chat, userId) &&
                          parseInt(chat.id) !==
                            parseInt(router.query.id as string)
                            ? "facebook.500"
                            : "gray.200"
                        }
                        backgroundColor={
                          !hasUserReadTheChat(chat, userId) &&
                          parseInt(chat.id) !==
                            parseInt(router.query.id as string)
                            ? "facebook.50"
                            : "gray.200"
                        }
                        key={chat.id}
                        px={3}
                        py={5}
                        borderWidth="1px"
                        alignItems="center"
                        justifyContent={
                          windowSize.width > 800 ? "flex-start" : "center"
                        }
                        width={"100%"}
                        cursor="pointer">
                        <Box boxSize="3em">
                          <AspectRatio ratio={1}>
                            <Image
                              onError={addDefaultSrc}
                              borderRadius="full"
                              backgroundColor="blackAlpha.600"
                              src={getChatWithName(chat).profilePic}
                            />
                          </AspectRatio>
                        </Box>
                        {windowSize.width > 800 || singleItemOnPage ? (
                          <Flex flex={1} ml={2} flexDirection="column">
                            <Flex>
                              <Box flex={1}>
                                <Heading
                                  fontSize="medium"
                                  color="pink.300"
                                  display="inline">
                                  {getChatWithName(chat).name.length > 15
                                    ? ` ${getChatWithName(chat).name.substring(
                                        0,
                                        15
                                      )}...`
                                    : ` ${getChatWithName(chat).name}`}
                                </Heading>
                              </Box>
                            </Flex>
                            <Flex>
                              {chat.lastMessage.senderId === userId ? (
                                <Flex width={"100%"} alignItems="center">
                                  <Box wordBreak="keep-all" fontWeight="100">
                                    You:
                                  </Box>

                                  <Box
                                    overflow="hidden"
                                    textOverflow="ellipsis"
                                    width={
                                      singleItemOnPage && windowSize.width < 800
                                        ? windowSize.width - 220
                                        : "110px"
                                    }
                                    minW={
                                      singleItemOnPage && windowSize.width < 800
                                        ? "150px"
                                        : "0px"
                                    }
                                    whiteSpace="nowrap"
                                    mx={1}>
                                    {chat.lastMessage?.text}
                                  </Box>

                                  <Box
                                    ml="auto"
                                    wordBreak="keep-all"
                                    fontWeight="100">
                                    {getMessageDate(
                                      chat.lastMessage?.createdAt
                                    )}
                                  </Box>
                                </Flex>
                              ) : (
                                <Flex
                                  height={"1.5em"}
                                  width={"100%"}
                                  alignItems="center">
                                  <Box
                                    overflow="hidden"
                                    textOverflow="ellipsis"
                                    width={
                                      singleItemOnPage && windowSize.width < 800
                                        ? windowSize.width - 180
                                        : "137px"
                                    }
                                    minW={
                                      singleItemOnPage && windowSize.width < 800
                                        ? "150px"
                                        : "0px"
                                    }
                                    whiteSpace="nowrap"
                                    mx={1}>
                                    {chat.lastMessage?.text}
                                  </Box>

                                  <Box
                                    ml="auto"
                                    wordBreak="keep-all"
                                    fontWeight="100">
                                    {getMessageDate(
                                      chat.lastMessage?.createdAt
                                    )}
                                  </Box>
                                </Flex>
                              )}
                            </Flex>
                          </Flex>
                        ) : null}
                      </Flex>
                    ) : null}
                  </Box>
                </NextLink>
              );
            })}
          </Stack>
        </Flex>
      )}
    </Box>
  );
};

export default ChatList;
