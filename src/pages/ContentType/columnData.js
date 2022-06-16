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
        href={'http://localhost:3000/admin/content-types/' + cell.row.values.id}
      >
        <button className="editButton" value={'Edit'}>
          <i class="fa-solid fa-pen-to-square"></i>
        </button>
      </a>
    ),
  },
];

// http://localhost:3000/admin/content-types/" + cell.row.values.id " "

// export const GROUPED_COLUMNS = [
//   {
//     Header: 'Id',
//     Footer: 'Id',
//     accessor: 'id',
//   },
//   {
//     Header: 'Name',
//     Footer: 'Name',
//     columns: [
//       {
//         Header: 'First Name',
//         Footer: 'First Name',
//         accessor: 'first_name',
//       },
//       {
//         Header: 'Last Name',
//         Footer: 'Last Name',
//         accessor: 'last_name',
//       },
//     ],
//   },
//   {
//     Header: 'Info',
//     Footer: 'Info',
//     columns: [
//       {
//         Header: 'Date of Birth',
//         Footer: 'Date of Birth',
//         accessor: 'date_of_birth',
//       },
//       {
//         Header: 'Country',
//         Footer: 'Country',
//         accessor: 'country',
//       },
//       {
//         Header: 'Phone',
//         Footer: 'Phone',
//         accessor: 'phone',
//       },
//     ],
//   },
// ];
