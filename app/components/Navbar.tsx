import Link from "next/link";
import Image from 'next/image'
import { ModeToggle } from "./ModeToggle";
import SearchInput from "./SearchInput";

export default function Navbar() {
    return (
        <header className="w-full bg-primary shadow-[0_2px_4px_#04032b46] dark:shadow-[0_2px_4px_#89bc572d] fixed z-20 h-20 flex items-center top-0">
            <nav className="w-full relative flex items-center justify-between max-w-7xl mx-auto px-4 py-2">
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
                <div className="flex items-center gap-2">
                    <SearchInput />
                    <div className="flex gap-2">
                        <a
                            href={`https://wa.me/`}
                            title="Compartilhe no whatsapp"
                            target="_blank"
                            className="shrink-0 h-10 w-10 max-md:h-8 max-md:w-8 rounded-full bg-primary-custom"
                            rel="noopener noreferrer"
                        >
                            <Image
                                src="/images/instagram-w.png"
                                alt="Logo do site"
                                className="rounded-lg object-cover h-full w-full"
                                width={50}
                                height={50}
                            />
                        </a>
                        <a
                            href={`https://www.facebook.com/`}
                            target="_blank"
                            title="Compartilhe no facebook"
                            className="shrink-0 h-10 w-10 max-md:h-8 max-md:w-8 rounded-full bg-primary-custom"
                            rel="noopener noreferrer"
                        >
                            <Image
                                src="/images/facebook-w.png"
                                alt="Logo do site"
                                className="rounded-lg object-cover h-full w-full"
                                width={50}
                                height={50}
                            />
                        </a>
                        <a
                            href={`https://twitter.com/`}
                            target="_blank"
                            title="Compartilhe no twitter"
                            className="shrink-0 h-10 w-10 max-md:h-8 max-md:w-8 rounded-full bg-primary-custom"
                            rel="noopener noreferrer"
                        >
                            <Image
                                src="/images/twitter-w.png"
                                alt="Logo do site"
                                className="rounded-lg object-cover h-full w-full"
                                width={50}
                                height={50}
                            />
                        </a>
                    </div>
                    {/* <ModeToggle /> */}
                </div>
            </nav>
        </header>
    )
}