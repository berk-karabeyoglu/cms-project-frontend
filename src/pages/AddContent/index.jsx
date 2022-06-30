import { React, useState } from 'react';
import {
  Button,
  Flex,
  Spinner,
  useToast,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Checkbox,
  Input,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import StringInputField from '../../components/ContentInputFields/StringInput';
import IntegerInputField from '../../components/ContentInputFields/IntegerInput';
import DecimalInputField from '../../components/ContentInputFields/DecimalInput';
import BooleanInputField from '../../components/ContentInputFields/BooleanInput';
import TimestampInputField from '../../components/ContentInputFields/DateInput';
import FileInputField from '../../components/ContentInputFields/FileInput';
import HTMLInputField from '../../components/ContentInputFields/HtmlInput';
import If from '../../components/If';
import addContentUtils from '../../utils/addContentUtils';

const AddContent = ({ contentTypeID, contentTypeFields }) => {
  const toast = useToast();

  const [checkboxStatus, setCheckBoxStatus] = useState(true);

  const getFields = (field, type) => {
    if (type === 'string') return <StringInputField field={field} />;
    if (type === 'decimal') return <DecimalInputField field={field} />;
    if (type === 'integer') return <IntegerInputField field={field} />;
    if (type === 'float') return <IntegerInputField field={field} />;
    if (type === 'boolean') return <BooleanInputField field={field} />;
    if (type === 'timestamp') return <TimestampInputField field={field} />;
    if (type === 'file') return <FileInputField field={field} />;
    if (type === 'html') return <StringInputField field={field} />;
  };

  const generateInitialValues = () => {
    let initialValues = {};
    contentTypeFields.data?.forEach(element => {
      if (element.type === 'boolean') {
        initialValues[element.column_name] = true;
      } else if (element.type === 'file') {
        initialValues[element.column_name] = [];
      } else {
        initialValues[element.column_name] = '';
      }
    });
    return initialValues;
  };

  const validateFieldName = (column_name, value) => {
    const errors = {};
    if (!value) {
      errors[column_name] = 'Field ' + column_name + ' is required';
    }
    return errors[column_name];
  };

  const checkboxClickHandler = e => {
    setCheckBoxStatus(e.target.checked);
  };

  return (
    <Flex
      alignItems="center"
      justifyContent="space-evenly"
      w="100%"
      h={'auto'}
      gap={3}
      direction={'column'}
      p={6}
    >
      <If test={!contentTypeFields.data}>
        <Spinner />
      </If>
      <If test={!!contentTypeFields.data}>
        <Formik
          initialValues={generateInitialValues()}
          onSubmit={values => {
            if (checkboxStatus === true) {
              values['publish'] = checkboxStatus;
            } else {
              delete values.publish;
            }
            console.log('giden valuelar:', values);
            addContentUtils.addContent(
              values,
              contentTypeID,
              onSuccessResult => {
                toast({
                  position: 'bottom-right',
                  title: 'Success',
                  description: onSuccessResult,
                  status: 'success',
                  duration: 3000,
                  isClosable: true,
                });
                setTimeout(() => {
                  window.location.reload(false);
                }, 2000);
              },
              onErrorResult => {
                toast({
                  position: 'bottom-right',
                  title: 'Error',
                  description: onErrorResult,
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
              {/* Name Input */}
              {contentTypeFields.data?.map(data => {
                return (
                  <>
                    <Field
                      name={data.column_name}
                      validate={e => {
                        if (data.is_required) {
                          return validateFieldName(data.column_name, e);
                        }
                      }}
                    >
                      {({ field, form }) => (
                        <FormControl
                          key={data.id}
                          w={'40%'}
                          minW={'250px'}
                          isInvalid={
                            form.errors[data.column_name] &&
                            form.touched[data.column_name]
                          }
                          isRequired={data.is_required}
                          mb={5}
                        >
                          <FormLabel>{data.label}</FormLabel>
                          {getFields({ ...field }, data.type)}
                          <FormErrorMessage>
                            {form.errors[data.column_name]}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </>
                );
              })}
              <Flex
                direction={'column'}
                alignItems="flex-start"
                justifyContent={'flex-start'}
                wrap={'wrap'}
                gap={2}
                w="100%"
              >
                <Field
                  name="tags"
                  validate={addContentUtils.validateTagsInputWithRegex}
                >
                  {({ field, form }) => (
                    <FormControl
                      w={'40%'}
                      minW={'250px'}
                      isInvalid={form.errors.tags && form.touched.tags}
                      mb={5}
                    >
                      <FormLabel>Tags</FormLabel>
                      <Input
                        {...field}
                        size="md"
                        w={'40%'}
                        minW={'250px'}
                        id="name"
                        type="text"
                      ></Input>
                      <FormErrorMessage>{form.errors.tags}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Checkbox
                  defaultChecked={checkboxStatus}
                  onChange={e => checkboxClickHandler(e)}
                >
                  Is Published ?
                </Checkbox>
              </Flex>

              <Flex
                direction={'row'}
                justifyContent={'space-evenly'}
                alignItems={'center'}
                wrap={'wrap'}
                gap={2}
                p={5}
                w="100%"
              >
                <Button
                  minW={'250px'}
                  w="50%"
                  size={'md'}
                  colorScheme="blue"
                  type="submit"
                >
                  Save
                </Button>
              </Flex>
            </Form>
          )}
        </Formik>
      </If>
    </Flex>
  );
};

export default AddContent;
