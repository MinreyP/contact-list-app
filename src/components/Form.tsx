'use client'
import styles from './form.module.css'
import { ChangeEvent, useState } from 'react'
import { useFormState } from 'react-dom'
import { handleForm } from '@/actions'
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

enum FormMode {
    EDIT = 'edit',
    ADD = 'add'
}

const initialState = { status: null, message: null }

function Form({ contact }: FormProps) {
    const formMode = contact ? FormMode.EDIT : FormMode.ADD;
    const [formContact, setFormContact] = useState({
        first_name: contact ? (contact.first_name) : '',
        last_name: contact ? (contact.last_name) : '',
        job: contact ? (contact.job) : '',
        description: contact ? (contact.description) : '',
    });
    const [state, formAction] = useFormState(handleForm, initialState);

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const { id, value } = e.target;
        const updatedContact = { ...formContact, [id]: value };
        setFormContact(updatedContact);
    }

    return (
        <form className={styles.form} action={formAction}>
            <input type="hidden" name="form_mode" value={formMode} />
            {
                contact && (<input type="hidden" name="contact_id" value={contact && contact.id} />)
            }
            <div className={styles.group}>
                <div className={styles.set}>
                    <label htmlFor="first_name">First Name <span>required</span></label>
                    <input type="text" name="first_name" id="first_name"
                        placeholder='Jane'
                        value={formContact.first_name}
                        onChange={handleChange}
                        required />
                </div>
                <div className={styles.set}>
                    <label htmlFor="last_name">Last Name <span>required</span></label>
                    <input type="text" name="last_name" id="last_name"
                        placeholder='Doe'
                        value={formContact.last_name}
                        onChange={handleChange}
                        required />
                </div>
            </div>
            <div className={styles.set}>
                <label htmlFor="job" >Job Title <span>required</span></label>
                <input type="text" name="job" id="job"
                    placeholder='Editor'
                    value={formContact.job}
                    onChange={handleChange}
                    required />
            </div>
            <div className={styles.set}>
                <label htmlFor="description">Description <span>required</span></label>
                <input type="text" maxLength={50} name="description" id="description"
                    placeholder='The Penguin Publishing Group'
                    value={formContact.description}
                    onChange={handleChange}
                    required />
            </div>
            <FormButtons />
            {
                state?.status === true && (<Feedback result={state.status} message={state.message} />)
            }
            {
                state?.status === false && (<Feedback result={state.status} message={state.message} />)
            }
        </form>
    )
}

export default Form