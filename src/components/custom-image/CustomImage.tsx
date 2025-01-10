import React, { useState, useEffect } from 'react';
import styles from './CustomImage.module.css';

interface CustomImageProps {
    src: string;
    alt?: string;
    width?: number;
    height?: number;
}

const CustomImage: React.FC<CustomImageProps> = ({ src, alt, width, height }) => {
    const [aspectRatio, setAspectRatio] = useState<number>(9 / 16); // 기본 비율 설정
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    useEffect(() => {
        if (width && height) {
            setAspectRatio(height / width);
            setIsLoaded(true);
        } else {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                if (img.naturalWidth && img.naturalHeight) {
                    setAspectRatio(img.naturalHeight / img.naturalWidth);
                }
                setIsLoaded(true);
            };
        }
    }, [src, width, height]);

    return (
        <div
            className={styles.imageWrapper}
            style={{
                paddingTop: `${aspectRatio * 100}%`,
            }}
        >
            {!isLoaded && <div className={styles.imagePlaceholder}></div>}
            <img
                src={src}
                alt={alt || ''}
                className={`${styles.image} ${isLoaded ? styles.imageLoaded : ''}`}
                loading="lazy"
            />
        </div>
    );
};

export default CustomImage;
