import { React, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import {
  FormControl,
  FormLabel,
  Input,
  Flex,
  FormErrorMessage,
  Button,
  Text,
  Select,
  Heading,
  useToast,
  Spinner,
  Spacer,
  Link,
  textDecoration,
} from '@chakra-ui/react';
import modalValidations from '../../../validations/ContentType/addModalValidation';
import loginValidation from '../../../validations/AuthValidations/loginValidation';
import PasswordStrengthChecker from '../../../components/PasswordStrengthChecker';
import If from '../../../components/If';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import userGetUtils from '../../../utils/UserUtils/getAllUsers';
import DeleteAlertForUsers from '../../../components/AlertDialogForUsers';
import loginValidations from '../../../validations/AuthValidations/loginValidation';
import userUpdateUtil from '../../../utils/UserUtils/updateUser';
const UserEdit = () => {
  const [selectedUserRole, setSelectedUserRole] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [userInformations, setUserInformations] = useState([]);
  const selectedUserID = useParams().user_id;
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (userInformations.length === 0) {
      userGetUtils.getAllUsers(
        onSuccess => {
          //   setUserInformations(onSuccess);
          //   console.log(userInformations);
          onSuccess.map(data => {
            if (data.id == selectedUserID) {
              setUserInformations(data);
              // setSelectedUserRole(data.role)
            }
          });
        },
        onError => {
          toast({
            position: 'bottom-right',
            title: 'Success',
            description: onError,
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
        }
      );
    }
  }, [userInformations]);

  const selectOnChangeHandle = e => {
    setSelectedUserRole(e.target.value);
  };
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
        <If test={userInformations.length !== 0}>
          <Formik
            enableReinitialize
            initialValues={{
              user_fullname: userInformations['name'],
              user_email: userInformations['email'],
              //   user_role: userInformations["role"],
              //   user_password: userInformations["password"],
              user_role: 'admin',
              user_password: 'password',
              user_new_password: '',
              user_password_confirmation: '',
            }}
            onSubmit={values => {
              userUpdateUtil.updateUser(
                selectedUserID,
                values.user_fullname,
                values.user_email,
                values.user_password,
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
                  setTimeout(() => {
                    navigate(`../users`);
                  }, 2000);
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
                    Update Users
                  </Heading>
                  <Spacer />
                  <DeleteAlertForUsers deletedItem={`User ${selectedUserID}`} />
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
                    validate={loginValidations.validatePassword}
                  >
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.user_password &&
                          form.touched.user_password
                        }
                        mb={5}
                      >
                        <FormLabel htmlFor="user_password">Password</FormLabel>
                        <Input
                          {...field}
                          id="user_password"
                          placeholder="User Password"
                          type="password"
                        />
                        <FormErrorMessage>
                          {form.errors.user_password}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field
                    name="user_new_password"
                    validate={loginValidations.validatePassword}
                  >
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.user_new_password &&
                          form.touched.user_new_password
                        }
                        mb={5}
                      >
                        <FormLabel htmlFor="user__new_password">
                          Password
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
                  <Field
                    name="user_password_confirmation"
                    validate={() => {
                      loginValidations.arePasswordsSame(
                        props.values.password,
                        props.values.user_password_confirmation
                      );
                    }}
                  >
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
                  <Field name="user_role">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.user_role && form.touched.user_role
                        }
                        mb={5}
                      >
                        <FormLabel htmlFor="user_role">Role</FormLabel>
                        <Select
                          {...field}
                          onChange={e => selectOnChangeHandle(e)}
                          size="sm"
                        >
                          <option selected disabled value="empty">
                            Select User Role
                          </option>
                          <option value="admin">Admin</option>
                          <option value="manager">Manager</option>
                          <option value="editor">Editor</option>
                        </Select>
                        <FormErrorMessage>
                          {form.errors.user_role}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  {/* Button Part */}
                  <Flex justifyContent={'space-evenly'} w={'100%'}>
                    <Link
                      href="http://localhost:3000/admin/users"
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
        <If test={userInformations.length === 0}>
          <Spinner />
        </If>
      </>
    </Flex>
  );
};

export default UserEdit;
