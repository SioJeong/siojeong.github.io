import styles from './About.module.css';

export default function About() {
    return (
        <main className={styles.aboutContainer}>
            <section>
                <h2>
                    안녕하세요
                    <br />
                    제품의 가치를 화면에 녹여내는,
                    <br />
                    Frontend Engineer 정상영입니다
                </h2>
            </section>
            <section>
                <h2>resume & portfolio</h2>
                <ul>
                    <li>
                        <a href="https://foremost-pasta-075.notion.site/Frontend-Engineer-146778bc7a0180729cdcf1d428d77d80">
                            notion
                        </a>
                    </li>
                </ul>
            </section>
            <section>
                <h2>contact</h2>
                <ul>
                    <li>jeongsangyoung.dev@gmail.com</li>
                    <li>
                        <a href="https://github.com/SioJeong">github</a>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/in/siojeong">linkedIn</a>
                    </li>
                </ul>
            </section>
        </main>
    );
}
