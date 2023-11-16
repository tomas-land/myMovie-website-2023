export interface iUser {
    id: string;
    name: string | null;
    username: string | null;
    password: string | null;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
    createdAt: Date;
    updatedAt: Date | null;
}
