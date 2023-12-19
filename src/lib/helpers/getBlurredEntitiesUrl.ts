import getBase64 from './getLocalBase64';

interface BlurableEntity {
  poster_path: string;
  blurDataURL?: string; // Optional property to store the blurDataURL
}

// passing an array of entities to generate blurred data urls for each entity, and using that blurred URL on images as a placeholder
export default async function blurEntities<T extends BlurableEntity>(entities: T[]): Promise<T[]> {
  try {
    const promises = entities.map(async (entity) => {
      const imageUrl = `https://image.tmdb.org/t/p/w500${entity.poster_path}`;
      try {
        const blurDataURL = await getBase64(imageUrl);
        return { ...entity, blurDataURL };
      } catch (error) {
        console.error(`Error blurring entity with poster_path ${entity.poster_path}:`, error);
        return { ...entity }; // Return the entity without blurDataURL in case of an error
      }
    });

    const results = await Promise.allSettled(promises);

    const blurredEntities = results.map((result, index) => {
      if (result.status === 'fulfilled') {
        return result.value;
      } else {
        console.error(`Error blurring entity at index ${index}:`, result.reason);
        return entities[index]; // Return the original entity without blurDataURL in case of an error
      }
    });

    return blurredEntities as T[];
  } catch (error) {
    console.error('Failed to blur entities:', error);
    throw new Error('Failed to blur entities');
  }
}
