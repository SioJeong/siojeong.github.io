import { Buffer } from 'buffer';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import PostProvider from './context/PostProvider';

import Header from './components/header/Header';
import Main from './components/main/Main';
import Footer from './components/footer/Footer';

import './App.css';
import './shared/fonts/Font.css';

declare global {
    interface Window {
        Buffer: typeof Buffer;
    }
}

// 글로벌 환경 설정
window.Buffer = Buffer;

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <PostProvider>
            {/* <BrowserRouter>  */}
            <BrowserRouter basename="/">
                <div className="root-container">
                    <div className="content">
                        <Header />
                        <Main />
                        <Footer />
                    </div>
                </div>
            </BrowserRouter>
        </PostProvider>
    </StrictMode>
);
