'use client'

import { supabaseBrowser } from '@/utils/supabase/browser';
import { useState } from 'react';


export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);

    // async function signIn() {
    //     const { error } = await supabase.auth.signInWithOtp({ email })
    //     if (error) setSent(true)
    // }
    const login = async (email: string) => {
        const { error } = await supabaseBrowser.auth.signInWithOtp({ email });
        if (error) {
            throw new Error(error.message);
        }
        setSent(true);
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-sm space-y-4">
                <h1 className="text-2xl font-semibold">Sign in</h1>

                {sent ? (
                    <p>Check your email for the login link.</p>
                ) : (
                    <>
                        <input
                            className="w-full border p-2 rounded"
                            placeholder="you@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button
                            className="w-full bg-black text-white p-2 rounded"
                            onClick={() => login(email)}
                        >
                            Send magic link
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}