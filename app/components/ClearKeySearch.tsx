'use client'

import React from 'react'
import { BProgress } from '@bprogress/core';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { X } from 'lucide-react';

export default function ClearKeySearch() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const clearKey = () => {
        BProgress.start()
        const params = new URLSearchParams(searchParams.toString())
        params.delete('key')
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
                    title='Limpar busca'
                    className={`flex items-center justify-center p-1 rounded-full group  hover:bg-white dark:hover:bg-white cursor-pointer transition-all duration-300 bg-primary-custom text-white gap-2`}
                    onClick={() => clearKey()}>
                    
                    <X className='w-5 h-5 max-md:w-4 max-md:h-4 group-hover:text-primary dark:group-hover:text-primary transition-all duration-300' />
                </button>
            </motion.div>
        </div>
    )
}
