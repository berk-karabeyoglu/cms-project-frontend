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
  Text,
} from '@chakra-ui/react';
import fileFieldValidations from '../../../validations/FieldsValidation/File';
import fileFieldUtils from '../../../utils/FieldsUtils/fileFieldUtils';
const FileUpdateField = ({ onClose, reFetchFieldsData }) => {
  const toast = useToast();
  const [switchStatus, setSwitchStatus] = useState(false);

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
    >
      <Formik
        initialValues={{
          
        }}
        onSubmit={values => {
          fileFieldUtils.post(
            values.type,
            values.name,
            values.description,
            switchStatus,
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
              reFetchFieldsData();
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
              Update File Field
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
                    <FormLabel htmlFor="name">
                      <Flex>
                        <Text colorScheme="none" color="red">
                          *
                        </Text>
                        Name
                      </Flex>
                    </FormLabel>
                    <Input
                      {...field}
                      size="sm"
                      id="name"
                      type="name"
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
                    <Text
                      fontSize="6xl"
                      {...field}
                      disabled
                      size="md"
                      id="column_name"
                      type="text"
                    >
                      {/* Buraya degerini yazdıracaksın */}
                    </Text>
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
                    <FormLabel htmlFor="fileAmount">
                      <Flex>
                        <Text colorScheme="none" color="red">
                          *
                        </Text>
                        File Amount
                      </Flex>
                    </FormLabel>

                    <Input {...field} />

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
                  Update
                </Button>
              </Flex>
            </Flex>
          </Form>
        )}
      </Formik>
    </Flex>
  );
};

export default FileUpdateField;
