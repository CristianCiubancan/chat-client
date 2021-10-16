import React, { InputHTMLAttributes } from "react";
import { useField } from "formik";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
} from "@chakra-ui/react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  textarea?: boolean;
  chatField?: boolean;
};

// '' => false
// 'error message stuff' => true

const InputField: React.FC<InputFieldProps> = ({
  label,
  textarea,
  chatField,
  size: _,
  ...props
}) => {
  let InputOrTextarea = Input;
  if (textarea) {
    InputOrTextarea = Textarea as any;
  }
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      {chatField ? (
        <Input
          backgroundColor="gray.100"
          {...field}
          {...props}
          id={field.name}
        />
      ) : (
        <>
          <FormLabel htmlFor={field.name}>{label}</FormLabel>
          <InputOrTextarea {...field} {...props} id={field.name} />
        </>
      )}

      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};

export default InputField;
