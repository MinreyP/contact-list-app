import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={`${styles.main} ${styles.index}`}>
      <div className={styles.info}>
        <h1>Contact List App</h1>
        <p>Lorem ipsum dolor sit amet consectetur elit! Ea quod non dolorum, ex dolores repellendus quasi commodi architecto doloremque tenetur.</p>
        <button className="btn"><Link href="/contacts/add">Add Contacts</Link></button>
      </div>
      <Image
        src="/home_backgroud.png"
        width={300}
        height={300}
        style={{ objectFit: "contain", mixBlendMode: 'darken' }}
        alt="Home Image"
      />
    </main>
  )
}
