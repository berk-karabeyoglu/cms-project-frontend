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
import booleanFieldUtils from '../../../utils/FieldsUtils/booleanFieldUtils';
import booleanFieldValidations from '../../../validations/FieldsValidation/Boolean';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import DeleteAlert from '../../AlertDialog';

const BooleanUpdateField = ({ fieldObj }) => {
  const toast = useToast();
  const [switchStatus, setSwitchStatus] = useState(fieldObj.is_required);
  const [defaultColumnName, setDefaultColumnName] = useState('');
  const contentTypeID = useParams().content_type_id;
  const fieldID = useParams().field_id;

  useEffect(() => {
    console.log(fieldObj.label);
    setDefaultColumnName(fieldObj.column_name);
    if (fieldObj.is_required === 1) {
      setSwitchStatus(true);
    } else setSwitchStatus(false);
  }, [fieldObj]);

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
          type: 'boolean',
          name: fieldObj.label,
          description: fieldObj.description,
          columnName: fieldObj.column_name,
          is_required: fieldObj.is_required,
          onLabel: fieldObj.onLabel,
          offLabel: fieldObj.offLabel,
        }}
        onSubmit={values => {
          booleanFieldUtils.update(
            values.type,
            values.name,
            values.description,
            switchStatus,
            values.onLabel,
            values.offLabel,
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
                Update Boolean Field
              </Heading>
              <Spacer />
              <DeleteAlert deletedItem={'boolean field'} />
            </Flex>
            <Flex wrap={'wrap'} justifyContent={'space-evenly'}>
              {/* Name Input */}
              <Field
                name="name"
                validate={booleanFieldValidations.validateFieldName}
              >
                {({ field, form }) => (
                  <FormControl
                    w={'40%'}
                    minW={'250px'}
                    isInvalid={form.errors.name && form.touched.name}
                    mb={5}
                  >
                    <FormLabel htmlFor="name">
                      <Flex>
                        <Text color="red">*</Text>Name
                      </Flex>
                    </FormLabel>
                    <Input {...field} size="md" id="name" type="name" />
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              {/* Column Name Input */}
              <Field name="columnName">
                {({ field, form }) => (
                  <FormControl
                    w={'40%'}
                    minW={'200px'}
                    isInvalid={
                      form.errors.columnName && form.touched.columnName
                    }
                    mb={5}
                  >
                    <FormLabel htmlFor="columnName">Column Name</FormLabel>
                    <Text
                      fontSize="lg"
                      {...field}
                      size="md"
                      id="column_name"
                      type="text"
                    >
                      {defaultColumnName}
                    </Text>
                    <FormErrorMessage>
                      {form.errors.columnName}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              {/* On Input */}
              <Field name="onLabel">
                {({ field, form }) => (
                  <FormControl
                    w={'30%'}
                    minW={'200px'}
                    isInvalid={form.errors.onLabel && form.touched.onLabel}
                    mb={5}
                  >
                    <FormLabel htmlFor="onLabel">
                      <Flex>
                        <Text colorScheme="none" color="red">
                          *
                        </Text>
                        On label
                      </Flex>
                    </FormLabel>
                    <Input size="sm" id="onLabel" type="text" {...field} />
                    <FormErrorMessage>{form.errors.onLabel}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              {/* Off Input */}
              <Field name="offLabel">
                {({ field, form }) => (
                  <FormControl
                    w={'20%'}
                    minW={'200px'}
                    isInvalid={form.errors.offLabel && form.touched.offLabel}
                    mb={5}
                  >
                    <FormLabel htmlFor="offLabel">
                      <Flex>
                        <Text colorScheme="none" color="red">
                          *
                        </Text>
                        Off label
                      </Flex>
                    </FormLabel>
                    <Input size="sm" id="offLabel" type="text" {...field} />
                    <FormErrorMessage>{form.errors.offLabel}</FormErrorMessage>
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
                    <Checkbox
                      {...field}
                      colorScheme="green"
                      id="is_require"
                      size="lg"
                      isChecked={switchStatus}
                      onChange={e => setSwitchStatus(e.target.checked)}
                    ></Checkbox>
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

export default BooleanUpdateField;
