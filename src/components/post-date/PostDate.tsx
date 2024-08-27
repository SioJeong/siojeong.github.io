interface PostDateProps {
    date: string | Date;
    className?: string;
}

export default function PostDate({ date, className }: PostDateProps) {
    const formatDate = (date: string | Date) => {
        const dateString = new Date(date);
        const year = dateString.getFullYear();
        const month = String(dateString.getMonth() + 1).padStart(2, '0');
        const day = String(dateString.getDate()).padStart(2, '0');
        return `${year}.${month}.${day}.`;
    };

    return <span className={className}>{formatDate(date)}</span>;
}
