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
    const userRole = JSON.parse(localStorage.getItem('user_info')).userRole;
    useEffect(() => {
        if (userInformations.length === 0) {
            userGetUtils.getUserByID(
                selectedUserID,
                onSuccess => {
                    setUserInformations(onSuccess);
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
        }
    }, [userInformations]);

    const selectOnChangeHandle = e => {
        console.log('DEGİSTİ SUAN', e.target.value);
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
                            user_role: userInformations['role'],
                            user_password: '',
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
                                selectedUserRole,
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
                                    <If test={userRole === 'Admin'}>
                                        <DeleteAlertForUsers deletedItem={`User ${selectedUserID}`} />
                                    </If>
                                </Flex>
                                <Flex wrap={'wrap'} minW={'250px'} justifyContent={'space-evenly'}>
                                    {/* Name Input */}
                                    <Field name="user_fullname" validate={modalValidations.validateName}>
                                        {({ field, form }) => (
                                            <FormControl
                                                isInvalid={form.errors.user_fullname && form.touched.user_fullname}
                                                mb={5}
                                            >
                                                <FormLabel htmlFor="user_fullname">
                                                    <Flex>
                                                        <Text color="red">*</Text>Full Name
                                                    </Flex>
                                                </FormLabel>
                                                <Input {...field} id="user_fullname" placeholder="User Full Name" />
                                                <FormErrorMessage>{form.errors.user_fullname}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name="user_email" validate={loginValidation.validateEmail}>
                                        {({ field, form }) => (
                                            <FormControl
                                                isInvalid={form.errors.user_email && form.touched.user_email}
                                                mb={5}
                                            >
                                                <FormLabel htmlFor="user_email">Email</FormLabel>
                                                <Input {...field} id="user_email" placeholder="User Email Adress" />
                                                <FormErrorMessage>{form.errors.user_email}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name="user_password" validate={loginValidations.validatePassword}>
                                        {({ field, form }) => (
                                            <FormControl
                                                isInvalid={form.errors.user_password && form.touched.user_password}
                                                mb={5}
                                            >
                                                <FormLabel htmlFor="user_password">Current Password</FormLabel>
                                                <Input
                                                    {...field}
                                                    id="user_password"
                                                    placeholder="Current Password"
                                                    type="password"
                                                />
                                                <FormErrorMessage>{form.errors.user_password}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name="user_new_password">
                                        {({ field, form }) => (
                                            <FormControl
                                                isInvalid={
                                                    form.errors.user_new_password && form.touched.user_new_password
                                                }
                                                mb={5}
                                            >
                                                <FormLabel htmlFor="user__new_password">New Password</FormLabel>
                                                <Input
                                                    {...field}
                                                    id="user_new_password"
                                                    placeholder="New Password"
                                                    type="password"
                                                    onFocus={() => setIsVisible(true)}
                                                    onBlur={() => setIsVisible(false)}
                                                />
                                                <FormErrorMessage>{form.errors.user_password}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <PasswordStrengthChecker
                                        password={props.values.user_new_password}
                                        isVisible={isVisible}
                                    />
                                    <Field name="user_password_confirmation">
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.user_password_confirmation} mb={2}>
                                                <FormLabel htmlFor="user_password_confirmation">
                                                    New Password Again
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
                                                isInvalid={form.errors.user_role && form.touched.user_role}
                                                mb={5}
                                            >
                                                <FormLabel htmlFor="user_role">Role</FormLabel>
                                                <Select
                                                    {...field}
                                                    value={selectedUserRole}
                                                    onChange={e => selectOnChangeHandle(e)}
                                                    size="sm"
                                                >
                                                    <option selected disabled value="empty">
                                                        Select User Role
                                                    </option>
                                                    <If test={userRole === 'Admin'}>
                                                        <option value="admin">Admin</option>
                                                    </If>
                                                    <option value="manager">Manager</option>
                                                    <option value="editor">Editor</option>
                                                </Select>
                                                <FormErrorMessage>{form.errors.user_role}</FormErrorMessage>
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
