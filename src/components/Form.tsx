'use client'
import styles from './form.module.css'
import { useState, useEffect } from 'react'
import { revalidateContacts, createNewContact, updateContact } from '@/actions'
import Feedback from './Feedback'
import FormButtons from './FormButtons'

type Contact = {
    id: number;
    first_name: string;
    last_name: string;
    job: string;
    description: string;
}

type FormProps = {
    contact?: Contact,
}

function Form({ contact }: FormProps) {
    const formMode = contact ? 'edit' : 'add';
    const [openMessage, setOpenMessage] = useState(false);
    const [updateResult, setUpdateResult] = useState(false);
    const [formContact, setFormContact] = useState({
        first_name: contact ? (contact.first_name) : '',
        last_name: contact ? (contact.last_name) : '',
        job: contact ? (contact.job) : '',
        description: contact ? (contact.description) : '',
    });

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (formMode === 'edit') {
            // patch api
            const apiBody = { info: { ...formContact } }
            const res = await updateContact(apiBody, `${contact?.id}`);
            if (res) {
                revalidateContacts();
                setUpdateResult(true);
            }
            setOpenMessage(true);
        }
        if (formMode === 'add') {
            // post api
            const apiBody = { contact: { ...formContact } };
            const res = await createNewContact(apiBody);
            console.log(res);
            if (res) {
                setUpdateResult(true);
                revalidateContacts();
            }
            setOpenMessage(true);
            setFormContact({
                first_name: '',
                last_name: '',
                job: '',
                description: '',
            })
        }
    }

    function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { id, value } = e.target;
        const updatedContact = { ...formContact, [id]: value };
        setFormContact(updatedContact);
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setOpenMessage(false);
            setUpdateResult(false);
        }, 3000)

        return () => {
            clearTimeout(timer);
        }
    }, [openMessage, updateResult])

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.group}>
                <div className={styles.set}>
                    <label htmlFor="first_name">First Name <span>required</span></label>
                    <input type="text" name="first_name" id="first_name"
                        placeholder='Jane'
                        value={formContact.first_name}
                        onChange={(e) => handleOnChange(e)}
                        required />
                </div>
                <div className={styles.set}>
                    <label htmlFor="last_name">Last Name <span>required</span></label>
                    <input type="text" name="last_name" id="last_name"
                        placeholder='Doe'
                        value={formContact.last_name}
                        onChange={(e) => handleOnChange(e)}
                        required />
                </div>
            </div>
            <div className={styles.set}>
                <label htmlFor="job" >Job Title <span>required</span></label>
                <input type="text" name="job" id="job"
                    placeholder='Editor'
                    value={formContact.job}
                    onChange={(e) => handleOnChange(e)}
                    required />
            </div>
            <div className={styles.set}>
                <label htmlFor="description">Description <span>required</span></label>
                <input type="text" maxLength={50} name="description" id="description"
                    placeholder='The Penguin Publishing Group'
                    value={formContact.description}
                    onChange={(e) => handleOnChange(e)}
                    required />
            </div>
            <FormButtons />
            {
                openMessage ?
                    (<Feedback result={updateResult} />) : ''
            }
        </form>
    )
}

export default Form