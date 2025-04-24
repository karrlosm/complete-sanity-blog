'use client'

import React from 'react'
import Image from 'next/image';
import { AuthorProps } from '../lib/interface'
import { BProgress } from '@bprogress/core';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { X } from 'lucide-react';
import { urlFor } from '../lib/sanity';

export default function AuthorBlogItem({ author }:{
    author: AuthorProps,
}) {
    const router = useRouter()
    const searchParams = useSearchParams()

    const clearAuthor = () => {
        BProgress.start()
        const params = new URLSearchParams(searchParams.toString())
        params.delete('autor')
        params.set('page', '1')
        router.push(`?${params.toString()}`)
    }

    const { ref, inView } = useInView({
        triggerOnce: true, // A animação será acionada uma única vez
        threshold: 0.1, // Acionar a animação quando 50% do componente estiver visível na tela
    });

    return (
        <div className="">
            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
                transition={{ duration: 0.2 }}
            >
                <button
                    title='Limpar filtro'
                    className={`flex items-center justify-center px-2 py-1.5 rounded-full group  hover:bg-white dark:hover:bg-white cursor-pointer transition-all duration-300 bg-primary-custom text-white gap-2`}
                    onClick={() => clearAuthor()}>
                    <div className='flex items-center gap-2'>
                        <Image
                            placeholder="empty"
                            blurDataURL=""
                            alt={"Image "+author.name}
                            width={40}
                            height={40}
                            priority
                            className="rounded-full object-cover w-[40px] h-[40px] max-lg:w-7 max-lg:h-7"
                            src={urlFor(author.profileImage).url()} />
                        <h4 className={`text-lg max-lg:text-sm font-medium leading-none text-white group-hover:text-primary dark:group-hover:text-primary cursor-pointer transition-all duration-300`}>
                            {author.name}
                        </h4>
                    </div>
                    <X className='w-5 h-5 group-hover:text-primary dark:group-hover:text-primary transition-all duration-300' />
                </button>
            </motion.div>
        </div>
    )
}
