import getBase64 from './getLocalBase64';

interface BlurableEntity {
    poster_path: string;
}
// passing an array of entities to generate blurred data urls for each entity, and using that blurred url on images as a placeholder
export default async function blurEntities<T extends BlurableEntity>(entities: T[]): Promise<T[]> {
    try {
        const blurredEntities = await Promise.all(
            entities.map(async (entity) => {
                const imageUrl = `https://image.tmdb.org/t/p/w500${entity.poster_path}`;
                const blurDataURL = await getBase64(imageUrl);
                return { ...entity, blurDataURL };
            })
        );
        return blurredEntities;
    } catch (error) {
        console.error('Error blurring entities:', error);
        throw new Error('Failed to blur entities');
    }
}