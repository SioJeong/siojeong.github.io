import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MarkdownRenderer from '../../components/markdown-renderer/MarkdownRenderer';
import usePostContext from '../../context/PostContext';
import fetchRecentPostsTitles from '../../utils/FetchRecentPostsInfos.ts';
import styles from './Home.module.css';

const RECENT_POSTS_STANDARD = 5;

interface PostTitle {
    title: string;
}

export default function Home() {
    const { totalPostsNumber } = usePostContext();
    const [markdown, setMarkdown] = useState<string>('');
    const [recentPostsTitles, setRecentPostsTitles] = useState<PostTitle[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 네트워크 요청 병렬 처리
                const markdownResponse = fetch(`/markdowns/home/intro.md`);
                const markdownPaths = Array.from(
                    { length: RECENT_POSTS_STANDARD },
                    (_, i) => `/markdowns/posts/${totalPostsNumber - i}.md`
                );

                const titlesPromise = fetchRecentPostsTitles(markdownPaths);
                const [markdownResult, titles] = await Promise.all([
                    markdownResponse,
                    titlesPromise,
                ]);

                if (!markdownResult.ok) throw new Error('Failed to fetch markdown file');
                const text = await markdownResult.text();
                setMarkdown(text);
                setRecentPostsTitles(titles.slice(0, RECENT_POSTS_STANDARD));
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [totalPostsNumber]);

    return (
        <div>
            <img src="/Symbol.svg" alt="Symbol" className={styles.symbol} />
            <iframe
                allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
                frameBorder="0"
                height="450"
                style={{
                    width: '100%',
                    maxWidth: '660px',
                    overflow: 'hidden',
                    borderRadius: '10px',
                }}
                sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
                src="https://embed.music.apple.com/kr/playlist/24%EB%85%84-9%EC%9B%94/pl.u-AkAmPNyt27LV71x"
            />
            <MarkdownRenderer markdown={markdown} />
            <h1 className={styles.recentPostsTitle}>Recently Posted</h1>
            <ul className={styles.recentPostsList}>
                {recentPostsTitles.map(({ title }, index) => (
                    <li key={index} className={styles.recentPostItem}>
                        <Link to={`/post/${totalPostsNumber - index}`}>{title || 'None'}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
