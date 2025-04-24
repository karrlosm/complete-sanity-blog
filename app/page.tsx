import { CategoryProps, SimpleBlogCardProps } from "./lib/interface";
import { client } from "./lib/sanity";
import { PostGridItem } from "./components/PostGridItem";
import { PostListItem } from "./components/PostListItem";

export const revalidate = 1;

async function getData() {
  const query = `
    *[_type == 'blog'] | order(_createdAt desc)[0..5] {
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

  const data = await client.fetch(query);
  return data;
}

async function getMostViewedPosts() {
  const query = `
    *[_type == 'blog'] | order(views desc)[0..3] {
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

  const data = await client.fetch(query);
  return data;
}

async function getFeaturedPosts() {
  const query = `
    *[_type == 'blog' && featured == true] | order(publishedAt desc)[0..3] {
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

  const data = await client.fetch(query);
  return data;
}

import HomeSlider from "./components/HomeSlider";
import CategoriesList from "./components/CategoriesList";
import Link from "next/link";
import { getAllCategories } from "@/utils/getPosts";
import SearchInput from "./components/SearchInput";

export default async function Home() {
  const data: SimpleBlogCardProps[] = await getData()  
  const mostViewed: SimpleBlogCardProps[] = await getMostViewedPosts()
  const featuredPosts: SimpleBlogCardProps[] = await getFeaturedPosts()
  const categories: CategoryProps[] = await getAllCategories()

  return (
    <div className="relative w-full h-full pt-10 pb-5 max-md:pt-5">
      <div className="mx-auto px-4 max-w-7xl">
        <div className="max-md:mb-5">
          <SearchInput outHeader />
        </div>
        <div className="grid w-full grid-cols-[2fr_1fr] max-lg:grid-cols-1 gap-3 max-lg:gap-5">
          <div className="bg-primary rounded-sm flex relative">
            <HomeSlider posts={featuredPosts} />
          </div>
          <CategoriesList categories={categories} />
        </div>
      </div>
      <div className="mb-5 mt-10 max-lg:mt-5 mx-auto px-4 max-w-7xl">
        <div className="items-start mb-5 flex flex-col">
          <h2 className="text-3xl font-semibold max-lg:text-2xl text-primary-custom">Últimas notícias</h2>
          <p className="text-sm max-lg:text-xs text-gray-600 dark:text-gray-300">
            Os assuntos do momento, em primeira mão
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.map((post, i) => (
            <PostGridItem grid2 key={`post-${post._id}`} item={post} index={i} />
          ))}
        </div>
        <div className="flex justify-center items-center py-5 max-lg:pb-0">
          <Link href={'/blog'} className="cursor-pointer relative rounded-full group overflow-hidden px-4 py-2 border-2 border-primary-custom text-primary-custom font-semibold
            before:absolute before:inset-0 before:bg-primary-custom before:scale-x-0 before:origin-left before:transition-transform before:duration-300
            hover:before:scale-x-100 z-10 hover:scale-105 transition-all">
            <span className="relative z-20 text-lg max-md:text-sm transition-colors duration-300 group-hover:text-white">
              Todas as notícias
            </span>
          </Link>
        </div>
      </div>

      <div className="w-full h-60 bg-primary flex justify-center items-center flex-col">
        <p className="text-white font-bold text-5xl max-lg:text-3xl">Anuncie aqui</p>
        <p className="text-white text-2xl max-lg:text-xl">(83) 99999-9999</p>
      </div>
      <div className="mx-auto pt-5 px-4 max-w-7xl">
        <div className="items-start my-5 max-lg:mt-0 flex flex-col">
          <h2 className="text-3xl font-semibold max-lg:text-2xl text-primary-custom">Mais visualizadas</h2>
          <p className="text-sm max-lg:text-xs text-gray-600 dark:text-gray-300">
            As notícias mais populares entre nossos leitores
          </p>
        </div>
        <div className="grid w-full grid-cols-[2fr_1fr] max-lg:grid-cols-1 gap-6">
          <div>
            <div className="grid grid-cols-2 gap-6">
              {mostViewed?.map((post, i) => (
                <PostGridItem
                  grid2
                  showViews
                  key={`most-viewed-${post._id}`} item={post} index={i} />
              ))}
            </div>
          </div>
          <div className="flex-col flex gap-4 p-4 bg-gray-200 rounded-sm dark:bg-gray-800">
            {featuredPosts?.map((post, i) => (
              <PostListItem key={`most-viewed-hight-${post._id}`} item={post} index={i} />
            ))}
            <div className="w-full h-full max-lg:h-[160px] bg-primary flex justify-center items-center flex-col rounded-sm">
              <p className="text-white font-bold text-4xl max-lg:text-3xl">Anuncie aqui</p>
              <p className="text-white text-xl max-lg:text-xl">(83) 99999-9999</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center py-5 max-lg:pb-0">
          <Link href={'/blog'} className="cursor-pointer relative rounded-full group overflow-hidden px-4 py-2 border-2 border-primary-custom text-primary-custom font-semibold
            before:absolute before:inset-0 before:bg-primary-custom before:scale-x-0 before:origin-left before:transition-transform before:duration-300
            hover:before:scale-x-100 z-10 hover:scale-105 transition-all">

            <span className="relative z-20 text-lg max-md:text-sm transition-colors duration-300 group-hover:text-white">
              Todas as notícias
            </span>
          </Link>
        </div>
      </div>

    </div>
  );
}
