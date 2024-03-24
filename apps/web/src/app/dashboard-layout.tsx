'use client'
import React from 'react'
import { AppShell, Avatar, Box, Burger, Button, Group, Image, Menu, ScrollArea, Skeleton, Text, Title } from '@mantine/core';
import { useDisclosure, useNetwork } from '@mantine/hooks';
import { HeaderMegaMenu } from '../shared/header';
import { IconHelpCircle, IconLogout, IconMenu2, IconMessages, IconPasswordUser, IconSettings, IconUser, IconUserCircle } from '@tabler/icons-react';
import styles from './shell.module.css'
import { LinksGroup, LinksGroupProps } from './_components/link-group/navbar-link-group';

function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
    const networkStatus = useNetwork();

    const links = ([{ label: 'Users', link: '/users', icon: IconUser }, { label: 'Roles', link: '/roles', icon: IconUser }]).map((item) => (
        <LinksGroup  {...item} key={item.label} />
    ));


    return (
        <AppShell
            header={{ height: '40px' }}
            layout="alt"
            navbar={{
                width: 250,
                breakpoint: 'sm',
                collapsed: {
                    mobile: !mobileOpened,
                    desktop: !desktopOpened,
                },
            }}
            padding="md"
        >
            <AppShell.Header>
                <Group align="center" h="100%" justify="space-between" px="sm">
                    <Group align="center" gap={12} h="100%">
                        <Burger
                            hiddenFrom="sm"
                            onClick={toggleMobile}
                            opened={mobileOpened}
                            size="sm"
                        />
                        <Button
                            leftSection={<IconMenu2 size={16} />}
                            onClick={toggleDesktop}
                            pr={0}
                            variant="white"
                            visibleFrom="sm"
                        />

                        <Title c="primary" fz={16}>
                            Roles Management
                        </Title>
                    </Group>

                    <Menu arrowPosition="center" shadow="md" width={200} withArrow>
                        <Menu.Target>
                            <Button variant="subtle">
                                <Box className="flex gap-2 items-center">
                                    <Avatar color="primary" radius="xl" size="sm" />

                                    {/* {user ? (
                                        <Flex className="flex-col justify-start text-left">
                                            <Text
                                                lh={1}
                                            >{`${user.firstName} ${user.lastName}`}</Text>
                                        </Flex>
                                    ) : null} */}
                                </Box>
                            </Button>
                        </Menu.Target>

                        <Menu.Dropdown>
                            <Menu.Item
                                component="a"
                                leftSection={<IconUserCircle size={14} />}
                            >
                                Profile
                            </Menu.Item>
                            <Menu.Item
                                component="a"
                                href="/iam/change-password"
                                leftSection={<IconPasswordUser size={14} />}
                            >
                                Change Password
                            </Menu.Item>

                            <Menu.Item leftSection={<IconSettings size={14} />}>
                                Settings
                            </Menu.Item>
                            <Menu.Divider />
                            <Menu.Item leftSection={<IconMessages size={14} />}>
                                FAQ
                            </Menu.Item>
                            <Menu.Item leftSection={<IconHelpCircle size={14} />}>
                                Help
                            </Menu.Item>

                            <Menu.Divider />

                            <Menu.Item
                                leftSection={<IconLogout size={14} />}
                            >
                                Logout
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Group>
            </AppShell.Header>
            <AppShell.Navbar className={styles.side}>
                <AppShell.Section>
                    <Box className={styles.header}>
                        <Box className="flex-grow">

                            <Burger
                                color="white"
                                hiddenFrom="sm"
                                onClick={toggleMobile}
                                opened={mobileOpened}
                                size="sm"
                            />
                        </Box>
                    </Box>
                </AppShell.Section>
                <AppShell.Section component={ScrollArea} grow p={"md"}>
                    {links}
                </AppShell.Section>
                <AppShell.Section>
                    <div className=" text-xs  border-t p-2">
                        <div className="flex justify-between items-center">
                            <Text color={networkStatus.online ? 'teal' : 'red'} size="sm">
                                {networkStatus.online ? 'Online' : 'Offline'}
                            </Text>
                            <div className="text-center">
                                version: 1.0.0
                            </div>{' '}
                        </div>
                        <div className="flex gap-2 justify-between items-center">
                            <div> &copy; 2023 </div>
                        </div>
                    </div>
                </AppShell.Section>
            </AppShell.Navbar>
            <AppShell.Main>{children}</AppShell.Main>
        </AppShell>
    )
}

export default DashboardLayout