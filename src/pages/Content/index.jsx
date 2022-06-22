import React, { useState } from 'react';
import {
  Box,
  VStack,
  Flex,
  Spacer,
  Button,
  Select,
  Heading,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import contentPageUtils from '../../utils/contentPageUtils';
import { Paginated } from '../../pages/ContentType/table';
import { CONTENT_COLUMNS } from '../ContentType/columnData';
import AddContent from '../AddContent';
const Content = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [contentTypes, setContentTypes] = useState([]);
  const [contents, setContents] = useState([]);
  const [selectedContentTypeID, setSelectedContentType] = useState();
  const [listHidden, setListHidden] = useState(true);
  const [addHidden, setAddHidden] = useState(true);
  const [contentTypeFields, setContentTypeFields] = useState([]);

  useEffect(() => {
    contentPageUtils.fillContentTypesDropdown(incomingData => {
      setContentTypes(contentTypes.concat(incomingData));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleAddOnClick = () => {
    contentPageUtils.getContentTypeFields(
      selectedContentTypeID,
      incomingData => {
        setContentTypeFields(incomingData);
      }
    );
    setListHidden(true);
    setAddHidden(false);
  };

  const listOnClickHandler = () => {
    contentPageUtils.fillContentsTable(selectedContentTypeID, incomingData => {
      setContents(incomingData.data);
    });
    setListHidden(false);
    setAddHidden(true);
  };

  const selectChangeHandler = e => {
    let id = 0;

    contentTypes.map(obj => {
      if (obj.name === e.target.value) {
        id = obj.id;
      }
    });

    setSelectedContentType(id);
    if (e.target.value !== 'empty') {
      setIsDisabled(false);
    }
  };

  return (
    <VStack>
      <Flex
        direction={'row'}
        justifyContent="space-evenly"
        alignItems={'center'}
        wrap={'wrap'}
        gap={2}
        height="auto"
        p={5}
        w="100%"
        bgColor="whiteAlpha.900"
      >
        <VStack w={'100%'}>
          <Select onChange={e => selectChangeHandler(e)} size="md">
            <option selected disabled value="empty">
              Please Choose Your Content Type
            </option>
            {contentTypes.map(contentType => (
              <option key={contentType.name} value={contentType.name}>
                {contentType.name}
              </option>
            ))}
          </Select>
          <Flex
            w={'100%'}
            wrap="wrap"
            alignItems={'center'}
            justifyContent={'space-evenly'}
          >
            <Button
              disabled={isDisabled}
              minW={'250px'}
              size={'md'}
              type="button"
              onClick={listOnClickHandler}
            >
              List All Contents
            </Button>
            <Spacer />
            <Button
              disabled={isDisabled}
              minW={'250px'}
              size={'md'}
              onClick={handleAddOnClick}
            >
              Create New Content
            </Button>
          </Flex>
        </VStack>
      </Flex>

      <Flex
        hidden={listHidden}
        height="auto"
        p={5}
        w="100%"
        bgColor="whiteAlpha.900"
      >
        <Box w={'100%'}>
          <Paginated data={contents} columns={CONTENT_COLUMNS} />
        </Box>
      </Flex>
      <Flex
        hidden={addHidden}
        height="auto"
        p={5}
        direction={'column'}
        w="100%"
        bgColor="whiteAlpha.900"
      >
        <Heading as="h5" size="md">
          Create New Content
        </Heading>
        <AddContent contentTypeID={selectedContentTypeID} contentTypeFields={contentTypeFields} />
      </Flex>
    </VStack>
  );
};

export default Content;
