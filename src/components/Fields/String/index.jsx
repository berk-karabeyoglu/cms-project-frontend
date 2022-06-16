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
  Button,
} from '@chakra-ui/react';
const StringField = () => {
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
          contentTypeName: '',
          description: '',
          modalNameText: '',
        }}
        onSubmit={values => {}}
      >
        {props => (
          <Form>
            <Flex wrap={'wrap'} minW={'250px'} justifyContent={'space-evenly'}>
              <Field name="name">
                {({ field, form }) => (
                  <FormControl
                    w={'40%'}
                    minW={'250px'}
                    isInvalid={form.errors.name && form.touched.name}
                    mb={5}
                  >
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <Input size="md" id="name" type="name" />
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

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
                    <Input size="md" id="column_name" type="text" />
                    <FormErrorMessage>
                      {form.errors.column_name}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="description">
                {({ field, form }) => (
                  <FormControl
                    w={'40%'}
                    minW={'250px'}
                    isInvalid={
                      form.errors.description && form.touched.description
                    }
                    mb={5}
                  >
                    <FormLabel htmlFor="description">Description</FormLabel>
                    <Textarea
                      {...field}
                      placeholder=""
                      size="sm"
                      resize={'none'}
                    />
                    <FormErrorMessage>
                      {form.errors.description}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="length">
                {({ field, form }) => (
                  <FormControl
                    w={'40%'}
                    minW={'250px'}
                    isInvalid={form.errors.length && form.touched.length}
                    mb={5}
                  >
                    <FormLabel htmlFor="length">Length</FormLabel>
                    <NumberInput defaultValue={15} min={10} max={20}>
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    <FormErrorMessage>{form.errors.length}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="is_required">
                {({ field, form }) => (
                  <FormControl
                    minW={'250px'}
                    display={'flex'}
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
