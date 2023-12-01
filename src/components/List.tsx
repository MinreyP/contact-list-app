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

enum SortMode {
    Asc = 'asc',
    Desc = 'desc'
}

function List({ contacts }: ListProps) {
    const [sortMode, setSortMode] = useState<SortMode | ''>('');
    const [dataSorted, setDataSorted] = useState<Contact[]>([]);

    useEffect(() => {
        console.log('revalidate contacts called');
        revalidateContacts();
    }, [])

    useEffect(() => {
        console.log('Rerendered: Contacts, Sortmode changed');
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
                <button className={`btn toggle ${sortMode === SortMode.Asc ? 'selected' : ''}`} onClick={() => setSortMode(SortMode.Asc)}>Sort A-Z</button>
                <button className={`btn toggle ${sortMode === SortMode.Desc ? 'selected' : ''}`} onClick={() => setSortMode(SortMode.Desc)}>Sort Z-A</button>
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