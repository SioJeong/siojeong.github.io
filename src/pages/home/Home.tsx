import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import fetchRecentPostsTitles from '../../utils/FetchRecentPostsInfos.ts';
import styles from './Home.module.css';
import { usePostContext } from '../../context/usePostContext.ts';

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
            <section>
                <h1 className={styles.recentPostsTitle}>Recently Posted</h1>
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
