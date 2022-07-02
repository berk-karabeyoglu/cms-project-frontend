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
  Input,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import { API } from '../../constants/constants';
import versionsUtils from '../../utils/versionsUtils';
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
import { useNavigate, useParams } from 'react-router-dom';
import addContentUtils from '../../utils/addContentUtils';

const EditContent = () => {
  const [contentTypeFields, setContentTypeFields] = useState([]);
  const [contentDatas, setContentDatas] = useState({});
  const [checkboxNewVersionStatus, setNewVersionCheckBoxStatus] =
    useState(false);
  const [versionList, setVersionList] = useState({});
  const [versionsLoaded, setVersionsLoaded] = useState(false);
  let publishStatus = false;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();
  const contentTypeID = useParams().content_type_id;
  const contentID = useParams().content_id;
  useState(true);

  useEffect(() => {
    // getContentTypeID();
    // getContentID();
    const only = 'id,version,title,created_at,active';
    if (versionsLoaded === false) {
      axios
        .get(
          API.API_URL +
            '/content-types/' +
            contentTypeID +
            '/contents/' +
            contentID +
            '/versions?only=' +
            only,
          {
            headers: {
              Authorization:
                'Bearer ' +
                JSON.parse(localStorage.getItem('access_token')).token,
            },
          }
        )
        .then(response => {
          setVersionList(response.data.data);
          setVersionsLoaded(true);
        })
        .catch(error => console.log("RESPONSE:",error.response.message));
    }

    contentPageUtils.getContentTypeFields(contentTypeID, incomingData => {
      setContentTypeFields(incomingData);
    });

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
    if (type === 'html') return <HTMLInputField field={field} />;
  };

  const generateInitialValues = () => {
    let initialValues = {};
    contentTypeFields.data?.forEach(element => {
      initialValues[element.column_name] = contentDatas[element.column_name];
    });
    if (contentDatas['published_at'] !== null) {
      publishStatus = true;
    }
    var type_string_of_tags = '';
    contentDatas.tags?.map(tag => {
      type_string_of_tags += `${tag},`;
    });
    type_string_of_tags = type_string_of_tags.slice(0, -1); //'abcde'
    initialValues['tags'] = type_string_of_tags;
    // console.log('INITIAL VALUES ', initialValues);
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

  const revertOnClickHandle = data => {
    versionsUtils.changeVersions(
      contentTypeID,
      contentID,
      data.id,
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
        setTimeout(() => {
          window.location.href = `http://localhost:3000/admin/content-types/edit/${contentTypeID}/contents/${data.id}`;
        }, 2000);
      },
      onErrorResult => {}
    );
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
            // console.log('GIDEN VALUES ', values);
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
              <Flex w={'100%'} justifyContent={'space-evenly'} gap={4}>
                <Heading as={'h4'} size="md" mb={6}>
                  Update Content
                </Heading>
                <Spacer />
                <DeleteAlertForContent
                  deletedItem={`Content ID:${contentID}`}
                />
                <Button onClick={onOpen}>Open Modal</Button>

                <Modal isOpen={isOpen} size="5xl" onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <TableContainer>
                        <Table variant="simple">
                          <TableCaption>
                            Imperial to metric conversion factors
                          </TableCaption>
                          <Thead>
                            <Tr>
                              <Th color={'white'} textAlign={'center'}>
                                Content ID
                              </Th>
                              <Th color={'white'} textAlign={'center'}>
                                Version
                              </Th>
                              <Th color={'white'} textAlign={'center'}>
                                {' '}
                                Created At
                              </Th>
                              <Th color={'white'} textAlign={'center'}>
                                Action
                              </Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {versionList?.map(data => {
                              return (
                                <Tr>
                                  <Td key={data.id}>{data.id}</Td>
                                  <Td key={data.id}>{data.version}</Td>
                                  <Td key={data.id}>
                                    {data.created_at_formatted}
                                  </Td>
                                  <Td key={data.id}>
                                    {data.created_at_formatted}
                                  </Td>
                                  <Td key={data.id}>
                                    <If test={data.active}>
                                      <Button disabled>Current</Button>
                                    </If>
                                    <If test={!data.active}>
                                      <Button
                                        onClick={() =>
                                          revertOnClickHandle(data)
                                        }
                                      >
                                        Revert
                                      </Button>
                                    </If>
                                  </Td>
                                </Tr>
                              );
                            })}
                          </Tbody>
                        </Table>
                      </TableContainer>
                    </ModalBody>
                    <ModalFooter>
                      <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Close
                      </Button>
                      <Button variant="ghost">Secondary Action</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
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
                        id="tags"
                        type="text"
                      ></Input>
                      <FormErrorMessage>{form.errors.tags}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

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
