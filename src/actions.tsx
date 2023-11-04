'use server'

import { revalidateTag } from "next/cache"

const api_base = 'http://localhost:3000/api';

export async function getContacts() {
    const res = await fetch(`${api_base}/contacts`, { next: { tags: ['contacts'] } });
    if (!res.ok) {
        throw new Error('Failed to fetch contacts')
    }

    return res.json()
}

export async function revalidateContacts() {
    revalidateTag('contacts');
}

export async function deleteContact(id: string) {
    const res = await fetch(`${api_base}/contacts/${id}`, { method: 'DELETE' });
    if (!res.ok) {
        throw new Error('Failed to fetch contacts')
    }

    return res.json()
}