import { Box, Button, Flex, Text, Title } from '@mantine/core'
import React from 'react'
import type { Role } from '../../../models'

interface DetailProps {
    selectedData: Role,
    setType: React.Dispatch<React.SetStateAction<"new" | "detail" | null>>;
    setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

function Details({ selectedData, setType, setUpdate }: DetailProps): JSX.Element {
    return (
        <Box>
            <Title className='border-b font-semibold py-2' size="h3">
                {selectedData.name} Role Detail
            </Title>
            <Box>
                <Flex align="center" className=" border-b" gap="md">
                    <Box className='w-1/4 bg-blue-50  px-2 py-3'>
                        Role Name
                    </Box>
                    <Text>{selectedData.name}</Text>
                </Flex>
                <Flex align="center" className=" border-b" gap="md">
                    <Box className='w-1/4 bg-blue-50  px-2 py-3'>
                        Role Description
                    </Box>
                    <Text>{selectedData.description}</Text>
                </Flex>
            </Box>
            <Flex align="center" gap="md" justify="flex-end" mt="md">
                <Button onClick={() => { setUpdate(true); }}>Update</Button>
                <Button bg="red">Delete</Button>
                <Button bg="orange" onClick={() => { setType(null) }}>Close</Button>
            </Flex>
        </Box>
    )
}

export default Details