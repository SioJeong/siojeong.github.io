import { createContext, useState, useContext, ReactNode } from 'react';

const PostContext = createContext<
    | {
          totalPostsNumber: number;
          setTotalPostsNumber: React.Dispatch<React.SetStateAction<number>>;
      }
    | undefined
>(undefined);

// Provider 컴포넌트
export function PostProvider({ children }: { children: ReactNode }) {
    const [totalPostsNumber, setTotalPostsNumber] = useState(10);

    return (
        <PostContext.Provider value={{ totalPostsNumber, setTotalPostsNumber }}>
            {children}
        </PostContext.Provider>
    );
}

export default function usePostContext() {
    const context = useContext(PostContext);
    if (context === undefined) {
        throw new Error('usePostContext must be used within a PostProvider');
    }
    return context;
}
