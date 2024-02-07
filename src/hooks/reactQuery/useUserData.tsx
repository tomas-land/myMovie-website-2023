import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSession } from 'next-auth/react';


const useUserData = (apiEndpoint: string, queryKey: string) => {
    const { status } = useSession();
    const isAuthenticated = status === 'authenticated';
    return useQuery({
        queryKey: [queryKey],
        enabled: isAuthenticated,
        queryFn: async () => {
            try {
                const data = await axios.get(apiEndpoint);
                return data.data[queryKey]  // return the data from the db by the queryKey and api response key
            } catch (error) {
                console.error(`Error fetching user ${queryKey}:`, error);
            }
        },
    });
};

export default useUserData;
