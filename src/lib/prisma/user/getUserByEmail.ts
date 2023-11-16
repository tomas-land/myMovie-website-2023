import prisma from "../prisma";

export async function getUserByEmailPrisma(email: string) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    throw new Error(String(error));
  }
}
