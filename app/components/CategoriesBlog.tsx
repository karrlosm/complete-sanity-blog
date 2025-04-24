'use client'

import React from 'react'
import { CategoryProps } from '../lib/interface'
import Link from 'next/link'
import { BProgress } from '@bprogress/core';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function CategoriesBlog({ categories }:{
    categories: CategoryProps[]
}) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const currentCategory = searchParams.get('categoria')

    const goToCategory = (categorySlug: string) => {
        BProgress.start()
        const params = new URLSearchParams(searchParams.toString())
        params.set('categoria', categorySlug.toString())
        params.set('page', '1')
        router.push(`?${params.toString()}`)
    }

    const listAll = () => {
        BProgress.start()
        const params = new URLSearchParams(searchParams.toString())
        params.delete('categoria')
        params.set('page', '1')
        router.push(`?${params.toString()}`)
    }

    const { ref, inView } = useInView({
        triggerOnce: true, // A animação será acionada uma única vez
        threshold: 0.1, // Acionar a animação quando 50% do componente estiver visível na tela
    });

    return (
        <div className="flex flex-row gap-2 mt-5 mb-10 flex-wrap">
            <button
                disabled={!currentCategory}
                className={`bg-primary flex items-center justify-center px-3 py-1.5 rounded-sm group ${!!currentCategory ? ' hover:bg-white dark:hover:bg-white cursor-pointer' : ''} transition-all duration-300 ${!currentCategory ? 'bg-primary-custom text-white cursor-default' : ''}`}
                onClick={() =>listAll()}>
                <h4 className={`text-[16px] max-lg:text-sm font-medium leading-none text-white ${!!currentCategory ? 'group-hover:text-primary dark:group-hover:text-primary' : '' } transition-all duration-300`}>
                    Ver tudo
                </h4>
            </button>
            {categories.map((category, index) => (
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
                    transition={{ duration: 0.2, delay: index * 0.1 }} // atraso em cascata
                    key={category._id}
                >
                    <button
                        disabled={(currentCategory === category.slug)}
                        className={`bg-primary flex items-center justify-center px-3 py-1.5 rounded-sm group ${!(currentCategory === category.slug) ? ' hover:bg-white dark:hover:bg-white cursor-pointer' : ''} transition-all duration-300 ${currentCategory === category.slug ? 'bg-primary-custom text-white' : ''}`}
                        onClick={() => goToCategory(category.slug)}>
                        <h4 className={`text-[16px] max-lg:text-sm font-medium leading-none text-white ${!(currentCategory === category.slug) ? 'group-hover:text-primary dark:group-hover:text-primary cursor-pointer' : ''} transition-all duration-300`}>
                            {category.title}
                        </h4>
                    </button>
                </motion.div>
            ))}
        </div>
    )
}
