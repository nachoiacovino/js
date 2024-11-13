import { Box, Flex, Icon } from "@chakra-ui/react";
import type { AbiParameter } from "abitype";
import { PlusIcon } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Button, Text } from "tw-components";
import { RefBytesContractInput } from "./ref-bytes-input";

interface RefBytesInputFieldsetProps {
  param: AbiParameter;
  paramIndex: number;
  setIndex: number;
}

export const RefBytesInputFieldset: React.FC<RefBytesInputFieldsetProps> = ({
  param,
  setIndex,
  paramIndex,
}) => {
  const form = useFormContext();

  const { fields, append, remove } = useFieldArray({
    name: `constructorParams.${param.name ? param.name : "*"}.dynamicValue.decodedBytes.${setIndex}.${paramIndex}.dynamicValue.refContracts`,
    control: form.control,
  });

  return (
    <Flex gap={8} direction="column" as="fieldset">
      <Flex gap={2} direction="column">
        <Text>Set ref contract for this param.</Text>
      </Flex>
      <Flex flexDir="column" gap={4}>
        {fields.map((item, index) => (
          <RefBytesContractInput
            key={item.id}
            remove={remove}
            index={index}
            param={param}
            paramIndex={paramIndex}
            setIndex={setIndex}
          />
        ))}
        <Box>
          <Button
            type="button"
            size="sm"
            colorScheme="primary"
            borderRadius="md"
            leftIcon={<Icon as={PlusIcon} />}
            isDisabled={param.type === "address" && fields.length >= 1}
            onClick={() =>
              append({
                contractId: "",
                version: "",
                publisherAddress: "",
                salt: "",
              })
            }
          >
            Add Ref
          </Button>
        </Box>
      </Flex>
    </Flex>
  );
};
