import {
  Button,
  Flex,
  Spinner,
  useToast,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import StringInputField from '../../components/ContentInputFields/StringInput';
import IntegerInputField from '../../components/ContentInputFields/IntegerInput';
import DecimalInputField from '../../components/ContentInputFields/DecimalInput';
import BooleanInputField from '../../components/ContentInputFields/BooleanInput';
import TimestampInputField from '../../components/ContentInputFields/DateInput';
import FileInputField from '../../components/ContentInputFields/FileInput';
import If from '../../components/If';
import addContentUtils from '../../utils/addContentUtils';
import { useState } from 'react';
import { useEffect } from 'react';
import contentPageUtils from '../../utils/contentPageUtils';

const EditContentFields = () => {
  const [contentTypeID, setContentTypeID] = useState(0);
  const [contentTypeFields, setContentTypeFields] = useState([]);
  console.log(contentTypeFields?.data)
  const getContentTypeID = () => {
    const splittedArray = window.location.pathname.split('/');
    const contentTypeID = splittedArray[4];
    console.log(contentTypeID);
    setContentTypeID(contentTypeID);
  };

  useEffect(() => {
    getContentTypeID();
    contentPageUtils.getContentTypeFields(contentTypeID, incomingData => {
      setContentTypeFields(incomingData);
    });
  }, [contentTypeID]);

  const toast = useToast();
  const getFields = (field, type) => {
    if (type === 'string') return <StringInputField field={field} />;
    if (type === 'decimal') return <DecimalInputField field={field} />;
    if (type === 'integer') return <IntegerInputField field={field} />;
    if (type === 'float') return <IntegerInputField field={field} />;
    if (type === 'boolean') return <BooleanInputField field={field} />;
    if (type === 'timestamp') return <TimestampInputField field={field} />;
    if (type === 'file')
      return <FileInputField maximumFieldAmount={1} field={field} />;
    if (type === 'html') return <StringInputField field={field} />;
  };

  const generateInitialValues = () => {
    let initialValues = {};
    contentTypeFields.data?.forEach(element => {
      initialValues[element.column_name] = element.column_name;
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

  const deleteOnClickHandler = () => {};
  return (
    <Flex
      alignItems="center"
      justifyContent={'space-evenly'}
      w="100%"
      h={'auto'}
      gap={3}
      direction={'column'}
      p={6}
      bgColor="whiteAlpha.900"
    >
      <If test={!contentTypeFields.data}>
        <Spinner />
      </If>
      <If test={!!contentTypeFields.data}>
        <Button onClick={deleteOnClickHandler}>Delete Field</Button>
        <Formik
          initialValues={generateInitialValues()}
          onSubmit={values => {
            addContentUtils.addContent(
              values,
              contentTypeID,
              onSuccessResult => {
                toast({
                  position: 'bottom-right',
                  title: 'Success',
                  description: onSuccessResult,
                  status: 'success',
                  duration: 10000,
                  isClosable: true,
                });
              },
              onErrorResult => {
                toast({
                  position: 'bottom-right',
                  title: 'Error',
                  description: onErrorResult,
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

export default EditContentFields;
