'use server'

import { createClient } from '@supabase/supabase-js'

export async function createMemory({
    spaceId,
    userId,
    journalText,
} : {
    spaceId: string,
    userId: string,
    journalText: string,
}) {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const { data, error } = await supabase
        .from('memories')
        .insert({
            space_id: spaceId,
            author_id: userId,
            journal_text: journalText,
        })
        .select()
        .single()

    if (error) {
        throw error
    }

    return data.id
}