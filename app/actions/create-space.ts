'use server'

import { supabaseServer } from '@/utils/supabase/server'

export async function createInitialSpace(userId: string) {
  const supabase = supabaseServer()

  const { data: space } = await supabase
    .from('spaces')
    .insert({})
    .select('*')
    .single()

  await supabase
    .from('space_members')
    .insert({ space_id: space.id, user_id: userId, role: 'owner' })

  return space.id
}
