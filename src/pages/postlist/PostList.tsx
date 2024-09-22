import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PostDate from '../../components/post-date/PostDate';
import usePostContext from '../../context/PostContext';
import fetchRecentPostsTitles from '../../utils/FetchRecentPostsInfos.ts';
import styles from './PostList.module.css';

interface Post {
    title: string;
    date: string;
}

export default function PostList() {
    const { totalPostsNumber } = usePostContext();
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                // 게시물 경로 생성
                const markdownPaths = Array.from(
                    { length: totalPostsNumber },
                    (_, i) => `/markdowns/posts/${totalPostsNumber - i}.md`
                );

                // 네트워크 요청 병렬 처리
                const titles = await fetchRecentPostsTitles(markdownPaths);
                setPosts(titles);
            } catch (err) {
                console.error('Failed to fetch posts:', err);
            }
        };

        fetchPosts();
    }, [totalPostsNumber]);

    return (
        <main>
            <ul className={styles.postList}>
                {posts.map(({ title, date }, index) => (
                    <li key={`${title}-${date}`}>
                        <article className={styles.postItem}>
                            <Link
                                to={`/post/${totalPostsNumber - index}`}
                                className={styles.postTitle}
                            >
                                {title}
                            </Link>
                            <PostDate date={date} className={styles.postDate} />
                        </article>
                    </li>
                ))}
            </ul>
        </main>
    );
}
