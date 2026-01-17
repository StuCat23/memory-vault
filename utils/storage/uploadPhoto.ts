import { supabaseBrowser } from '@/utils/supabase/browser';

export async function uploadPhoto(
    spaceId: string,
    memoryId: string,
    file: File
) {
    const filePath = `${spaceId}/${memoryId}/${crypto.randomUUID()}`;

    const { error } = await supabaseBrowser.storage
        .from('memory-photos')
        .upload(filePath, file)

    if (error) {
        throw error;
    }

    return filePath;
}