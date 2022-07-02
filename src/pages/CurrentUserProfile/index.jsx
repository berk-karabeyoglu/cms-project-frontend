import { Formik, Form, Field } from 'formik';
import {
  FormControl,
  FormLabel,
  Input,
  Flex,
  FormErrorMessage,
  Button,
  Text,
  Heading,
  Spinner,
  Link,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useEffect } from 'react';
import currentUserUtils from '../../utils/UserUtils/getCurrentUser';
import modalValidations from '../../validations/ContentType/addModalValidation';
import loginValidation from '../../validations/AuthValidations/loginValidation';
import PasswordStrengthChecker from '../../components/PasswordStrengthChecker';
import If from '../../components/If';
const Profile = () => {
  const toast = useToast();
  const [userInfo, setUserInfo] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [userID, setuserID] = useState(0);

  useEffect(() => {
    if (userInfo.length === 0) {
      currentUserUtils.getCurrentUser(onSuccess => {
        setuserID(onSuccess.id);
        setUserInfo(onSuccess);
        console.log(userID);
      });
    }
  }, [userInfo]);
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
      <>
        <If test={userInfo.length !== 0}>
          <Formik
            enableReinitialize
            initialValues={{
              user_fullname: userInfo['name'],
              user_email: userInfo['email'],
              user_password: '',
              user_new_password: '',
              user_password_confirmation: '',
            }}
            onSubmit={values => {
              currentUserUtils.updateCurrentUser(
                values.user_fullname,
                values.user_password,
                values.user_email,
                values.user_new_password,
                values.user_password_confirmation,
                onSuccess => {
                  toast({
                    position: 'bottom-right',
                    title: 'Success',
                    description: onSuccess,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                  });
                },
                onError => {
                  toast({
                    position: 'bottom-right',
                    title: 'Error',
                    description: onError,
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
                    Update Profile
                  </Heading>
                </Flex>
                <Flex
                  wrap={'wrap'}
                  minW={'250px'}
                  justifyContent={'space-evenly'}
                >
                  {/* Name Input */}
                  <Field
                    name="user_fullname"
                    validate={modalValidations.validateName}
                  >
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.user_fullname &&
                          form.touched.user_fullname
                        }
                        mb={5}
                      >
                        <FormLabel htmlFor="user_fullname">
                          <Flex>
                            <Text color="red">*</Text>Full Name
                          </Flex>
                        </FormLabel>
                        <Input
                          {...field}
                          id="user_fullname"
                          placeholder="User Full Name"
                        />
                        <FormErrorMessage>
                          {form.errors.user_fullname}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field
                    name="user_email"
                    validate={loginValidation.validateEmail}
                  >
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.user_email && form.touched.user_email
                        }
                        mb={5}
                      >
                        <FormLabel htmlFor="user_email">Email</FormLabel>
                        <Input
                          {...field}
                          id="user_email"
                          placeholder="User Email Adress"
                        />
                        <FormErrorMessage>
                          {form.errors.user_email}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field
                    name="user_password"
                    validate={loginValidation.validatePassword}
                  >
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.user_password &&
                          form.touched.user_password
                        }
                        mb={5}
                      >
                        <FormLabel htmlFor="user_password">
                          Current Password
                        </FormLabel>
                        <Input
                          {...field}
                          id="user_password"
                          placeholder="Current Password"
                          type="password"
                        />
                        <FormErrorMessage>
                          {form.errors.user_password}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="user_new_password">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.user_new_password &&
                          form.touched.user_new_password
                        }
                        mb={5}
                      >
                        <FormLabel htmlFor="user__new_password">
                          New Password
                        </FormLabel>
                        <Input
                          {...field}
                          id="user_new_password"
                          placeholder="New Password"
                          type="password"
                          onFocus={() => setIsVisible(true)}
                          onBlur={() => setIsVisible(false)}
                        />
                        <FormErrorMessage>
                          {form.errors.user_password}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <PasswordStrengthChecker
                    password={props.values.user_new_password}
                    isVisible={isVisible}
                  />
                  <Field name="user_password_confirmation">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.user_password_confirmation}
                        mb={2}
                      >
                        <FormLabel htmlFor="user_password_confirmation">
                          Password Again
                        </FormLabel>
                        <Input
                          {...field}
                          id="user_password_confirmation"
                          placeholder="Enter Your New Password Again"
                          type="password"
                        />
                        <FormErrorMessage>
                          {form.errors.user_password_confirmation}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  {/* Button Part */}
                  <Flex justifyContent={'space-evenly'} w={'100%'}>
                    <Link
                      href="http://localhost:3000/admin/content-types"
                      _hover={{
                        textDecoration: 'none',
                      }}
                    >
                      <Button w="150%" colorScheme="red">
                        Cancel
                      </Button>
                    </Link>
                    <Button w="10%" colorScheme="blue" type="submit">
                      Save
                    </Button>
                  </Flex>
                </Flex>
              </Form>
            )}
          </Formik>
        </If>
        <If test={userInfo.length === 0}>
          <Spinner />
        </If>
      </>
    </Flex>
  );
};

export default Profile;
