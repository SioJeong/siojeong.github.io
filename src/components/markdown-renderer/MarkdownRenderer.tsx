import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import styles from './MarkdownRenderer.module.css';

interface MarkdownRendererProps {
    markdown: string;
}

export default function MarkdownRenderer({ markdown }: MarkdownRendererProps) {
    return (
        <div>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                    h2: ({ node, ...props }) => <h2 className={styles.heading2} {...props} />,
                    li: ({ node, ...props }) => <li className={styles.list} {...props} />,
                    details: ({ node, ...props }) => (
                        <details className={styles.codeBlock} {...props} />
                    ),
                    summary: ({ node, ...props }) => (
                        <summary className={styles.codeBlockTitle} {...props} />
                    ),
                    code({ node, className, children, style, ...props }) {
                        const match = /language-(\w+)/.exec(className || '');
                        return match ? (
                            <SyntaxHighlighter
                                style={vscDarkPlus}
                                language={match[1]}
                                PreTag="div"
                                {...(props as any)}
                            >
                                {String(children).replace(/\n$/, '')}
                            </SyntaxHighlighter>
                        ) : (
                            <code className={className} {...props}>
                                {children}
                            </code>
                        );
                    },
                }}
            >
                {markdown}
            </ReactMarkdown>
        </div>
    );
}
