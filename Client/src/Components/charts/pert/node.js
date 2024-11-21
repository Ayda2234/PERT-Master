import React from 'react'
import { Box, Text, VStack , HStack } from '@chakra-ui/react'

export default function Node({ name, EST, LST, LFT, EFT }) {
    console.log(name, EST, LST, LFT, EFT);
    return(
        <Box h="full" w="72" fontSize={14 }  bg="white" border="1px" borderStyle={"solid"} borderColor={"gray.300"} borderRadius={5}  >
                <HStack mb={6} spacing={"50px"} bg="blue"align={"center"}  color="white" h="full">
                    <Text align={"center"}  fontSize={"md"} fontWeight={"bold"}>{name}</Text>
                </HStack>
            <HStack mx={6} >
                <VStack>
                    <HStack>
                        <Text textAlign={"center"}>HDA<Text fontWeight={"bold"} textTransform={"capitalize"}>{Math.floor(EST,2)} jours</Text></Text>
                        <Text textAlign={"center"}>HFA<Text fontWeight={"bold"} textTransform={"capitalize"}>{Math.floor(EFT,2)} jours</Text></Text>
                    </HStack>
                    <HStack>
                        <Text textAlign={"center"}>HDT<Text fontWeight={"bold"} textTransform={"capitalize"}>{Math.floor(LST,2)} jours</Text></Text>
                        <Text textAlign={"center"}>HFT<Text fontWeight={"bold"} textTransform={"capitalize"}>{Math.floor(LFT,2)} jours</Text></Text>
                    </HStack>
                </VStack>
            </HStack>
        </Box>
    )
}