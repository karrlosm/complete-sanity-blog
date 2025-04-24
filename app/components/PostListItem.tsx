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

export function PostListItem({item, index, showViews}: {
    item: SimpleBlogCardProps;
    index: number;
    showViews?: boolean;
}) {

    const { ref, inView } = useInView({
        triggerOnce: true, // A animação será acionada uma única vez
        threshold: 0.3, // Acionar a animação quando 50% do componente estiver visível na tela
    });
  return (
    <Link href={`/post/${item.currentSlug}`} className='w-full group'>
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
            transition={{ duration: 0.2, delay: index * 0.1 }} // atraso em cascata
            className="w-full"
        >
            <div className="w-full flex flex-row gap-2 items-start relative">
                <div className="overflow-hidden shrink-0">
                    <div className="w-20 h-20 shrink-0 flex-1 max-lg:h-[60px] max-lg:w-[60px] rounded-sm overflow-hidden">
                        <Image
                            alt={"Image "+item.title}
                            width={500}
                            height={500}
                            placeholder="empty"
                            className="rounded-sm w-full h-full object-cover group-hover:scale-105 overflow-hidden transition-all duration-300"
                            src={urlFor(item.titleImage).url()} />
                    </div>
                </div>
                <div>
                    <div className="flex flex-col gap-2 max-lg:gap-1">
                        <p className="line-clamp-1 text-xs max-lg:text-[10px] text-gray-600 dark:text-gray-300">{formatBrazilianDate(item.publishedAt)}</p>
                        <h3 className="text-[14px] max-lg:text-sm line-clamp-1 font-medium post-title group-hover:underline leading-tight">{item.title}</h3>
                        <div className='flex gap-2 items-center w-full'>
                            <div className="flex gap-1 items-center justify-start">
                                <Image
                                    placeholder="empty"
                                    blurDataURL=""
                                    alt={"Image "+item.author.name}
                                    width={25}
                                    height={25}
                                    priority
                                    className="rounded-full object-cover w-[20px] h-[20px]"
                                    src={urlFor(item.author.profileImage).url()} />
                                <span className="text-xs max-lg:text-[10px] font-semibold text-gray-800 dark:text-gray-200">{item.author.name}</span>
                            </div>
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
                </div>
            </div>
            <div className='h-[1px] w-full bg-gray-300 rounded-full mt-4 dark:bg-gray-700'></div>
        </motion.div>
    </Link>
  )
}
