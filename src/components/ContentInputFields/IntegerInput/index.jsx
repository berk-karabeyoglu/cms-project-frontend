import React from 'react';
import { Formik, Form, Field } from 'formik';
import {
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormErrorMessage,
} from '@chakra-ui/react';
const IntegerInputField = () => {
  return (
    <Formik initialValues={{}}>
      {props => (
        <Form>
          {/* Name Input */}
          <Field name="number">
            {({ field, form }) => (
              <FormControl
                w={'40%'}
                minW={'250px'}
                isInvalid={form.errors.number && form.touched.number}
                mb={5}
              >
                <FormLabel htmlFor="number">Number</FormLabel>
                <NumberInput
                  defaultValue={15}
                  max={30}
                  clampValueOnBlur={false}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>{' '}
                <FormErrorMessage>{form.errors.number}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
        </Form>
      )}
    </Formik>
  );
};

export default IntegerInputField;
