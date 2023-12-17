'use server'

import { revalidatePath } from "next/cache"

const api_base = 'http://localhost:3000/api';

export async function getContacts() {
    revalidateContacts();
    const res = await fetch(`${api_base}/contacts`);
    if (!res.ok) {
        throw new Error('Failed to fetch contacts')
    }

    return res.json()
}

export async function revalidateContacts() {
    revalidatePath('/contacts');
}

export async function getSingleContact(id: string) {
    const res = await fetch(`${api_base}/contacts/${id}`);
    if (!res.ok) {
        throw new Error('Failed to fetch contacts')
    }

    return res.json()
}

export async function createNewContact(body: {}) {
    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
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
        headers: {
            "Content-Type": "application/json"
        },
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

export async function handleForm(prevState: any, queryData: FormData) {
    let nextState = { status: false, message: 'failed to update. try again later.' };
    const formMode = queryData.get('form_mode');
    const contactId = queryData.get('contact_id');
    const formBody = {
        first_name: queryData.get('first_name'),
        last_name: queryData.get('last_name'),
        job: queryData.get('job'),
        description: queryData.get('description'),
    }
    if (formMode === 'edit') {
        const apiBody = { info: { ...formBody } }
        const res = await updateContact(apiBody, `${contactId}`);
        if (res) {
            console.log(`${formMode}:'Form Submit Successfully`);
            nextState = { status: true, message: 'sucessfully updated the contact' };
            revalidateContacts();
        }
    }
    if (formMode === 'add') {
        const apiBody = { contact: { ...formBody } };
        const res = await createNewContact(apiBody);
        if (res) {
            console.log(`${formMode}:'Form Submit Successfully`);
            nextState = { status: true, message: 'sucessfully added a contact' }
            revalidateContacts();
        }
    }
    return nextState;
}