import { NumberInput, NumberInputField } from '@chakra-ui/react';

const DecimalInputField = ({ field }) => {
  return (
    <NumberInput defaultValue={15} precision={2} step={0.2}>
      <NumberInputField {...field} />
    </NumberInput>
  );
};

export default DecimalInputField;
