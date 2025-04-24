
import type { Metadata } from "next";
import { AuthorProps, CategoryProps, FullBlog, SimpleBlogCardProps } from "@/app/lib/interface";
import { getAllCategories, getAuthorBySlug, getPaginatedPosts, getPostCount } from "@/utils/getPosts";
import { PostGridItem } from "../components/PostGridItem";
import { Pagination } from "../components/Pagination";
import CategoriesBlog from "../components/CategoriesBlog";
import AuthorBlogItem from "../components/AuthorBlogItem";
import ClearKeySearch from "../components/ClearKeySearch";
import SearchInput from "../components/SearchInput";

export const revalidate = 30;

export const metadata: Metadata = {
    title: 'Notícias - MegaBlog',
    description: 'Leia as notícias mais atualizadas do MegaBlog aqui.',
}

type SearchParamsProps = {
    searchParams: Promise<{
        page?: string;
        categoria?: string;
        autor?: string;
        key?: string;
    }>;
};

export default async function BlogGridPage({ searchParams }: SearchParamsProps) {

    const { page, categoria, autor, key } = await searchParams;
    const pagina = parseInt(page || '1')
    const pageSize = 5;

    const author: AuthorProps = await getAuthorBySlug(autor ?? '')
    const categories: CategoryProps[] = await getAllCategories()
    const posts: SimpleBlogCardProps[] = await getPaginatedPosts({
        page: pagina,
        pageSize,
        authorSlug: autor,
        categorySlug: categoria,
        keySearch: key,
    })
    const totalPosts: number = await getPostCount({
        categorySlug: categoria,
        authorSlug: autor,
        keySearch: key,
    })

    const totalPages = Math.ceil(totalPosts / pageSize)

    return (
        <div className="mx-auto min-h-full py-10 max-md:pt-5 px-4 max-w-7xl">
            <div className="max-md:mb-5">
                <SearchInput outHeader />
            </div>
            <div className="flex justify-between items-center mb-10 max-lg:flex-col-reverse max-lg:items-start max-lg:justify-start max-lg:gap-4">
                <div className={`w-full items-start flex flex-col ${!!key ? 'gap-2' : ''}`}>
                    <div className="flex items-center gap-4">
                        <h2 className="text-3xl font-semibold max-lg:text-2xl text-primary-custom">
                            {!author ? (!key ? 'Últimas notícias' : `Busca por: ${key}`) : `Blog do ${author.name}`}
                        </h2>
                        {!!key &&
                            <ClearKeySearch />
                        }
                    </div>
                    <p className="text-sm max-lg:text-xs text-gray-600 dark:text-gray-300">
                        {!key ? (!categoria ? 'Os assuntos do momento, em primeira mão' : 'Filtro por categoria') : 'Exibindo resultados de acordo com sua busca'}
                    </p>
                </div>
                {!key &&
                    <div className="w-full flex justify-end items-center max-lg:justify-start">
                        {!author ? <CategoriesBlog categories={categories} /> : <AuthorBlogItem author={author} /> }
                    </div>
                }
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
                    <span>Desculpe, não encontramos nada sobre. Tente outros resultados.</span>
                </div>
            
            }
        </div>
    )
}
