import React from 'react';
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
    Cell: ({ cell }) => (
      <a
        href={
          'http://localhost:3000/admin/content-types/edit/' + cell.row.values.id
        }
      >
        <button className="editButton" value={'Edit'}>
          <i className="fa-solid fa-pen-to-square"></i>
        </button>
      </a>
    ),
  },
];
const contentTypeIDForFieldsEditMethod = () => {
  const splittedArray = window.location.pathname.split('/');
  const contentTypeIDForFieldsEdit = splittedArray[splittedArray.length - 1];
  return contentTypeIDForFieldsEdit;
}

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
        <button
          className="editButton"
          value={'Edit'}
        >
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
    accessor: 'created_at',
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


export const VERSIONS = [
  {
    Header: 'Version ID',
    accessor: 'version_id',
    sticky: 'left',
  },
  {
    Header: 'Title',
    accessor: 'title',
    sticky: 'left',
  },
  {
    Header: 'Created At',
    accessor: 'created_at',
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
