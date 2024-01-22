import React from 'react';
import { Tag } from '../../domain/tag';

interface TagsProps {
    tags: Tag[];
}

const Tags: React.FC<TagsProps> = ({ tags }) => {
    return (
        <div className="flex flex-wrap items-center gap-1">
            {tags.map((tag) => (
                <a
                    className="p-1 bg-slate-400 text-white"
                    href={`/?c=${tag.name}`}
                    key={tag.id}
                >
                    {tag.name}
                </a>
            ))}
        </div>
    );
};

export default Tags;
