import { Product } from '../../domain/product';
import { Tag } from '../../domain/tag';

interface GalleryItemProps {
    product: Product;
}

const GalleryItem: React.FC<GalleryItemProps> = ({
    product,
}: GalleryItemProps) => {
    return (
        <div className="carousel-item max-h-96" style={{ maxWidth: '25%' }}>
            <div
                key={product.id}
                className="card m-2 text-gray-400 card-compact bg-base-100 shadow-xl"
            >
                <figure className="aspect-square">
                    <img
                        className="w-full h-full object-cover"
                        src={product.imageUrl}
                        alt={product.name}
                        height="300px"
                        width="300px"
                    />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{product.name}</h2>
                    <p className="line-through">€{product.price}</p>
                    <p>€{product.price.toFixed(2)}</p>
                    <div className="card-actions justify-between">
                        <div className="flex flex-wrap items-center gap-1">
                            <span>Tags:</span>
                            {product.tags &&
                                product.tags.map((tag: Tag) => (
                                    <a
                                        className="p-1 bg-slate-400 text-white"
                                        href={`/?c=${tag.name}`}
                                        key={tag.id}
                                    >
                                        {tag.name}
                                    </a>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GalleryItem;
