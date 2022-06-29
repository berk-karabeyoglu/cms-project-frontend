import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import {
  FormControl,
  FormLabel,
  Input,
  Flex,
  FormErrorMessage,
  Textarea,
  Button,
  Heading,
  useToast,
  Text,
  Checkbox,
  Spacer,
} from '@chakra-ui/react';
import fileFieldValidations from '../../../validations/FieldsValidation/File';
import fileFieldUtils from '../../../utils/FieldsUtils/fileFieldUtils';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import DeleteAlert from '../../AlertDialog';
const FileUpdateField = ({ fieldObj }) => {
  const toast = useToast();
  const [switchStatus, setSwitchStatus] = useState(false);
  const [incomingMimeTypes, setMimeTypes] = useState('');
  const [defaultColumnName, setDefaultColumnName] = useState();
  const contentTypeID = useParams().content_type_id;
  const fieldID = useParams().field_id;

  useEffect(() => {
    setDefaultColumnName(fieldObj.column_name);
    if (fieldObj.is_required === 1) {
      setSwitchStatus(true);
    } else setSwitchStatus(false);
    console.log(fieldObj);
    if (fieldObj !== undefined) {
      fieldObj.mimeTypes.map(mime => {
        setMimeTypes(mime);
      });
      console.log(incomingMimeTypes);
    }
  }, [fieldObj, incomingMimeTypes]);
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
          type: 'file',
          name: fieldObj.label,
          description: fieldObj.description,
          column_name: fieldObj.column_name,
          is_required: fieldObj.is_required,
          fileAmount: fieldObj.fileAmount,
          fileSize: fieldObj.fileSize,
          mime_types: incomingMimeTypes,
        }}
        onSubmit={values => {
          fileFieldUtils.update(
            values.type,
            values.name,
            values.description,
            switchStatus,
            values.mimeTypes,
            values.fileAmount,
            values.fileSize,
            contentTypeID,
            fieldID,
            onSuccessMessage => {
              toast({
                position: 'bottom-right',
                title: 'Success',
                description: onSuccessMessage,
                status: 'success',
                duration: 3000,
                isClosable: true,
              });
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
            <Flex>
              <Heading as={'h4'} size="md" mb={6}>
                Update File Field
              </Heading>
              <Spacer />
              <DeleteAlert deletedItem={'file field'} />
            </Flex>
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
                    <Input {...field} size="sm" id="name" type="name" />
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
                      fontSize="lg"
                      {...field}
                      disabled
                      size="md"
                      id="column_name"
                      type="text"
                    >
                      {defaultColumnName}
                    </Text>
                    <FormErrorMessage>{form.errors.columName}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              {/* Allowed File Mimes Input */}
              <Field name="mime_types">
                {({ field, form }) => (
                  <FormControl
                    w={'30%'}
                    minW={'200px'}
                    isInvalid={
                      form.errors.mime_types && form.touched.mime_types
                    }
                    mb={5}
                  >
                    <FormLabel htmlFor="mime_types">Allowed Mimes</FormLabel>
                    <Input {...field} size="sm" id="mime_types" type="text" />

                    <FormErrorMessage>
                      {form.errors.mime_types}
                    </FormErrorMessage>
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
                    <Checkbox
                      {...field}
                      colorScheme="green"
                      id="is_require"
                      size="lg"
                      isChecked={switchStatus}
                      onChange={e => setSwitchStatus(e.target.checked)}
                    ></Checkbox>
                    <FormErrorMessage>{form.errors.required}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Flex justifyContent={'space-evenly'} w={'100%'}>
                <Link
                  w={'20%'}
                  to={`/admin/content-types/edit/${contentTypeID}`}
                >
                  <Button w="100%" colorScheme="red">
                    Cancel
                  </Button>
                </Link>
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
