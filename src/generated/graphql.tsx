import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Chat = {
  __typename?: 'Chat';
  id: Scalars['ID'];
  lastMessage?: Maybe<Message>;
  members: Array<User>;
  messages?: Maybe<Array<Message>>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Message = {
  __typename?: 'Message';
  chatId: Scalars['Float'];
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  readers: Array<Reader>;
  senderId: Scalars['Float'];
  text: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type MessageInput = {
  chatId: Scalars['Int'];
  text: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: UserResponse;
  changeProfilePic: Scalars['String'];
  createChat: Chat;
  forgotPassword: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  readChatMessages: Scalars['Boolean'];
  register: UserResponse;
  sendMessage: Message;
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationChangeProfilePicArgs = {
  picture: Scalars['Upload'];
};


export type MutationCreateChatArgs = {
  initiatorId: Scalars['Float'];
  otherMemberId: Scalars['Float'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationReadChatMessagesArgs = {
  messageId: Scalars['Int'];
};


export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};


export type MutationSendMessageArgs = {
  input: MessageInput;
};

export type NotificationPublish = {
  __typename?: 'NotificationPublish';
  add: Scalars['Boolean'];
  chatId: Scalars['Float'];
  messageId: Scalars['Float'];
  senderId: Scalars['Float'];
};

export type PaginatedMessages = {
  __typename?: 'PaginatedMessages';
  hasMore: Scalars['Boolean'];
  messages: Array<Message>;
};

export type Query = {
  __typename?: 'Query';
  getChat?: Maybe<Chat>;
  getChats: Array<Chat>;
  getMessages?: Maybe<PaginatedMessages>;
  getUser?: Maybe<User>;
  getUserChats: Array<Chat>;
  getUsers: Array<User>;
  me?: Maybe<User>;
  userNotifications?: Maybe<Array<NotificationPublish>>;
};


export type QueryGetChatArgs = {
  id: Scalars['Int'];
};


export type QueryGetMessagesArgs = {
  chatId: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryGetUserArgs = {
  userId: Scalars['Int'];
};

export type Reader = {
  __typename?: 'Reader';
  createdAt: Scalars['String'];
  message: Message;
  messageId: Scalars['Float'];
  reader: User;
  updatedAt: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  newChatMessage: Message;
  newMessagesSentToChat: Chat;
  newNotificationReceived: NotificationPublish;
  newReadMessage: Chat;
};


export type SubscriptionNewChatMessageArgs = {
  chatId: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  chats: Array<Chat>;
  createdAt: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['Float'];
  profilePicUrl: Scalars['String'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UsernamePasswordInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type RegularErrorFragment = { __typename?: 'FieldError', message: string, field: string };

export type RegularUserFragment = { __typename?: 'User', id: number, username: string, profilePicUrl: string };

export type RegularUserResponseFragment = { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', message: string, field: string }> | null | undefined, user?: { __typename?: 'User', id: number, username: string, profilePicUrl: string } | null | undefined };

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', message: string, field: string }> | null | undefined, user?: { __typename?: 'User', id: number, username: string, profilePicUrl: string } | null | undefined } };

export type ChangeProfilePicMutationVariables = Exact<{
  picture: Scalars['Upload'];
}>;


export type ChangeProfilePicMutation = { __typename?: 'Mutation', changeProfilePic: string };

export type CreateChatMutationVariables = Exact<{
  initiatorId: Scalars['Float'];
  otherMemberId: Scalars['Float'];
}>;


export type CreateChatMutation = { __typename?: 'Mutation', createChat: { __typename?: 'Chat', id: string, lastMessage?: { __typename?: 'Message', id: string, text: string, senderId: number, createdAt: string, readers: Array<{ __typename?: 'Reader', messageId: number, reader: { __typename?: 'User', id: number } }> } | null | undefined, members: Array<{ __typename?: 'User', id: number, username: string, profilePicUrl: string }> } };

export type ForgotPasswotdMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswotdMutation = { __typename?: 'Mutation', forgotPassword: boolean };

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', message: string, field: string }> | null | undefined, user?: { __typename?: 'User', id: number, username: string, profilePicUrl: string } | null | undefined } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type ReadChatMessageMutationVariables = Exact<{
  messageId: Scalars['Int'];
}>;


export type ReadChatMessageMutation = { __typename?: 'Mutation', readChatMessages: boolean };

export type RegisterMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', message: string, field: string }> | null | undefined, user?: { __typename?: 'User', id: number, username: string, profilePicUrl: string } | null | undefined } };

export type SendMessageMutationVariables = Exact<{
  input: MessageInput;
}>;


export type SendMessageMutation = { __typename?: 'Mutation', sendMessage: { __typename?: 'Message', id: string, senderId: number, text: string, chatId: number, createdAt: string, updatedAt: string, readers: Array<{ __typename?: 'Reader', messageId: number, reader: { __typename?: 'User', id: number } }> } };

export type GetChatQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetChatQuery = { __typename?: 'Query', getChat?: { __typename?: 'Chat', id: string, members: Array<{ __typename?: 'User', id: number, username: string, profilePicUrl: string }> } | null | undefined };

export type GetMessagesQueryVariables = Exact<{
  chatId: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
}>;


export type GetMessagesQuery = { __typename?: 'Query', getMessages?: { __typename?: 'PaginatedMessages', hasMore: boolean, messages: Array<{ __typename?: 'Message', id: string, senderId: number, text: string, createdAt: string, updatedAt: string, readers: Array<{ __typename?: 'Reader', messageId: number, reader: { __typename?: 'User', id: number } }> }> } | null | undefined };

export type GetUserChatsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserChatsQuery = { __typename?: 'Query', getUserChats: Array<{ __typename?: 'Chat', id: string, lastMessage?: { __typename?: 'Message', id: string, senderId: number, text: string, createdAt: string, updatedAt: string, readers: Array<{ __typename?: 'Reader', messageId: number, reader: { __typename?: 'User', id: number } }> } | null | undefined, members: Array<{ __typename?: 'User', id: number, username: string, profilePicUrl: string }> }> };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', getUsers: Array<{ __typename?: 'User', email: string, id: number, username: string, profilePicUrl: string }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, username: string, profilePicUrl: string } | null | undefined };

export type UserNotificationsQueryVariables = Exact<{ [key: string]: never; }>;


export type UserNotificationsQuery = { __typename?: 'Query', userNotifications?: Array<{ __typename?: 'NotificationPublish', chatId: number, messageId: number }> | null | undefined };

export type NewChatMessageSubscriptionVariables = Exact<{
  chatId: Scalars['Int'];
}>;


export type NewChatMessageSubscription = { __typename?: 'Subscription', newChatMessage: { __typename?: 'Message', id: string, senderId: number, text: string, createdAt: string, updatedAt: string, readers: Array<{ __typename?: 'Reader', messageId: number, reader: { __typename?: 'User', id: number } }> } };

export type NewMessagesSentToChatSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NewMessagesSentToChatSubscription = { __typename?: 'Subscription', newMessagesSentToChat: { __typename?: 'Chat', id: string, lastMessage?: { __typename?: 'Message', id: string, senderId: number, text: string, createdAt: string, updatedAt: string, readers: Array<{ __typename?: 'Reader', messageId: number, reader: { __typename?: 'User', id: number } }> } | null | undefined, members: Array<{ __typename?: 'User', id: number, username: string, profilePicUrl: string }> } };

export type NewNotificationReceivedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NewNotificationReceivedSubscription = { __typename?: 'Subscription', newNotificationReceived: { __typename?: 'NotificationPublish', messageId: number, senderId: number, chatId: number, add: boolean } };

export type NewReadMessageSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NewReadMessageSubscription = { __typename?: 'Subscription', newReadMessage: { __typename?: 'Chat', id: string, lastMessage?: { __typename?: 'Message', id: string, senderId: number, text: string, createdAt: string, updatedAt: string, readers: Array<{ __typename?: 'Reader', messageId: number, reader: { __typename?: 'User', id: number } }> } | null | undefined, members: Array<{ __typename?: 'User', id: number, username: string, profilePicUrl: string }> } };

export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  message
  field
}
    `;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  username
  profilePicUrl
}
    `;
export const RegularUserResponseFragmentDoc = gql`
    fragment RegularUserResponse on UserResponse {
  errors {
    ...RegularError
  }
  user {
    ...RegularUser
  }
}
    ${RegularErrorFragmentDoc}
${RegularUserFragmentDoc}`;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $newPassword: String!) {
  changePassword(token: $token, newPassword: $newPassword) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      token: // value for 'token'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const ChangeProfilePicDocument = gql`
    mutation ChangeProfilePic($picture: Upload!) {
  changeProfilePic(picture: $picture)
}
    `;
export type ChangeProfilePicMutationFn = Apollo.MutationFunction<ChangeProfilePicMutation, ChangeProfilePicMutationVariables>;

/**
 * __useChangeProfilePicMutation__
 *
 * To run a mutation, you first call `useChangeProfilePicMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeProfilePicMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeProfilePicMutation, { data, loading, error }] = useChangeProfilePicMutation({
 *   variables: {
 *      picture: // value for 'picture'
 *   },
 * });
 */
export function useChangeProfilePicMutation(baseOptions?: Apollo.MutationHookOptions<ChangeProfilePicMutation, ChangeProfilePicMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeProfilePicMutation, ChangeProfilePicMutationVariables>(ChangeProfilePicDocument, options);
      }
export type ChangeProfilePicMutationHookResult = ReturnType<typeof useChangeProfilePicMutation>;
export type ChangeProfilePicMutationResult = Apollo.MutationResult<ChangeProfilePicMutation>;
export type ChangeProfilePicMutationOptions = Apollo.BaseMutationOptions<ChangeProfilePicMutation, ChangeProfilePicMutationVariables>;
export const CreateChatDocument = gql`
    mutation CreateChat($initiatorId: Float!, $otherMemberId: Float!) {
  createChat(initiatorId: $initiatorId, otherMemberId: $otherMemberId) {
    lastMessage {
      id
      text
      senderId
      readers {
        messageId
        reader {
          id
        }
      }
      createdAt
    }
    id
    members {
      ...RegularUser
    }
  }
}
    ${RegularUserFragmentDoc}`;
export type CreateChatMutationFn = Apollo.MutationFunction<CreateChatMutation, CreateChatMutationVariables>;

/**
 * __useCreateChatMutation__
 *
 * To run a mutation, you first call `useCreateChatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateChatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createChatMutation, { data, loading, error }] = useCreateChatMutation({
 *   variables: {
 *      initiatorId: // value for 'initiatorId'
 *      otherMemberId: // value for 'otherMemberId'
 *   },
 * });
 */
export function useCreateChatMutation(baseOptions?: Apollo.MutationHookOptions<CreateChatMutation, CreateChatMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateChatMutation, CreateChatMutationVariables>(CreateChatDocument, options);
      }
export type CreateChatMutationHookResult = ReturnType<typeof useCreateChatMutation>;
export type CreateChatMutationResult = Apollo.MutationResult<CreateChatMutation>;
export type CreateChatMutationOptions = Apollo.BaseMutationOptions<CreateChatMutation, CreateChatMutationVariables>;
export const ForgotPasswotdDocument = gql`
    mutation ForgotPasswotd($email: String!) {
  forgotPassword(email: $email)
}
    `;
export type ForgotPasswotdMutationFn = Apollo.MutationFunction<ForgotPasswotdMutation, ForgotPasswotdMutationVariables>;

/**
 * __useForgotPasswotdMutation__
 *
 * To run a mutation, you first call `useForgotPasswotdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswotdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswotdMutation, { data, loading, error }] = useForgotPasswotdMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswotdMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswotdMutation, ForgotPasswotdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswotdMutation, ForgotPasswotdMutationVariables>(ForgotPasswotdDocument, options);
      }
export type ForgotPasswotdMutationHookResult = ReturnType<typeof useForgotPasswotdMutation>;
export type ForgotPasswotdMutationResult = Apollo.MutationResult<ForgotPasswotdMutation>;
export type ForgotPasswotdMutationOptions = Apollo.BaseMutationOptions<ForgotPasswotdMutation, ForgotPasswotdMutationVariables>;
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      usernameOrEmail: // value for 'usernameOrEmail'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const ReadChatMessageDocument = gql`
    mutation ReadChatMessage($messageId: Int!) {
  readChatMessages(messageId: $messageId)
}
    `;
export type ReadChatMessageMutationFn = Apollo.MutationFunction<ReadChatMessageMutation, ReadChatMessageMutationVariables>;

/**
 * __useReadChatMessageMutation__
 *
 * To run a mutation, you first call `useReadChatMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReadChatMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [readChatMessageMutation, { data, loading, error }] = useReadChatMessageMutation({
 *   variables: {
 *      messageId: // value for 'messageId'
 *   },
 * });
 */
export function useReadChatMessageMutation(baseOptions?: Apollo.MutationHookOptions<ReadChatMessageMutation, ReadChatMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReadChatMessageMutation, ReadChatMessageMutationVariables>(ReadChatMessageDocument, options);
      }
export type ReadChatMessageMutationHookResult = ReturnType<typeof useReadChatMessageMutation>;
export type ReadChatMessageMutationResult = Apollo.MutationResult<ReadChatMessageMutation>;
export type ReadChatMessageMutationOptions = Apollo.BaseMutationOptions<ReadChatMessageMutation, ReadChatMessageMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($options: UsernamePasswordInput!) {
  register(options: $options) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const SendMessageDocument = gql`
    mutation SendMessage($input: MessageInput!) {
  sendMessage(input: $input) {
    id
    senderId
    text
    chatId
    readers {
      messageId
      reader {
        id
      }
    }
    createdAt
    updatedAt
  }
}
    `;
export type SendMessageMutationFn = Apollo.MutationFunction<SendMessageMutation, SendMessageMutationVariables>;

/**
 * __useSendMessageMutation__
 *
 * To run a mutation, you first call `useSendMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMessageMutation, { data, loading, error }] = useSendMessageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSendMessageMutation(baseOptions?: Apollo.MutationHookOptions<SendMessageMutation, SendMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendMessageMutation, SendMessageMutationVariables>(SendMessageDocument, options);
      }
export type SendMessageMutationHookResult = ReturnType<typeof useSendMessageMutation>;
export type SendMessageMutationResult = Apollo.MutationResult<SendMessageMutation>;
export type SendMessageMutationOptions = Apollo.BaseMutationOptions<SendMessageMutation, SendMessageMutationVariables>;
export const GetChatDocument = gql`
    query GetChat($id: Int!) {
  getChat(id: $id) {
    id
    members {
      ...RegularUser
    }
  }
}
    ${RegularUserFragmentDoc}`;

/**
 * __useGetChatQuery__
 *
 * To run a query within a React component, call `useGetChatQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChatQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChatQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetChatQuery(baseOptions: Apollo.QueryHookOptions<GetChatQuery, GetChatQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetChatQuery, GetChatQueryVariables>(GetChatDocument, options);
      }
export function useGetChatLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetChatQuery, GetChatQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetChatQuery, GetChatQueryVariables>(GetChatDocument, options);
        }
export type GetChatQueryHookResult = ReturnType<typeof useGetChatQuery>;
export type GetChatLazyQueryHookResult = ReturnType<typeof useGetChatLazyQuery>;
export type GetChatQueryResult = Apollo.QueryResult<GetChatQuery, GetChatQueryVariables>;
export const GetMessagesDocument = gql`
    query GetMessages($chatId: Int!, $cursor: String, $limit: Int!) {
  getMessages(chatId: $chatId, cursor: $cursor, limit: $limit) {
    messages {
      id
      senderId
      text
      createdAt
      updatedAt
      readers {
        messageId
        reader {
          id
        }
      }
    }
    hasMore
  }
}
    `;

/**
 * __useGetMessagesQuery__
 *
 * To run a query within a React component, call `useGetMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMessagesQuery({
 *   variables: {
 *      chatId: // value for 'chatId'
 *      cursor: // value for 'cursor'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetMessagesQuery(baseOptions: Apollo.QueryHookOptions<GetMessagesQuery, GetMessagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMessagesQuery, GetMessagesQueryVariables>(GetMessagesDocument, options);
      }
export function useGetMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMessagesQuery, GetMessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMessagesQuery, GetMessagesQueryVariables>(GetMessagesDocument, options);
        }
export type GetMessagesQueryHookResult = ReturnType<typeof useGetMessagesQuery>;
export type GetMessagesLazyQueryHookResult = ReturnType<typeof useGetMessagesLazyQuery>;
export type GetMessagesQueryResult = Apollo.QueryResult<GetMessagesQuery, GetMessagesQueryVariables>;
export const GetUserChatsDocument = gql`
    query GetUserChats {
  getUserChats {
    lastMessage {
      id
      senderId
      text
      createdAt
      updatedAt
      readers {
        messageId
        reader {
          id
        }
      }
    }
    id
    members {
      ...RegularUser
    }
  }
}
    ${RegularUserFragmentDoc}`;

/**
 * __useGetUserChatsQuery__
 *
 * To run a query within a React component, call `useGetUserChatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserChatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserChatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserChatsQuery(baseOptions?: Apollo.QueryHookOptions<GetUserChatsQuery, GetUserChatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserChatsQuery, GetUserChatsQueryVariables>(GetUserChatsDocument, options);
      }
export function useGetUserChatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserChatsQuery, GetUserChatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserChatsQuery, GetUserChatsQueryVariables>(GetUserChatsDocument, options);
        }
export type GetUserChatsQueryHookResult = ReturnType<typeof useGetUserChatsQuery>;
export type GetUserChatsLazyQueryHookResult = ReturnType<typeof useGetUserChatsLazyQuery>;
export type GetUserChatsQueryResult = Apollo.QueryResult<GetUserChatsQuery, GetUserChatsQueryVariables>;
export const GetUsersDocument = gql`
    query GetUsers {
  getUsers {
    ...RegularUser
    email
  }
}
    ${RegularUserFragmentDoc}`;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
      }
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const UserNotificationsDocument = gql`
    query UserNotifications {
  userNotifications {
    chatId
    messageId
  }
}
    `;

/**
 * __useUserNotificationsQuery__
 *
 * To run a query within a React component, call `useUserNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserNotificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserNotificationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserNotificationsQuery(baseOptions?: Apollo.QueryHookOptions<UserNotificationsQuery, UserNotificationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserNotificationsQuery, UserNotificationsQueryVariables>(UserNotificationsDocument, options);
      }
export function useUserNotificationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserNotificationsQuery, UserNotificationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserNotificationsQuery, UserNotificationsQueryVariables>(UserNotificationsDocument, options);
        }
export type UserNotificationsQueryHookResult = ReturnType<typeof useUserNotificationsQuery>;
export type UserNotificationsLazyQueryHookResult = ReturnType<typeof useUserNotificationsLazyQuery>;
export type UserNotificationsQueryResult = Apollo.QueryResult<UserNotificationsQuery, UserNotificationsQueryVariables>;
export const NewChatMessageDocument = gql`
    subscription NewChatMessage($chatId: Int!) {
  newChatMessage(chatId: $chatId) {
    id
    senderId
    text
    createdAt
    updatedAt
    readers {
      messageId
      reader {
        id
      }
    }
  }
}
    `;

/**
 * __useNewChatMessageSubscription__
 *
 * To run a query within a React component, call `useNewChatMessageSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewChatMessageSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewChatMessageSubscription({
 *   variables: {
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useNewChatMessageSubscription(baseOptions: Apollo.SubscriptionHookOptions<NewChatMessageSubscription, NewChatMessageSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<NewChatMessageSubscription, NewChatMessageSubscriptionVariables>(NewChatMessageDocument, options);
      }
export type NewChatMessageSubscriptionHookResult = ReturnType<typeof useNewChatMessageSubscription>;
export type NewChatMessageSubscriptionResult = Apollo.SubscriptionResult<NewChatMessageSubscription>;
export const NewMessagesSentToChatDocument = gql`
    subscription NewMessagesSentToChat {
  newMessagesSentToChat {
    lastMessage {
      id
      senderId
      text
      createdAt
      updatedAt
      readers {
        messageId
        reader {
          id
        }
      }
    }
    id
    members {
      ...RegularUser
    }
  }
}
    ${RegularUserFragmentDoc}`;

/**
 * __useNewMessagesSentToChatSubscription__
 *
 * To run a query within a React component, call `useNewMessagesSentToChatSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewMessagesSentToChatSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewMessagesSentToChatSubscription({
 *   variables: {
 *   },
 * });
 */
export function useNewMessagesSentToChatSubscription(baseOptions?: Apollo.SubscriptionHookOptions<NewMessagesSentToChatSubscription, NewMessagesSentToChatSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<NewMessagesSentToChatSubscription, NewMessagesSentToChatSubscriptionVariables>(NewMessagesSentToChatDocument, options);
      }
export type NewMessagesSentToChatSubscriptionHookResult = ReturnType<typeof useNewMessagesSentToChatSubscription>;
export type NewMessagesSentToChatSubscriptionResult = Apollo.SubscriptionResult<NewMessagesSentToChatSubscription>;
export const NewNotificationReceivedDocument = gql`
    subscription NewNotificationReceived {
  newNotificationReceived {
    messageId
    senderId
    chatId
    add
  }
}
    `;

/**
 * __useNewNotificationReceivedSubscription__
 *
 * To run a query within a React component, call `useNewNotificationReceivedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewNotificationReceivedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewNotificationReceivedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useNewNotificationReceivedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<NewNotificationReceivedSubscription, NewNotificationReceivedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<NewNotificationReceivedSubscription, NewNotificationReceivedSubscriptionVariables>(NewNotificationReceivedDocument, options);
      }
export type NewNotificationReceivedSubscriptionHookResult = ReturnType<typeof useNewNotificationReceivedSubscription>;
export type NewNotificationReceivedSubscriptionResult = Apollo.SubscriptionResult<NewNotificationReceivedSubscription>;
export const NewReadMessageDocument = gql`
    subscription NewReadMessage {
  newReadMessage {
    lastMessage {
      id
      senderId
      text
      createdAt
      updatedAt
      readers {
        messageId
        reader {
          id
        }
      }
    }
    id
    members {
      ...RegularUser
    }
  }
}
    ${RegularUserFragmentDoc}`;

/**
 * __useNewReadMessageSubscription__
 *
 * To run a query within a React component, call `useNewReadMessageSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewReadMessageSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewReadMessageSubscription({
 *   variables: {
 *   },
 * });
 */
export function useNewReadMessageSubscription(baseOptions?: Apollo.SubscriptionHookOptions<NewReadMessageSubscription, NewReadMessageSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<NewReadMessageSubscription, NewReadMessageSubscriptionVariables>(NewReadMessageDocument, options);
      }
export type NewReadMessageSubscriptionHookResult = ReturnType<typeof useNewReadMessageSubscription>;
export type NewReadMessageSubscriptionResult = Apollo.SubscriptionResult<NewReadMessageSubscription>;