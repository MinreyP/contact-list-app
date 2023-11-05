import styles from '@/app/page.module.css'
import Form from '@/components/Form'
import { getSingleContact } from '@/actions'

async function SingleContact({ params }: { params: { id: string } }) {
    const { data } = await getSingleContact(params.id);

    return (
        <main className={styles.main}>
            <h2>Edit Contact</h2>
            <Form contact={data} />
        </main>
    )
}

export default SingleContact