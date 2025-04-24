'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { BProgress } from '@bprogress/core';
import React from 'react'

type PaginationProps = {
  totalPages: number
  currentPage?: number;
}

export function Pagination({ totalPages, currentPage }: PaginationProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const page = currentPage ?? parseInt(searchParams.get('page') || '1')

  const goToPage = (pageNum: number) => {
    BProgress.start()
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', pageNum.toString())
    router.push(`?${params.toString()}`)
  }

  const getVisiblePages = () => {
    const start = Math.max(1, page - 2)
    const end = Math.min(totalPages, page + 2)
    const pages = []

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    return pages;
  }

  const visiblePages = getVisiblePages()

  return (
    <div className="flex items-center gap-2 mt-6 justify-center flex-wrap">
      {page > 1 && (
        <button
          onClick={() => goToPage(1)}
          className="cursor-pointer px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-600"
        >
          «
        </button>
      )}

      {visiblePages.map((p) => (
        <button
          key={p}
          onClick={() => goToPage(p)}
          className={`px-3 py-1 rounded cursor-pointer ${
            p === page ? 'bg-primary-custom text-white' : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500'
          }`}
        >
          {p}
        </button>
      ))}

      {page < totalPages && (
        <button
          onClick={() => goToPage(totalPages)}
          className="cursor-pointer px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-600"
        >
            »
        </button>
      )}
    </div>
  )
}
