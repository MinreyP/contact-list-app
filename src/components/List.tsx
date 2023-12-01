'use client'
import { useState } from 'react';
import styles from './List.module.css';
import Card from '@/components/Card'
import { sortArrayByFirstLetter } from '@/util';

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
    const [contactsData, setContactsData] = useState<Contact[]>(contacts);

    console.log('List compo init');

    function handleSort(mode: SortMode) {
        setSortMode(mode);
        setContactsData((prevContacts) => {
            console.log('sort mode called');
            const sortedContacts = sortArrayByFirstLetter(prevContacts, mode);
            return [...sortedContacts];
        })
    }

    return (
        <>
            <div className={styles.btngroup}>
                <button className={`btn toggle ${sortMode === SortMode.Asc ? 'selected' : ''}`}
                    onClick={() => handleSort(SortMode.Asc)}
                >Sort A-Z</button>
                <button className={`btn toggle ${sortMode === SortMode.Desc ? 'selected' : ''}`}
                    onClick={() => handleSort(SortMode.Desc)}
                >Sort Z-A</button>
            </div>
            <ul className={styles.list}>
                {
                    contactsData.length !== 0 ? (
                        contactsData.map((contact: Contact) => <Card key={contact.id} contact={contact} />)
                    ) : (
                        `Boohoo You don't have any contact`
                    )
                }
            </ul>
        </>
    )
}

export default List