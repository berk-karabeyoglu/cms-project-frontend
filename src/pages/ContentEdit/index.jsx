import {
  Button,
  Flex,
  Spinner,
  useToast,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Checkbox,
  Heading,
  Spacer,
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
import { useState } from 'react';
import { useEffect } from 'react';
import contentPageUtils from '../../utils/contentPageUtils';
import contentEditUtils from '../../utils/contentEditUtils';
import editContentUtils from '../../utils/contentEditUtils';
import DeleteAlertForContent from '../../components/AlertDialogContent';
import { useParams } from 'react-router-dom';
const EditContent = () => {
  const [contentTypeFields, setContentTypeFields] = useState([]);
  const [contentDatas, setContentDatas] = useState({});
  const [checkboxNewVersionStatus, setNewVersionCheckBoxStatus] =
    useState(false);
  let publishStatus = false;
  const toast = useToast();
  const contentTypeID = useParams().content_type_id;
  const contentID = useParams().content_id;
  useState(true);

  useEffect(() => {
    // getContentTypeID();
    // getContentID();
    contentPageUtils.getContentTypeFields(
      contentTypeID,
      incomingData => {
        setContentTypeFields(incomingData);
      },
      []
    );

    contentEditUtils.getSingleContent(
      contentTypeID,
      contentID,
      incomingData => {
        setContentDatas(incomingData);
      }
    );
  }, []);

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
      initialValues[element.column_name] = contentDatas[element.column_name];
    });
    if (contentDatas['published_at'] !== null) {
      publishStatus = true;
    }
    return initialValues;
  };

  const validateFieldName = (column_name, value) => {
    const errors = {};
    if (!value) {
      errors[column_name] = 'Field ' + column_name + ' is required';
    }
    return errors[column_name];
  };

  const checkboxNewVersionClickHandler = e => {
    setNewVersionCheckBoxStatus(e.target.checked);
  };

  const checkboxClickHandler = e => {
    publishStatus = e.target.checked;
  };
  return (
    <Flex
      alignItems="center"
      w="100%"
      wrap={'wrap'}
      h={'auto'}
      direction={'column'}
      p={6}
    >
      <If test={!contentTypeFields.data}>
        <Spinner />
      </If>
      <If test={!!contentTypeFields.data}>
        <Formik
          enableReinitialize
          initialValues={generateInitialValues()}
          onSubmit={values => {
            console.log('UPDATE GİDEN FİELDLAR:', values);
            if (publishStatus === true) {
              values['publish'] = publishStatus;
            } else {
              delete values.publish;
            }
            if (checkboxNewVersionStatus === true) {
              values['saveVersion'] = checkboxNewVersionStatus;
            } else {
              delete values.saveVersion;
            }
            editContentUtils.updateContent(
              values,
              contentTypeID,
              contentID,
              onSuccessResult => {
                toast({
                  position: 'bottom-right',
                  title: 'Success',
                  description: onSuccessResult,
                  status: 'success',
                  duration: 3000,
                  isClosable: true,
                });
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
            <>
              <Flex w={'100%'} justifyContent={'space-between'} gap={4}>
                <Heading as={'h4'} size="md" mb={6}>
                  Update Content
                </Heading>
                <Spacer />
                <DeleteAlertForContent
                  deletedItem={`Content ID:${contentID}`}
                />
              </Flex>
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
                <Checkbox
                  defaultChecked={publishStatus}
                  onChange={e => checkboxClickHandler(e)}
                >
                  Is Published ?
                </Checkbox>
                <Checkbox
                  defaultChecked={checkboxNewVersionStatus}
                  onChange={e => checkboxNewVersionClickHandler(e)}
                >
                  Create New Version
                </Checkbox>
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
                    Update
                  </Button>
                </Flex>
              </Form>
            </>
          )}
        </Formik>
      </If>
    </Flex>
  );
};

export default EditContent;
