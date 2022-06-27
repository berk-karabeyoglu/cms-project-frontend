import { Checkbox } from '@chakra-ui/react';
const BooleanInputField = ({field}) => {
  return (
    <Checkbox {...field} size="md" colorScheme="green" defaultChecked>
     
    </Checkbox>
  );
};

export default BooleanInputField;
