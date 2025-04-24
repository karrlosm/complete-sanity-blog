'use client'
import * as React from "react"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import Image from "next/image"
import { SimpleBlogCardProps } from "../lib/interface"
import { urlFor } from "../lib/sanity"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { formatBrazilianDate } from "@/utils/date"
import { useEffect, useRef } from "react"
import { useMediaQuery } from "@/hooks/useMediaQuery"

const images = [
    "https://images.unsplash.com/photo-1590004953392-5aba2e72269a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=500&w=800&q=80",
    "https://images.unsplash.com/photo-1590004845575-cc18b13d1d0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=500&w=800&q=80",
    "https://images.unsplash.com/photo-1590004987778-bece5c9adab6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=500&w=800&q=80",
    "https://images.unsplash.com/photo-1590005176489-db2e714711fc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=500&w=800&q=80",
]

export default function HomeSlider({ posts }: {
    posts: SimpleBlogCardProps[];
}) {
    const isMobile = useMediaQuery('(max-width: 1024px)')
    const [opacities, setOpacities] = React.useState<number[]>([])
    const [currentSlide, setCurrentSlide] = React.useState(0)

    const intervalRef = useRef<NodeJS.Timeout | null>(null)
    const [sliderRef, slider] = useKeenSlider<HTMLDivElement>(
        {
            slides: images.length,
            loop: true,
            detailsChanged(s) {
                const newOpacities = s.track.details.slides.map((slide) => slide.portion)
                setOpacities(newOpacities)
                setCurrentSlide(s.track.details.rel)
            },
        } 
    )

    useEffect(() => {
        if (!slider.current) return
    
        intervalRef.current = setInterval(() => {
            slider.current?.next()
        }, 5000)
    
        return () => {
          if (intervalRef.current) clearInterval(intervalRef.current)
        }
    }, [slider])

    return (
        <div ref={sliderRef} className="h-[400px] max-lg:h-[280px] w-full relative overflow-hidden">
            {posts?.map((item, idx) => (
                <Link
                    key={idx}
                    href={`/post/${item.currentSlug}`}
                    className="w-full h-full rounded-sm absolute top-0"
                    style={{ opacity: opacities[idx] }}
                >
                    <Image
                        width={800}
                        height={800}
                        className='h-full w-full bg-transparent object-cover rounded-sm'
                        src={urlFor(item.titleImage).url()} alt={item.title} />

                    <div className="w-full absolute bottom-16 max-lg:bottom-10 pr-4">
                        <div className="p-4 max-lg:py-2 max-w-2/3 rounded-r-sm max-lg:max-w-full bg-secondary/50 flex flex-col items-start">
                            <div className="mb-2 flex gap-2 items-center justify-between w-full">
                                <div className="bg-secondary flex items-start justify-start px-3 py-1.5 max-lg:py-1 max-lg:px-2 rounded-full">
                                    <span className="text-sm max-lg:text-[10px] font-medium text-primary-custom leading-none transition-all duration-300">
                                        {item.category.title}
                                    </span>
                                </div>
                                <p className="line-clamp-1 text-xs max-lg:text-[10px] text-gray-600 dark:text-gray-300">{formatBrazilianDate(item.publishedAt)}</p>
                            </div>
                            <div className="w-full group cursor-pointer">
                                <h3 className="text-lg max-lg:text-sm line-clamp-2 font-medium post-title group-hover:underline leading-tight">{item.title}</h3>
                                <p className="line-clamp-2 font-normal max-lg:line-clamp-1 text-sm max-lg:text-xs text-gray-600 dark:text-gray-300">{item.smallDescription}</p>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
            <div className="absolute bottom-4 flex justify-between w-full px-4 z-10 items-center">
                <div className="flex gap-2">
                    {images.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => slider.current?.moveToIdx(idx)}
                            className={`cursor-default h-3 w-3 max-lg:h-2 max-lg:w-2 rounded-full border-1 border-primary ${
                                currentSlide === idx ? 'bg-primary' : 'bg-transparent'
                            } transition-all duration-300`}
                        />
                    ))}
                </div>
                {!isMobile &&
                    <div className="flex gap-2">
                        <button
                            onClick={() => slider.current?.prev()}
                            className={`cursor-default h-8 w-8 max-lg:h-2 max-lg:w-2 rounded-full bg-primary flex items-center justify-center text-white dark:text-primary-custom`}>
                            <ChevronLeft className=" h-5 w-5" />
                        </button>
                        <button
                            onClick={() => slider.current?.next()}
                            className={`cursor-default h-8 w-8 max-lg:h-2 max-lg:w-2 rounded-full bg-primary flex items-center justify-center text-white dark:text-primary-custom`}>
                            <ChevronRight className=" h-5 w-5" />
                        </button>
                    </div>
                }
            </div>
        </div>
    )
}
