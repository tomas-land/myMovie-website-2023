import { iPerson } from "../../interfaces/person";

export default function filterOutActorsWithPhoto(actors: iPerson[] | undefined) {
    return actors?.filter((actor: iPerson) => actor.profile_path !== null);
}