import { useContext } from "react";
import { PostContext } from "./PostProvider";

export function usePostContext() {
    const context = useContext(PostContext);
    if (context === undefined) {
        throw new Error('usePostContext must be used within a PostProvider');
    }
    return context;
}