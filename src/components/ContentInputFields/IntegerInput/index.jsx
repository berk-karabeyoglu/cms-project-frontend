import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
} from '@chakra-ui/react';
import integerFieldValidations from '../../../validations/FieldsValidation/Integer';
const IntegerInputField = () => {

  return (
    <Formik
      initialValues={{
        numberInput: 0,
      }}
    >
      {props => (
        <Form>
          {/* Name Input */}
          <Field
            name="numberInput"
            validate={integerFieldValidations.possibleMaximumValue}
          >
            {({ field, form }) => (
              <FormControl
                w={'40%'}
                minW={'250px'}
                isInvalid={form.errors.numberInput && form.touched.numberInput}
                mb={5}
              >
                <FormLabel htmlFor="numberInput">Number</FormLabel>
                <Input
                  {...field}
                  id="numberInput"
                  type="number"
                />
                <FormErrorMessage>{form.errors.numberInput}</FormErrorMessage>
              </FormControl>
            )}
          </Field>{' '}
        </Form>
      )}
    </Formik>
  );
};

export default IntegerInputField;
