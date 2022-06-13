import { Formik, Form, Field } from 'formik';
import React, { useEffect, useState } from 'react';
import If from '../If';
import { useNavigate } from 'react-router-dom';
import { authUtils } from '../../utils/authenticationUtils';
import loginValidations from '../../validations/AuthValidations/loginValidation';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  useToast,
} from '@chakra-ui/react';
import PasswordStrengthChecker from '../PasswordStrengthChecker';

const LoginForm = () => {
  const toast = useToast();
  const [isVisible, setIsVisible] = useState(false);
  const { token, email } = authUtils.queryStringValidationCheck();

  const navigate = useNavigate();
  useEffect(() => {
    if (!token || !email) {
      navigate('/login');
    }
  }, [token, email, navigate]);

  return (
    <If test={token && email}>
      <Formik
        initialValues={{ password: '', password_confirmation: '' }}
        onSubmit={(values, { setSubmitting }) => {
          authUtils.resetPassword(
            values.password,
            values.password_confirmation,
            onSuccessMessage => {
              toast({
                position: 'top',
                title: 'Success',
                description: onSuccessMessage,
                status: 'success',
                duration: 1000,
                isClosable: true,
              });
              setTimeout(() => {
                navigate("/");
              }, 2000);
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
              Let's Reset Password
            </Heading>

            <Form style={{ flex: 1 }}>
              <Field
                name="password"
                validate={loginValidations.validatePassword}
              >
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.password && form.touched.password}
                    mb={2}
                  >
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input
                      {...field}
                      size="lg"
                      id="password"
                      onFocus={() => setIsVisible(true)}
                      onBlur={() => setIsVisible(false)}
                      placeholder="Enter Your Password"
                      type="Password"
                    />
                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field
                name="password_confirmation"
                validate={() => {
                  loginValidations.arePasswordsSame(
                    props.values.password,
                    props.values.password_confirmation
                  );
                }}
              >
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.errors.password_confirmation 
                    }
                    mb={2}
                  >
                    <FormLabel htmlFor="password_confirmation">
                      Password Again
                    </FormLabel>
                    <Input
                      {...field}
                      size="lg"
                      id="password_confirmation"
                      placeholder="Enter Your Password Again"
                      type="password"
                    />
                    <FormErrorMessage>
                      {form.errors.password_confirmation}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <PasswordStrengthChecker
                password={props.values.password}
                isVisible={isVisible}
              />
              <Button
                mt={7}
                w="100%"
                colorScheme="blue"
                disabled={props.isSubmitting}
                type="submit"
                onClick={props.handleSubmit}
              >
                Reset Password
              </Button>
            </Form>
          </Box>
        )}
      </Formik>
    </If>
  );
};

export default LoginForm;
