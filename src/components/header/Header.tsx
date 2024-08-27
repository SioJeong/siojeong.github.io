import { Link } from 'react-router-dom';
import styles from './Header.module.css';

export default function Header() {
    return (
        <>
            <div className={styles.container}>
                <Link to={'/'}>home</Link>
                <Link to={'/post'}>post</Link>
                <Link to={'/about'}>about</Link>
            </div>
        </>
    );
}
