import React from 'react';
import { Formik, Form, Field } from 'formik';
import {
  FormControl,
  FormLabel,
  Flex,
  FormErrorMessage,
  Button,
  Heading,
  Select,
  Box,
} from '@chakra-ui/react';
import { useState } from 'react';
import If from '../../If';
import StringField from '../String';
import IntegerField from '../Integer';
import DecimalField from '../Decimal';
import FloatField from '../Float';
import BooleanField from '../Boolean';
import DateField from '../Date';
import FileField from '../File';

const AddField = () => {
  const [selectedFieldType, setSelectedFieldType] = useState();
  const FIELD_TYPES = {
    string: (
      <StringField
        onClose={() => {
          setSelectedFieldType(undefined);
        }}
      />
    ),
    decimal: (
      <DecimalField
        onClose={() => {
          setSelectedFieldType(undefined);
        }}
      />
    ),
    boolean: (
      <BooleanField
        onClose={() => {
          setSelectedFieldType(undefined);
        }}
      />
    ),
    float: (
      <FloatField
        onClose={() => {
          setSelectedFieldType(undefined);
        }}
      />
    ),
    integer: (
      <IntegerField
        onClose={() => {
          setSelectedFieldType(undefined);
        }}
      />
    ),
    dateField: (
      <DateField
        onClose={() => {
          setSelectedFieldType(undefined);
        }}
      />
    ),
    fileField: (
      <FileField
        onClose={() => {
          setSelectedFieldType(undefined);
        }}
      />
    ),
  };

  return (
    <>
      <If test={!selectedFieldType}>
        <Box
          alignItems="center"
          height="8rem"
          w="100%"
          wrap={'wrap'}
          h={'auto'}
          direction={'row'}
          p={6}
          justifyContent={'space-around'}
          // bgColor="whiteAlpha.900"
        >
          <Formik
            initialValues={{
              field_type: 'string',
            }}
            onSubmit={values => {
              setSelectedFieldType(values.field_type);
            }}
          >
            {props => (
              <Form w="100%">
                <Heading as={'h4'} size="md" mb={6}>
                  Add Field
                </Heading>
                {/* Name Input */}
                <Field name="field_type">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={
                        form.errors.field_type && form.touched.field_type
                      }
                      mb={5}
                    >
                      <FormLabel htmlFor="field_type">Field Type</FormLabel>
                      <Select
                        onChange={field.onChange}
                        name="field_type"
                        id="field_type"
                        size="md"
                        w={'100%'}
                      >
                        <option value="string">Text (string)</option>
                        <option value="decimal">Number (decimal)</option>
                        <option value="boolean">Boolean</option>
                        <option value="float">Number (float)</option>
                        <option value="integer">Number (integer)</option>
                        <option value="dateField">Date Field</option>
                        <option value="fileField">File Field</option>
                      </Select>
                      <FormErrorMessage>
                        {form.errors.field_type}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Flex justifyContent={'center'}>
                  <Button
                    w="50%"
                    alignItems={'center'}
                    colorScheme="blue"
                    type="submit"
                  >
                    Add Field Type
                  </Button>
                </Flex>
              </Form>
            )}
          </Formik>
        </Box>
      </If>
      <If test={!!selectedFieldType}>{FIELD_TYPES[selectedFieldType]}</If>
    </>
  );
};

export default AddField;
