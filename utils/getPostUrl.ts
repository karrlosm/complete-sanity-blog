import { headers } from 'next/headers'

export async function getPostUrl(slug: string) {
    const headersList = await headers()
    const host = headersList.get('host')
    const protocol = headersList.get('x-forwarded-proto') || 'http'

    const fullUrl = `${protocol}://${host}/post/${slug}`

    return fullUrl
}
