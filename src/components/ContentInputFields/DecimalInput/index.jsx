import { Formik, Form, Field } from 'formik';
import {
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  FormErrorMessage,
} from '@chakra-ui/react';

const DecimalInputField = () => {
  return (
    <Formik initialValues={{}}>
      {props => (
        <Form>
          {/* Name Input */}
          <Field name="numberInput">
            {({ field, form }) => (
              <FormControl
                w={'40%'}
                minW={'250px'}
                isInvalid={form.errors.numberInput && form.touched.numberInput}
                mb={5}
              >
                <FormLabel htmlFor="numberInput">Number</FormLabel>
                <NumberInput defaultValue={15} precision={3} step={0.2}>
                  <NumberInputField {...field}/>
                </NumberInput>
                <FormErrorMessage>{form.errors.number}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
        </Form>
      )}
    </Formik>
  );
};

export default DecimalInputField;
