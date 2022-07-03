import { Button } from '@chakra-ui/react';
import React from 'react';
import { authUtils } from '../../utils/authenticationUtils';

export const COLUMNS = [
    {
        Header: 'ID',
        accessor: 'id',
        disableFilters: true,
        sticky: 'left',
        sort: 'asc',
    },
    {
        Header: 'Name',
        accessor: 'name',
        disableFilters: true,
        sticky: 'left',
        sort: 'asc',
    },
    {
        Header: 'Description',
        accessor: 'description',
        sticky: 'left',
        sort: 'asc',
    },
    {
        Header: 'Action',
        accessor: 'action',
        sticky: 'left',
        Cell: ({ cell }) => {
            if (authUtils.checkUserAuthorized()) {
                return (
                    <a href={'http://localhost:3000/admin/content-types/edit/' + cell.row.values.id}>
                        <button id="edit_content_type" className="editButton" value={'Edit'}>
                            <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                    </a>
                );
            } else {
                return '';
            }
        },
    },
];
const contentTypeIDForFieldsEditMethod = () => {
    const splittedArray = window.location.pathname.split('/');
    const contentTypeIDForFieldsEdit = splittedArray[splittedArray.length - 1];
    return contentTypeIDForFieldsEdit;
};

export const CONTENT_TYPE_FIELDS_COLUMNS = [
    {
        Header: '#',
        accessor: 'id',
        disableFilters: true,
        sticky: 'left',
    },
    {
        Header: 'Name',
        accessor: 'label',
        disableFilters: true,
        sticky: 'left',
    },
    {
        Header: 'Type',
        accessor: 'type',
        sticky: 'left',
    },
    {
        Header: 'Action',
        accessor: 'action',
        sticky: 'left',
        Cell: ({ cell }) => (
            <a
                href={
                    'http://localhost:3000/admin/content-types/edit/' +
                    contentTypeIDForFieldsEditMethod() +
                    '/fields/' +
                    cell.row.values.id
                }
            >
                <button className="editButton" value={'Edit'}>
                    <i className="fa-solid fa-pen-to-square"></i>
                </button>
            </a>
        ),
    },
];

var contentTypeID = 0;
export const getContentTypeID = selectedContentTypeID => {
    // eslint-disable-next-line no-const-assign
    contentTypeID = selectedContentTypeID;
};

export const CONTENT_COLUMNS = [
    {
        Header: 'ID',
        accessor: 'id',
        sticky: 'left',
    },
    {
        Header: 'Title',
        accessor: 'title',
        sticky: 'left',
    },
    {
        Header: 'Created At',
        accessor: 'created_at_formatted',
        sticky: 'left',
    },
    {
        Header: 'Author',
        accessor: 'author',
        sticky: 'left',
    },
    {
        Header: 'Tags',
        accessor: 'tags',
        sticky: 'left',
    },
    {
        Header: 'Action',
        accessor: 'action',
        disableFilters: true,
        sticky: 'left',
        Cell: ({ cell }) => (
            <a
                href={
                    'http://localhost:3000/admin/content-types/edit/' +
                    contentTypeID +
                    '/contents/' +
                    cell.row.values.id
                }
            >
                <button className="editButton" value={'Edit'}>
                    <i className="fa-solid fa-pen-to-square"></i>
                </button>
            </a>
        ),
    },
];

export const USERS = [
    {
        Header: 'ID',
        accessor: 'id',
        sticky: 'left',
    },
    {
        Header: 'Name',
        accessor: 'name',
        sticky: 'left',
    },
    {
        Header: 'Email',
        accessor: 'email',
        sticky: 'left',
    },
    {
        Header: 'Role',
        accessor: 'role',
        sticky: 'left',
    },
    {
        Header: 'Action',
        accessor: 'action',
        disableFilters: true,
        sticky: 'left',
        Cell: ({ cell }) => {
            console.log(cell.row.values.role)
            if (authUtils.checkUserIsManager() && cell.row.values.role === 'admin') {
                return '';
            } else {
                return (
                    <a href={'http://localhost:3000/admin/users/edit/' + cell.row.values.id}>
                        <button className="editButton" value={'Edit'}>
                            <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                    </a>
                );
            }
        },
    },
];

export const VERSIONS = [
    {
        Header: '#',
        accessor: 'id',
        disableFilters: true,
        sticky: 'left',
    },
    {
        Header: 'Version',
        accessor: 'version',
        disableFilters: true,
        sticky: 'left',
    },
    {
        Header: 'Date',
        accessor: 'created_at',
        sticky: 'left',
    },
    {
        Header: 'Action',
        accessor: 'action',
        sticky: 'left',
        Cell: ({ cell }) => <Button value={'Edit'}>Revert</Button>,
    },
];
