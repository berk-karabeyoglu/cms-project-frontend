import { Flex, Image, Link, Text } from '@chakra-ui/react';
const NotFound = () => {
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
                <Text fontSize="8xl">404 Not Found</Text>
                <Text fontSize="xl">
                    Page Not Found. You can go back to app from {' '}
                    <Link color="teal.500"  href='/admin/content-types'>
                        here
                    </Link>
                    .
                </Text>
            </Flex>
        </Flex>
    );
};

export default NotFound;
