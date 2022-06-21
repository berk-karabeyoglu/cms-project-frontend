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
const StringInputField = () => {
  return (
    <Formik initialValues={{}}>
      {props => (
        <Form>
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
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Input {...field} size="md" id="name" type="name" />
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
          </Flex>
        </Form>
      )}
    </Formik>
  );
};

export default StringInputField;
