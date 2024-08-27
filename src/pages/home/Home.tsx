import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MarkdownRenderer from '../../components/markdown-renderer/MarkdownRenderer';
import fetchRecentPostsTitles from '../../utils/FetchRecentPostsInfos.ts';
import usePostContext from '../../context/PostContext';
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
        fetch(`/markdowns/home/intro.md`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch markdown file');
                }
                return response.text();
            })
            .then((text) => setMarkdown(text));

        const markdownPaths: string[] = [];

        for (let i = 0; i < RECENT_POSTS_STANDARD; i++) {
            markdownPaths.push(`/markdowns/posts/${totalPostsNumber - i}.md`);
        }

        fetchRecentPostsTitles(markdownPaths).then((titles) =>
            setRecentPostsTitles(titles.slice(0, RECENT_POSTS_STANDARD))
        );
    }, [totalPostsNumber]);

    return (
        <div>
            <img src="/Symbol.svg" className={styles.symbol} />
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
