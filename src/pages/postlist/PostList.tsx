import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import fetchRecentPostsTitles from '../../utils/FetchRecentPostsInfos.ts';
import usePostContext from '../../context/PostContext';
import PostDate from '../../components/post-date/PostDate';
import styles from './PostList.module.css';

interface Post {
    title: string;
    date: string;
}

export default function PostList() {
    const { totalPostsNumber } = usePostContext();
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        // 모든 게시물 경로 생성
        const markdownPaths = Array.from(
            { length: totalPostsNumber },
            (_, i) => `/markdowns/posts/${totalPostsNumber - i}.md`
        );

        fetchRecentPostsTitles(markdownPaths).then((titles) => setPosts(titles));
    }, [totalPostsNumber]);

    return (
        <div>
            <ul className={styles.postList}>
                {posts.map(({ title, date }, index) => (
                    <li key={index} className={styles.postItem}>
                        <Link to={`/post/${totalPostsNumber - index}`} className={styles.postTitle}>
                            {title}
                        </Link>
                        <PostDate date={date} className={styles.postDate} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
