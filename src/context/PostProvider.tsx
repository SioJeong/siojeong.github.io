import { createContext, useState, ReactNode } from 'react';

export const PostContext = createContext<
    | {
          totalPostsNumber: number;
          setTotalPostsNumber: React.Dispatch<React.SetStateAction<number>>;
      }
    | undefined
>(undefined);

// Provider 컴포넌트
export default function PostProvider({ children }: { children: ReactNode }) {
    const [totalPostsNumber, setTotalPostsNumber] = useState(13);

    return (
        <PostContext.Provider value={{ totalPostsNumber, setTotalPostsNumber }}>
            {children}
        </PostContext.Provider>
    );
}
