import Link from "next/link";

export default function Footer() {
    return (
        <footer className="mt-[50vh] pb-8 text-center text-lg text-ct-primary">
            &copy; Jonothan Hunt {new Date().getFullYear()}{" "}
            <Link
                href="https://jonothan.dev"
                className="underline underline-offset-4 hover:bg-ct-primary hover:text-ct-secondary transition-colors"
            >
                Jonothan.dev
            </Link>
        </footer>
    );
}
