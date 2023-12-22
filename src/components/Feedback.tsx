'use client'
import { useEffect } from "react"
import { useRouter } from 'next/navigation'
import Image from "next/image"
import styles from "./feedback.module.css"

type FeedbackProps = {
    result: boolean,
    message: string
}

function Feedback({ result, message }: FeedbackProps) {
    const router = useRouter();
    const imgURL = result === true ? '/sucess_illustration.jpeg' : '/err_illustration.png';

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push('/contacts')
        }, 3000)

        return () => {
            clearTimeout(timer);
        }
    }, []);

    return (
        <div className={`${styles.layer}`}>
            <Image
                src={imgURL}
                width={130}
                height={130}
                alt={message}
            />
            <h5 className={styles.status}>
                {
                    result === true ? 'Done!' : 'Opps...'
                }
            </h5>
            <p className={styles.msg}>
                {message}
            </p>
            <p className={styles.close} onClick={() => router.push('/contacts')}>Close</p>
        </div>
    )
}

export default Feedback