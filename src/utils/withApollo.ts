import { createWithApollo } from "./createWithApollo";
import { ApolloClient, InMemoryCache, split } from "@apollo/client";
import { NextPageContext } from "next";
import { createUploadLink } from "apollo-upload-client";
import { getMainDefinition } from "@apollo/client/utilities";
import { webSocketLink } from "./wsLink";

const createApolloClient = (ctx: NextPageContext) => {
  const uploadLink = () =>
    createUploadLink({
      uri: process.env.NEXT_PUBLIC_API_URL as string,
      credentials: "include",
      headers: {
        cookie:
          (typeof window === "undefined"
            ? ctx?.req?.headers.cookie
            : undefined) || "",
      },
    });

  let splitLink = () =>
    split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === "OperationDefinition" &&
          definition.operation === "subscription"
        );
      },
      webSocketLink(),
      uploadLink()
    );

  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: typeof window === "undefined" ? uploadLink() : splitLink(),
    cache: new InMemoryCache({
      typePolicies: {
        Subscription: {
          fields: {
            newMessagesSentToChat: {
              keyArgs: false,
              merge(existing, incoming, { cache, readField }) {
                cache.modify({
                  fields: {
                    getUserChats(existingUserChats = [], { readField }) {
                      let didUpdate = false;
                      if (!existingUserChats) {
                        return [incoming];
                      }
                      const newArray = existingUserChats.map((chatRef: any) => {
                        if (
                          JSON.stringify(incoming) === JSON.stringify(chatRef)
                        ) {
                          didUpdate = true;
                          return incoming;
                        } else {
                          return chatRef;
                        }
                      });
                      if (didUpdate) {
                        return newArray;
                      } else {
                        return [incoming, ...newArray];
                      }
                    },
                  },
                });
              },
            },
            newReadMessage: {
              keyArgs: false,
              merge(existing, incoming, { cache, readField }) {
                cache.modify({
                  fields: {
                    getUserChats(existingUserChats = [], { readField }) {
                      let didUpdate = false;

                      if (!existingUserChats) {
                        return [incoming];
                      }

                      const newArray = existingUserChats.map((chatRef: any) => {
                        if (
                          JSON.stringify(incoming) === JSON.stringify(chatRef)
                        ) {
                          didUpdate = true;
                          return incoming;
                        } else {
                          return chatRef;
                        }
                      });

                      if (didUpdate) {
                        return newArray;
                      } else {
                        return existingUserChats;
                      }
                    },
                  },
                });
              },
            },
            newChatMessage: {
              keyArgs: ["chatId"],
              merge(existing, incoming, { cache, readField }) {
                cache.modify({
                  fields: {
                    getMessages(existingMessages = [], { readField }) {
                      return {
                        ...existingMessages,
                        messages: [incoming, ...existingMessages.messages],
                      };
                    },
                  },
                });
              },
            },
          },
        },
        Query: {
          fields: {
            getMessages: {
              keyArgs: ["chatId"],
              merge(existing, incoming, { args }) {
                if (!incoming) {
                  return [];
                }
                if (!existing || !args?.cursor) {
                  return incoming;
                }
                if (args.cursor) {
                  return {
                    ...incoming,
                    messages: [
                      ...(existing?.messages || []),
                      ...incoming.messages,
                    ],
                  };
                }
              },
            },
          },
        },
      },
    }),
  });
};

export const withApollo = createWithApollo(createApolloClient);
