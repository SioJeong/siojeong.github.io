import matter from 'gray-matter';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostDate from '../../components/post-date/PostDate';
import styles from './PostDetail.module.css';
import PageMetadata from '../../components/common/PageMetadata';
import MarkdownRenderer from '../../components/markdown-renderer/MarkdownRenderer';

export default function PostDetail() {
    const { postId } = useParams<{ postId: string }>(); // useParams의 타입 지정
    const [markdown, setMarkdown] = useState<string>('');
    const [frontmatter, setFrontMatter] = useState<FrontMatter | null>(null); // 초기값을 null로 설정

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`/markdowns/posts/${postId}.md`);
                if (!response.ok) {
                    throw new Error('Failed to fetch post');
                }
                const text = await response.text();
                const { content, data } = matter(text);
                setMarkdown(content);
                setFrontMatter(data as FrontMatter);
            } catch (err) {
                console.error(err);
            }
        };

        fetchPost();
    }, [postId]);

    if (!frontmatter) {
        return null;
    }

    return (
        <>
            <PageMetadata frontMatter={frontmatter} />
            <main>
                <header>
                    <div className={styles.postInfo}>
                        <div className={styles.tagsContainer}>
                            {frontmatter.tag.map((tag, index) => (
                                <p key={index} className={styles.tagItem}>
                                    {tag}
                                </p>
                            ))}
                        </div>
                        <PostDate date={frontmatter.date} className={styles.postDate} />
                    </div>
                    <h1 className={styles.postHeader}>{frontmatter.title}</h1>
                </header>
                <article>
                    <MarkdownRenderer markdown={markdown} />
                </article>
                <br />
                <br />
                <footer>
                    <a href="/">← 게시글 목록으로</a>
                </footer>
            </main>
        </>
    );
}
