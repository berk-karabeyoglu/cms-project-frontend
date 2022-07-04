import React, { useEffect, useState } from 'react';
import Navigation from './navigation';
import { Paginated } from './table';
import { COLUMNS } from './columnData';
import editPageUtils from '../../utils/editPageUtils';
import If from '../../components/If';
import { useToast } from '@chakra-ui/react';
const ContentType = () => {
    const toast = useToast();
    const [dataIncome, setDataIncome] = useState([]);

    const fetchData = filter => {
        if (filter === undefined || filter === '') {
            editPageUtils.getAllContentTypes(onSuccessResult => {
                setDataIncome(onSuccessResult);
            });
        } else {
            editPageUtils.getContentTypeWithSearchParam(
                filter,
                onSuccessResult => {
                    setDataIncome(onSuccessResult);
                },
                onErrorResult => {
                    toast({
                        position: 'bottom-right',
                        title: 'Error',
                        description: onErrorResult,
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                    });
                }
            );
        }
    };

    // We are getting all content types when content types page load
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Navigation onRefetchData={fetchData} />
            <If test={dataIncome}>
                <Paginated data={dataIncome} columns={COLUMNS} />
            </If>
        </>
    );
};

export default ContentType;
