let isInitialized = false;
let initializationPromise: Promise<void> | null = null;

/**
 * Initialize Google Analytics 4 (GA4).
 * @param measurementId - The GA4 Measurement ID
 */
export const initGA4 = (measurementId: string): Promise<void> => {
    if (isInitialized) {
        console.warn('Google Analytics is already initialized.');
        return Promise.resolve(); // 이미 초기화된 경우 바로 완료
    }

    if (initializationPromise) {
        return initializationPromise; // 초기화 중인 경우 기존 Promise 반환
    }

    initializationPromise = new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;

        script.onload = () => {
            window.dataLayer = window.dataLayer || [];
            window.gtag = function gtag(...args: any[]) {
                window.dataLayer.push(args);
            };

            window.gtag('js', new Date());
            window.gtag('config', measurementId, { debug_mode: true });

            isInitialized = true; // 초기화 완료
            resolve();
        };

        script.onerror = () => {
            console.error('Failed to load Google Analytics script.');
            reject(new Error('Failed to load GA script.'));
        };

        document.head.appendChild(script);
    });

    return initializationPromise;
};

export const trackPageView = async (path: string): Promise<void> => {
    if (!isInitialized) {
        return; // 초기화 완료 전에는 실행하지 않음
    }

    if (window.gtag) {
        window.gtag('event', 'page_view', {
            page_path: path,
        });
    } else {
        console.warn('Google Analytics has not been initialized.');
    }
};
