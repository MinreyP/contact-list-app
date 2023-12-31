'use client'
import styles from './card.module.css'
import { generateProfileIcon } from '@/util';
import { useRouter } from 'next/navigation'
import { deleteContact } from '@/actions';

type Contact = {
    id: number;
    first_name: string;
    last_name: string;
    job: string;
    description: string;
}

type CardProps = {
    contact: Contact;
}

function Card({ contact }: CardProps) {
    const router = useRouter();
    const { id, first_name, last_name, job, description } = contact;
    const contactInitial = generateProfileIcon(first_name, last_name);

    async function handleDelete(id: string) {
        const res = await deleteContact(id);
        console.log(res);
        if (res) {
            window.location.reload();
        }
    }

    return (
        <>
            <li className={styles.card}>
                <span className={styles.initial}>{...contactInitial}</span>
                <h5 className={styles.name}>{first_name} {last_name}</h5>
                <h6 className={styles.job}>{job}</h6>
                <hr className={styles.decoline} />
                <p className={styles.descript}>{description}</p>
                <div className={styles.btngroup}>
                    <button className="btn outline"
                        onClick={() => router.push(`/contacts/edit/${id}`)}>
                        Edit
                    </button>
                    <button className="btn outline"
                        style={{ color: "#db3030", borderColor: "#db3030" }}
                        onClick={() => handleDelete(`${id}`)}>
                        Delete
                    </button>
                </div>
            </li>
        </>
    )
}

export default Card