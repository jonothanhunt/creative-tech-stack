import Link from "next/link";
import { TfiGithub } from "react-icons/tfi";
import { Contributor } from "@/lib/contributors";
import Image from "next/image";

interface FooterProps {
    contributors?: Contributor[];
}

export default function Footer({ contributors = [] }: FooterProps) {
    return (
        <footer className="w-full py-20 px-4 bg-ct-secondary mt-20 flex flex-col items-center justify-center text-center gap-8">
            <h3 className="font-lastik text-5xl sm:text-6xl font-[50] text-ct-primary text-balance max-w-3xl leading-[0.9]">
                Creative Tech Stack is open source.
            </h3>
            <p className="font-instrument text-xl sm:text-2xl text-ct-primary/50 max-w-lg text-balance">
                Whether you&apos;re an experienced technologist or just starting out, please add a post or tool to the stack!
            </p>
            <Link
                href="https://github.com/jonothanhunt/creative-tech-stack"
                className="group flex items-center gap-3 px-8 py-4 bg-ct-primary text-ct-secondary font-instrument text-xl uppercase tracking-wide hover:bg-transparent hover:text-ct-primary border-2 border-ct-primary transition-all duration-300"
            >
                <TfiGithub className="w-6 h-6" />
                <span>Contribute on GitHub</span>
            </Link>

            {contributors.length > 0 && (
                <div className="flex flex-col items-center gap-4 mt-8">
                    <div className="flex flex-wrap justify-center gap-x-8 gap-y-6 max-w-2xl px-4">
                        {contributors.map((contributor) => (
                            <a
                                key={contributor.login}
                                href={contributor.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-2 transition-opacity hover:opacity-50"
                                title={contributor.login}
                            >
                                <div className="relative w-10 h-10 shrink-0 overflow-hidden rounded-full bg-[#FFEDA3] border-2 border-ct-primary">
                                    <Image
                                        src={contributor.avatar_url}
                                        alt={contributor.login}
                                        fill
                                        className="object-cover grayscale mix-blend-multiply"
                                    />
                                    <div className="absolute inset-0 bg-[#100037] mix-blend-lighten pointer-events-none" />
                                </div>
                                <span className="font-sans text-base text-ct-primary transition-colors">
                                    {contributor.login}
                                </span>
                            </a>
                        ))}
                    </div>
                    <p className="font-sans text-xs text-ct-primary/50">
                        Dynamically pulled from{" "}
                        <a
                            href="https://github.com/jonothanhunt/creative-tech-stack/commits/main"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline underline-offset-4 hover:text-ct-primary transition-colors"
                        >
                            GitHub contributions
                        </a>
                    </p>
                </div>
            )}
            <div className="mt-12 font-sans text-sm text-ct-primary/50">
                &copy; {new Date().getFullYear()} Creative Tech Stack
            </div>
        </footer>
    );
}
