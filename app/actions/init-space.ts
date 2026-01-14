'use server'

import { createClient } from '@supabase/supabase-js'

export async function createInitialSpaceIfMissing(userId: string) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data: existing } = await supabase
    .from('space_members')
    .select('space_id')
    .eq('user_id', userId)
    .maybeSingle()

  if (existing) return existing.space_id

  const { data: space, error } = await supabase
    .from('spaces')
    .insert({})
    .select()
    .single()

  if (error) throw error

  await supabase.from('space_members').insert({
    space_id: space.id,
    user_id: userId,
    role: 'owner',
  })

  return space.id
}
