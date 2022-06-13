import { Formik, Form, Field } from 'formik';
import React from 'react';
import loginValidations from '../../validations/AuthValidations/loginValidation';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Text,
  useToast,
} from '@chakra-ui/react';
import { authUtils } from '../../utils/authenticationUtils';

const LoginForm = () => {
  const toast = useToast();
  return (
    <Formik
      initialValues={{ email: '' }}
      onSubmit={(values, { setSubmitting }) => {
        authUtils.sendEmailForForgotPassword(
          values.email,
          onSuccessMessage => {
            toast({
              position: 'top',
              title: 'Success',
              description: onSuccessMessage,
              status: 'success',
              duration: 3000,
              isClosable: true,
            });
          },
          onErrorMessage => {
            toast({
              position: 'top',
              title: 'Error',
              description: onErrorMessage,
              status: 'error',
              duration: 3000,
              isClosable: true,
            });
          }
        );
        setSubmitting(false);
      }}
    >
      {props => (
        <Box
          width="70vw"
          maxW="450px"
          p={10}
          borderRadius=".68rem"
          boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
        >
          <Heading
            mb={4}
            lineHeight={1.1}
            textAlign="center"
            fontSize={{ base: '2xl', md: '3xl' }}
          >
            Forgot your password?
          </Heading>
          <Text mb={4} textAlign="center" fontSize={{ base: 'sm', sm: 'md' }}>
            You&apos;ll get an email with a reset link
          </Text>
          <Form style={{ flex: 1 }}>
            <Field name="email" validate={loginValidations.validateEmail}>
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.email && form.touched.email}
                  mb={2}
                >
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    {...field}
                    size="lg"
                    id="email"
                    placeholder="Enter Your Email"
                    type="email"
                  />
                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Button
              mt={7}
              w="100%"
              colorScheme="blue"
              disabled={props.isSubmitting}
              type="submit"
            >
              Send Mail
            </Button>
          </Form>
        </Box>
      )}
    </Formik>
  );
};

export default LoginForm;
