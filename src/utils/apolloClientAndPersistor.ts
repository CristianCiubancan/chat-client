import { useApolloClient } from "@apollo/client";
import { CachePersistor, LocalStorageWrapper } from "apollo3-cache-persist";
import { PERSISTOR_CACHE_KEY } from "../utils/withApollo";

export const apolloClientAndPersistor = () => {
  const apolloClient = useApolloClient();
  const cachePersistor = new CachePersistor({
    cache: apolloClient.cache,
    storage: new LocalStorageWrapper(window.localStorage),
    debug: process.env.NODE_ENV === "development",
    key: PERSISTOR_CACHE_KEY,
  });

  return { client: apolloClient, persistor: cachePersistor };
};
