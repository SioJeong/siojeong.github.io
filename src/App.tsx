import { Buffer } from 'buffer';
import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, useLocation } from 'react-router-dom';
import PostProvider from './context/PostProvider';

import Header from './components/header/Header';
import Main from './components/main/Main';
import Footer from './components/footer/Footer';

import './App.css';
import './shared/fonts/Font.css';
import { initGA4, trackPageView } from './utils/googleAnalytics';

window.Buffer = Buffer;

const AnalyticsWrapper = ({ children }: { children: React.ReactNode }) => {
    const location = useLocation();

    // Google Analytics 초기화
    useEffect(() => {
        const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
        if (measurementId) {
            initGA4(measurementId)
                .then(() => {
                    trackPageView(location.pathname); // 초기 페이지뷰 트래킹
                })
                .catch((error) => {
                    console.error('GA Initialization Error:', error);
                });
        } else {
            console.error('Google Analytics Measurement ID is missing!');
        }
    }, []);

    // 라우트 변경 시 페이지뷰 트래킹
    useEffect(() => {
        trackPageView(location.pathname);
    }, [location]);

    return <>{children}</>;
};

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <PostProvider>
            {/* <BrowserRouter>  */}
            <BrowserRouter basename="/">
                <AnalyticsWrapper>
                    <div className="root-container">
                        <div className="content">
                            <Header />
                            <Main />
                            <Footer />
                        </div>
                    </div>
                </AnalyticsWrapper>
            </BrowserRouter>
        </PostProvider>
    </StrictMode>
);
