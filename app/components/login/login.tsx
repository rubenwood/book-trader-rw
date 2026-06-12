"use client";

import { createClient } from "@/lib/supabase/client";
import { useState } from "react";

export function Login(){

    const login = async (email: string, password: string) => {
        const supabase = createClient();
        const result = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        console.log(result);
        // TODO: redirect to main page on successful login        
        window.location.href = "/";
    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="h-screen flex flex-col bg-zinc-50 center items-center dark:bg-black">
            <h1 className="mt-8 mb-6 text-center text-3xl font-bold">Login</h1>
            <br/>
            <div className="flex-1">
                <input
                    type="text"
                    placeholder="Username"
                    className="block w-full max-w-sm mx-auto px-4 py-2 mb-4 border rounded-md focus:ring focus:ring-blue-300"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="block w-full max-w-sm mx-auto px-4 py-2 mb-4 border rounded-md focus:ring focus:ring-blue-300"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    className="block w-full max-w-sm mx-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
                    onClick={() => login(email, password)}
                >
                    Login
                </button>
            </div>
        </div>
    );
}