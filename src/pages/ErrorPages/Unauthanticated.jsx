import { Flex, Image, Link, Text } from '@chakra-ui/react';
const Unauthanticated = () => {
    return (
        <Flex
            direction={'row'}
            justifyContent="space-evenly"
            alignItems={'center'}
            wrap={'wrap'}
            gap={2}
            height="100vh"
            p={5}
            w="100%"
        >
            <Flex direction={'column'} justifyContent="center" align={'center'}>
                <Text fontSize="8xl">403 Forbidden</Text>
                <Text fontSize="xl">
                    You don't have permission to access on this page. You can go back to app from {' '}
                    <Link color="teal.500"  href='/admin/content-types'>
                        here
                    </Link>
                    .
                </Text>
            </Flex>
        </Flex>
    );
};

export default Unauthanticated;
