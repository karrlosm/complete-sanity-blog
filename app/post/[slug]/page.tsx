

import type { Metadata } from "next";
import { PostListItem } from "@/app/components/PostListItem";
import { FullBlog, SimpleBlogCardProps } from "@/app/lib/interface";
import { client, urlFor } from "@/app/lib/sanity";
import { formatBrazilianDate } from "@/utils/date";
import { getRelatedPostsBySlug } from "@/utils/getPosts";
import { getPostUrl } from "@/utils/getPostUrl";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";

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
            _id,
            title,
            smallDescription,
            publishedAt,
            titleImage,
            views,
            content,
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
        }[0]
    `;

    const data = await client.fetch(query);
    return data;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const { slug } = await params;
    const post = await getData(slug)
  
    if (!post) {
      return {
        title: 'Post não encontrado | MegaBlog',
        description: 'Desculpe, não conseguimos encontrar esse post.',
      }
    }
  
    return {
      title: `${post.title} | MegaBlog`,
      description: post.smallDescription,
      openGraph: {
        images: [
          {
            url: urlFor(post.titleImageUrl).url(),
            alt: post.title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${post.title} | MegaBlog`,
        description: post.smallDescription,
        images: [urlFor(post.titleImageUrl).url()],
      },
    }
  }
  


export default async function BlogArticle({params}: {
    params: Promise<{ slug: string }>
}) {

    const { slug } = await params;

    const currentUrl = await getPostUrl(slug ?? '')
    await incrementPostViews(slug);
    const data: FullBlog = await getData(slug);
    const relatedPosts: SimpleBlogCardProps[] = await getRelatedPostsBySlug(slug);

    return (
        <div className="mx-auto py-10 px-4 max-w-7xl">
            <div className="flex flex-col items-center">
                <div className="flex gap-4 items-center">
                    <Link
                        href={'/blog?autor='+data.author.slug}
                        className={`flex gap-1 items-center justify-start group cursor-pointer `}>
                        <Image
                            placeholder="empty"
                            blurDataURL=""
                            alt={"Image "+data.author.name}
                            width={80}
                            height={80}
                            priority
                            className="rounded-full object-cover w-[30px] h-[30px]"
                            src={urlFor(data.author.profileImage).url()} />
                        <span className={`text-[16px] max-lg:text-sm font-medium leading-none text-primary-custom group-hover:text-primary dark:group-hover:text-primary cursor-pointer transition-all duration-300`}>{data.author.name}</span>
                    </Link>
                    <p className="line-clamp-1 text-xs text-gray-600 dark:text-gray-300">{formatBrazilianDate(data.publishedAt)}</p>
                </div>
                <h1 className="block text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl mt-10 max-">
                    {data.title}
                </h1>
            </div>
            <div className="grid w-full grid-cols-[2fr_1fr] max-lg:grid-cols-1 gap-6 mt-10 max-lg:mt-5">
                <div>
                    <Image
                        alt={"Image "+data.title}
                        width={800}
                        height={800}
                        className="rounded-lg object-cover border"
                        priority
                        src={urlFor(data.titleImage).url()} />

                    <div className="my-10 max-lg:my-5 max-lg:mb-0 prose prose-lg prose-neutral dark:prose-invert prose-li:marker:text-primary prose-a:text-primary">
                        <span>{data.smallDescription}</span>
                        <PortableText value={data.content} />
                    </div>
                    <div className="flex flex-col gap-2 mt-5">
                        <span className="text-gray-600 dark:text-gray-300 text-[16px] max-md:text-sm">
                            Compartilhe esse post:
                        </span>
                        <div className="flex gap-2">
                            <a
                                href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`}
                                target="_blank"
                                title="Compartilhe no facebook"
                                className="shrink-0 h-10 w-10 max-md:h-8 max-md:w-8 rounded-full"
                                rel="noopener noreferrer"
                            >
                                <Image
                                    src="/images/facebook.png"
                                    alt="Logo do site"
                                    className="rounded-lg object-cover h-full w-full"
                                    width={50}
                                    height={50}
                                />
                            </a>
                            <a
                                href={`https://wa.me/?text=Clique para ler essa notícia: ${data.title}%20${currentUrl}`}
                                title="Compartilhe no whatsapp"
                                target="_blank"
                                className="shrink-0 h-10 w-10 max-md:h-8 max-md:w-8 rounded-full"
                                rel="noopener noreferrer"
                            >
                                <Image
                                    src="/images/whatsapp.png"
                                    alt="Logo do site"
                                    className="rounded-lg object-cover h-full w-full"
                                    width={50}
                                    height={50}
                                />
                            </a>
                            <a
                                href={`https://twitter.com/intent/tweet?url=${currentUrl}&text=Clique para ler essa notícia: ${data.title}`}
                                target="_blank"
                                title="Compartilhe no twitter"
                                className="shrink-0 h-10 w-10 max-md:h-8 max-md:w-8 rounded-full"
                                rel="noopener noreferrer"
                            >
                                <Image
                                    src="/images/twitter.png"
                                    alt="Logo do site"
                                    className="rounded-lg object-cover h-full w-full"
                                    width={50}
                                    height={50}
                                />
                            </a>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex-col flex gap-4 p-4 bg-gray-200 rounded-sm dark:bg-gray-800">
                        {relatedPosts.length > 0 &&
                            <>
                                <div className="items-start mb-5 flex flex-col max-lg:mb-2">
                                    <h4 className="text-2xl font-semibold max-lg:text-xl text-primary-custom">Conteúdos relacionados</h4>
                                    <p className="text-sm max-lg:text-xs text-gray-600 dark:text-gray-300">
                                        Para continuar explorando
                                    </p>
                                </div>
                                {relatedPosts?.map((post, i) => (
                                    <PostListItem key={`most-viewed-hight-${post._id}`} item={post} index={i} />
                                ))}
                            </>
                        }
                        <div className="w-full h-[260px] max-lg:h-[160px] bg-primary flex justify-center items-center flex-col rounded-sm">
                            <p className="text-white font-bold text-4xl max-lg:text-3xl">Anuncie aqui</p>
                            <p className="text-white text-xl max-lg:text-xl">(83) 99999-9999</p>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}
