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
import userDeleteUtil from '../../utils/UserUtils/deleteUser';

const DeleteAlertForUsers = ({ deletedItem }) => {
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const userID = useParams().user_id;

  const deleteOnClickHandle = () => {
    userDeleteUtil.deleteUser(
      userID,
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
          navigate(`../users`);
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
      <Button colorScheme="red" onClick={onOpen}>
        Delete Field
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

export default DeleteAlertForUsers;
