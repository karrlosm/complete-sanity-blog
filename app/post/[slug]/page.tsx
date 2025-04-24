

import { FullBlog } from "@/app/lib/interface";
import { client, urlFor } from "@/app/lib/sanity";
import { PortableText } from "@portabletext/react";
import Image from "next/image";

export const revalidate = 30;

async function incrementPostViews(slug: string) {
    const post = await client.fetch(
        `*[_type == "blog" && slug.current == "${slug}"]{
                _id,
                views,
            }[0]`,
        { slug },
        {
            cache: 'no-store',
        }
    )
  
    if (!post?._id) {
        return;
    }
  
    const response = await client
        .patch(post._id)
        .setIfMissing({ views: 0 })
        .inc({ views: 1 })
        .commit()
}

async function getData(slug: string) {
    const query = `
        *[_type == "blog" && slug.current == "${slug}"] {
            "currentSlug": slug.current, 
            title,
            smallDescription,
            content,
            publishedAt,
            titleImage,
            "categories": categories[]->{
                _id,
                title,
                "currentSlug": slug.current
            },
        }[0]
    `;

    const data = await client.fetch(query);
    return data;
}


export default async function BlogArticle({params}: {
    params: Promise<{ slug: string }>
}) {

    const { slug } = await params;

    await incrementPostViews(slug);
    const data: FullBlog = await getData(slug);

    return (
        <div className="mx-auto py-10 px-4 max-w-7xl">
            <h1>
                <span className="block text-base text-center text-primary font-semibold tracking-wide uppercase">Jan Marshal - Blog</span>
                <span className="mt-2 block text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl">{data.title}</span>
            </h1>

            <Image
                alt={"Image "+data.title}
                width={800}
                height={800}
                className="rounded-lg mt-8 object-cover border"
                priority
                src={urlFor(data.titleImage).url()} />

            <div className="my-16 prose prose-lg prose-green dark:prose-invert prose-li:marker:text-primary prose-a:text-primary">
                <PortableText value={data.content} />
            </div>
        </div>
    )
}
