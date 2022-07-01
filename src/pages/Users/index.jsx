import { Alert, AlertIcon, Flex, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import NavigationForUsers from './NavigationForUsers';
import If from '../../components/If';
import { Paginated } from '../ContentType/table';
import { USERS } from '../ContentType/columnData';
import userGetUtils from '../../utils/UserUtils/getAllUsers';
const Users = () => {
  const toast = useToast();
  const [dataIncome, setDataIncome] = useState([]);
  const filter = '';
  const fetchData = filter => {
    if ((filter === '') | (filter === undefined)) {
      userGetUtils.getAllUsers(
        filter,
        onSuccess => {
          setDataIncome(onSuccess);
        },
        onError => {
          <Alert status="warning">
            <AlertIcon />
            There is no user.
          </Alert>;
        }
      );
    } else {
      userGetUtils.getAllUsers(
        filter,
        onSuccess => {
          setDataIncome(onSuccess);
          console.log(onSuccess);
        },
        onError => {
          <Alert status="warning">
            <AlertIcon />
            There is no user according to your search.
          </Alert>;
        }
      );
    }
  };

  // We are getting users when users page load
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <NavigationForUsers onRefetchData={fetchData} />
      <If test={dataIncome}>
        <Paginated data={dataIncome} columns={USERS} />
      </If>
    </>
  );
};

export default Users;
