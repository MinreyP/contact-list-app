'use client'
import styles from './form.module.css'
import { useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation'

function FormButtons() {
    const router = useRouter();
    const { pending } = useFormStatus();

    return (
        <div className={styles.formbuttons}>
            <button className={`btn ${styles.cancel}`} type="button" onClick={() => router.push('/contacts')}>
                Cancel
            </button>
            <button className={'btn'} type="submit" aria-disabled={pending}>
                {pending ? '...' : 'Submit'}
            </button>
        </div>
    )
}

export default FormButtons;