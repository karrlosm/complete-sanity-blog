import { client } from '../app/lib/sanity';

interface PaginatedPostsProps {
    page: number;
    pageSize: number;
    categorySlug?: string;
    authorSlug?: string;
    keySearch?: string;
}

interface PageCountProps {
    categorySlug?: string;
    authorSlug?: string;
    keySearch?: string;
}

export async function getPaginatedPosts({
    page, pageSize, categorySlug, authorSlug, keySearch,
}: PaginatedPostsProps) {
    const start = (page - 1) * pageSize
    const end = start + pageSize

    const filterByCategory = categorySlug
    ? `&& category->slug.current == "${categorySlug}"`
    : ''

    const filterByAuthor = authorSlug
    ? `&& author->slug.current == "${authorSlug}"`
    : ''

    const filterByKeySearch = keySearch
    ? `&& (
        title match "${keySearch}" + "*" ||
        smallDescription match "${keySearch}" + "*" ||
        pt::text(content) match "${keySearch}" + "*" ||
        author->name match "${keySearch}" + "*"
    )` :  ''

    const query = `
        *[_type == "blog" ${filterByCategory} ${filterByAuthor} ${filterByKeySearch}]
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
    categorySlug, authorSlug, keySearch,
}: PageCountProps) {
    const filterByCategory = categorySlug
    ? `&& category->slug.current == "${categorySlug}"`
    : ''

    const filterByAuthor = authorSlug
    ? `&& author->slug.current == "${authorSlug}"`
    : ''

    const filterByKeySearch = keySearch
    ? `&& (
        title match "${keySearch}" + "*" ||
        smallDescription match "${keySearch}" + "*" ||
        pt::text(content) match "${keySearch}" + "*" ||
        author->name match "${keySearch}" + "*"
    )` :  ''

    const query = `count(*[_type == "blog" ${filterByCategory} ${filterByAuthor} ${filterByKeySearch}])`
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

export async function getAuthorBySlug(slug: string) {
    const query = `
      *[_type == "author" && slug.current == "${slug}"][0]{
        name,
        slug,
        profileImage,
      }
    `
    return await client.fetch(query)
}


export async function getRelatedPostsBySlug(slug: string) {
    const postQuery = `
        *[_type == "blog" && slug.current == "${slug}"][0]{
            _id,
            category->{ _id }
        }
    `

    
    const currentPost = await client.fetch(postQuery)

    if (!currentPost?.category?._id) return []

    const relatedQuery = `
        *[_type == "blog" &&
            category._ref == $categoryId &&
            _id != $currentPostId] |
            order(publishedAt desc)[0...4] {
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
        }
    `

    const relatedPosts = await client.fetch(relatedQuery, {
        categoryId: currentPost.category._id,
        currentPostId: currentPost._id,
      })

    return relatedPosts
}


