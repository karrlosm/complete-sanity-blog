import Link from "next/link";
import Image from 'next/image'
import { ModeToggle } from "./ModeToggle";
import { Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer className="w-full bg-primary shadow-[4px_2px_0_#04032b46] dark:shadow-[4px_2px_0_#89bc572d] relative flex flex-col mt-5">
            <nav className="w-full relative flex justify-between max-w-7xl mx-auto px-4 py-4">
                <div className="max-w-80 flex flex-col gap-2">
                    <Link href={"/"} className="font-bold text-3xl flex items-center gap-2 max-lg:text-2xl">
                        <Image
                            src="/images/logo.png"
                            alt="Logo do site"
                            className="rounded-lg object-cover"
                            width={50}
                            height={50}
                            />
                        <h1 className="text-gray-200">Mega<span className="text-primary-custom">Blog</span></h1>
                    </Link>
                    <p className="text-xs text-white dark:text-gray-300">
                    O MegaBlog é um projeto de demonstração criado para apresentar minhas habilidades com desenvolvimento web moderno, utilizando Next.js, TailwindCSS e integração com CMS headless.</p>
                    <div className="flex gap-2 items-center">
                        <Mail className="w-5 h-5 text-white dark:text-gray-300 max-md:w-4" />
                        <a
                            href={'mailto:karlosmacedo.dev@gmail.com'} className="text-sm text-white dark:text-gray-300 max-md:text-xs">
                            karlosmacedo.dev@gmail.com
                        </a>
                    </div>
                </div>
                <div>
                    <ModeToggle />
                </div>
            </nav>
            <div className="pb-4 w-full max-w-7xl mx-auto flex justify-end max-lg:justify-start px-4">
                <p className="text-xs text-white dark:text-gray-300">© 2025 - MegaBlog - Esse site é uma demonstração</p>
            </div>
        </footer>
    )
}