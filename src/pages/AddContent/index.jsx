import { Button, Flex, Spinner, useToast } from '@chakra-ui/react';
import StringInputField from '../../components/ContentInputFields/StringInput';
import IntegerInputField from '../../components/ContentInputFields/IntegerInput';
import DecimalInputField from '../../components/ContentInputFields/DecimalInput';
import BooleanInputField from '../../components/ContentInputFields/BooleanInput';
import TimestampInputField from '../../components/ContentInputFields/DateInput';
import FileInputField from '../../components/ContentInputFields/FileInput';
import If from '../../components/If';
import { useState } from 'react';
import addContentUtils from '../../utils/addContentUtils';

const AddContent = ({ contentTypeID, contentTypeFields }) => {
  const [inputName, setInputName] = useState('');
  const toast = useToast();
  const FIELDS = {
    string: <StringInputField inputName={inputName} />,
    decimal: <DecimalInputField />,
    integer: <IntegerInputField />,
    float: <IntegerInputField />,
    boolean: <BooleanInputField />,
    timestamp: <TimestampInputField />,
    file: <FileInputField />,
  };

  const onSaveClickHandler = () => {
    addContentUtils.addContent(
      contentTypeID,
      onSuccessResult => {
        toast({
          position: 'bottom-right',
          title: 'Success',
          description: onSuccessResult,
          status: 'success',
          duration: 10000,
          isClosable: true,
        });
      },
      onErrorResult => {
        toast({
          position: 'bottom-right',
          title: 'Error',
          description: onErrorResult,
          status: 'error',
          duration: 10000,
          isClosable: true,
        });
      }
    );
  };
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
      <If test={!contentTypeFields.data}>
        <Spinner />
      </If>
      <If test={!!contentTypeFields.data}>
        {contentTypeFields.data?.map(data => {
          return FIELDS[data.type];
        })}
        <Flex
          direction={'row'}
          justifyContent={'space-evenly'}
          alignItems={'center'}
          wrap={'wrap'}
          gap={2}
          p={5}
          w="100%"
        >
          <Button
            minW={'250px'}
            w='50%'
            size={'md'}
            colorScheme="blue"
            type="button"
            onClick={onSaveClickHandler}
          >
            Save
          </Button>
        </Flex>
      </If>
    </Flex>
  );
};

export default AddContent;
