import ReactMarkdown from 'react-markdown';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import styles from './MarkdownRenderer.module.css';
import { memo } from 'react';

SyntaxHighlighter.registerLanguage('jsx', jsx);

interface MarkdownRendererProps {
    markdown: string;
}

const MarkdownRenderer = ({ markdown }: MarkdownRendererProps) => {
    return (
        <article>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                    h2: (props) => <h2 className={styles.heading2} {...props} />,
                    h3: (props) => <h3 className={styles.heading3} {...props} />,
                    strong: (props) => <strong className={styles.strong} {...props} />,
                    img: (props) => (
                        <img className={styles.image} {...props} alt={props.alt || ''} />
                    ),
                    ul: (props) => <ul className={styles.unorderedList} {...props} />,
                    ol: (props) => <ol className={styles.orderedList} {...props} />,
                    li: (props) => <li className={styles.list} {...props} />,
                    details: (props) => <details className={styles.codeBlock} {...props} />,
                    summary: (props) => <summary className={styles.codeBlockTitle} {...props} />,
                    code({ className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || '');
                        return match ? (
                            <SyntaxHighlighter style={vscDarkPlus} language={match[1]} PreTag="div">
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
        </article>
    );
};

export default memo(MarkdownRenderer);
