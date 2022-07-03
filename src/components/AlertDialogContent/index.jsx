import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import addContentUtils from '../../utils/addContentUtils';

const DeleteAlert = ({ deletedItem }) => {
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const contentTypeID = useParams().content_type_id;
  const contentID = useParams().content_id;
  const deleteOnClickHandle = () => {
    addContentUtils.deleteContent(
      contentTypeID,
      contentID,
      onSuccessMessage => {
        toast({
          position: 'bottom-right',
          title: 'Success',
          description: onSuccessMessage,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        onClose();
        setTimeout(() => {
          navigate(`../contents`);
        }, 2000);
      },
      onErrorMessage => {
        toast({
          position: 'bottom-right',
          title: 'Error',
          description: onErrorMessage,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        onClose();
      }
    );
  };
  return (
    <>
      <Button colorScheme="red" size={'md'} onClick={onOpen}>
        Delete Content
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete {deletedItem}
            </AlertDialogHeader>

            <AlertDialogBody textAlign={'center'}>
              Are you sure? You are going to delete <b>{deletedItem}</b> and you
              can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button w={'50%'} ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                w={'50%'}
                colorScheme="red"
                onClick={deleteOnClickHandle}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeleteAlert;
