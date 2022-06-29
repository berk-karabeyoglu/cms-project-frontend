import React, { useEffect, useState } from 'react';
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
  Select,
  useToast,
  Text,
  Checkbox,
  Spacer,
} from '@chakra-ui/react';
import timestampFieldValidations from '../../../validations/FieldsValidation/Timestamp';
import timestampFieldUtils from '../../../utils/FieldsUtils/timestampFieldsUtils';
import { Link, useParams } from 'react-router-dom';
import DeleteAlert from '../../AlertDialog';
const DateUpdateField = ({ fieldObj }) => {
  const [switchStatus, setSwitchStatus] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState();
  const toast = useToast();

  const [defaultColumnName, setDefaultColumnName] = useState();
  const contentTypeID = useParams().content_type_id;
  const fieldID = useParams().field_id;

  useEffect(() => {
    setDefaultColumnName(fieldObj.column_name);
    if (fieldObj.is_required === 1) {
      setSwitchStatus(true);
    } else setSwitchStatus(false);
    console.log(fieldObj);
  }, [fieldObj]);
  const selectOnChangeHandle = e => {
    setSelectedFormat(e.target.value);
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
    >
      <Formik
        initialValues={{
          type: 'timestamp',
          name: fieldObj.label,
          description: fieldObj.description,
          column_name: fieldObj.column_name,
          is_required: fieldObj.is_required,
          format: fieldObj.format,
        }}
        onSubmit={values => {
          timestampFieldUtils.update(
            values.type,
            values.name,
            values.description,
            switchStatus,
            selectedFormat,
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
                Update Date Field
              </Heading>
              <Spacer />
              <DeleteAlert deletedItem={'timestamp field'} />
            </Flex>
            <Flex wrap={'wrap'} justifyContent={'space-evenly'}>
              {/* Name Input */}
              <Field
                name="name"
                validate={timestampFieldValidations.validateFieldName}
              >
                {({ field, form }) => (
                  <FormControl
                    w={'30%'}
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
                    w={'30%'}
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

              {/* Is Required Input */}
              <Field name="is_required">
                {({ field, form }) => (
                  <FormControl
                    w={'5%'}
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

              {/* Format Input */}
              <Field name="timestampFormat">
                {({ field, form }) => (
                  <FormControl
                    w={'30%'}
                    minW={'200px'}
                    isInvalid={
                      form.errors.timestampFormat &&
                      form.touched.timestampFormat
                    }
                    mb={5}
                  >
                    <FormLabel htmlFor="timestampFormat">
                      <Flex>
                        <Text colorScheme="none" color="red">
                          *
                        </Text>
                        Format
                      </Flex>
                    </FormLabel>
                    <Select
                      {...field}
                      onChange={e => selectOnChangeHandle(e)}
                      defaultValue={fieldObj.format}
                      size="sm"
                    >
                      <option>Select a date format</option>
                      <option value="d-m-Y">d-m-Y</option>
                      <option value="m/d/Y">m/d/Y</option>
                      <option value="Y-m-d">Y-m-d</option>
                    </Select>
                    <FormErrorMessage>
                      {form.errors.timestampFormat}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              {/* Description Input */}
              <Field name="description">
                {({ field, form }) => (
                  <FormControl w={'65%'} minW={'200px'} mb={5}>
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

export default DateUpdateField;
