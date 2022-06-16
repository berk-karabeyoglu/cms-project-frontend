import React, { useEffect, useState } from 'react';
// import StringField from '../../components/Fields/String';
// import DecimalField from '../../components/Fields/Decimal';
// import FloatField from '../../components/Fields/Float';
// import IntegerField from '../../components/Fields/Integer';
// import BooleanField from '../../components/Fields/Boolean';
// import FileField from '../../components/Fields/File';
// import Date from '../../components/Fields/Date';
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
import { Field, Form, Formik } from 'formik';
import DateField from '../../components/Fields/Date';
import AddField from '../../components/Fields/AddField';

const Edit = () => {
  const [deneme, setTest] = useState('');
  useEffect(() => {
    // apiye istek atılacak ve ilgili data cekilecek
    
  });
  return (
    <>
      <Flex
        w="100%"
        h={'50%'}
        minW={'250px'}
        p={6}
        mb={6}
        bgColor="whiteAlpha.900"
      >
        <Heading as={'h3'} size="md">
          Add Field To Content Type
        </Heading>
        <Spacer />
        <Button size={'sm'} w="20%" colorScheme="red" type="button">
          Delete Content Type
        </Button>
      </Flex>
      <Flex w="100%" wrap={'wrap'} h={'auto'}>
        <Box
          w="40%"
          h={'50%'}
          minW={'250px'}
          p={5}
          bgColor="whiteAlpha.900"
          direction={'row'}
          justifyContent={'space-evenly'}
        >
          <Formik
            initialValues={{
              contentTypeName: '',
              description: '',
              modalNameText: '',
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
                        id="table_name"
                        placeholder="This is gonna creating itself"
                        disabled
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
                        placeholder=""
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
          w="50%"
          minW={'200px'}
          justifyContent={'space-evenly'}
        >
          <AddField />
          <br />
          <DateField />
        </Flex>
      </Flex>
    </>
  );
};

export default Edit;
