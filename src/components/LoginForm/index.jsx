import { Formik, Form, Field } from 'formik';
import React from 'react';
import { authUtils } from '../../utils/authenticationUtils';
import loginValidations from '../../validations/AuthValidations/loginValidation';
import { PATHS } from '../../constants/constants';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  Link,
  useToast,
} from '@chakra-ui/react';

const LoginForm = () => {
  const toast = useToast();
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={(values, { setSubmitting }) => {
        authUtils.login(values.email, values.password, onErrorMessage => {
          toast({
            position: 'top',
            title: 'Error',
            description: onErrorMessage,
            status: 'error',
            duration: 10000,
            isClosable: true,
          });
        });
        setSubmitting(false);
      }}
    >
      {props => (
        <Box
          width="70vw"
          maxW="450px"
          p={10}
          borderRadius=".68rem"
          boxShadow=" 0px 3px 8px"
        >
          <Heading fontSize={'4xl'} textAlign="center" mb={10}>
            Sign in
          </Heading>

          <Form style={{ flex: 1 }}>
            <Field name="email" validate={loginValidations.validateEmail}>
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.email && form.touched.email}
                  mb={10}
                >
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input {...field} size="lg" id="email" type="email" />
                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="password" validate={loginValidations.validatePassword}>
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.password && form.touched.password}
                  mb={10}
                >
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input {...field} id="password" type="password" />
                  <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Grid templateColumns="repeat(5, 1fr)" gap={4}>
              <GridItem colSpan={2} h="10">
                <Checkbox isInvalid>Remember Me</Checkbox>
              </GridItem>
              <GridItem colStart={4} colEnd={6} h="10">
                <Link color="blue.500" href={PATHS.FORGOT_PASSWORD}>
                  Forgot Password?
                </Link>
              </GridItem>
            </Grid>
            <Button
              mt={7}
              w="100%"
              colorScheme="blue"
              disabled={props.isSubmitting}
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </Box>
      )}
    </Formik>
  );
};

export default LoginForm;
