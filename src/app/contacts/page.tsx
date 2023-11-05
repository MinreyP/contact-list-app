import styles from '@/app/page.module.css';
import Link from 'next/link';
import { getContacts, revalidateContacts } from '@/actions';
import List from '@/components/List';

async function AllContacts() {
    const res = await getContacts();
    revalidateContacts();
    const { data } = res;

    return (
        <main className={styles.main}>
            <h2>All Contacts Page</h2>
            <Link href="/contacts/add">
                <button className="btn">Add Contacts</button>
            </Link>
            <List contacts={data} />
        </main>
    )
}

export default AllContacts