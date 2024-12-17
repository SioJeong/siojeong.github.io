declare global {
    interface Window {
        dataLayer: any[];
        gtag: (...args: any[]) => void;
        Buffer: typeof Buffer;
    }

    interface FrontMatter {
        id: number;
        title: string;
        date: string;
        tag: string[];
        description: stirng;
    }
}

export {};
