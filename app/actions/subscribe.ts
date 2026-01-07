"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function subscribe(formData: FormData) {
    const email = formData.get("email") as string;

    if (!email) {
        return { error: "Email is required" };
    }

    if (!process.env.RESEND_API_KEY) {
        // Fallback for development if no API Key is set yet
        console.log("Mock Subscription (No API Key):", email);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        return { success: true };
    }

    try {
        await resend.contacts.create({
            email: email,
        });
        return { success: true };
    } catch (error) {
        console.error("Resend Error:", error);
        return { error: "Failed to subscribe. Please try again." };
    }
}
