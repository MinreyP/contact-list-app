import Link from "next/link"

function Header() {
    return (
        <header className="header">
            <nav className="nav">
                <h1><Link href="/">ContactList App</Link></h1>
                <ul>
                    <Link href="/contacts"><li>All Contacts</li></Link>
                </ul>
            </nav>
        </header>
    )
}

export default Header