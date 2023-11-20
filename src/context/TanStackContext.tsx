'use client'
import { QueryClient, QueryClientProvider, useQuery, } from '@tanstack/react-query'


const TanStackProvider = ({ children }: { children: React.ReactNode }) => {
    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}

export default TanStackProvider