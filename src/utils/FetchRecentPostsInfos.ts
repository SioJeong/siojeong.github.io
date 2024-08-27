import matter from 'gray-matter';

interface PostInfo {
    title: string;
    date: string;
}

export default async function fetchRecentPostsInfos(paths: string[]): Promise<PostInfo[]> {
    const titles: PostInfo[] = [];

    for (const path of paths) {
        try {
            const response = await fetch(path);
            const markdown = await response.text();
            const { data } = matter(markdown);

            const { title, date } = data;
            titles.push({ title, date });
        } catch (error) {
            console.error(`Error fetching or processing file at path: ${path}`, error);
        }
    }

    return titles;
}
