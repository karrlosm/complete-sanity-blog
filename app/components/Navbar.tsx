import Link from "next/link";
import Image from 'next/image'
import { ModeToggle } from "./ModeToggle";

export default function Navbar() {
    return (
        <header className="w-full bg-primary shadow-[0_2px_4px_#04032b46] dark:shadow-[0_2px_4px_#89bc572d] fixed z-20 h-20 flex items-center top-0">
            <nav className="w-full relative flex items-center justify-between max-w-7xl mx-auto px-4 py-2">
                <Link href={"/"} className="font-bold text-3xl">
                    <Image
                        src="/images/blog-logo.jpg"
                        alt="Logo do site"
                        className="rounded-lg object-cover"
                        width={50}
                        height={50}
                        />
                </Link>
                <ModeToggle />
            </nav>
        </header>
    )
}