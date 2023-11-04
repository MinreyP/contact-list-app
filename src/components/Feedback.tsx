'use client'
import { useEffect, useState } from "react"
import { revalidateContacts } from '@/actions';
import Image from "next/image"
import styles from "./feedback.module.css"

type FeedbackProps = {
    result: boolean
}

function Feedback({ result }: FeedbackProps) {
    const [visable, setVisable] = useState(true);
    const imgURL = result === true ? '/sucess_illustration.jpeg' : '/err_illustration.png';
    const message = result === true ? 'Succefully updated!' : 'It seems something went wrong :(';

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisable(false);
            revalidateContacts();
        }, 3000)

        return () => {
            clearTimeout(timer);
        }
    }, []);

    return (
        <div className={`${styles.layer} ${visable === false && (styles.remove)}`}>
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
            <p className={styles.close} onClick={() => setVisable(false)}>Close</p>
        </div>
    )
}

export default Feedback