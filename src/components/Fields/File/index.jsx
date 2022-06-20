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
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useToast,
} from '@chakra-ui/react';
import fileFieldValidations from '../../../validations/FieldsValidation/File';
import fileFieldUtils from '../../../utils/FieldsUtils/fileFieldUtils';
const FileField = ({ onClose }) => {
  const toast = useToast();
  const [columnNameText, setColumnNameText] = useState('');
  const [switchStatus, setSwitchStatus] = useState(false);

  const nameInputHandleOnBlur = (e, field) => {
    field(e);
    let columName = fileFieldValidations.formatFieldColumName(e.target.value);
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
          type: 'file',
          name: '',
          column_name: { columnNameText },
          description: '',
          mimeTypes: '',
          fileAmount: '',
          fileSize: '',
        }}
        onSubmit={values => {
          fileFieldUtils.post(
            values.type,
            values.name,
            values.description,
            values.mimeTypes,
            values.fileAmount,
            values.fileSize,
            columnNameText,
            switchStatus,
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
                validate={fileFieldValidations.validateFieldName}
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
                      {...field}
                      value={columnNameText}
                      size="sm"
                      id="column_name"
                      type="text"
                    />
                    <FormErrorMessage>
                      {form.errors.column_name}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              {/* Allowed File Mimes Input */}
              <Field name="allowed_mimes">
                {({ field, form }) => (
                  <FormControl
                    w={'30%'}
                    minW={'200px'}
                    isInvalid={
                      form.errors.allowed_mimes && form.touched.allowed_mimes
                    }
                    mb={5}
                  >
                    <FormLabel htmlFor="allowed_mimes">Allowed Mimes</FormLabel>
                    <Input
                      {...field}
                      defaultValue={'.jpg.png.pdf'}
                      size="sm"
                      id="allowed_mimes"
                      type=""
                    />

                    <FormErrorMessage>
                      {form.errors.column_name}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              {/* Minimum Input */}
              <Field name="max_size">
                {({ field, form }) => (
                  <FormControl
                    w={'30%'}
                    minW={'200px'}
                    isInvalid={form.errors.max_size && form.touched.max_size}
                    mb={5}
                  >
                    <FormLabel htmlFor="max_size">Max. Size</FormLabel>
                    <Input
                      {...field}
                      defaultValue={2048}
                      size="sm"
                      id="max_size"
                      type=""
                    />
                    <FormErrorMessage>{form.errors.minimum}</FormErrorMessage>
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
                    <NumberInput
                      {...field}
                      defaultValue={1}
                      size={'sm'}
                      min={1}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    <FormErrorMessage>{form.errors.maximum}</FormErrorMessage>
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
                      onChange={() => setSwitchStatus(!switchStatus)}
                    />
                    <FormErrorMessage>
                      {form.errors.is_required}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Flex justifyContent={'space-evenly'} w={'100%'}>
                <Button w="20%" onClick={onClose} colorScheme="red">
                  Cancel
                </Button>
                <Button w="20%" colorScheme="blue" type="submit">
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

export default FileField;
