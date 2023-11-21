
import { getUserByEmailPrisma } from '@/lib/prisma/user/getUserByEmail';

export async function getUserByEmail(email: string) {
    try {
        const user = await getUserByEmailPrisma(email);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    } catch (error) {
        console.log(error)
        throw new Error(String(error));
    }
}
