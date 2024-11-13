import { Box, Flex, Icon } from "@chakra-ui/react";
import type { AbiParameter } from "abitype";
import { PlusIcon } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Button, Text } from "tw-components";
import { DecodedInputSet } from "./decoded-input-set";

interface DecodedInputArrayFieldsetProps {
  param: AbiParameter;
}

export const DecodedInputArrayFieldset: React.FC<
  DecodedInputArrayFieldsetProps
> = ({ param }) => {
  const form = useFormContext();

  const { fields, append, remove } = useFieldArray({
    name: `constructorParams.${param.name ? param.name : "*"}.dynamicValue.decodedBytes`,
    control: form.control,
  });

  return (
    <Flex gap={8} direction="column" as="fieldset">
      <Flex gap={2} direction="column">
        <Text>Set decoded values for this bytes param.</Text>
      </Flex>
      <Flex flexDir="column" gap={4}>
        {fields.map((item, index) => (
          <DecodedInputSet
            key={item.id}
            removeSet={remove}
            setIndex={index}
            param={param}
          />
        ))}
        <Box>
          <Button
            type="button"
            size="sm"
            colorScheme="primary"
            borderRadius="md"
            leftIcon={<Icon as={PlusIcon} />}
            isDisabled={param.type === "bytes" && fields.length >= 1}
            onClick={() =>
              append({
                contractId: "",
                version: "",
                publisherAddress: "",
              })
            }
          >
            New param set
          </Button>
        </Box>
      </Flex>
    </Flex>
  );
};
