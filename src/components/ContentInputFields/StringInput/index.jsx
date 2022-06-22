import React from 'react';
import { Formik, Form, Field } from 'formik';
import {
  FormControl,
  FormLabel,
  Input,
  Flex,
  FormErrorMessage,
} from '@chakra-ui/react';
import stringFieldValidations from '../../../validations/FieldsValidation/String';
const StringInputField = ({ inputName }) => {
  return (
    <Formik initialValues={{}}>
      {props => (
        <Form>
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
                <FormLabel htmlFor="name">{inputName}</FormLabel>
                <Input {...field} size="md" id="name" type="text" />
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
        </Form>
      )}
    </Formik>
  );
};

export default StringInputField;
