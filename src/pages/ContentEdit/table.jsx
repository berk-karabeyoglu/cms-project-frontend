import React from 'react';
import { useTable } from 'react-table';
import './table.css';
import {
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

export const TableForVersions = ({ columns, data }) => {
  const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow } =
    useTable({
      columns,
      data,
      initialState: { pageIndex: 0 },
    });

  return (
    <Table {...getTableProps()}>
      <TableCaption>You can revert your version from here.</TableCaption>
      <Thead>
        {headerGroups.map(headerGroup => (
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <Th color="white" textAlign="center" {...column.getHeaderProps()}>
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
  );
};
