import Link from "next/link"

function Header() {
    return (
        <div>
            <nav>
                <h1><Link href="/">ContactList App</Link></h1>
                <ul>
                    <Link href="/contacts"><li>All Contacts</li></Link>
                </ul>
            </nav>
        </div>
    )
}

export default Header