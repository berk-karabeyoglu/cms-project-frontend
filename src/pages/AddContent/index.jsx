import { useState } from 'react';
import { Flex,Spinner } from '@chakra-ui/react';
import StringInputField from '../../components/ContentInputFields/StringInput';
import IntegerInputField from '../../components/ContentInputFields/IntegerInput';
const AddContent = ({ contentTypeFields }) => {
  return (
    <Flex
      alignItems="center"
      justifyContent={'space-evenly'}
      w="100%"
      h={'auto'}
      gap={3}
      direction={'column'}
      p={6}
      bgColor="whiteAlpha.900"
    >
      <StringInputField/>
      <IntegerInputField/>
    </Flex>
  );
};

export default AddContent;
