import { React } from 'react';
import { Input } from '@chakra-ui/react';
const IntegerInputField = ({ field }) => {
  return <Input {...field} id="numberInput" type="number" />;
};

export default IntegerInputField;
