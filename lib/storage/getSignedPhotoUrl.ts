import { supabaseBrowser } from '@/utils/supabase/browser';

export async function getSignedPhotoUrl(path: string) {
    const { data, error } = await supabaseBrowser.storage
        .from('memory-photos')
        .createSignedUrl(path, 60 * 60); // URL valid for 1 hour

    if (error) {
        throw error;
    }
    
    return data.signedUrl;
}