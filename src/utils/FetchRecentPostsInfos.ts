import matter from 'gray-matter';

interface PostInfo {
    title: string;
    date: string;
}

export default async function fetchRecentPostsInfos(paths: string[]): Promise<PostInfo[]> {
    try {
        // 모든 경로에 대해 fetch 요청을 병렬 처리
        const fetchPromises = paths.map(async (path) => {
            try {
                const response = await fetch(path);
                if (!response.ok) throw new Error(`Failed to fetch: ${path}`);
                
                const markdown = await response.text();
                const { data } = matter(markdown);
                const { title, date } = data;

                return { title, date };
            } catch (error) {
                console.error(`Error fetching or processing file at path: ${path}`, error);
                return null; // 에러 발생 시 null을 반환
            }
        });

        // 병렬로 요청한 결과를 모두 처리하고, null이 아닌 결과만 필터링
        const results = await Promise.all(fetchPromises);
        return results.filter((post): post is PostInfo => post !== null); // null을 제거하고 PostInfo 타입만 반환
    } catch (error) {
        console.error('Error fetching post infos:', error);
        return []; // 에러 발생 시 빈 배열 반환
    }
}
