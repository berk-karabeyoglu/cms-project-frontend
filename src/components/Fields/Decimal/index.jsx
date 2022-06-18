import React from 'react';
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
} from '@chakra-ui/react';

const DecimalField = () => {
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
         
        }}
        onSubmit={values => {}}
      >
        {props => (
          <Form>
            <Heading as={'h3'} size="md" mb={6}>Add Field To Content Type</Heading>
            <Flex wrap={'wrap'} justifyContent={'space-evenly'}>

              {/* Name Input */}
              <Field name="name">
                {({ field, form }) => (
                  <FormControl
                    w={'40%'}
                    minW={'200px'}
                    isInvalid={form.errors.name && form.touched.name}
                    mb={5}
                  >
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <Input size="sm" id="name" type="name" />
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
                    <Input size="sm" id="column_name" type="text" />
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
                    <Switch colorScheme="green" size="lg" />
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
                    <NumberInput min={0} max={9} id="digits">
                      <NumberInputField />
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
                    <NumberInput min={0} max={9}>
                      <NumberInputField />
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
                    <Input size="sm" id="prefix" type="text" />
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
                    <Input size="sm" id="suffix" type="text" />
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
                    <Select size="sm">
                      <option value="dot">.</option>
                      <option value="comma">,</option>
                    </Select>
                    <FormErrorMessage>{form.errors.separator}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              {/* Minimum Input */}
              <Field name="minimum">
                {({ field, form }) => (
                  <FormControl
                    w={'30%'}
                    minW={'200px'}
                    isInvalid={form.errors.minimum && form.touched.minimum}
                    mb={5}
                  >
                    <FormLabel htmlFor="minimum">Minimum</FormLabel>
                    <Input size="sm" id="minimum" type="number" />
                    <FormErrorMessage>{form.errors.minimum}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              {/* Description Input */}
              <Field name="description">
                {({ field, form }) => (
                  <FormControl
                    w={'40%'}
                    minW={'200px'}
                    isInvalid={
                      form.errors.description && form.touched.description
                    }
                    mb={5}
                  >
                    <FormLabel htmlFor="description">Description</FormLabel>
                    <Textarea
                      placeholder=""
                      size="sm"
                      id="description"
                      resize={'none'}
                    />
                    <FormErrorMessage>
                      {form.errors.column_name}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              {/* Maximum Input */}
              <Field name="maximum">
                {({ field, form }) => (
                  <FormControl
                    w={'30%'}
                    minW={'200px'}
                    isInvalid={form.errors.maximum && form.touched.maximum}
                    mb={5}
                  >
                    <FormLabel htmlFor="maximum">Maximum</FormLabel>
                    <Input size="sm" id="maximum" type="number" />
                    <FormErrorMessage>{form.errors.maximum}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              
              {/* Button Part */}
              <Flex justifyContent={'space-evenly'} w={'100%'}>
                <Button w="20%" colorScheme="red" disabled={props.isSubmitting}>
                  Cancel
                </Button>
                <Button
                  w="20%"
                  colorScheme="blue"
                  disabled={props.isSubmitting}
                  type="submit"
                >
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
