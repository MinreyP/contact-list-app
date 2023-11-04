import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Contact List App</h1>
      <p>Lorem ipsum dolor sit amet consectetur elit! Ea quod non dolorum, ex dolores repellendus quasi commodi architecto doloremque tenetur.</p>
      <div className={styles.wrapper}>
        <Image
          src="/home_backgroud.png"
          fill
          style={{ objectFit: "contain", mixBlendMode: 'darken' }}
          alt="Home Image"
        />
      </div>
      <button className="btn"><Link href="/contacts/add">Add Contacts</Link></button>
    </main>
  )
}
