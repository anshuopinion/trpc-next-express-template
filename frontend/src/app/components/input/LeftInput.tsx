import { InputGroup, InputLeftAddon } from "@chakra-ui/react";
import { InputControl } from "formik-chakra-ui";
import { ComponentProps, FC, ReactNode } from "react";
type InputControlProps = ComponentProps<typeof InputControl>;
type InputLeftAddonProps = ComponentProps<typeof InputLeftAddon>;

interface ILeftInputControlProps {
  input?: InputControlProps;
  leftElement: ReactNode;
  inputLeft?: InputLeftAddonProps;
  name: string;
}

const LeftInputControl: FC<ILeftInputControlProps> = ({
  input,
  inputLeft,
  leftElement,
  name,
}) => {
  return (
    <InputGroup maxW="180px">
      <InputLeftAddon {...inputLeft}>{leftElement}</InputLeftAddon>
      <InputControl
        name={name}
        inputProps={{
          borderLeftRadius: "0",
        }}
        {...input}
      />
      ;
    </InputGroup>
  );
};
export default LeftInputControl;
