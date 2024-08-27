import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MarkdownRenderer from '../../components/markdown-renderer/MarkdownRenderer';
import PostDate from '../../components/post-date/PostDate';
import matter from 'gray-matter';
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
        fetch(`/markdowns/posts/${postId}.md`)
            .then((response) => response.text())
            .then((text) => {
                const { content, data } = matter(text);
                setMarkdown(content);
                setFrontMatter(data as FrontMatter);
            })
            .catch((error) => {
                console.error('Error fetching markdown file:', error);
            });
    }, [postId]);

    if (!frontmatter) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{frontmatter.title}</h1>
            <div className={styles.postInfo}>
                <p>
                    Tags:{' '}
                    {Array.isArray(frontmatter.tag)
                        ? frontmatter.tag.map((tag, index) => (
                              <span key={index}>
                                  {index > 0 ? ', ' : ''}
                                  {tag}
                              </span>
                          ))
                        : frontmatter.tag}
                </p>
                <PostDate date={frontmatter.date} />
            </div>
            <MarkdownRenderer markdown={markdown} />
        </div>
    );
}
