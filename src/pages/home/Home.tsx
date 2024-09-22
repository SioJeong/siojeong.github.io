import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import usePostContext from '../../context/PostContext';
import fetchRecentPostsTitles from '../../utils/FetchRecentPostsInfos.ts';
import styles from './Home.module.css';

const RECENT_POSTS_STANDARD = 5;

interface PostTitle {
    title: string;
}

export default function Home() {
    const { totalPostsNumber } = usePostContext();
    const [recentPostsTitles, setRecentPostsTitles] = useState<PostTitle[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const markdownPaths = Array.from(
                    { length: RECENT_POSTS_STANDARD },
                    (_, i) => `/markdowns/posts/${totalPostsNumber - i}.md`
                );

                const titles = await fetchRecentPostsTitles(markdownPaths);
                setRecentPostsTitles(titles.slice(0, RECENT_POSTS_STANDARD));
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [totalPostsNumber]);

    return (
        <main>
            <section className={styles.audioContainer}>
                <a
                    href="https://music.apple.com/kr/playlist/24%EB%85%84-9%EC%9B%94/pl.u-AkAmPNyt27LV71x"
                    target="_blank"
                >
                    <img src="/audio.jpg" className={styles.audio} alt="audio" />
                </a>
            </section>
            <h1 className={styles.recentPostsTitle}>Recently Posted</h1>
            <section>
                <nav>
                    <ul className={styles.recentPostsList}>
                        {recentPostsTitles.map(({ title }, index) => (
                            <li key={index} className={styles.recentPostItem}>
                                <Link to={`/post/${totalPostsNumber - index}`}>
                                    {title || 'None'}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </section>
        </main>
    );
}
