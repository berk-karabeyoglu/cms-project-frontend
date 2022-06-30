import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import {
  FormControl,
  FormLabel,
  Input,
  Flex,
  FormErrorMessage,
  Textarea,
  Checkbox,
  Button,
  Heading,
  useToast,
  Text,
  Spacer,
} from '@chakra-ui/react';
import stringFieldValidations from '../../../validations/FieldsValidation/String';
import stringFieldsUtils from '../../../utils/FieldsUtils/stringFieldsUtils';
import DeleteAlert from '../../AlertDialog';
import If from '../../If';
const StringUpdateField = ({ fieldObj }) => {
  const toast = useToast();
  const [switchStatus, setSwitchStatus] = useState(true);
  const [defaultColumnName, setDefaultColumnName] = useState();
  const contentTypeID = useParams().content_type_id;
  const fieldID = useParams().field_id;

  useEffect(() => {
    setDefaultColumnName(fieldObj.column_name);
    if (fieldObj.is_required === 1) {
      setSwitchStatus(true);
    } else setSwitchStatus(false);
  }, [fieldObj]);

  return (
    <Flex
      alignItems="center"
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
          type: 'string',
          name: fieldObj.label,
          description: fieldObj.description,
          column_name: fieldObj.column_name,
          is_required: fieldObj.is_required,
          length: fieldObj.length,
        }}
        onSubmit={values => {
          stringFieldsUtils.update(
            values.type,
            values.name,
            values.description,
            values.length,
            switchStatus,
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
                Update Text Field
              </Heading>
              <Spacer />
              <If test={fieldObj.column_name !== 'title'}>
                <DeleteAlert deletedItem={'string field'} />
              </If>
            </Flex>
            <Flex wrap={'wrap'} minW={'250px'} justifyContent={'space-evenly'}>
              {/* Name Input */}
              <Field
                name="name"
                validate={stringFieldValidations.validateFieldName}
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
                    <Input {...field} size="md" id="name" type="text" />
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              {/* Column Name Input */}
              <Field name="column_name">
                {({ field, form }) => (
                  <FormControl
                    w={'40%'}
                    minW={'250px'}
                    isInvalid={
                      form.errors.column_name && form.touched.column_name
                    }
                    mb={5}
                  >
                    <FormLabel htmlFor="column_name">Column Name</FormLabel>
                    <Text
                      fontSize="lg"
                      {...field}
                      size="md"
                      name="column_name"
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

              {/* Description Input */}
              <Field name="description">
                {({ field, form }) => (
                  <FormControl w={'40%'} minW={'250px'} mb={5}>
                    <FormLabel htmlFor="description">Description</FormLabel>
                    <Textarea
                      {...field}
                      placeholder=""
                      size="sm"
                      resize={'none'}
                    />
                  </FormControl>
                )}
              </Field>

              {/* Length Input */}
              <Field
                name="length"
                validate={stringFieldValidations.validateFieldLength}
              >
                {({ field, form }) => (
                  <FormControl
                    w={'40%'}
                    minW={'250px'}
                    isInvalid={form.errors.length && form.touched.length}
                    mb={5}
                  >
                    <FormLabel htmlFor="length">
                      <Flex>
                        <Text color="red">*</Text>
                        Length
                      </Flex>
                    </FormLabel>

                    <Input
                      {...field}
                      id="length"
                      type={'number'}
                      name="length"
                    />

                    <FormErrorMessage>{form.errors.length}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              {/* Is Required Input */}
              <Field name="is_required">
                {({ field, form }) => (
                  <FormControl minW={'250px'} display={'flex'} mb={5}>
                    <FormLabel htmlFor="is_required">Is Required ?</FormLabel>

                    <Checkbox
                      {...field}
                      colorScheme="green"
                      id="is_require"
                      size="lg"
                      isChecked={switchStatus}
                      onChange={e => setSwitchStatus(e.target.checked)}
                    ></Checkbox>
                  </FormControl>
                )}
              </Field>

              {/* Button Part */}
              <Flex justifyContent={'space-evenly'} w={'100%'}>
                <Link
                  w={'20%'}
                  to={`/admin/content-types/edit/${contentTypeID}`}
                >
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

export default StringUpdateField;
