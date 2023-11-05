'use client'
import { useState, useEffect } from 'react';
import styles from './List.module.css';
import Card from '@/components/Card'
import { sortArrayByFirstLetter } from '@/util';
import { revalidateContacts } from '@/actions';

type Contact = {
    id: number;
    first_name: string;
    last_name: string;
    job: string;
    description: string;
}

type ListProps = {
    contacts: Contact[]
}

function List({ contacts }: ListProps) {
    const [sortMode, setSortMode] = useState('');
    const [dataSorted, setDataSorted] = useState<Contact[]>([]);

    useEffect(() => {
        revalidateContacts();
    }, [])

    useEffect(() => {
        if (sortMode === 'asc') {
            setDataSorted(sortArrayByFirstLetter(contacts, 'asc'));
        } else if (sortMode === 'desc') {
            setDataSorted(sortArrayByFirstLetter(contacts, 'desc'));
        } else {
            setDataSorted([]);
        }
    }, [contacts, sortMode]);

    return (
        <>
            <div className={styles.btngroup}>
                <button className={`btn toggle ${sortMode === 'asc' ? 'selected' : ''}`} onClick={() => setSortMode('asc')}>Sort A-Z</button>
                <button className={`btn toggle ${sortMode === 'desc' ? 'selected' : ''}`} onClick={() => setSortMode('desc')}>Sort Z-A</button>
            </div>
            <ul className={styles.list}>
                {
                    dataSorted.length > 0 ? (
                        dataSorted.map((contact: Contact) => <Card key={contact.id} contact={contact} />)
                    ) : (
                        contacts.map((contact: Contact) => <Card key={contact.id} contact={contact} />)
                    )
                }
            </ul>
        </>
    )
}

export default List