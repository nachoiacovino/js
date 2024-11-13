import { Box, Flex, Icon, IconButton } from "@chakra-ui/react";
import type { AbiParameter } from "abitype";
import { PlusIcon, TrashIcon } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "tw-components";
import { DecodedInput } from "./decoded-input";

interface DecodedInputSetProps {
  param: AbiParameter;
  setIndex: number;
  removeSet: (index: number) => void;
}

export const DecodedInputSet: React.FC<DecodedInputSetProps> = ({
  param,
  setIndex,
  removeSet,
}) => {
  const form = useFormContext();

  const { fields, append, remove } = useFieldArray({
    name: `constructorParams.${param.name ? param.name : "*"}.dynamicValue.decodedBytes.${setIndex}`,
    control: form.control,
  });

  return (
    <Flex gap={8} direction="column" as="fieldset">
      <Flex flexDir="column" gap={4}>
        {fields.map((item, index) => (
          <DecodedInput
            key={item.id}
            removeParam={remove}
            paramIndex={index}
            setIndex={setIndex}
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
                type: "",
                defaultValue: "",
              })
            }
          >
            Add param
          </Button>
        </Box>
      </Flex>
      <IconButton
        icon={<Icon as={TrashIcon} boxSize={5} />}
        aria-label="Remove set"
        onClick={() => removeSet(setIndex)}
        alignSelf="end"
      />
    </Flex>
  );
};
