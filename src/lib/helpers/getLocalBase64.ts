import { getPlaiceholder } from "plaiceholder"

export default async function getBase64(imageUrl: string) {
    try {
        const res = await fetch(imageUrl)

        if (!res.ok) {
            throw new Error(`Failed to fetch image: ${res.status} ${res.statusText}`)
        }

        const buffer = await res.arrayBuffer()

        const { base64 } = await getPlaiceholder(Buffer.from(buffer))
        // console.log(color)  to get dominant color
        return base64

    } catch (e) {
        if (e instanceof Error) console.log(e.stack)
    }
}

// export default async function addBlurredDataUrls(images: ImageRsults):Promise<Photo[]>{
    
// }