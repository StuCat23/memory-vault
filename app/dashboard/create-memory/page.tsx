'use client'

import { useState } from 'react';
import { createMemory } from '@/app/actions/create-memory';
import { uploadPhoto } from '@/utils/storage/uploadPhoto';
import { useRouter } from 'next/navigation';

export default function CreateMemoryPage() {
    const router = useRouter();

    const [journalText, setJournalText] = useState('');
    const [files, setFiles] = useState<FileList | null>(null);
    const [loading, setLoading] = useState(false);

    // Replace with actual spaceId and userId retrieval logic
    const spaceId = 'example-space-id';
    const userId = 'example-user-id';

    async function handleSubmit() {
        if (!journalText) return;
        setLoading(true);
        try {
            const memoryId = await createMemory({
                spaceId,
                userId,
                journalText,
            })

            if (files) {
                for (const file of Array.from(files)) {
                    const path = await uploadPhoto(spaceId, memoryId, file)

                    await fetch('/api/photos', {
                        method: 'POST',
                        body: JSON.stringify({
                            memoryId,
                            imageUrl: path,
                        }),
                    })
                }
            }

            router.push('/dashboard')
        } catch (error) {
            console.error('Error creating memory:', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-xl mx-auto p-6 space-y-4">
            <h1 className="text-2xl font-semibold">New Memory</h1>

            <textarea
                className="w-full border rounded p-3"
                rows={5}
                placeholder="Write your memory here..."
                value={journalText}
                onChange={(e) => setJournalText(e.target.value)}
            ></textarea>
            <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => setFiles(e.target.files)}
            />

            <button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-black text-white px-4 py-2 rounded"
            >
                {loading ? 'Saving...' : 'Save Memory'}
            </button>
        </div>
    )
}
