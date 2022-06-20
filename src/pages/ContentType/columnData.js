export const COLUMNS = [
  {
    Header: 'ID',
    accessor: 'id',
    disableFilters: true,
    sticky: 'left',
  },
  {
    Header: 'Name',
    accessor: 'name',
    disableFilters: true,
    sticky: 'left',
  },
  {
    Header: 'Description',
    accessor: 'description',
    sticky: 'left',
  },
  {
    Header: 'Action',
    accessor: 'action',
    sticky: 'left',
    Cell: ({ cell }) => (
      <a
        href={'http://localhost:3000/admin/content-types/edit/' + cell.row.values.id}
      >
        <button className="editButton" value={'Edit'}>
          <i className="fa-solid fa-pen-to-square"></i>
        </button>
      </a>
    ),
  },
];

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
        href={'http://localhost:3000/admin/content-types/fields/edit' + cell.row.values.id}
      >
        <button className="editButton" value={'Edit'}>
          <i className="fa-solid fa-pen-to-square"></i>
        </button>
      </a>
    ),
  },
];

