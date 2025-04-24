"use client";
import { motion } from 'framer-motion';
import React from 'react';
import { SimpleBlogCardProps } from '../lib/interface';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '../lib/sanity';
import { formatBrazilianDate } from '@/utils/date';
import { useInView } from 'react-intersection-observer';
import { Eye } from 'lucide-react';

export function PostGridItem({item, index, showViews, grid2}: {
    item: SimpleBlogCardProps;
    index: number
    grid2?: boolean;
    showViews?: boolean;
}) {

    const { ref, inView } = useInView({
        triggerOnce: true, // A animação será acionada uma única vez
        threshold: 0.1, // Acionar a animação quando 50% do componente estiver visível na tela
    });
  return (
    <div className='w-full h-full'>
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
            transition={{ duration: 0.2, delay: index * 0.1 }} // atraso em cascata
            className="w-full h-full"
        >
            <div className="w-full h-full flex flex-col justify-between gap-1 items-start relative">
                <div className='w-full'>
                    <div className="absolute z-10 m-2">
                        <Link prefetch={false} href={''} className="bg-primary flex items-center justify-center px-2 py-1 rounded-full group hover:bg-white dark:hover:bg-white transition-all duration-300">
                            <span className="text-xs max-lg:text-[10px] font-medium leading-none text-white group-hover:text-primary dark:group-hover:text-primary transition-all duration-300">
                                {item.category.title}
                            </span>
                        </Link>
                    </div>
                    <Link href={`/post/${item.currentSlug}`} className="group overflow-hidden">
                        <div className={`w-full h-[200px] ${grid2 ? 'max-lg:h-[120px]' : 'max-lg:h-[160px]'} rounded-sm overflow-hidden`}>
                            <Image
                                alt={"Image "+item.title}
                                width={500}
                                height={500}
                                placeholder="empty"
                                className="rounded-sm w-full h-full object-cover group-hover:scale-105 overflow-hidden transition-all duration-300"
                                src={urlFor(item.titleImage).url()} />
                        </div>
                        <div className="flex flex-col gap-1 pt-3">
                            <p className="line-clamp-1 text-xs max-lg:text-[10px] text-gray-600 dark:text-gray-300">{formatBrazilianDate(item.publishedAt)}</p>
                            <h3 className="text-lg max-lg:text-sm line-clamp-2 font-medium post-title group-hover:underline leading-tight">{item.title}</h3>
                            <p className="line-clamp-3 font-normal max-lg:line-clamp-2 text-sm max-lg:text-xs text-gray-600 dark:text-gray-300">{item.smallDescription}</p>
                        </div>
                    </Link>
                </div>
                <div className='flex gap-2 items-center w-full'>
                    <Link prefetch={false} href={""} className="flex gap-1 items-center justify-start group">
                        <Image
                            placeholder="empty"
                            blurDataURL=""
                            alt={"Image "+item.author.name}
                            width={40}
                            height={40}
                            priority
                            className="rounded-full object-cover w-[25px] h-[25px]"
                            src={urlFor(item.author.profileImage).url()} />
                        <span className="text-xs max-lg:text-[10px] font-semibold text-gray-800 dark:text-gray-200 group-hover:underline">{item.author.name}</span>
                    </Link>
                    {showViews &&
                        <>
                            •
                            <div className='flex gap-0.5 items-center'>
                                <Eye className='h-4 w-4' />
                                <p className="text-xs max-lg:text-[10px] font-regular text-gray-800 dark:text-gray-200">{item.views}</p>
                            </div>
                        </>
                    }
                </div>
            </div>
        </motion.div>
    </div>
  )
}
