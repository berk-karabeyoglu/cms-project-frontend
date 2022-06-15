import {
  HStack,
  Flex,
  Spacer,
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
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import modalValidations from '../../validations/ContentType/addModalValidation';
import modalUtils from '../../utils/contentTypeModalUtils';

const Navigation = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [modalNameText, setModalNameText] = useState('');

  const handleOnBlur = (e,field) => {
    field(e)
    let text = modalUtils.setModalName(e.target.value);
    setModalNameText(text);
  };


  return (
    <Flex alignItems="center" height="8rem" w="100%" bgColor="whiteAlpha.900">
      <HStack
        spacing={4}
        direction="row"
        w="100%"
        m="1.5rem"
        align="center"
        justifyContent="space-between"
      >
        <InputGroup>
          <Input type="text" placeholder="Search Content Type" />
          <InputRightElement
            pointerEvents="none"
            children={<SearchIcon color="gray.300" />}
          />
        </InputGroup>
        <Select placeholder="Filter" size="md">
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>
        <Spacer />

        <Button onClick={onOpen} px={6}>
          Add
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
                  contentTypeName: '',
                  description: '',
                  modalNameText: '',
                }}
                onSubmit={values => {
                  modalUtils.createContentType(
                    values.contentTypeName,
                    values.description,
                    modalNameText,
                    onSuccessMessage => {
                      toast({
                        position: 'top',
                        title: 'Success',
                        description: onSuccessMessage,
                        status: 'success',
                        duration: 1000,
                        isClosable: true,
                      });
                    },
                    onErrorMessage => {
                      toast({
                        position: 'top',
                        title: 'Error',
                        description: onErrorMessage,
                        status: 'error',
                        duration: 1000,
                        isClosable: true,
                      });
                    }
                  );
                }}
              >
                {props => (
                  <Form>
                    <Field
                      name="contentTypeName"
                      validate={modalValidations.validateName}
                    >
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
                            onBlur={(e) => handleOnBlur(e,field.onBlur)}
                          />
                          <FormErrorMessage>
                            {form.errors.contentTypeName}
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
                          <FormLabel htmlFor="description">
                            Description
                          </FormLabel>
                          <Input
                            {...field}
                            id="description"
                            placeholder="Add description about your content type"
                          />
                          <FormErrorMessage>
                            {form.errors.description}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="modalName">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.modalName && form.touched.modalName
                          }
                          mb={5}
                        >
                          <FormLabel htmlFor="modalName">Modal Name</FormLabel>
                          <Input
                            {...field}
                            id="modalName"
                            placeholder="This is gonna creating itself"
                            value={modalNameText}
                            disabled
                          />
                          <FormErrorMessage>
                            {form.errors.modalName}
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
