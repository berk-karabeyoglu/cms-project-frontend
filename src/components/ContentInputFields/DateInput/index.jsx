import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
const TimestampInputField = () => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <Formik
      initialValues={{
        timestampInput: 0,
      }}
    >
      {props => (
        <Form>
          {/* Name Input */}
          <Field name="timestampInput">
            {({ field, form }) => (
              <FormControl
                w={'40%'}
                minW={'250px'}
                isInvalid={
                  form.errors.timestampInput && form.touched.timestampInput
                }
                mb={5}
              >
                <FormLabel htmlFor="timestampInput">Date</FormLabel>
                <DatePicker
                  dateFormat="dd-MM-yyyy"
                  selected={startDate}
                  onChange={date => setStartDate(date)}
                  isClearable
                  placeholderText="I have been cleared!"
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

export default TimestampInputField;
