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
      // bgColor="whiteAlpha.900"
    >
      <Formik
        initialValues={{
          type: 'file',
          name: '',
          description: '',
          columName: '',
          mimeTypes: '.jpg.png.pdf',
          fileAmount: 1,
          fileSize: 2048,
        }}
        onSubmit={values => {
          fileFieldUtils.post(
            values.type,
            values.name,
            values.description,
            switchStatus,
            columnNameText,
            values.mimeTypes,
            values.fileAmount,
            values.fileSize,
            onSuccessMessage => {
              toast({
                position: 'bottom-right',
                title: 'Success',
                description: onSuccessMessage,
                status: 'success',
                duration: 3000,
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
                duration: 3000,
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
              <Field name="columName">
                {({ field, form }) => (
                  <FormControl
                    w={'40%'}
                    minW={'200px'}
                    isInvalid={form.errors.columName && form.touched.columName}
                    mb={5}
                  >
                    <FormLabel htmlFor="columName">Column Name</FormLabel>
                    <Input
                      {...field}
                      value={columnNameText}
                      size="sm"
                      id="columName"
                      type="text"
                    />
                    <FormErrorMessage>{form.errors.columName}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              {/* Allowed File Mimes Input */}
              <Field name="mimeTypes">
                {({ field, form }) => (
                  <FormControl
                    w={'30%'}
                    minW={'200px'}
                    isInvalid={form.errors.mimeTypes && form.touched.mimeTypes}
                    mb={5}
                  >
                    <FormLabel htmlFor="mimeTypes">Allowed Mimes</FormLabel>
                    <Input {...field} size="sm" id="mimeTypes" type="text" />

                    <FormErrorMessage>{form.errors.mimeTypes}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              {/* Max File Size Input */}
              <Field name="fileSize">
                {({ field, form }) => (
                  <FormControl
                    w={'30%'}
                    minW={'200px'}
                    isInvalid={form.errors.fileSize && form.touched.fileSize}
                    mb={5}
                  >
                    <FormLabel htmlFor="fileSize">Max. Size</FormLabel>
                    <Input {...field} size="sm" id="fileSize" type="" />
                    <FormErrorMessage>{form.errors.minimum}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              {/* File Amount Input */}
              <Field name="fileAmount">
                {({ field, form }) => (
                  <FormControl
                    w={'30%'}
                    minW={'200px'}
                    isInvalid={
                      form.errors.fileAmount && form.touched.fileAmount
                    }
                    mb={5}
                  >
                    <FormLabel htmlFor="fileAmount">File Amount</FormLabel>

                    <Input {...field} placeholder="1" />

                    <FormErrorMessage>
                      {form.errors.fileAmount}
                    </FormErrorMessage>
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
                      {form.errors.description}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              {/* Is Required Input */}
              <Field name="required">
                {({ field, form }) => (
                  <FormControl
                    w={'10%'}
                    minW={'200px'}
                    isInvalid={form.errors.required && form.touched.required}
                    mb={5}
                  >
                    <FormLabel htmlFor="required">Is Required ?</FormLabel>
                    <Switch
                      colorScheme="green"
                      size="lg"
                      onChange={() => setSwitchStatus(!switchStatus)}
                    />
                    <FormErrorMessage>{form.errors.required}</FormErrorMessage>
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