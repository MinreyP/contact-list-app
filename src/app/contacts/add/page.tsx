import styles from '@/app/page.module.css'
import Form from '@/components/Form'

function AddContact() {
    return (
        <main className={styles.main}>
            <h2>Add New Contact</h2>
            <Form />
        </main>
    )
}

export default AddContact