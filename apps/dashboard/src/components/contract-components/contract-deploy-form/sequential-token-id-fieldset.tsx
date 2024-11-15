import { FormControl } from "@chakra-ui/react";
import { SolidityInput } from "contract-ui/components/solidity-inputs";
import type { UseFormRegisterReturn } from "react-hook-form";
import { FormErrorMessage, FormHelperText, FormLabel } from "tw-components";
import { Fieldset } from "./common";

interface SequentialTokenIdFieldsetProps {
  isInvalid: boolean;
  register: UseFormRegisterReturn;
  errorMessage: string | undefined;
}

export const SequentialTokenIdFieldset: React.FC<
  SequentialTokenIdFieldsetProps
> = (props) => {
  return (
    <Fieldset legend="Sequential Token ID">
      <FormControl isRequired isInvalid={props.isInvalid}>
        <FormLabel>Start Token ID</FormLabel>
        <SolidityInput
          solidityType="uint256"
          variant="filled"
          {...props.register}
        />

        <FormErrorMessage>{props.errorMessage}</FormErrorMessage>

        <FormHelperText className="!text-sm text-muted-foreground">
          The starting token ID for the NFT collection.
        </FormHelperText>
      </FormControl>
    </Fieldset>
  );
};
