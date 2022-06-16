import React, { useEffect, useState } from 'react';
import { useTable, usePagination } from 'react-table';
import './table.css';
import axios from 'axios';
import { API } from '../../constants/constants';
import {
  Button,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Flex,
  Box,
} from '@chakra-ui/react';

export const Paginated = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    usePagination
  );

  const { pageIndex, pageSize } = state;

  const [resultArray, setResultArray] = useState([]);

  useEffect(() => {
    const contentTypeList = async () => {
      await axios
        .get(API.API_URL + '/content-types', {
          headers: {
            Authorization:
              'Bearer ' +
              JSON.parse(localStorage.getItem('access_token')).token,
          },
        })
        .then(response => setResultArray(response.data.data));
    };
    contentTypeList();
  }, []);

  return (
    <>
      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map(headerGroup => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <Th
                  color="white"
                  textAlign="center"
                  {...column.getHeaderProps()}
                >
                  {column.render('Header')}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <Td textAlign="center" {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>

      <Box>
        <Flex mt="1rem">
          <Box ml="0.5rem">
            <Button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
              {'<<'}
            </Button>{' '}
            <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
              Previous
            </Button>{' '}
            <Button onClick={() => nextPage()} disabled={!canNextPage}>
              Next
            </Button>{' '}
            <Button
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {'>>'}
            </Button>
          </Box>
          <Box flex="2" my="0.48rem" ml="3rem">
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>
          </Box>
          <Box flex="3">
            Go to page:{' '}
            <Input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={e => {
                const pageNumber = e.target.value
                  ? Number(e.target.value) - 1
                  : 0;
                gotoPage(pageNumber);
              }}
              style={{ width: '4rem', textAlign: 'center' }}
            />
          </Box>
          <Box flex="5">
            <Select
              width="15vw"
              value={pageSize}
              onChange={e => setPageSize(Number(e.target.value))}
            >
              {[1, 10, 20].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </Select>
          </Box>
        </Flex>
      </Box>
    </>
  );
};
