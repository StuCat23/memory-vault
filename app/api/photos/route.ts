import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
    const { memoryId, imageUrl } = await req.json();

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const { error } = await supabase.from('photos').insert({
        memory_id: memoryId,
        image_url: imageUrl,
    })

    if (error) {
        return NextResponse.json({ error }, { status: 500 })
    }

    return NextResponse.json({ success: true }, { status: 200 })
}