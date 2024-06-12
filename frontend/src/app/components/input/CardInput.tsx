import { Card } from "@chakra-ui/react";
import { InputControl } from "formik-chakra-ui";
import { ComponentProps, FC } from "react";
type InputControlProps = ComponentProps<typeof InputControl>;
type CardProps = ComponentProps<typeof Card>;
interface ICardInputProps {
  card?: CardProps;
  input?: InputControlProps;
  name: string;
  label: string;
}

const CardInput: FC<ICardInputProps> = ({ card, input, name, label }) => {
  return (
    <Card p="2" w="full" color="white" {...card}>
      <InputControl
        inputProps={{
          variant: "filled",
          bg: "rgba(255,255,255,0.4)",
          border: "1px solid",
          borderColor: "rgba(255,255,255,0.8)",
        }}
        label={label}
        name={name}
        {...input}
      />
    </Card>
  );
};
export default CardInput;
