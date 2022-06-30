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
  Spacer,
} from '@chakra-ui/react';
import integerFieldValidations from '../../../validations/FieldsValidation/Integer';
import integerFieldUtils from '../../../utils/FieldsUtils/integerFieldsUtils';
import DeleteAlert from '../../AlertDialog';
import { Link } from 'react-router-dom';

const FloatUpdateField = ({ onClose, reFetchFieldsData }) => {
  const [switchStatus, setSwitchStatus] = useState(false);
  const toast = useToast();

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
        initialValues={{}}
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
            <Flex>
              <Heading as={'h4'} size="md" mb={6}>
                Update Float Field
              </Heading>
              <Spacer />
              <DeleteAlert deletedItem={'float field'} />
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
                      fontSize="6xl"
                      {...field}
                      disabled
                      size="md"
                      id="column_name"
                      type="text"
                    >
                      {/* Buraya degerini yazdıracaksın */}
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
                    <Switch
                      onChange={() => setSwitchStatus(!switchStatus)}
                      colorScheme="green"
                      size="lg"
                    />
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
                  <FormControl w={'40%'} minW={'200px'} mb={5}>
                    <FormLabel htmlFor="description">Description</FormLabel>
                    <Textarea
                      placeholder=""
                      size="sm"
                      {...field}
                      id="description"
                      resize={'none'}
                    />
                  </FormControl>
                )}
              </Field>
              <Flex justifyContent={'space-evenly'} w={'100%'}>
                <Button w="100%" colorScheme="red">
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

export default FloatUpdateField;