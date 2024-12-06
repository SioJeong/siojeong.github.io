let isInitialized = false;

/**
 * Initialize Google Analytics 4 (GA4).
 * @param measurementId - The GA4 Measurement ID
 */
export const initGA4 = (measurementId: string): void => {
    if (isInitialized) return; // Prevent duplicate initialization
    isInitialized = true;

    // Dynamically add the GA4 script to the document
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    script.onload = () => {
        window.dataLayer = window.dataLayer || [];
        function gtag(...args: any[]) {
            window.dataLayer.push(args);
        }
        window.gtag = gtag;

        gtag('js', new Date());
        gtag('config', measurementId);
    };
};

/**
 * Track a page view with Google Analytics.
 * @param path - The path of the current page
 */
export const trackPageView = (path: string): void => {
    if (window.gtag) {
        window.gtag('event', 'page_view', {
            page_path: path,
        });
    } else {
        console.warn('Google Analytics has not been initialized.');
    }
};
