import React, { useState } from 'react';
import {
  Box,
  VStack,
  Flex,
  Spacer,
  Button,
  Select,
  Heading,
  InputGroup,
  InputRightElement,
  Input,
  useToast,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useEffect } from 'react';
import contentPageUtils from '../../utils/contentPageUtils';
import { Paginated } from '../../pages/ContentType/table';
import { CONTENT_COLUMNS, getContentTypeID } from '../ContentType/columnData';
import If from '../../components/If';
import AddContent from '../AddContent';

const Content = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [contentTypes, setContentTypes] = useState([]);
  const [contents, setContents] = useState([]);
  const [selectedContentTypeID, setSelectedContentType] = useState();
  const [listHidden, setListHidden] = useState(true);
  const [addHidden, setAddHidden] = useState(true);
  const [contentTypeFields, setContentTypeFields] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);

  const toast = useToast();
  const search = '';
  const tags = '';
  useEffect(() => {
    console.log('render');
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
    contentPageUtils.fillContentsTable(
      search,
      tags,
      selectedContentTypeID,
      incomingData => {
        if (incomingData.length === 0) {
          <Alert status="warning">
            <AlertIcon />
            There is no content according to your search!
          </Alert>;
        } else {
          setContents(incomingData);
        }
      }
    );
    setListHidden(false);
    setAddHidden(true);
  };

  const searchHandle = () => {
    const searchInputValue = document.getElementById('searchInput').value;
    const searchByTagsValue = document.getElementById('tagsSearchInput').value;
    contentPageUtils.fillContentsTable(
      searchInputValue,
      searchByTagsValue,
      selectedContentTypeID,
      incomingData => {
        if (incomingData.length === 0) {
          setIsEmpty(true);
        } else {
          setIsEmpty(false);
          setContents(incomingData);
        }
      }
    );
  };

  const selectChangeHandler = e => {
    setListHidden(true);
    setAddHidden(true);
    let id = 0;
    contentTypes.map(obj => {
      if (obj.name === e.target.value) {
        id = obj.id;
      }
    });

    setSelectedContentType(id);
    getContentTypeID(id);
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

      <If test={!listHidden}>
        <Flex
          height="auto"
          p={5}
          direction={'column'}
          w="100%"
          bgColor="whiteAlpha.900"
        >
          <Flex
            height="auto"
            p={5}
            gap={5}
            direction={'row'}
            w="100%"
            bgColor="whiteAlpha.900"
          >
            <Heading as="h5" w="30%" size="md">
              All Contents
            </Heading>
            <InputGroup>
              <Input
                id="searchInput"
                type="search"
                placeholder="Search Content By name"
              />

              <InputRightElement pointerEvents="none" />
            </InputGroup>
            <InputGroup>
              <Input
                id="tagsSearchInput"
                type="search"
                placeholder="Search Content By Tags"
              />
              <Button
                ml="0.60rem"
                id="search-button"
                backgroundColor="rgb(0, 96, 144);"
                color="whiteAlpha.900"
                px={10}
                fontSize="1.1rem"
                onClick={searchHandle}
              >
                <SearchIcon />
              </Button>{' '}
              <InputRightElement pointerEvents="none" />
            </InputGroup>
          </Flex>

          <Box w={'100%'}>
            <If test={isEmpty === false}>
              <Paginated data={contents} columns={CONTENT_COLUMNS} />
            </If>
            <If test={isEmpty === true}>
              <Alert status="warning">
                <AlertIcon />
                There is no content.
              </Alert>
            </If>
          </Box>
        </Flex>
      </If>
      <If test={!addHidden}>
        <Flex
          height="auto"
          p={5}
          direction={'column'}
          bgColor="whiteAlpha.900"
          w="100%"
        >
          <Heading as="h5" size="md">
            Create New Content
          </Heading>
          <AddContent
            contentTypeID={selectedContentTypeID}
            contentTypeFields={{ ...contentTypeFields }}
          />
        </Flex>
      </If>
    </VStack>
  );
};

export default Content;
