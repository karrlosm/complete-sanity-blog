'use client'

import React from 'react'
import { CategoryProps } from '../lib/interface'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function CategoriesList({ categories }:{
    categories: CategoryProps[]
}) {
    const { ref, inView } = useInView({
        triggerOnce: true, // A animação será acionada uma única vez
        threshold: 0, // Acionar a animação quando 50% do componente estiver visível na tela
    });

    return (
        <div className="w-full pl-3 max-lg:pl-0">
            <div className="bg-gray-200 dark:bg-gray-800 w-full h-full rounded-sm p-4 max-md:py-2">
                <div className="items-start mb-5 flex flex-col max-lg:mb-2">
                    <h2 className="text-3xl font-semibold max-lg:text-2xl text-primary-custom">Categorias</h2>
                    <p className="text-sm max-lg:text-xs text-gray-600 dark:text-gray-300">
                        Filtre por categoria
                    </p>
                </div>
                <div className="flex flex-col">
                    {categories?.map((category, index) => (
                        <motion.div
                            ref={ref}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
                            transition={{ duration: 0.2, delay: index * 0.1 }} // atraso em cascata
                            key={category._id}
                        >
                            <Link
                                className={`${index+1 === categories.length ? '' : 'border-b-[1px]'} border-gray-300 dark:border-gray-700 group py-4 max-lg:py-2 flex items-center justify-between`}
                                href={"/blog?categoria="+category.slug}>
                                <h3 className="text-lg max-lg:text-sm line-clamp-1 font-medium group-hover:underline group-hover:text-xl group-hover:text-primary-custom transition-all duration-200 leading-tight">{category.title}</h3>
                                <ChevronRight className="text-lg max-lg:text-sm  group-hover:text-primary-custom group-hover:text-xl" />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}
