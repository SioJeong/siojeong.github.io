import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

// 레이지 로딩을 사용하여 컴포넌트 임포트
// const Home = lazy(() => import('../../pages/home/Home'));
const PostList = lazy(() => import('../../pages/postlist/PostList'));
const About = lazy(() => import('../../pages/about/About'));
const PostDetail = lazy(() => import('../../pages/postdetail/PostDetail'));

// 로딩 중 표시할 컴포넌트
export default function Main() {
    return (
        <main>
            <Suspense fallback={null}>
                <Routes>
                    <Route path="/" element={<PostList />} />
                    {/* <Route path="/post" element={<PostList />} /> */}
                    <Route path="/post/:postId" element={<PostDetail />} />
                    <Route path="/about" element={<About />} />
                </Routes>
            </Suspense>
        </main>
    );
}
