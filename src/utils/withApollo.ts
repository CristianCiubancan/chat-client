import {
  ApolloCache,
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  split,
} from "@apollo/client";
import { GetServerSidePropsResult, GetStaticPropsResult } from "next";
import { createUploadLink } from "apollo-upload-client";
import { getMainDefinition } from "@apollo/client/utilities";
import { webSocketLink } from "./wsLink";
import merge from "deepmerge";
import isDeepEqual from "fast-deep-equal/react";
import { isServer } from "./isServer";
import { useEffectOnce, usePrevious } from "react-use";
import { useState, useEffect } from "react";
import { CachePersistor, LocalStorageWrapper } from "apollo3-cache-persist";

export const PERSISTOR_CACHE_KEY =
  "with-apollo-and-cache-persist-typescript__apollo-persisted-cache";

const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";

let apolloClient: ApolloClient<NormalizedCacheObject>;

const uploadLink = () =>
  createUploadLink({
    uri: process.env.NEXT_PUBLIC_API_URL as string,
    credentials: "include",
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

export const client = new ApolloClient({
  link: splitLink(),
  cache: new InMemoryCache(),
});

const createCache = () => {
  return new InMemoryCache({
    typePolicies: {
      Subscription: {
        fields: {
          newMessagesSentToChat: {
            keyArgs: false,
            merge(existing, incoming, { cache, readField }) {
              cache.modify({
                fields: {
                  getUserChats(existingUserChats = [], { readField }) {
                    if (!existingUserChats) {
                      return [incoming];
                    }
                    let newArray: any[] = [];

                    for (let ref of existingUserChats) {
                      if (ref.__ref === incoming.__ref) {
                      } else {
                        newArray.push(ref);
                      }
                    }
                    return [incoming, ...newArray];
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
                    if (!existingUserChats) {
                      return [incoming];
                    }
                    let newArray: any[] = [];

                    for (let ref of existingUserChats) {
                      if (ref.__ref === incoming.__ref) {
                      } else {
                        newArray.push(ref);
                      }
                    }
                    console.log([incoming, ...newArray]);
                    return [incoming, ...newArray];
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
                    const newArray = [];
                    for (let message of existingMessages.messages) {
                      if (
                        JSON.stringify(message.__ref) ===
                        JSON.stringify(incoming.__ref)
                      ) {
                      } else {
                        newArray.push(message);
                      }
                    }

                    return {
                      ...existingMessages,
                      messages: [incoming, ...newArray],
                    };
                  },
                },
              });
            },
          },
        },
      },
      Mutation: {
        fields: {
          sendMessage: {
            merge(existing, incoming, { cache }) {
              cache.modify({
                fields: {
                  getMessages(existingMessages = [], { readField }) {
                    const newArray = [];
                    for (let message of existingMessages.messages) {
                      if (
                        JSON.stringify(message.__ref) ===
                        JSON.stringify(incoming.__ref)
                      ) {
                      } else {
                        newArray.push(message);
                      }
                    }

                    return {
                      ...existingMessages,
                      messages: [incoming, ...newArray],
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
          getUserChats: {
            merge(existing = [], incoming, { args }) {
              if (!existing) {
                return incoming;
              }

              const newArray = existing.concat(
                incoming.filter(
                  ({ __ref }: any) =>
                    !existing.find((f: any) => {
                      return f.__ref === __ref;
                    })
                )
              );
              return newArray;
            },
          },
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
  });
};

function createApolloClient(cache?: ApolloCache<NormalizedCacheObject>) {
  return new ApolloClient({
    ssrMode: isServer(),
    link: splitLink(),
    cache: cache || createCache(),
  });
}

function mergeCache(
  cache1: NormalizedCacheObject,
  cache2: NormalizedCacheObject
) {
  return merge(cache1, cache2, {
    // Combine arrays using object equality (like in sets)
    arrayMerge: (destinationArray, sourceArray) => [
      ...sourceArray,
      ...destinationArray.filter((d) =>
        sourceArray.every((s) => !isDeepEqual(d, s))
      ),
    ],
  });
}

export function initializeApollo(
  cache?: ApolloCache<NormalizedCacheObject>
): ApolloClient<NormalizedCacheObject> {
  const _apolloClient = apolloClient ?? createApolloClient(cache);

  // For SSG and SSR always create a new Apollo Client
  if (isServer()) return _apolloClient;

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function addApolloState<
  P extends
    | GetServerSidePropsResult<Record<string, unknown>>
    | GetStaticPropsResult<Record<string, unknown>>
>(
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: P,
  existingCache?: NormalizedCacheObject
): P {
  if (pageProps && "props" in pageProps) {
    const props = pageProps.props;

    if (existingCache) {
      props[APOLLO_STATE_PROP_NAME] = mergeCache(
        client.cache.extract(),
        existingCache
      );
    } else {
      props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
    }
  }

  return pageProps;
}

export function useApollo(pageProps: Record<string, unknown>): {
  client: ApolloClient<NormalizedCacheObject> | undefined;
  cachePersistor: CachePersistor<NormalizedCacheObject> | undefined;
} {
  const state = pageProps[APOLLO_STATE_PROP_NAME] as
    | NormalizedCacheObject
    | undefined;
  const previousState = usePrevious(state);

  const [client, setClient] = useState<ApolloClient<NormalizedCacheObject>>();
  const [cachePersistor, setCachePersistor] =
    useState<CachePersistor<NormalizedCacheObject>>();

  useEffectOnce(() => {
    async function init() {
      const cache = createCache();

      // Initally restore the cache with data from SSR
      if (state) cache.restore(state);

      const cachePersistor = new CachePersistor({
        cache,
        storage: new LocalStorageWrapper(window.localStorage),
        debug: process.env.NODE_ENV === "development",
        key: PERSISTOR_CACHE_KEY,
      });

      // Trigger persist if there is any data from SSR to cache it
      if (state) {
        cachePersistor.trigger.fire();
      }

      // Restore client side persisted data before letting the application to
      // run any queries
      await cachePersistor.restore();

      setCachePersistor(cachePersistor);
      setClient(initializeApollo(cache));
    }

    init();
  });

  useEffect(() => {
    // If your page has Next.js data fetching methods that use Apollo Client, the initial state
    // gets hydrated here during page transitions
    if (state && previousState && !isDeepEqual(state, previousState)) {
      if (client && state) {
        // Get existing cache, loaded during client side data fetching
        const existingCache = client.extract();
        // Merge the existing cache into data passed from getStaticProps/getServerSideProps
        const data = mergeCache(state, existingCache);
        // Restore the cache with the merged data
        client.cache.restore(data);
      }
    }
  }, [state, previousState, client]);

  return { client, cachePersistor };
}
