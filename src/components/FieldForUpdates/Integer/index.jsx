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
import integerFieldValidations from '../../../validations/FieldsValidation/Integer';
import integerFieldUtils from '../../../utils/FieldsUtils/integerFieldsUtils';
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import DeleteAlert from '../../AlertDialog';
const IntegerUpdateField = ({ fieldObj }) => {
  const toast = useToast();
  const [switchStatus, setSwitchStatus] = useState(false);
  const [defaultColumnName, setDefaultColumnName] = useState();
  const contentTypeID = useParams().content_type_id;
  const fieldID = useParams().field_id;

  useEffect(() => {
    console.log('Maximum : ', fieldObj.max);
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
        enableReinitialize
        initialValues={{
          type: 'integer',
          name: fieldObj.label,
          description: fieldObj.description,
          column_name: fieldObj.column_name,
          is_required: fieldObj.is_required,
          minimum: fieldObj.min,
          maximum: fieldObj.max,
          prefix: fieldObj.prefix,
          suffix: fieldObj.suffix,
        }}
        onSubmit={values => {
          integerFieldUtils.update(
            values.type,
            values.name,
            values.description,
            switchStatus,
            values.minimum,
            values.maximum,
            values.prefix,
            values.suffix,
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
              <Heading as={'h3'} size="md" mb={6}>
                Update Integer Field
              </Heading>
              <Spacer />
              <DeleteAlert deletedItem={'integer field'} />
            </Flex>
            <Flex wrap={'wrap'} justifyContent={'space-evenly'}>
              {/* Name Input */}
              <Field
                name="name"
                validate={integerFieldValidations.validateFieldName}
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
                    <FormErrorMessage>
                      {form.errors.column_name}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              {/* Prefix Input */}
              <Field name="prefix">
                {({ field, form }) => (
                  <FormControl
                    w={'30%'}
                    minW={'200px'}
                    isInvalid={form.errors.prefix && form.touched.prefix}
                    mb={5}
                  >
                    <FormLabel htmlFor="prefix">Prefix</FormLabel>
                    <Input
                      {...field}
                      size="sm"
                      id="prefix"
                      type="text"
                      placeholder="$"
                    />
                    <FormErrorMessage>{form.errors.prefix}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              {/* Suffix */}
              <Field name="suffix">
                {({ field, form }) => (
                  <FormControl
                    w={'20%'}
                    minW={'200px'}
                    isInvalid={form.errors.suffix && form.touched.suffix}
                    mb={5}
                  >
                    <FormLabel htmlFor="suffix">Suffix</FormLabel>
                    <Input
                      {...field}
                      size="sm"
                      id="suffix"
                      type="text"
                      placeholder="USD"
                    />
                    <FormErrorMessage>{form.errors.suffix}</FormErrorMessage>
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

              {/* Minimum Input */}
              <Field
                name="minimum"
                validate={integerFieldValidations.validateMinimum}
              >
                {({ field, form }) => (
                  <FormControl
                    w={'30%'}
                    minW={'200px'}
                    isInvalid={form.errors.minimum && form.touched.minimum}
                    mb={5}
                  >
                    <FormLabel htmlFor="minimum">Minimum</FormLabel>
                    <Input {...field} size="sm" id="minimum" type="number" />
                    <FormErrorMessage>{form.errors.minimum}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              {/* Maximum Input */}
              <Field
                name="maximum"
                validate={integerFieldValidations.validateMaximum}
              >
                {({ field, form }) => (
                  <FormControl
                    w={'30%'}
                    minW={'200px'}
                    isInvalid={form.errors.maximum && form.touched.maximum}
                    mb={5}
                  >
                    <FormLabel htmlFor="maximum">Maximum</FormLabel>
                    <Input {...field} size="sm" id="maximum" type="number" />
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
                  </FormControl>
                )}
              </Field>

              {/* Button Part */}
              <Flex justifyContent={'space-evenly'} w={'100%'}>
                <Link to={`/admin/content-types/edit/${contentTypeID}`}>
                  <Button w="150%" colorScheme="red">
                    Cancel
                  </Button>
                </Link>
                <Button w="10%" colorScheme="blue" type="submit">
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

export default IntegerUpdateField;
