import matter from 'gray-matter';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MarkdownRenderer from '../../components/markdown-renderer/MarkdownRenderer';
import PostDate from '../../components/post-date/PostDate';
import styles from './PostDetail.module.css';

// 인터페이스 정의
interface FrontMatter {
    title: string;
    date: string;
    tag: string | string[];
}

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
        return <div>Loading...</div>;
    }

    return (
        <main>
            <header>
                <h1>{frontmatter.title}</h1>
                <div className={styles.postInfo}>
                    <p>
                        Tags:{' '}
                        {Array.isArray(frontmatter.tag)
                            ? frontmatter.tag.join(', ')
                            : frontmatter.tag}
                    </p>
                    <PostDate date={frontmatter.date} />
                </div>
            </header>
            <article>
                <MarkdownRenderer markdown={markdown} />
            </article>
            <br />
            <br />
            <footer>
                <a href="/post">← 이전 페이지로</a>
            </footer>
        </main>
    );
}
