import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import PostDate from '../../components/post-date/PostDate';
import { usePostContext } from '../../context/usePostContext.ts';
import fetchPostInfos from '../../utils/fetchPostInfos.ts';
import styles from './PostList.module.css';

interface Post {
    id: number;
    title: string;
    date: string;
    tag: string[];
}

export default function PostList() {
    const { totalPostsNumber } = usePostContext();

    const skeletonPosts = Array.from({ length: totalPostsNumber }, (_, idx) => ({
        id: -1 * (idx + 1),
        title: '',
        date: '',
        tag: [],
    }));

    const [posts, setPosts] = useState<Post[]>(skeletonPosts);
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

                const fetchedPosts = await fetchPostInfos(markdownPaths);
                setPosts(fetchedPosts);

                // 모든 tag 수집 후 중복 제거
                const tags = new Set<string>();
                fetchedPosts.forEach((post) => {
                    post.tag.forEach((t) => tags.add(t));
                });
                setAllTags([...tags].sort());
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
                <select
                    value={selectedTag}
                    onChange={handleTagChange}
                    className={styles.selectBox}
                    aria-label="tag-filter"
                >
                    <option value="">filter ↓</option>
                    {allTags.map((tag) => (
                        <option key={tag} value={tag}>
                            {tag}
                        </option>
                    ))}
                </select>
            </div>
            <ul className={styles.postList}>
                {filteredPosts.map(({ id, title, date }) => {
                    const isSkeleton = id < 0;

                    // 스켈레톤
                    if (isSkeleton) {
                        return (
                            <li key={id} className={styles.skeletonPostItem}>
                                <div className={styles.skeletonTitle} />
                            </li>
                        );
                    }

                    // 실제 데이터
                    return (
                        <li key={`${title}-${date}`}>
                            <article className={styles.postItem}>
                                <Link to={`/post/${id}`} className={styles.postTitle}>
                                    {title}
                                </Link>
                                {/* <PostDate date={date} className={styles.postDate} /> */}
                            </article>
                        </li>
                    );
                })}
            </ul>
        </main>
    );
}
