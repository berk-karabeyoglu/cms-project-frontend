import React, { useEffect, useState } from 'react';
import { Field, Form, Formik } from 'formik';
import AddField from '../../components/Fields/AddField';
import editPageUtils from '../../utils/editPageUtils';
import { Paginated } from '../ContentType/table';
import { CONTENT_TYPE_FIELDS_COLUMNS } from '../../pages/ContentType/columnData';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Spacer,
  Textarea,
} from '@chakra-ui/react';
const Edit = () => {
  const [initialNameValue, setInitialNameValue] = useState('');
  const [initialModalValue, setInitialModalValue] = useState('');
  const [initialTableValue, setInitialTableValue] = useState('');
  const [initialDescriptionValue, setInitialDescriptionValue] = useState('');
  const [incomingFields, setIncomingFields] = useState([]);

  //This for information component which is on the left side of edit page
  useEffect(() => {
    editPageUtils.getContentType(
      onSuccessMessage => {
        setInitialNameValue(onSuccessMessage.name);
        setInitialModalValue(onSuccessMessage.model_name);
        setInitialTableValue(onSuccessMessage.table_name);
        setInitialDescriptionValue(onSuccessMessage.description);
      },
      onErrorMessage => {}
    );
  });

  //This for fields table which is on the right-bottom of edit page
  useEffect(() => {
    editPageUtils.fillContentTypeFields(onSuccess => {
      setIncomingFields(onSuccess);
    });
  }, []);

  return (
    <>
      <Flex w="100%" wrap={'wrap'} h={'auto'}>
        <Box
          w="40%"
          h={'50%'}
          minW={'250px'}
          p={5}
          // bgColor="whiteAlpha.900"
          direction={'row'}
          justifyContent={'space-evenly'}
        >
          <Formik
            initialValues={{
              contentTypeName: initialNameValue,
              modal_name: initialModalValue,
              table_name: initialTableValue,
              description: initialDescriptionValue,
            }}
            onSubmit={values => {}}
          >
            {props => (
              <Form bgColor={''}>
                <Heading as={'h4'} size="md" mb={6}>
                  Information
                </Heading>
                <Field name="contentTypeName">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={
                        form.errors.contentTypeName &&
                        form.touched.contentTypeName
                      }
                      mb={5}
                    >
                      <FormLabel htmlFor="contentTypeName">Name</FormLabel>
                      <Input
                        {...field}
                        id="contentTypeName"
                        disabled
                        value={initialNameValue}
                        placeholder="Content Type Name"
                      />
                      <FormErrorMessage>
                        {form.errors.contentTypeName}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="modal_name">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={
                        form.errors.modal_name && form.touched.modal_name
                      }
                      mb={5}
                    >
                      <FormLabel htmlFor="modal_name">Modal Name</FormLabel>
                      <Input
                        {...field}
                        disabled
                        value={initialModalValue}
                        w={'100%'}
                        id="modal_name"
                        placeholder=""
                      />
                      <FormErrorMessage>
                        {form.errors.modal_name}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="table_name">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={
                        form.errors.table_name && form.touched.table_name
                      }
                      mb={5}
                    >
                      <FormLabel htmlFor="table_name">Table Name</FormLabel>
                      <Input
                        {...field}
                        disabled
                        value={initialTableValue}
                        id="table_name"
                        placeholder="This is gonna creating itself"
                      />
                      <FormErrorMessage>
                        {form.errors.table_name}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="description">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={
                        form.errors.description && form.touched.description
                      }
                      mb={5}
                    >
                      <FormLabel htmlFor="description">Description</FormLabel>
                      <Textarea
                        {...field}
                        value={initialDescriptionValue}
                        size="sm"
                        resize={'none'}
                      />
                      <FormErrorMessage>
                        {form.errors.description}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Button
                  w="100%"
                  colorScheme="blue"
                  disabled={props.isSubmitting}
                  type="submit"
                >
                  Save
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
        <Spacer />
        <Flex
          direction={'column'}
          h={'auto'}
          w="58%"
          minW={'200px'}
          justifyContent={'space-evenly'}
        >
          <AddField />
          <br />
          <Paginated
            data={incomingFields}
            columns={CONTENT_TYPE_FIELDS_COLUMNS}
          />
        </Flex>
      </Flex>
    </>
  );
};

export default Edit;
