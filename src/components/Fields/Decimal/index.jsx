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
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberInputStepper,
  Switch,
  Select,
  Button,
  Heading,
  useToast,
} from '@chakra-ui/react';
import decimalFieldValidations from '../../../validations/FieldsValidation/Decimal';
import decimalFieldUtils from '../../../utils/FieldsUtils/decimalFieldsUtils';
const DecimalField = ({ onClose }) => {
  const [columnNameText, setColumnNameText] = useState('');
  const [switchStatus, setSwitchStatus] = useState(false);
  const [selectedSeperator, setSelectedSeperator] = useState();
  const toast = useToast();

  const nameInputHandleOnBlur = (e, field) => {
    field(e);
    let columName = decimalFieldValidations.formatFieldColumName(
      e.target.value
    );
    setColumnNameText(columName);
  };

  const selectOnChangeHandle = e => {
    console.log(e.target.value);
    setSelectedSeperator(e.target.value);
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
      bgColor="whiteAlpha.900"
    >
      <Formik
        initialValues={{
          type: 'decimal',
          name: '',
          description: '',
          column_name: { columnNameText },
          minimum: 0,
          maximum: 0,
          digits: 0,
          decimal: 0,
          seperator: '.',
          prefix: '',
          suffix: '',
        }}
        onSubmit={values => {
          decimalFieldUtils.post(
            values.type,
            values.name,
            values.description,
            switchStatus,
            columnNameText,
            values.digits,
            values.decimal,
            selectedSeperator,
            values.minimum,
            values.maximum,
            values.prefix,
            values.suffix,
            onSuccessMessage => {
              toast({
                position: 'bottom-right',
                title: 'Success',
                description: onSuccessMessage,
                status: 'success',
                duration: 10000,
                isClosable: true,
              });
            },
            onErrorMessage => {
              toast({
                position: 'bottom-right',
                title: 'Error',
                description: onErrorMessage,
                status: 'error',
                duration: 10000,
                isClosable: true,
              });
            }
          );
        }}
      >
        {props => (
          <Form>
            <Heading as={'h3'} size="md" mb={6}>
              Add Field To Content Type
            </Heading>
            <Flex wrap={'wrap'} justifyContent={'space-evenly'}>
              {/* Name Input */}
              <Field
                name="name"
                validate={decimalFieldValidations.validateFieldName}
              >
                {({ field, form }) => (
                  <FormControl
                    w={'40%'}
                    minW={'200px'}
                    isInvalid={form.errors.name && form.touched.name}
                    mb={5}
                  >
                    <FormLabel htmlFor="name">Name</FormLabel>
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
                    w={'40%'}
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

              {/* Is Required Input */}
              <Field name="is_required">
                {({ field, form }) => (
                  <FormControl
                    w={'10%'}
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

              {/* Digits Input */}
              <Field name="digits">
                {({ field, form }) => (
                  <FormControl
                    w={'30%'}
                    minW={'200px'}
                    isInvalid={form.errors.digits && form.touched.digits}
                    mb={5}
                  >
                    <FormLabel htmlFor="digits">Digits</FormLabel>
                    <NumberInput>
                      <NumberInputField {...field} id="digits" name="digits" />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    <FormErrorMessage>{form.errors.digits}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              {/* Decimal input */}
              <Field name="decimal">
                {({ field, form }) => (
                  <FormControl
                    w={'30%'}
                    minW={'200px'}
                    isInvalid={form.errors.decimal && form.touched.decimal}
                    mb={5}
                  >
                    <FormLabel htmlFor="decimal">Decimal</FormLabel>
                    <NumberInput>
                      <NumberInputField
                        {...field}
                        id="decimal"
                        name="decimal"
                      />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>{' '}
                    <FormErrorMessage>{form.errors.decimal}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              {/* Prefix Input */}
              <Field name="prefix">
                {({ field, form }) => (
                  <FormControl
                    w={'30%'}
                    minW={'200px'}
                    isInvalid={form.errors.prefix && form.touched.prefix}
                    mb={5}
                  >
                    <FormLabel htmlFor="prefix">Prefix</FormLabel>
                    <Input
                      {...field}
                      placeholder="$"
                      size="sm"
                      id="prefix"
                      type="text"
                    />
                    <FormErrorMessage>{form.errors.prefix}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              {/* Suffix */}
              <Field name="suffix">
                {({ field, form }) => (
                  <FormControl
                    w={'20%'}
                    minW={'200px'}
                    isInvalid={form.errors.suffix && form.touched.suffix}
                    mb={5}
                  >
                    <FormLabel htmlFor="suffix">Suffix</FormLabel>
                    <Input
                      {...field}
                      placeholder="USD"
                      size="sm"
                      id="suffix"
                      type="text"
                    />
                    <FormErrorMessage>{form.errors.suffix}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              {/* Seperator Input */}
              <Field name="separator">
                {({ field, form }) => (
                  <FormControl
                    w={'20%'}
                    minW={'200px'}
                    isInvalid={form.errors.separator && form.touched.separator}
                    mb={5}
                  >
                    <FormLabel htmlFor="separator">Separator</FormLabel>
                    {/* <Input size="sm" id="separator" type="text" /> */}
                    <Select
                      {...field}
                      onChange={e => selectOnChangeHandle(e)}
                      value={selectedSeperator}
                      size="sm"
                    >
                      <option value=".">.</option>
                      <option value=",">,</option>
                    </Select>
                    <FormErrorMessage>{form.errors.separator}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              {/* Minimum Input */}
              <Field
                name="minimum"
                validate={decimalFieldValidations.validateMinimum}
              >
                {({ field, form }) => (
                  <FormControl
                    w={'30%'}
                    minW={'200px'}
                    isInvalid={form.errors.minimum && form.touched.minimum}
                    mb={5}
                  >
                    <FormLabel htmlFor="minimum">Minimum</FormLabel>
                    <Input {...field} size="sm" id="minimum" type="number" />
                    <FormErrorMessage>{form.errors.minimum}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              {/* Description Input */}
              <Field name="description">
                {({ field, form }) => (
                  <FormControl w={'40%'} minW={'200px'} mb={5}>
                    <FormLabel htmlFor="description">Description</FormLabel>
                    <Textarea
                      {...field}
                      size="sm"
                      id="description"
                      resize={'none'}
                    />
                  </FormControl>
                )}
              </Field>

              {/* Maximum Input */}
              <Field
                name="maximum"
                validate={decimalFieldValidations.validateMaximum}
              >
                {({ field, form }) => (
                  <FormControl
                    w={'30%'}
                    minW={'200px'}
                    isInvalid={form.errors.maximum && form.touched.maximum}
                    mb={5}
                  >
                    <FormLabel htmlFor="maximum">Maximum</FormLabel>
                    <Input {...field} size="sm" id="maximum" type="number" />
                    <FormErrorMessage>{form.errors.maximum}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              {/* Button Part */}
              <Flex justifyContent={'space-evenly'} w={'100%'}>
                <Button w="20%" onClick={onClose} colorScheme="red">
                  Cancel
                </Button>
                <Button w="20%" colorScheme="blue" type="submit">
                  Submit
                </Button>
              </Flex>
            </Flex>
          </Form>
        )}
      </Formik>
    </Flex>
  );
};

export default DecimalField;
