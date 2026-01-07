import Link from "next/link";
import HeaderCanvas from "@/components/HeaderCanvas";

export default function NotFound() {
    return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-ct-secondary text-ct-primary">
            <div className="absolute inset-0 z-0 opacity-40 md:opacity-100">
                <HeaderCanvas />
            </div>
            <div className="z-10 flex flex-col items-center gap-6 mix-blend-normal">
                <h1 className="font-lastik text-[12rem] leading-none">404</h1>
                <p className="font-instrument text-4xl uppercase">This is awks...</p>
                <Link
                    href="/"
                    className="mt-8 px-8 py-3 border-2 border-ct-primary text-ct-primary hover:bg-ct-primary hover:text-ct-secondary font-instrument uppercase text-2xl transition-colors"
                >
                    Go home
                </Link>
            </div>
        </div>
    );
}
