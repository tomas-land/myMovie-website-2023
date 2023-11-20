// "use server"
// import { getServerSession } from 'next-auth/next';
// import authOptions from '@/lib/auth/authOptions';
// import prisma from '@/lib/prisma/prisma';


// export async function checkIfFavorite(id: number) {
//     const session = await getServerSession(authOptions);
//     const user_id = session?.user?.id;
//     const contentId = id.toString();

//     const isFavorite = await prisma.favorite.findFirst({
//         where: {
//             userId: user_id,
//             contentId: contentId,
//         },

//     }
//     );
//     if (isFavorite) {
//         return true;
//     } else {
//         return false;
//     }
// }
