import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import {
  FormControl,
  FormLabel,
  Input,
  Flex,
  FormErrorMessage,
  Textarea,
  Switch,
  Button,
  Heading,
  Select,
  useToast,
  Text,
} from '@chakra-ui/react';
import timestampFieldValidations from '../../../validations/FieldsValidation/Timestamp';
import timestampFieldUtils from '../../../utils/FieldsUtils/timestampFieldsUtils';
const DateField = ({ onClose }) => {
  const [columnNameText, setColumnNameText] = useState('');
  const [switchStatus, setSwitchStatus] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState();
  const toast = useToast();

  const nameInputHandleOnBlur = (e, field) => {
    field(e);
    let columName = timestampFieldValidations.formatFieldColumName(
      e.target.value
    );
    setColumnNameText(columName);
  };

  const selectOnChangeHandle = e => {
    setSelectedFormat(e.target.value);
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
          type: 'timestamp',
          name: '',
          description: '',
          timestampFormat: '',
          column_name: { columnNameText },
        }}
        onSubmit={values => {
          timestampFieldUtils.post(
            values.type,
            values.name,
            values.description,
            switchStatus,
            columnNameText,
            selectedFormat,
            onSuccessMessage => {
              toast({
                position: 'bottom-right',
                title: 'Success',
                description: onSuccessMessage,
                status: 'success',
                duration: 3000,
                isClosable: true,
              });
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
            <Heading as={'h3'} size="md" mb={6}>
              Manage Field
            </Heading>
            <Flex wrap={'wrap'} justifyContent={'space-evenly'}>
              {/* Name Input */}
              <Field
                name="name"
                validate={timestampFieldValidations.validateFieldName}
              >
                {({ field, form }) => (
                  <FormControl
                    w={'30%'}
                    minW={'200px'}
                    isInvalid={form.errors.name && form.touched.name}
                    mb={5}
                  >
                    <FormLabel htmlFor="name">
                      <Flex>
                        <Text colorScheme="none" color="red">
                          *
                        </Text>
                        Name
                      </Flex>
                    </FormLabel>
                    <Input
                      {...field}
                      onBlur={e => nameInputHandleOnBlur(e, field.onBlur)}
                      size="sm"
                      id="name"
                      type="name"
                    />
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              {/* Column Name Input */}
              <Field name="column_name">
                {({ field, form }) => (
                  <FormControl
                    w={'30%'}
                    minW={'200px'}
                    isInvalid={
                      form.errors.column_name && form.touched.column_name
                    }
                    mb={5}
                  >
                    <FormLabel htmlFor="column_name">Column Name</FormLabel>
                    <Input
                      {...field}
                      value={columnNameText}
                      size="sm"
                      id="column_name"
                      type="text"
                    />
                    <FormErrorMessage>
                      {form.errors.column_name}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              {/* Format Input */}
              <Field name="timestampFormat">
                {({ field, form }) => (
                  <FormControl
                    w={'30%'}
                    minW={'200px'}
                    isInvalid={
                      form.errors.timestampFormat &&
                      form.touched.timestampFormat
                    }
                    mb={5}
                  >
                    <FormLabel htmlFor="timestampFormat">
                      <Flex>
                        <Text colorScheme="none" color="red">
                          *
                        </Text>
                        Format
                      </Flex>
                    </FormLabel>
                    <Select
                      {...field}
                      onChange={e => selectOnChangeHandle(e)}
                      value={selectedFormat}
                      size="sm"
                    >
                      <option>Select a date format</option>
                      <option value="d_m_Y">d-m-Y</option>
                      <option value="m/d/Y">m/d/Y</option>
                      <option value="Y-m-d">Y-m-d</option>
                    </Select>
                    <FormErrorMessage>
                      {form.errors.timestampFormat}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              {/* Is Required Input */}
              <Field name="is_required">
                {({ field, form }) => (
                  <FormControl
                    w={'5%'}
                    minW={'200px'}
                    isInvalid={
                      form.errors.is_required && form.touched.is_required
                    }
                    mb={5}
                  >
                    <FormLabel htmlFor="is_required">Is Required ?</FormLabel>
                    <Switch
                      onChange={() => setSwitchStatus(!switchStatus)}
                      colorScheme="green"
                      size="lg"
                    />
                    <FormErrorMessage>
                      {form.errors.is_required}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              {/* Description Input */}
              <Field name="description">
                {({ field, form }) => (
                  <FormControl w={'65%'} minW={'200px'} mb={5}>
                    <FormLabel htmlFor="description">Description</FormLabel>
                    <Textarea
                      {...field}
                      placeholder=""
                      size="sm"
                      id="description"
                      resize={'none'}
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

export default DateField;
