import styles from '@/app/page.module.css'

function SingleContact({ params }: { params: { id: string } }) {

    return (
        <main className={styles.main}>
            <h2>Edit Contact#{params.id}</h2>
        </main>
    )
}

export default SingleContact