import { redirect } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { createInitialSpaceIfMissing } from "../actions/init-space";

export default async function DashboardPage() {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const {
        data: {user},
    } = await supabase.auth.getUser()
    
    if (!user) {
        redirect("/login")
    }

    await createInitialSpaceIfMissing(user.id)

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold">Your Memories</h1>
            <p className="text-gray-500 mt-2">
                This is your private space.
            </p>
        </div>
    )
}