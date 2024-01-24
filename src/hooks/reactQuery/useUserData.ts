import { useQuery } from '@tanstack/react-query';
import axios from 'axios';


const useUserData = (apiEndpoint: string, queryKey: string, isAuthenticated: boolean | undefined) => {
    return useQuery({
        queryKey: [queryKey],
        enabled: !!isAuthenticated,
        queryFn: async () => {
            try {
                const data = await axios.get(apiEndpoint);
                return data.data.favorites
            } catch (error) {
                console.error(`Error fetching user ${queryKey}:`, error);
            }
        },
    });
};

export default useUserData;
