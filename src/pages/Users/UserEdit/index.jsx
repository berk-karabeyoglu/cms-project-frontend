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
} from '@chakra-ui/react';
import modalValidations from '../../../validations/ContentType/addModalValidation';
import loginValidation from '../../../validations/AuthValidations/loginValidation';
import PasswordStrengthChecker from '../../../components/PasswordStrengthChecker';
const UserEdit = () => {
  const [selectedUserRole, setSelectedUserRole] = useState('');
  const [isVisible, setIsVisible] = useState(false);
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
      <Formik
        initialValues={{
          user_password: '',
        }}
        onSubmit={values => {}}
      >
        {props => (
          <Form>
            <Heading as={'h4'} size="md" mb={6}>
              Add Text Field
            </Heading>
            <Flex wrap={'wrap'} minW={'250px'} justifyContent={'space-evenly'}>
              {/* Name Input */}
              <Field
                name="user_fullname"
                validate={modalValidations.validateName}
              >
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.errors.user_fullname && form.touched.user_fullname
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
              <Field name="user_email" validate={loginValidation.validateEmail}>
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
              <Field name="user_password">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.errors.user_password && form.touched.user_password
                    }
                    mb={5}
                  >
                    <FormLabel htmlFor="user_password">Password</FormLabel>
                    <Input
                      {...field}
                      id="user_password"
                      placeholder="User Password"
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
                password={props.values.user_password}
                isVisible={isVisible}
              />
              <Field name="user_role">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.user_role && form.touched.user_role}
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
                    <FormErrorMessage>{form.errors.user_role}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              {/* Button Part */}
              <Flex justifyContent={'space-evenly'} w={'100%'}>
                <Button w="20%" colorScheme="red">
                  Cancel
                </Button>
                <Button w="20%" colorScheme="blue" type="submit">
                  Save
                </Button>
              </Flex>
            </Flex>
          </Form>
        )}
      </Formik>
    </Flex>
    // <Flex
    //   alignItems="center"
    //   justifyContent={'space-between'}
    //   w="100%"
    //   h={'auto'}
    //   gap={3}
    //   direction={'row'}
    //   p={6}
    //   bgColor="whiteAlpha.900"
    // >
    //   <Formik initialValues={{ user_password: '' }} onSubmit={values => {}}>
    //     {props => (
    //       <Form>

    //         <Button colorScheme="red" w={'50%'}>
    //           Cancel
    //         </Button>

    //         <Button colorScheme="blue" px={6} ml={3} w={'50%'} type="submit">
    //           Save
    //         </Button>
    //       </Form>
    //     )}
    //   </Formik>
    // </Flex>
  );
};

export default UserEdit;
