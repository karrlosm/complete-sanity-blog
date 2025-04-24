import { client } from '../app/lib/sanity';

interface PaginatedPostsProps {
    page: number;
    pageSize: number;
    categorySlug?: string;
}

interface PageCountProps {
    categorySlug?: string;
}

export async function getPaginatedPosts({
    page, pageSize, categorySlug,
}: PaginatedPostsProps) {
    const start = (page - 1) * pageSize
    const end = start + pageSize
    const filterByCategory = categorySlug
    ? `&& category->slug.current == "${categorySlug}"`
    : ''

    const query = `
        *[_type == "blog" ${filterByCategory}]
        | order(_createdAt desc) [${start}...${end}] {
            _id,
            title,
            smallDescription,
            publishedAt,
            titleImage,
            views,
            "currentSlug": slug.current, 
            "author": author-> {
                name,
                "slug": slug.current,
                profileImage
            },
            "category": category-> {
                _id,
                title,
                "slug": slug.current
            }
    }`;
  
    const posts = await client.fetch(query)
    return posts
}

export async function getPostCount({
    categorySlug,
}: PageCountProps) {
    const filterByCategory = categorySlug
    ? `&& category->slug.current == "${categorySlug}"`
    : ''
    const query = `count(*[_type == "blog" ${filterByCategory}])`
    return await client.fetch(query)
}

export async function getAllCategories() {
    const query = `
      *[_type == "category"] {
        _id,
        title,
        "slug": slug.current
      }
    `
  
    const data = await client.fetch(query);
    return data;
}

