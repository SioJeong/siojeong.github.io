declare global {
    interface Window {
        dataLayer: any[];
        gtag: (...args: any[]) => void;
        Buffer: typeof Buffer;
    }
}

export {};
