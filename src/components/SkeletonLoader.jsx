import {Box, Skeleton, SkeletonCircle, SkeletonText, Stack} from "@chakra-ui/react";

const SkeletonLoader = () => {
    return(
        <>
            <Box padding='6' mb={1} boxShadow='lg' bg='#283046'>
                <SkeletonCircle size='10' />
                <SkeletonText mt='4'  noOfLines={4} spacing='4' skeletonHeight='2' />
            </Box>

        </>
    )
}

export default SkeletonLoader