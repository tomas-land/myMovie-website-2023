
export default function filterOutMoviesWithPosters(movies: any) {
    return movies?.filter((movie: any) => movie.poster_path !== null);
}