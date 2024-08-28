import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

export default function Header() {
    return (
        <>
            <div className={styles.container}>
                <NavLink
                    to="/"
                    className={({ isActive }) => (isActive ? styles.activeLink : undefined)}
                >
                    Home
                </NavLink>
                <NavLink
                    to="/post"
                    className={({ isActive }) => (isActive ? styles.activeLink : undefined)}
                >
                    Post
                </NavLink>
                <NavLink
                    to="/about"
                    className={({ isActive }) => (isActive ? styles.activeLink : undefined)}
                >
                    About
                </NavLink>
            </div>
        </>
    );
}
