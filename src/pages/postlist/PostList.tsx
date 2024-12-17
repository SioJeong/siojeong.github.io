import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import PostDate from '../../components/post-date/PostDate';
import { usePostContext } from '../../context/usePostContext.ts';
import fetchRecentPostsTitles from '../../utils/FetchRecentPostsInfos.ts';
import styles from './PostList.module.css';

interface Post {
    title: string;
    date: string;
    tag: string[];
}

export default function PostList() {
    const { totalPostsNumber } = usePostContext();
    const [posts, setPosts] = useState<Post[]>([]);
    const [allTags, setAllTags] = useState<string[]>([]);
    const [selectedTag, setSelectedTag] = useState<string>('');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                // 게시물 경로 생성
                const markdownPaths = Array.from(
                    { length: totalPostsNumber },
                    (_, i) => `/markdowns/posts/${totalPostsNumber - i}.md`
                );

                const fetchedPosts = await fetchRecentPostsTitles(markdownPaths);
                setPosts(fetchedPosts);

                // 모든 tag 수집 후 중복 제거
                const tags = new Set<string>();
                fetchedPosts.forEach((post) => {
                    post.tag.forEach((t) => tags.add(t));
                });
                setAllTags([...tags]);
            } catch (err) {
                console.error('Failed to fetch posts:', err);
            }
        };

        fetchPosts();
    }, [totalPostsNumber]);

    const handleTagChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTag(e.target.value);
    };

    // tag 필터링 로직 적용
    const filteredPosts = selectedTag
        ? posts.filter((post) => post.tag.includes(selectedTag))
        : posts;

    return (
        <main>
            <div className={styles.filter}>
                <label htmlFor="tag-filter"></label>
                <select
                    id="tag-filter"
                    value={selectedTag}
                    onChange={handleTagChange}
                    className={styles.selectBox}
                >
                    <option value="">None</option>
                    {allTags.map((tag) => (
                        <option key={tag} value={tag}>
                            {tag}
                        </option>
                    ))}
                </select>
            </div>
            <ul className={styles.postList}>
                {filteredPosts.map(({ title, date }, index) => (
                    <li key={`${title}-${date}`}>
                        <article className={styles.postItem}>
                            <Link
                                to={`/post/${totalPostsNumber - index}`}
                                className={styles.postTitle}
                            >
                                {title}
                            </Link>
                            {/* <PostDate date={date} className={styles.postDate} /> */}
                        </article>
                    </li>
                ))}
            </ul>
        </main>
    );
}
