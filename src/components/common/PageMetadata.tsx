const PageMetadata = ({ frontMatter }: { frontMatter: FrontMatter }) => {
    return (
        <>
            <title>{frontMatter.title}</title>
            <meta name="description" content={frontMatter.description} />
            <meta property="og:title" content={frontMatter.title} />
            <meta property="og:type" content="website" />
            <meta property="og:description" content={frontMatter.description} />
            <meta property="og:image" content="/Symbol.svg" />
        </>
    );
};

export default PageMetadata;
