import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer>
            <nav className={styles.container}>
                <ul className={styles.socialLinks}>
                    <li>
                        <a href="https://github.com/SioJeong" target="_blank">
                            <img src="/nav-icons/github.svg" alt="github" />
                        </a>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/in/siojeong" target="_blank">
                            <img src="/nav-icons/linkedin.svg" alt="linkedin" />
                        </a>
                    </li>
                    
                </ul>
            </nav>
        </footer>
    );
}
