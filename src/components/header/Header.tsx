import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

export default function Header() {
    return (
        <header>
            <nav className={styles.container}>
                <ul className={styles.navList}>
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) => (isActive ? styles.activeLink : undefined)}
                        >
                            Home
                        </NavLink>
                    </li>
                    {/* <li>
                        <NavLink
                            to="/post"
                            className={({ isActive }) => (isActive ? styles.activeLink : undefined)}
                        >
                            Post
                        </NavLink>
                    </li> */}
                    <li>
                        <NavLink
                            to="/about"
                            className={({ isActive }) => (isActive ? styles.activeLink : undefined)}
                        >
                            About
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
