

import { CategoryProps, FullBlog, SimpleBlogCardProps } from "@/app/lib/interface";
import { client, urlFor } from "@/app/lib/sanity";
import { getAllCategories, getPaginatedPosts, getPostCount } from "@/utils/getPosts";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { PostGridItem } from "../components/PostGridItem";
import Link from "next/link";
import { BProgress } from '@bprogress/core';
import { Pagination } from "../components/Pagination";
import CategoriesBlog from "../components/CategoriesBlog";

export const revalidate = 30;


export default async function BlogGridPage({ searchParams }: {
    searchParams: {
        page?: string;
        categoria?: string;
        autor?: string;
    }
}) {

    const { page, categoria } = await searchParams;
    const pagina = parseInt(page || '1')
    const pageSize = 1;

    const categories: CategoryProps[] = await getAllCategories()
    const posts: SimpleBlogCardProps[] = await getPaginatedPosts({
        page: pagina,
        pageSize,
        categorySlug: categoria,
    })
    const totalPosts: number = await getPostCount({
        categorySlug: categoria,
    })
    const totalPages = Math.ceil(totalPosts / pageSize)

    return (
        <div className="mx-auto min-h-full py-10 px-4 max-w-7xl">
            <div className="w-full items-start flex flex-col ">
                <h2 className="text-3xl font-semibold max-lg:text-2xl text-primary-custom">Últimas notícias</h2>
                <p className="text-sm max-lg:text-xs text-gray-600 dark:text-gray-300">
                    Os assuntos do momento, em primeira mão
                </p>
            </div>
            <div>
                <CategoriesBlog categories={categories} />
            </div>
            {posts?.length > 0 ?
                <div className="flex flex-col w-full ">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts?.map((post, i) => (
                            <PostGridItem key={`post-${post._id}`} item={post} index={i} />
                        ))}
                    </div>
                    <div className="mt-10">
                        <Pagination totalPages={totalPages} currentPage={pagina} />
                    </div>
                </div> :
                <div className="min-h-[calc(100vh-466px)]">
                    <span>Desculpe, não encontramos essas notícias</span>
                </div>
            
            }
        </div>
    )
}
