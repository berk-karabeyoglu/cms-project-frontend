import React from 'react';
import { Input } from '@chakra-ui/react';
const StringInputField = ({ field }) => {
  return <Input {...field} size="md" id="name" type="text" />;
};

export default StringInputField;
