import React from 'react'
import { MantineProvider } from '@mantine/core'
import DashboardLayout from './dashboard-layout'

function MantineLayout({ children }: { children: React.ReactNode }) {
    return (
        <MantineProvider>
            <DashboardLayout>
                {children}
            </DashboardLayout>
        </MantineProvider>
    )
}

export default MantineLayout