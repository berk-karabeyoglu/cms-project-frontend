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
                    console.log('asdas', onError);
                }
            );
        } else {
            userGetUtils.getAllUsers(
                filter,
                onSuccess => {
                    if (onSuccess.length === 0) {
                        
                    } else {
                        setDataIncome(onSuccess);
                    }
                },
                onError => {
                    console.log(onError);
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
