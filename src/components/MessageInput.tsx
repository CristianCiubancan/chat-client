import { Box, Flex, IconButton } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React from "react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useSendMessageMutation } from "../generated/graphql";
import InputField from "./InputField";

interface MessageInputProps {
  chatId: number;
}

const MessageInput: React.FC<MessageInputProps> = ({ chatId }) => {
  const [sendMessage, { loading }] = useSendMessageMutation({
    onCompleted: (data) => {},
    onError: (err) => {},
  });

  return (
    <Formik
      initialValues={{ message: "" }}
      onSubmit={async (values, actions) => {
        sendMessage({
          variables: {
            input: {
              chatId,
              text: values.message,
            },
          },
        });
        actions.resetForm();
      }}
    >
      {({ isSubmitting }) =>
        false ? (
          <Box></Box>
        ) : (
          <Box w="100%">
            <Form>
              <Flex
                backgroundColor="teal"
                height="88px"
                justifyContent="space-around"
                alignItems="center"
                borderTopWidth="1px"
                width="100%"
                mt="auto"
                px={4}
              >
                <InputField
                  name="message"
                  placeholder="Send Message"
                  label="message"
                  type="text"
                  chatField={true}
                />

                <IconButton
                  disabled={loading}
                  type="submit"
                  ml={4}
                  colorScheme="teal"
                  aria-label="send message"
                  icon={<ChevronRightIcon />}
                />
              </Flex>
            </Form>
          </Box>
        )
      }
    </Formik>
  );
};
export default MessageInput;
