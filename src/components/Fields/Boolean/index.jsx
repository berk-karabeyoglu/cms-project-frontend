import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import {
  FormControl,
  FormLabel,
  Input,
  Flex,
  FormErrorMessage,
  Textarea,
  Switch,
  Button,
  Heading,
  useToast,
} from '@chakra-ui/react';
import stringFieldValidations from '../../../validations/FieldsValidation/String';
import booleanFieldUtils from '../../../utils/FieldsUtils/booleanFieldUtils';
import booleanFieldValidations from '../../../validations/FieldsValidation/Boolean';

const BooleanField = ({ onClose }) => {
  const toast = useToast();
  const [columnNameText, setColumnNameText] = useState('');
  const [switchStatus, setSwitchStatus] = useState(false);

  const nameInputHandleOnBlur = (e, field) => {
    field(e);
    let columName = booleanFieldValidations.formatFieldColumName(
      e.target.value
    );
    setColumnNameText(columName);
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
          type: 'boolean',
          name: '',
          column_name: { columnNameText },
          description: '',
          onLabel: '',
          offLabel: '',
        }}
        onSubmit={values => {
          booleanFieldUtils.post(
            values.type,
            values.name,
            values.description,
            columnNameText,
            switchStatus,
            values.onLabel,
            values.offLabel,
            onSuccessMessage => {
              toast({
                position: 'bottom-right',
                title: 'Success',
                description: onSuccessMessage,
                status: 'success',
                duration: 10000,
                isClosable: true,
              });
              onClose();
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
              Add Field
            </Heading>
            <Flex wrap={'wrap'} justifyContent={'space-evenly'}>
              {/* Name Input */}
              <Field
                name="name"
                validate={booleanFieldValidations.validateFieldName}
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
                      size="sm"
                      id="name"
                      type="name"
                      onBlur={e => nameInputHandleOnBlur(e, field.onBlur)}
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
                      size="sm"
                      id="column_name"
                      type="text"
                      {...field}
                      value={columnNameText}
                    />
                    <FormErrorMessage>
                      {form.errors.column_name}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              {/* On Input */}
              <Field name="on">
                {({ field, form }) => (
                  <FormControl
                    w={'30%'}
                    minW={'200px'}
                    isInvalid={form.errors.on && form.touched.on}
                    mb={5}
                  >
                    <FormLabel htmlFor="on">"On" label</FormLabel>
                    <Input size="sm" id="on" type="text" {...field} />
                    <FormErrorMessage>{form.errors.on}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              {/* Off Input */}
              <Field name="off">
                {({ field, form }) => (
                  <FormControl
                    w={'20%'}
                    minW={'200px'}
                    isInvalid={form.errors.off && form.touched.off}
                    mb={5}
                  >
                    <FormLabel htmlFor="off">"Off" label</FormLabel>
                    <Input size="sm" id="off" type="text" {...field} />
                    <FormErrorMessage>{form.errors.off}</FormErrorMessage>
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
                      colorScheme="green"
                      size="lg"
                      name="is_require"
                      onChange={() => setSwitchStatus(!switchStatus)}
                    />
                    <FormErrorMessage>
                      {form.errors.is_required}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              {/* Description Input */}
              <Field name="description">
                {({ field, form }) => (
                  <FormControl
                    w={'90%'}
                    minW={'200px'}
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
                      id="description"
                      resize={'none'}
                    />
                    <FormErrorMessage>
                      {form.errors.column_name}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              {/* Buttons Part */}
              <Flex justifyContent={'space-evenly'} w={'100%'}>
                <Button w="20%" onClick={onClose} colorScheme="red">
                  Cancel
                </Button>
                <Button w="20%" colorScheme="blue" type="submit">
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

export default BooleanField;
