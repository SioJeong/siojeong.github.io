import styles from './Footer.module.css';

export default function Header() {
    return (
        <nav className={styles.container}>
            <a href="https://github.com/SioJeong" target="_blank">
                <img src="/nav-icons/github.svg" alt="github" />
            </a>
            <a href="https://www.linkedin.com/in/siojeong" target="_blank">
                <img src="/nav-icons/linkedin.svg" alt="linkedin" />
            </a>
            <a href="https://blog.naver.com/jeongsangyoung" target="_blank">
                <img src="/nav-icons/blog.svg" alt="naver blog" />
            </a>
        </nav>
    );
}
