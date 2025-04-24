"use client"
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { Search } from 'lucide-react'
import { BProgress } from '@bprogress/core';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

interface SearchInputProps {
    outHeader?: boolean;
}
export default function SearchInput({
    outHeader
}: SearchInputProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [keySearch, setKeySearch] = useState('');
    const isMobile = useMediaQuery('(max-width: 768px)')

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!!keySearch && (searchParams.get('key') !== keySearch)) {
            BProgress.start()
            const params = new URLSearchParams(searchParams.toString())
            params.delete('autor')
            params.delete('categoria')
            params.delete('page')
            params.set('key', keySearch.toString())
            router.push(`?${params.toString()}`)
            
            if (window.location.href.includes('blog')) {
                router.push(`?${params.toString()}`)
            } else {
                router.push(`/blog?${params.toString()}`)
            }
            setKeySearch('')
        }
    }

  return ((!isMobile || outHeader) ?
    <form
        onSubmit={handleSubmit}
        className={`${outHeader ? 'bg-gray-200 dark:bg-gray-800' : 'bg-gray-100 dark:bg-gray-900'} p-1 pl-4 w-xs max-md:w-full rounded-full flex gap-4 ${outHeader ? ' md:hidden' : ''}`}>
        <input 
            value={keySearch}
            onChange={(e) => setKeySearch(e.target.value)}
            className='focus:outline-none bg-transparent border-none rounded w-full max-md:text-sm'
            placeholder='O que deseja saber hoje?'
            type="text" />
        <button
            type='submit'
            title='Pesquisar'
            onClick={() => {}}
            className={`
                transition-all duration-300
                cursor-pointer h-9 w-9 rounded-full shrink-0
                bg-primary flex items-center justify-center text-white dark:text-primary-custom
                hover:text-primary-custom hover:bg-white dark:hover:bg-gray-600`}>
            <Search className=" h-5 w-5" />
        </button>
    </form> : null
  )
}
