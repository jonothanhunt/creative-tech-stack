"use client";

import { useState } from "react";
import { TfiArrowRight, TfiCheck } from "react-icons/tfi";
import { subscribe } from "@/app/actions/subscribe";

export default function SubscribeForm() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        const formData = new FormData();
        formData.append("email", email);

        const result = await subscribe(formData);

        if (result.success) {
            setStatus("success");
        } else {
            console.error(result.error);
            setStatus("error");
            alert("Something went wrong. Please try again.");
            setStatus("idle");
        }
    };

    return (
        <div className="w-full bg-ct-primary text-ct-secondary">

            <div className="p-4 border-b-2 border-ct-secondary flex items-center justify-center">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-instrument uppercase text-center text-balance leading-tight">
                    Register your interest for the future email edition.
                </h3>
            </div>


            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row w-full items-stretch">
                <input
                    type="email"
                    required
                    placeholder="YOUR@EMAIL.COM"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === "success" || status === "loading"}
                    className="flex-grow bg-transparent border-b-2 sm:border-b-0 sm:border-r-2 border-ct-secondary p-4 text-xl sm:text-2xl font-instrument uppercase placeholder:text-ct-secondary/50 focus:outline-none focus:bg-ct-secondary/5 transition-colors rounded-none disabled:text-opacity-50"
                />
                <button
                    type="submit"
                    disabled={status === "loading" || status === "success"}
                    className="group bg-transparent hover:bg-ct-secondary hover:text-ct-primary px-8 py-4 flex items-center justify-center transition-colors disabled:hover:bg-transparent disabled:hover:text-ct-secondary sm:w-auto sm:min-w-[200px]"
                >
                    <span className="text-xl sm:text-2xl font-instrument uppercase group-hover:text-ct-primary whitespace-nowrap group-disabled:opacity-50">
                        {status === "loading" ? "..." : status === "success" ? "SIGNED UP" : "SIGN UP"}
                    </span>
                    {status === "success" ? (
                        <TfiCheck className="ml-3 h-6 w-6 text-ct-secondary opacity-50 transition-colors" />
                    ) : (
                        <TfiArrowRight className="ml-3 h-6 w-6 group-hover:text-ct-primary transition-colors group-disabled:opacity-50" />
                    )}
                </button>
            </form>
        </div>
    );
}
