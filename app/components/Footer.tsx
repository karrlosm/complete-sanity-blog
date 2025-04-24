import Link from "next/link";
import Image from 'next/image'
import { ModeToggle } from "./ModeToggle";

export default function Footer() {
    return (
        <footer className="w-full bg-primary shadow-[4px_2px_0_#04032b46] dark:shadow-[4px_2px_0_#89bc572d] relative flex flex-col mt-5">
            <nav className="w-full relative flex justify-between max-w-7xl mx-auto px-4 py-4">
                <div className="max-w-80 flex flex-col gap-2">
                    <Link href={"/"} className="font-bold text-3xl">
                        <Image
                            src="/images/blog-logo.jpg"
                            alt="Logo do site"
                            className="rounded-lg object-cover"
                            width={50}
                            height={50}
                            />
                    </Link>
                    <p className="text-xs text-white dark:text-gray-300">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi cum, nobis ullam quae aspernatur voluptatem culpa nemo distinctio officiis asperiores excepturi! Rem, in ipsa neque quasi consectetur hic iste molestiae?</p>
                </div>
                <div>
                    <ModeToggle />
                </div>
            </nav>
            <div className="pb-4 w-full max-w-7xl mx-auto flex justify-end max-lg:justify-start px-4">
                <p className="text-xs text-white dark:text-gray-300">© 2025 - Blog Teste - Todos os direitos reservados</p>
            </div>
        </footer>
    )
}