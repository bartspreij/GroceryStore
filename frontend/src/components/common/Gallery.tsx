import { ReactNode } from 'react';

interface GalleryProps {
    children: ReactNode;
}

const Gallery: React.FC<GalleryProps> = ({ children }) => {
    return (
        <div className="carousel w-full bg-neutral rounded-box mb-4">
            {children}
        </div>
    );
};

export default Gallery;
