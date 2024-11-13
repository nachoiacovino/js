import {
  Checkbox,
  Divider,
  Flex,
  FormControl,
  Icon,
  IconButton,
  Input,
  Select,
} from "@chakra-ui/react";
import type { AbiParameter } from "abitype";
import { TrashIcon } from "lucide-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import {} from "../../hooks";
import { RefBytesInputFieldset } from "./ref-bytes-input-fieldset";

interface DecodedInputProps {
  param: AbiParameter;
  paramIndex: number;
  setIndex: number;
  removeParam: (index: number) => void;
}

export const DecodedInput: React.FC<DecodedInputProps> = ({
  param,
  paramIndex,
  setIndex,
  removeParam,
}) => {
  const form = useFormContext();
  const [isCustomAddress, setIsCustomAddress] = useState(false);
  const selectedType = form.watch(
    `constructorParams.${param.name ? param.name : "*"}.dynamicValue.decodedBytes.${setIndex}.${paramIndex}.type`,
  );

  // Toggle function to handle custom input visibility and reset fields
  const handleToggleCustomInput = () => {
    setIsCustomAddress(() => {
      const updated = !isCustomAddress;

      const path = `constructorParams.${param.name ? param.name : "*"}.dynamicValue.decodedBytes.${setIndex}.${paramIndex}`;
      if (!updated) {
        form.setValue(`${path}.dynamicValue.type`, "address");
        form.resetField(`${path}.defaultValue`);
      } else {
        form.setValue(`${path}.dynamicValue.type`, "");
        form.resetField(`${path}.dynamicValue`);
      }

      return updated;
    });
  };

  return (
    <Flex flexDir="column" gap={2}>
      <Flex
        w="full"
        gap={{ base: 4, md: 2 }}
        flexDir={{ base: "column", md: "row" }}
      >
        <FormControl
          as={Flex}
          flexDir="column"
          gap={1}
          isInvalid={
            !!form.getFieldState(
              `constructorParams.${param.name ? param.name : "*"}.dynamicValue.decodedBytes.${setIndex}.${paramIndex}.type`,
              form.formState,
            ).error
          }
        >
          {/* <Input
            placeholder="param type"
            {...form.register(
              `constructorParams.${param.name ? param.name : "*"}.dynamicValue.refContracts.${index}.publisherAddress`,
            )}
          /> */}
          <Select
            placeholder="Select type"
            {...form.register(
              `constructorParams.${param.name ? param.name : "*"}.dynamicValue.decodedBytes.${setIndex}.${paramIndex}.type`,
            )}
          >
            <option value="uint256">uint256</option>
            <option value="address">address</option>
            <option value="bytes32">bytes32</option>
            <option value="bool">bool</option>
          </Select>
        </FormControl>
        {/* <FormControl as={Flex} flexDir="column" gap={1}>
          <Input
            placeholder="Enter value"
            {...form.register(
              `constructorParams.${param.name ? param.name : "*"}.dynamicValue.decodedBytes.${setIndex}.${paramIndex}.defaultValue`,
            )}
          />
        </FormControl> */}

        <FormControl as={Flex} flexDir="column" gap={1}>
          {isCustomAddress ? (
            <RefBytesInputFieldset
              param={param}
              setIndex={setIndex}
              paramIndex={paramIndex}
            />
          ) : (
            <Input
              placeholder="Enter value"
              {...form.register(
                `constructorParams.${param.name ? param.name : "*"}.dynamicValue.decodedBytes.${setIndex}.${paramIndex}.defaultValue`,
              )}
              isDisabled={selectedType === "address" && isCustomAddress}
            />
          )}
        </FormControl>
        <IconButton
          icon={<Icon as={TrashIcon} boxSize={5} />}
          aria-label="Remove row"
          onClick={() => removeParam(paramIndex)}
          alignSelf="end"
        />
      </Flex>

      {(selectedType === "address" || selectedType === "address[]") && (
        <Checkbox
          isChecked={isCustomAddress}
          onChange={() => handleToggleCustomInput()}
        >
          Use Dynamic Input
        </Checkbox>
      )}
      <Divider />
    </Flex>
  );
};
