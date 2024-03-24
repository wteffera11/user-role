'use client'
import React, { useEffect, useState } from 'react'
import { MantineTree } from "@repo/ui/tree"
import type { TreeConfig } from '@repo/ui/tree-models';
import { Section } from "@repo/ui/section"
import { Box, Button, Divider, Flex, Modal, Skeleton, Text } from '@mantine/core';
import AddNewRole from '../../_components/add-new/new';
import Details from '../../_components/details';
import { useLazyGetChildrenByParentIdQuery, useLazyGetRolesQuery } from '../../../lib/features/roles.api';
import type { Role } from '../../../models';


function Layout(): JSX.Element {
    const [fetch, { data: roles, isLoading }] = useLazyGetRolesQuery()
    const [fetchChildren, { isLoading: isChildrenLoading }] = useLazyGetChildrenByParentIdQuery()
    const [selectedData, setSelectedData] = useState<{ id: string | number; name: string, parent?: string | null } | null>(null);
    const [update, setUpdate] = useState<boolean>(false)
    const [type, setType] = useState<"new" | "detail" | null>(null)

    useEffect(() => {
        void fetch({})
    }, [])


    const config: TreeConfig<{ id: string | number, name: string, description: string, parentId: string | null }> = {
        id: 'id',
        label: 'name',
        onClick: (data) => {
            setType(selectedData && data.id === selectedData.id ? null : 'detail')
            const _selectedData = {
                id: data.id,
                name: data.name,
                description: data.description,
                parent: data.parentId
            }
            setSelectedData(selectedData && data.id === selectedData.id ? null : _selectedData);
        },
        load: async (record) => {
            const _children = await fetchChildren({ id: record?.id as string }).unwrap();
            return {
                loading: isChildrenLoading,
                result: _children
            }
        }
    };
    const w = type === "new" ? "60%" : type === "detail" ? "60%" : "100%"




    if (isLoading) return <Skeleton />
    if (!roles) return <Text>Add Roles Here</Text>
    return (
        <>
            {update ? <Modal centered
                onClose={() => { setUpdate(false) }}
                opened={update}
                size="lg" title="Update Role">
                <AddNewRole
                    fetch={fetch} initialValues={selectedData as unknown as Role}
                    setSelectedData={setSelectedData}
                    setType={setType}
                    setUpdate={setUpdate}
                />

            </Modal> : null}
            <Section action={<Button bg={type === "new" ? "red" : "blue"}
                onClick={() => {
                    setSelectedData(null)
                    setType(type ? null : 'new');
                }}
            >{type === "new" ? "Close" : "New"}</Button>} collapsible={false}>
                <Flex align="flex-start" gap="md">
                    <Box w={w}>
                        <MantineTree
                            config={config}
                            data={roles}

                        />
                    </Box>
                    <Divider orientation="vertical" />
                    <Box w={type ? "40%" : "0"}>
                        {type === "new" ?
                            <AddNewRole fetch={fetch} setSelectedData={setSelectedData} setType={setType} /> : type === "detail"
                                ? <Details selectedData={selectedData as unknown as Role} setType={setType} setUpdate={setUpdate} />
                                : null}
                    </Box>
                </Flex>
            </Section >
        </>
    )
}

export default Layout