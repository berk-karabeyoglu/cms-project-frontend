import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import {
  FormControl,
  FormLabel,
  Input,
  Flex,
  FormErrorMessage,
  Textarea,
  NumberInput,
  NumberInputField,
  Switch,
  Button,
  Heading,
  useToast,
  Text,
} from '@chakra-ui/react';
import stringFieldValidations from '../../../validations/FieldsValidation/String';
import stringFieldsUtils from '../../../utils/FieldsUtils/stringFieldsUtils';
const StringField = ({ onClose }) => {
  const toast = useToast();
  const [columnNameText, setColumnNameText] = useState('');
  const [switchStatus, setSwitchStatus] = useState(false);

  const nameInputHandleOnBlur = (e, field) => {
    field(e);
    let columName = stringFieldValidations.formatFieldColumName(e.target.value);
    setColumnNameText(columName);
  };

  return (
    <Flex
      alignItems="center"
      height="8rem"
      w="100%"
      wrap={'wrap'}
      h={'auto'}
      direction={'row'}
      p={6}
      justifyContent={'space-around'}
    >
      <Formik
        initialValues={{
          type: 'string',
          name: '',
          column_name: { columnNameText },
          description: '',
          length: '',
        }}
        onSubmit={values => {
          stringFieldsUtils.post(
            values.type,
            values.name,
            values.description,
            columnNameText,
            values.length,
            switchStatus,
            onSuccessMessage => {
              toast({
                position: 'bottom-right',
                title: 'Success',
                description: onSuccessMessage,
                status: 'success',
                duration: 3000,
                isClosable: true,
              });
              onClose();
            },
            onErrorMessage => {
              toast({
                position: 'bottom-right',
                title: 'Error',
                description: onErrorMessage,
                status: 'error',
                duration: 3000,
                isClosable: true,
              });
            }
          );
        }}
      >
        {props => (
          <Form>
            <Heading as={'h4'} size="md" mb={6}>
              Add Text Field
            </Heading>
            <Flex wrap={'wrap'} minW={'250px'} justifyContent={'space-evenly'}>
              {/* Name Input */}
              <Field
                name="name"
                validate={stringFieldValidations.validateFieldName}
              >
                {({ field, form }) => (
                  <FormControl
                    w={'40%'}
                    minW={'250px'}
                    isInvalid={form.errors.name && form.touched.name}
                    mb={5}
                  >
                    <FormLabel htmlFor="name">
                      <Flex>
                        <Text color="red">*</Text>Name
                      </Flex>
                    </FormLabel>
                    <Input
                      {...field}
                      size="md"
                      id="name"
                      type="name"
                      onBlur={e => nameInputHandleOnBlur(e, field.onBlur)}
                    />
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              {/* Column Name Input */}
              <Field name="column_name">
                {({ field, form }) => (
                  <FormControl
                    w={'40%'}
                    minW={'250px'}
                    isInvalid={
                      form.errors.column_name && form.touched.column_name
                    }
                    mb={5}
                  >
                    <FormLabel htmlFor="column_name">Column Name</FormLabel>
                    <Input
                      {...field}
                      value={columnNameText}
                      size="md"
                      id="column_name"
                      type="text"
                    />
                    <FormErrorMessage>
                      {form.errors.column_name}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              {/* Description Input */}
              <Field name="description">
                {({ field, form }) => (
                  <FormControl w={'40%'} minW={'250px'} mb={5}>
                    <FormLabel htmlFor="description">Description</FormLabel>
                    <Textarea
                      {...field}
                      placeholder=""
                      size="sm"
                      resize={'none'}
                    />
                  </FormControl>
                )}
              </Field>

              {/* Length Input */}
              <Field
                name="length"
                validate={stringFieldValidations.validateFieldLength}
              >
                {({ field, form }) => (
                  <FormControl
                    w={'40%'}
                    minW={'250px'}
                    isInvalid={form.errors.length && form.touched.length}
                    mb={5}
                  >
                    <FormLabel htmlFor="length">
                      <Flex>
                        <Text color="red">*</Text>
                        Length
                      </Flex>
                    </FormLabel>
                    <NumberInput>
                      <NumberInputField {...field} id="length" name="length" />
                    </NumberInput>
                    <FormErrorMessage>{form.errors.length}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              {/* Is Required Input */}
              <Field name="is_required">
                {({ field, form }) => (
                  <FormControl minW={'250px'} display={'flex'} mb={5}>
                    <FormLabel htmlFor="is_required">Is Required ?</FormLabel>
                    <Switch
                      colorScheme="green"
                      id="is_require"
                      name="is_require"
                      size="lg"
                      onChange={() => setSwitchStatus(!switchStatus)}
                    />
                  </FormControl>
                )}
              </Field>

              {/* Button Part */}
              <Flex justifyContent={'space-evenly'} w={'100%'}>
                <Button w="20%" onClick={onClose} colorScheme="red">
                  Cancel
                </Button>
                <Button w="20%" colorScheme="blue" type="submit">
                  Save
                </Button>
              </Flex>
            </Flex>
          </Form>
        )}
      </Formik>
    </Flex>
  );
};

export default StringField;
