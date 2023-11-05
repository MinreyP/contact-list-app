'use server'

import { revalidatePath } from "next/cache"

const api_base = 'http://localhost:3000/api';

export async function getContacts() {
    const res = await fetch(`${api_base}/contacts`, { next: { tags: ['contacts'] } });
    if (!res.ok) {
        throw new Error('Failed to fetch contacts')
    }

    return res.json()
}

export async function revalidateContacts() {
    revalidatePath('/contacts');
}

export async function getSingleContact(id: string) {
    const res = await fetch(`${api_base}/contacts/${id}`, { next: { tags: ['contact'] } });
    if (!res.ok) {
        throw new Error('Failed to fetch contacts')
    }

    return res.json()
}

export async function createNewContact(body: {}) {
    const options = {
        method: 'POST',
        body: JSON.stringify(body)
    };

    let result: boolean = false;

    try {
        const res = await fetch(`${api_base}/contacts`, options);
        if (!res.ok) {
            throw new Error('Failed to fetch contacts')
        }

        const responseData = await res.json();
        if (responseData.statusCode === 201) {
            result = true;
        }
    } catch (err) {
        console.error('Error:', err);
    }

    return result;
}

export async function updateContact(body: {}, id: string) {
    const options = {
        method: 'PATCH',
        body: JSON.stringify(body)
    };

    let result: boolean = false;

    try {
        const res = await fetch(`${api_base}/contacts/${id}`, options);
        if (!res.ok) {
            throw new Error('Failed to fetch contacts')
        }

        const responseData = await res.json();
        if (responseData.statusCode === 201) {
            result = true;
        }
    } catch (err) {
        console.error('Error:', err);
    }

    return result;
}


export async function deleteContact(id: string) {
    const res = await fetch(`${api_base}/contacts/${id}`, { method: 'DELETE' });
    if (!res.ok) {
        throw new Error('Failed to fetch contacts')
    }

    return res.json()
}