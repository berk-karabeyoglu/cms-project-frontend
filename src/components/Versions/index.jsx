import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import versionsUtils from '../../utils/versionsUtils';
import If from '../If';

const VersionsComponent = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [versionsData, setVersionsData] = useState({});
  const contentTypeID = useParams().content_type_id;
  const contentID = useParams().content_id;

  useEffect(() => {
    versionsUtils.getAllVersionsOfContent(
      contentTypeID,
      contentID,
      incomingData => {
        setVersionsData(incomingData);
        console.log('Aloooooooooooooooooooooooooo', incomingData);
      },
      onErrorMessage => {}
    );

    console.log(versionsData);
  }, [contentTypeID, contentID]);
  const versionsButtonClickHandle = () => {
    onOpen();
  };

  const showDataToTable = () => {
    return Object.keys(versionsData).length !== 0 ? (
      (() => {
        for (let i = 0; i < versionsData.data.length; i++) {
          console.log(versionsData.data[i]);
          Object.keys(versionsData.data[i]).map(d => {
            if (d === 'title' || d === 'version' || d === 'created_at') {
              console.log('ALOoooooooooooooooooooooooo', d);
              console.log(versionsData.data[i][d]);
              return (
                <Tr>
                  <Td>{versionsData.data[i][d]}</Td>
                  <Td>{versionsData.data[i][d]}</Td>
                  <Td>{versionsData.data[i][d]}</Td>
                  <Td textAlign={'center'}>
                    <Button>Revert</Button>
                  </Td>
                </Tr>
              );
            }
          });
        }
      })()
    ) : (
      <Spinner />
    );
  };

  return (
    <>
      <Button onClick={versionsButtonClickHandle}>Open Modal</Button>

      <Modal size={'5xl'} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TableContainer>
              <Table variant="simple">
                <TableCaption>
                  You can revert your version from here.
                </TableCaption>
                <Thead>
                  <Tr>
                    <Th color={'white'} textAlign={'center'}>
                      Version ID
                    </Th>
                    <Th color={'white'} textAlign={'center'}>
                      Title
                    </Th>
                    <Th color={'white'} textAlign={'center'}>
                      Created At
                    </Th>
                    <Th color={'white'} textAlign={'center'}>
                      Action
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {
                    <Tr>
                      {[Object.keys(versionsData.data)].map(() => {
                        return <Td></Td>;
                      })}
                    </Tr>
                  }
                </Tbody>
              </Table>
            </TableContainer>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default VersionsComponent;
