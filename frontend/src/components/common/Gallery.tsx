import { ReactNode } from 'react';

interface GalleryProps {
  children: ReactNode;
}

const Gallery: React.FC<GalleryProps> = ({ children }) => {
  return (
    <div className="carousel card-width w-full bg-slate-200 rounded-box mb-4">
      {children}
    </div>
  );
};

export default Gallery;
