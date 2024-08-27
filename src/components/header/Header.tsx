import { Link } from 'react-router-dom';
import styles from './Header.module.css';

export default function Header() {
    return (
        <>
            <div className={styles.container}>
                <Link to={'/'}>Home</Link>
                <Link to={'/post'}>Post</Link>
                <Link to={'/about'}>About</Link>
            </div>
        </>
    );
}
