import { Flex, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import NavigationForUsers from './NavigationForUsers';
import If from '../../components/If';
import { Paginated } from '../ContentType/table';
import { USERS } from '../ContentType/columnData';
import userGetUtils from '../../utils/UserUtils/getAllUsers';
const Users = () => {
  const toast = useToast();
  const [dataIncome, setDataIncome] = useState([]);

  const fetchData = filter => {
    userGetUtils.getAllUsers(
      onSuccess => {
        setDataIncome(onSuccess);
      },
      onError => {
        toast({
          position: 'bottom-right',
          title: 'Success',
          description: onError,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
    );
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
