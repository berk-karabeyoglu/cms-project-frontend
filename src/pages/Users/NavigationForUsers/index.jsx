import {
  HStack,
  Flex,
  Button,
  InputRightElement,
  InputGroup,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  FormErrorMessage,
  Select,
  useDisclosure,
  useToast,
  Text,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import userAddUtil from '../../../utils/UserUtils/addUser';
import modalValidations from '../../../validations/ContentType/addModalValidation';
import loginValidation from '../../../validations/AuthValidations/loginValidation';
import PasswordStrengthChecker from '../../../components/PasswordStrengthChecker';
const Navigation = props => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedUserRole, setSelectedUserRole] = useState('');
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const selectOnChangeHandle = e => {
    setSelectedUserRole(e.target.value);
  };

  const searchButtonOnClickHandle = () => {
    const userText = document.getElementById('searchInput').value;
    props.onRefetchData(userText)
  }

  const addUserButtonOnClickHandle = () => {
    setIsVisible(false);
    onOpen();
  };
  return (
    <Flex alignItems="center" height="8rem" w="100%">
      <HStack
        spacing={4}
        direction="row"
        w="100%"
        m="1.5rem"
        align="center"
        justifyContent="space-between"
      >
        <InputGroup>
          <Input id="searchInput" type="search" placeholder="Search User" />
          <Button
            ml="0.60rem"
            id="search-button"
            backgroundColor="rgb(0, 96, 144);"
            color="whiteAlpha.900"
            fontSize="1.1rem"
            onClick={searchButtonOnClickHandle}
          >
            <SearchIcon />
          </Button>

          <InputRightElement pointerEvents="none" />
        </InputGroup>

        <Button
          id="add-button"
          onClick={addUserButtonOnClickHandle}
          mr="2rem"
          padding="0 1.3rem"
          backgroundColor="rgb(0, 96, 144);"
          color="whiteAlpha.900"
          textAlign="center"
        >
          Add User
        </Button>

        {/* Modal Part */}
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create Content Type</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Formik
                initialValues={{
                  user_password: '',
                }}
                onSubmit={values => {
                  userAddUtil.addUser(
                    values.user_fullname,
                    values.user_email,
                    values.user_password,
                    selectedUserRole,
                    onSuccessMessage => {
                      toast({
                        position: 'bottom-right',
                        title: 'Success',
                        description: onSuccessMessage,
                        status: 'success',
                        duration: 1500,
                        isClosable: true,
                      });
                      props.onRefetchData();
                      onClose();
                    },
                    onErrorMessage => {
                      toast({
                        position: 'bottom-right',
                        title: 'Error',
                        description: onErrorMessage,
                        status: 'error',
                        duration: 1500,
                        isClosable: true,
                      });
                    }
                  );
                }}
              >
                {props => (
                  <Form>
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
                    <Field name="user_password">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.user_password &&
                            form.touched.user_password
                          }
                          mb={5}
                        >
                          <FormLabel htmlFor="user_password">
                            Password
                          </FormLabel>
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
                    <ModalFooter>
                      <Button onClick={onClose} colorScheme="red" w={'50%'}>
                        Cancel
                      </Button>

                      <Button
                        colorScheme="blue"
                        px={6}
                        ml={3}
                        w={'50%'}
                        type="submit"
                      >
                        Save
                      </Button>
                    </ModalFooter>
                  </Form>
                )}
              </Formik>
            </ModalBody>
          </ModalContent>
        </Modal>
      </HStack>
    </Flex>
  );
};

export default Navigation;
