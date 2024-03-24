/* eslint-disable @typescript-eslint/no-unsafe-call */
'use client'

import { Box, Button, Flex, Select, TextInput, Title } from '@mantine/core'
import React, { useState, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useGetRolesQuery, useNewRoleMutation } from '../../../lib/features/roles.api'
import type { Role } from '../../../models'

const newRoleSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    description: z.string().min(2, { message: "Description must be at least 2 characters" }),
    parent: z.string().nullable()
})
type NewRole = z.infer<typeof newRoleSchema>

interface AddNewRoleProps {
    fetch: any
    setType: React.Dispatch<React.SetStateAction<"new" | "detail" | null>>;
    setSelectedData: React.Dispatch<React.SetStateAction<{ id: string | number; name: string } | null>>;
    initialValues?: Role;
    setUpdate?: React.Dispatch<React.SetStateAction<boolean>>
}


function AddNewRole({ fetch, setType, setSelectedData, initialValues, setUpdate }: AddNewRoleProps): JSX.Element {
    const [handleAdd, { isLoading, error }] = useNewRoleMutation({})
    const { data: roles } = useGetRolesQuery({})
    const [rolesOption, setRolesOption] = useState<{ value: string, label: string }[] | undefined>([])

    useEffect(() => {
        if (roles) {
            const _option = roles.map((role: Role) => ({ value: role.id, label: role.name }))
            setRolesOption(_option)
        }
    }, [])

    const { register, handleSubmit, formState: { errors }, control } = useForm<NewRole>({
        resolver: zodResolver(newRoleSchema),
        defaultValues: initialValues ?? {
            name: '',
            description: '',
            parent: ''
        }
    })

    console.log({ initialValues })


    const onAdd = async (value: NewRole) => {
        try {

            const _value: Role = await handleAdd(initialValues ? { id: initialValues.id, name: value.name, description: value.description, parent: value.parent ?? null } : { name: value.name, description: value.description, parent: value.parent ?? null }).unwrap()
            void fetch({})
            setType('detail')
            setUpdate && setUpdate(false)
            setSelectedData(_value)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <Box className='shadow' p={6}>
            {!initialValues && <Title>Add New Role</Title>}
            <form onSubmit={handleSubmit(onAdd)}>
                <TextInput label="Role Name" {...register("name")} error={errors.name?.message} />
                <TextInput label="Role Description" {...register("description")} error={errors.description?.message} />
                <Controller
                    control={control}
                    defaultValue={initialValues?.parent ?? null}
                    name="parent"
                    render={({ field }) => (
                        <Select label="Parent" {...field} data={rolesOption}
                            error={errors.parent?.message}
                        />
                    )}
                />
                <Flex align="center" gap="md" justify="flex-end" mt="md">
                    <Button bg="red">Cancel</Button>
                    <Button loading={isLoading} type='submit'>{initialValues ? 'Update' : 'Add'}</Button>
                </Flex>
            </form>
        </Box>
    )
}

export default AddNewRole