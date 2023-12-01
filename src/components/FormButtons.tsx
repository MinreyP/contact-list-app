'use client'
import styles from './form.module.css'
import { useRouter } from 'next/navigation'

function FormButtons() {
    const router = useRouter();

    return (
        <div className={styles.formbuttons}>
            <button className={`btn ${styles.cancel}`} type="button" onClick={() => router.push('/contacts')}>
                Cancel
            </button>
            <button className={'btn'} type="submit" aria-disabled={false}>
                Submit
            </button>
        </div>
    )
}

export default FormButtons;